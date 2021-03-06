define(['underscore', 'backbone', 'taskcollection'],
function(_, Backbone, TaskCollection) {
    var ListModel = Backbone.Model.extend({
        // The list's default values.
        defaults: {
            content: null
        },

        // Initializes a list.
        initialize: function() {
            if (!this.content) {
                this.content = this.defaults.content;
            }
            
            if (!this.id) {
                this.bind('change:id', function() {
                    this.tasks = new TaskCollection({id: this.id});
                });
            } else {
                this.tasks = new TaskCollection({id: this.id});
            }
        }
    });
    return ListModel;
});