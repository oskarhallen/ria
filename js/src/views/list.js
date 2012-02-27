define(['jquery', 'underscore', 'backbone', 'taskview','text!src/templates/list.html'],
function($, _, Backbone, TaskView, ListTemplate) {
    var ListView = Backbone.View.extend({

        // Template.
        template: _.template(ListTemplate),

        // Tag.
        tagName: 'li',

        // Events.
        events: {
            'click .item-delete': 'deleteList',
            'mouseover': 'toggleDeleteButton',
            'mouseout': 'toggleDeleteButton'
        },

        // Constructor.
        initialize: function() {
            //this.model.bind('change', this.render, this);
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
            var that = this;

            this.$('.item-content').text(content);
            
            if (this.model.get('id')) {
                this.$('.list-item').attr('data-id', this.model.get('id'));
            }
            else {
                this.model.bind('change:id', function() {
                    that.$('.list-item').attr('data-id', that.model.get('id'));
                });
            }
        },

        // Delete a list.
        deleteList: function(e) {
            //this.model.tasks.destroy();
            this.model.destroy();
            this.remove();
        },

        // Toggle the delete button.
        toggleDeleteButton: function(e) {
            if (this.$('.item-delete').css('visibility') === 'visible') {
                this.$('.item-delete').css('visibility', 'collapse');
            } else {
                this.$('.item-delete').css('visibility', 'visible');
            }
        }

    });
    return ListView;
});