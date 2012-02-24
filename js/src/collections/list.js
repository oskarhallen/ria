define(['underscore', 'backbone', 'localstorage', 'listmodel'],
function(_, Backbone, LocalStorage, ListModel){
    var ListCollection = Backbone.Collection.extend({
    
        model: ListModel,
        localStorage: new LocalStorage('lists')
    
    });
    return new ListCollection();
});