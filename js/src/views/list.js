define(['jquery', 'underscore', 'backbone', 'taskview','text!src/templates/list.html'],
function($, _, Backbone, TaskView, ListTemplate) {
    var ListView = Backbone.View.extend({

        template: _.template(ListTemplate),
        tagName: 'li',

        initialize: function() {
            //this.model.bind('change', this.render, this);
            this.model.view = this;
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

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
        }

    });
    return ListView;
});