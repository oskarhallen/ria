define(['jquery', 'underscore', 'backbone', 'listview', 'listcollection', 'taskview'],
function($, _, Backbone, ListView, ListCollection, TaskView) {
    var AppView = Backbone.View.extend({
        
        // The element.
        el: $('body'),

        // Current selected list.
        selectedList: null,

        // Events.
        events: {
            'keypress #new-item':  'createItem',
            'click .list-item-content': 'listClicked',
            'click #back': 'backClicked'
        },
            
        // Constructor.
        initialize: function() {
            ListCollection.bind('add', this.addOneList, this);
            ListCollection.bind('reset', this.addAllLists, this);
            ListCollection.fetch();
        },
        
        // List Functions
        // --------------

        // Add one list.
        addOneList: function(list) {
            var view = new ListView({model: list});
            this.$('#items').append(view.render().el);
        },

        // Add all lists.
        addAllLists: function() {
            ListCollection.each(this.addOneList);
        },

        // List clicked.
        listClicked: function(e) {
            this.$('#items').empty();
            this.$('#back').css('visibility', 'visible');

            this.selectedList = ListCollection.get($(e.currentTarget).parent().data('id'));
            
            if (!this.selectedList.tasks.first().get('content')) {
                this.selectedList.tasks.bind('add', this.addOneTask, this);
                this.selectedList.tasks.bind('reset', this.addAllTasks, this);
                this.selectedList.tasks.fetch();
            } else {
                this.addAllTasks();
            }
        },

        // Task Functions
        // --------------

        // Add one task.
        addOneTask: function(task) {
            var view = new TaskView({model: task});
            this.$('#items').append(view.render().el);
        },

        // Add all tasks.
        addAllTasks: function() {
            this.selectedList.tasks.each(this.addOneTask);
        },

        // Back clicked.
        backClicked: function(e) {
            this.selectedList = null;
            this.$('#items').empty();
            this.$('#back').css('visibility', 'collapse');
            this.addAllLists();
        },

        // Global Functions
        // ----------------

        // Create a new item.
        createItem: function(e) {
            if (e.keyCode != 13) return;

            if (!this.selectedList) {
                ListCollection.create({content: this.$("#new-item").val()});
                this.$("#new-item").val('');
            } else {
                this.selectedList.tasks.create({content: this.$("#new-item").val()});
                this.$("#new-item").val('');
            }
        }

    });
    return AppView;
});