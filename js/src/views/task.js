define(['jquery', 'underscore', 'backbone', 'text!src/templates/task.html'],
function($, _, Backbone, TaskTemplate) {
    var TaskView = Backbone.View.extend({
        // The `template` for a task.
        template: _.template(TaskTemplate),

        // The `tag` a task will be contained in.
        tagName: 'li',
        isDelete: false,

        // Events for a task.
        events: {
            'click .item-delete': 'deleteTask',
            'click .task-item': 'toggleTask',
            'mouseover': 'toggleDeleteButton',
            'mouseout': 'toggleDeleteButton'
        },

        // Initialize the task view.
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.view = this;
        },

        // Renders the task wrapping it in an element.
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        // Set the task's content.
        setContent: function() {
            var content = this.model.get('content');
            this.$('.item-content').text(content);

            if (this.model.get('done')) {
                this.$('.item').css('background-color', '#2c2c2c');
                this.$('.item-content').css('color', '#555555');
                this.$('.item-content').css('text-decoration', 'line-through');
            }
        },

        // Toggle the task.
        toggleTask: function(e) {
            if(!this.isDelete){this.model.toggle();}
            this.isDelete = false;
        },

        // Destory the task's model and removes itself.
        deleteTask: function(e) {
            this.isDelete = true;
            this.model.destroy();
            this.remove();
        },

        // Shows or hides the delete button depending on it's current state.
        toggleDeleteButton: function(e) {
            if (this.$('.item-delete').css('visibility') === 'visible') {
                this.$('.item-delete').css('visibility', 'collapse');
            } else {
                this.$('.item-delete').css('visibility', 'visible');
            }
        }
    });
    return TaskView;
});