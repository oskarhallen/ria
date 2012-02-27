define(['jquery', 'underscore', 'backbone', 'taskview','text!src/templates/list.html'],
function($, _, Backbone, TaskView, ListTemplate) {
    var ListView = Backbone.View.extend({
        // The `template` for the list.
        template: _.template(ListTemplate),

        // The `tag` the list will be contained in.
        tagName: 'li',

        // Events for the list.
        events: {
            'click .item-delete': 'deleteList',
            'mouseover': 'toggleDeleteButton',
            'mouseout': 'toggleDeleteButton'
        },

        // Initializes the list view.
        initialize: function() {
            this.model.view = this;
        },

        // Renders the list wrapping it in an element.
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        // Sets the list's content.
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

        // Destorys the list's model and removes itself.
        deleteList: function(e) {
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
    return ListView;
});