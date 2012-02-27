define(['underscore', 'backbone'],
function(_, Backbone) {
    var TaskModel = Backbone.Model.extend({
        // The task's default vaules.
        defaults: {
            content: null,
            done: false
        },

        // Initializes a task.
        initialize: function() {
            if (!this.get('content')) {
                this.set({'content': this.defaults.content});
                this.set({'done': this.defaults.done});
            }
        },

        // Do or undo a task depending on it's current state.
        toggle: function() {
            this.save({done: !this.get("done")});
        }
    });
    return TaskModel;
});