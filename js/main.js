require.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.7.1.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/require/text',
        localstorage: 'libs/backbone/localstorage',

        appview: 'src/views/app',
        listview: 'src/views/list',
        taskview: 'src/views/task',

        listmodel: 'src/models/list',
        taskmodel: 'src/models/task',

        listcollection: 'src/collections/list',
        taskcollection: 'src/collections/task',

        listtemplate: 'src/templates/list.html',
        tasktemplate: 'src/templates/task.html'
    }
});

require(['appview'],
function(AppView){
    var app_view = new AppView();
});