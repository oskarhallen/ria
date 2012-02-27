define(['jquery', 'underscore', 'backbone', 'listview', 'listcollection', 'taskview'],
function($, _, Backbone, ListView, ListCollection, TaskView) {
    var AppView = Backbone.View.extend({
        
        // The application's wrapping element.
        el: $('body'),

        // Current selected list.
        selectedList: null,

        // Events for the application.
        events: {
            'keypress #new-item':  'createItem',
            'click .list-item-content': 'showTasks',
            'click #back': 'showLists'
        },
            
        // Initializes the application's view.
        initialize: function() {
            ListCollection.bind('add', this.addOneList, this);
            ListCollection.bind('reset', this.addAllLists, this);
            ListCollection.fetch();
        },
        
        // List View Functions
        // --------------

        // Adds one list by appending it to the `DOM`.
        addOneList: function(list) {
            var view = new ListView({model: list});
            this.$('#items').append(view.render().el);
        },

        // Add all existing lists to the `DOM`.
        addAllLists: function() {
            ListCollection.each(this.addOneList);
        },

        // Shows the tasks belonging to the selected list.
        showTasks: function(e) {
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

        // Task View Functions
        // --------------

        // Adds one task by appending to the `DOM`.
        addOneTask: function(task) {
            var view = new TaskView({model: task});
            this.$('#items').append(view.render().el);
        },

        // Add all existing tasks to the `DOM`.
        addAllTasks: function() {
            this.selectedList.tasks.each(this.addOneTask);
        },

        // Shows the lists by emptying the container and render the lists again.
        showLists: function(e) {
            this.selectedList = null;
            this.$('#items').empty();
            this.$('#back').css('visibility', 'collapse');
            this.addAllLists();
        },

        // Global Functions
        // ----------------

        // Creates a new item from the content of the input box and depending on the current view.
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