define(['jquery', 'underscore', 'backbone', 'text!src/templates/task.html'],
function($, _, Backbone, TaskTemplate) {
    var TaskView = Backbone.View.extend({

        // The template.
        template: _.template(TaskTemplate),

        // Tag name.
        tagName: 'li',

        // Events.
        events: {
            'click .task-item-content': 'toggleTask',
            'click .item-delete': 'deleteTask',
            'mouseover': 'toggleDeleteButton',
            'mouseout': 'toggleDeleteButton'
        },

        // Constructor.
        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.view = this;
        },

        // Render.
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        // Set the content.
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
            this.model.toggle();
        },

        // Delete the task.
        deleteTask: function(e) {
            this.model.destroy();
            this.remove();
        },

        // Toggle delete button.
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