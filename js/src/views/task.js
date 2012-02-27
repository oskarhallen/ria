define(['jquery', 'underscore', 'backbone', 'text!src/templates/task.html'],
function($, _, Backbone, TaskTemplate) {
    var TaskView = Backbone.View.extend({

        template: _.template(TaskTemplate),
        tagName: 'li',

        events: {
            'click .task-item-content': 'toggleTask',
            'click .item-delete': 'deleteTask',
            'mouseover': 'toggleDeleteButton',
            'mouseout': 'toggleDeleteButton'
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.view = this;
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        setContent: function() {
            var content = this.model.get('content');
            this.$('.item-content').text(content);

            if (this.model.get('done')) {
                this.$('.item').css('background-color', '#2c2c2c');
                this.$('.item-content').css('color', '#555555');
                this.$('.item-content').css('text-decoration', 'line-through');
            }
        },

        toggleTask: function(e) {
            this.model.toggle();
        },

        deleteTask: function(e) {
            this.model.destroy();
            this.remove();
        },

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