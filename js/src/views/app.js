define(['jquery', 'underscore', 'backbone', 'listview', 'listcollection', 'taskview'],
function($, _, Backbone, ListView, ListCollection, TaskView) {
    var AppView = Backbone.View.extend({
        
        el: $('body'),

        selectedList: null,

        events: {
            'keypress #new-item':  'createItem',
            'click .list-item': 'listClicked',
            'click #back': 'backClicked'
        },
            
        initialize: function() {
            this.input = this.$("#new-item");

            ListCollection.bind('add', this.addOneList, this);
            ListCollection.bind('reset', this.addAllLists, this);
            ListCollection.fetch();
        },

        /**
         * Lists
         * Functions for the list part of the application
         */
        addOneList: function(list) {
            var view = new ListView({model: list});
            this.$('#items').append(view.render().el);
        },

        addAllLists: function() {
            ListCollection.each(this.addOneList);
        },

        listClicked: function(e) {
            this.$('#items').empty();
            this.$('#back').css('visibility', 'visible');

            this.selectedList = ListCollection.get($(e.currentTarget).data('id'));
            
            if (!this.selectedList.tasks.first().get('content')) {
                this.selectedList.tasks.bind('add', this.addOneTask, this);
                this.selectedList.tasks.bind('reset', this.addAllTasks, this);
                this.selectedList.tasks.fetch();
            } else {
                this.addAllTasks();
            }
        },

        /**
         * Task
         * Functions for the task part of the application
         */
        addOneTask: function(task) {
            var view = new TaskView({model: task});
            this.$('#items').append(view.render().el);
        },

        addAllTasks: function() {
            this.selectedList.tasks.each(this.addOneTask);
        },

        backClicked: function(e) {
            this.selectedList = null;
            this.$('#items').empty();
            this.$('#back').css('visibility', 'collapse');
            this.addAllLists();
        },

        /**
         * Global
         * Functions for both the task and list part of the application
         */
        createItem: function(e) {
            if (e.keyCode != 13) return;

            if (!this.selectedList) {
                ListCollection.create({content: this.input.val()});
                this.input.val('');
            } else {
                this.selectedList.tasks.create({content: this.input.val()});
                this.input.val('');
            }
        }

    });
    return AppView;
});