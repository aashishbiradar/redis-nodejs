$(document).ready(function(){
    $('#task-submit').off().on('click',function(e){
        e.preventDefault();
        var task = $('#task-input').val().trim();
        if(!task)
        {
            return alert('Enter task');
        }
        TaskManager.getObj().add(task);
    });
    $('#remove-tasks').off().on('click',function(e){
        e.preventDefault();
        var tasks = [];
        $('.task-list input:checked').toArray().forEach(function(v){
            tasks.push($(v).val());
        });
        if(tasks.length > 0 )
        {
            TaskManager.getObj().remove(tasks);
        }
    });
});

function TaskManager(){

}
TaskManager.getObj = (function () {
    var singleObj = undefined;
    return function () {
        if(!singleObj) {
            singleObj = new TaskManager();
        }
        return singleObj;
    }
})();

TaskManager.prototype.add = function (task) {
   $.ajax({
       data: {
           task : task
       },
       complete : function(reply){
           location.reload();
       },
       type: 'post',
       url: '/task/add'
   });
}
TaskManager.prototype.remove = function (tasks) {
    $.ajax({
        data: {
            tasks : JSON.stringify(tasks),
        },
        complete : function(reply){
            location.reload();
        },
        type: 'post',
        url: '/task/remove'
    });
 }
