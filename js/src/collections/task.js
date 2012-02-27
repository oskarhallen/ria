define(['underscore', 'backbone', 'localstorage', 'taskmodel'],
function(_, Backbone, LocalStorage, TaskModel){
    var TaskCollection = Backbone.Collection.extend({
        // The collection's model.
        model: TaskModel,

        // Initializes the collection.
        initialize: function(args) {
            // Init localStorage with the `id` of the list.
            this.localStorage = new LocalStorage('list-' + args.id);
        },

        // Sorting the tasks by completion.
        comparator: function(task) {
            return task.get('done');
        }
    });
    return TaskCollection;
});