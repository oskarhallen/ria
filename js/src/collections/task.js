define(['underscore', 'backbone', 'localstorage', 'taskmodel'],
function(_, Backbone, LocalStorage, TaskModel){
    var TaskCollection = Backbone.Collection.extend({
    
        // The collections model.
        model: TaskModel,

        // Constructor.
        initialize: function(args) {
            // Init localStorage with the id of the list.
            this.localStorage = new LocalStorage('list-' + args.id);
        },

        // Comp.
        comparator: function(task) {
            return task.get('done');
        }

    });
    return TaskCollection;
});