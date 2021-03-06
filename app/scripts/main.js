/**
 * This code is somewhat ugly.  I didn't really have time for style
 * or comments. Forgive me.
 *
 * @author  Nick Jones
 * @version 4/22/2015
 */

Views = {};

Views.Tile = Marionette.ItemView.extend({
    className: "slide",

    events: {
        "click": "clicked"
    },

    showDocument: function() {
        $("#content").html(this.contentTemplate(this.model.toJSON()));
    },

    clicked: function() {
        this.showDocument();
    }
});

Views.PdfTile = Views.Tile.extend({
    template: Handlebars.compile($("#pdf-slide-template").html()),
    contentTemplate: Handlebars.compile($("#pdf-doc-template").html())
});

Views.TextTile = Views.Tile.extend({
    template: Handlebars.compile($("#text-slide-template").html()),
    contentTemplate: Handlebars.compile($("#text-doc-template").html()),
    className: "text slide",
    initialize: function() {
        if (this.model.toJSON().title === "Welcome") {
            this.showDocument();
        }
    }
});

Views.HeaderTile = Marionette.ItemView.extend({
    template: Handlebars.compile($("#text-slide-template").html()),
    className: "header-slide slide"
});

Views.Sidebar = Marionette.CollectionView.extend({
    el: "#sidebar",

    collection: new Backbone.Collection([{
        "title": "Welcome",
        "type": "text",
        "content": "<p>Welcome to a portfolio of my work from <i>ENGW 3302: Advanced Writing in the Technical Professions</i> at Northeastern University in the Spring of 2015.  You can view some of the documents that I created by clicking the icons on the left.  Please note that some of these documents are rather large and may take several seconds to load. </p> <p> Thanks for checking out my work,</p> <p class='signature'> Nick Jones </p>"
    }, {
        "title": "Show Case",
        "type": "header"
    }, {
        "title": "Unit 1",
        "thumb": "images/thumb_unit_1.png",
        "type": "pdf",
        "pdf": "pdfs/unit_1.pdf"
    }, {
        "title": "Unit 2",
        "thumb": "images/thumb_unit_2.png",
        "type": "pdf",
        "pdf": "pdfs/unit_2.pdf"
    }, {
        "title": "Unit 3",
        "thumb": "images/thumb_unit_3.png",
        "type": "pdf",
        "pdf": "pdfs/unit_3.pdf"
    }, {
        "title": "Reflective Essay",
        "thumb": "images/thumb_unit_4.png",
        "type": "pdf",
        "pdf": "pdfs/unit_4.pdf"
    }, {
        "title": "Supporting Documents",
        "type": "header"
    }, {
        "title": "Unit 1 Subject",
        "thumb": "images/thumb_unit_1_subject.png",
        "type": "pdf",
        "pdf": "pdfs/unit_1_subject.pdf"
    }, {
        "title": "Unit 2 Rough Draft",
        "thumb": "images/thumb_unit_2_rough.png",
        "type": "pdf",
        "pdf": "pdfs/unit_2_rough.pdf"
    }, {
        "title": "Acknowledgements",
        "type": "text",
        "content": "<p>I would like to recognize several people who helped me throughout the course.  First, Professor Akbari, who stayed after class to answer my questions--especially during Unit Two. Next, I'd like to thank Jen Pattel, our service learning advisor, who made communicating with our service learning partners a breeze.  I'd like to thank Daniel Lang, Alexis Hair, Ben Beckvold, and Alexander Cornwall for their work on project 3. Finally, I'd like to thank the various people who reviewed my work throughout the semester.</p>"
    }]),

    initialize: function() {
        this.render();
    },

    getChildView: function(item) {
        if (item.get("type") === "pdf") {
            return Views.PdfTile;
        } else if (item.get("type") === "text") {
            return Views.TextTile;
        } else  if (item.get("type") === "header") {
            return Views.HeaderTile;
        }
    }
});

sidebar = new Views.Sidebar();
