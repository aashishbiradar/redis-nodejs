const express       = require('express');
const path          = require('path');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const redis         = require('redis');

var app = express();

var rdsClient = redis.createClient();
rdsClient.on('connect',() => {
    console.log('redis server connected');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    
    rdsClient.lrange('tasks',0,-1,(err,reply) => {
        var data = {
            title : "Task List",
            tasks : reply
        };
        res.render('index',data);
    });
});

app.post('/task/add',(req,res) => {
    var task = req.body.task;
    rdsClient.rpush('tasks', task, (err,reply) => {
        if(err) {
            res.send({
                result:"error",
                errorMsg: "Not able to add task"
            });
            return;
        }
        res.send({
            result: "succcess"
        });
    });
});

app.listen(3000);
console.log('server started on port 3000');

module.exports = app;