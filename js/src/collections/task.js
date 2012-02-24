define(['underscore', 'backbone', 'localstorage', 'taskmodel'],
function(_, Backbone, LocalStorage, TaskModel){
    var TaskCollection = Backbone.Collection.extend({
    
        model: TaskModel,

        initialize: function(args) {
            this.localStorage = new LocalStorage('list-' + args.id);
        }

    });
    return TaskCollection;
});