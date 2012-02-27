define(['underscore', 'backbone'],
function(_, Backbone) {
    var TaskModel = Backbone.Model.extend({
        
        defaults: {
            content: null,
            done: false
        },

        initialize: function() {
            if (!this.get('content')) {
                this.set({'content': this.defaults.content});
                this.set({'done': this.defaults.done});
            }
        },

        toggle: function() {
            this.save({done: !this.get("done")});
        }

    });
    return TaskModel;
});