$(document).ready(function(){
    $('#task-submit').off().on('click',function(e){
        e.preventDefault();
        var task = $('#task-input').val().trim();
        if(task == '')
        {
            return alert('Enter task');
        }
        Task.getObj().add(task);
    });
    $('#remove-tasks').off().on('click',function(e){
        e.preventDefault();
        var tasks = [];
        $('.task-list input:checked').toArray().forEach(function(v){
            tasks.push($(v).val());
        });
        console.log(tasks);
    });
});

function Task(){

}
Task.getObj = (function () {
    var singleObj = undefined;
    return function () {
        if(!singleObj) {
            singleObj = new Task();
        }
        return singleObj;
    }
})();

Task.prototype.add = function (task) {
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
