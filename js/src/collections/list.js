define(['underscore', 'backbone', 'localstorage', 'listmodel'],
function(_, Backbone, LocalStorage, ListModel){
    var ListCollection = Backbone.Collection.extend({
        // The collection's model.
        model: ListModel,

        // Local storage named lists.
        localStorage: new LocalStorage('lists')
    });
    return new ListCollection();
});