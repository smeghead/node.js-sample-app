
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var Todo = require('./models/todo.js');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  console.log('requested /.');
  Todo.find({}, function(err, todos) {
    console.log('finded.');
    res.render('index', {
      title: 'Express',
      todos: todos,
      errors: req.session.errors,
    });
  });
});
app.post('/register', function(req, res) {
  console.log(req.body.todo);
  var todo = new Todo(req.body.todo);
  todo.save(function(err){
    console.log(err);
    req.session.errors = [err];
  });
  res.redirect('/');
});
app.put('/checked/:id', function(req, res) {
  console.log('/checked');
  console.log(req.params.id);
  Todo.findById(req.params.id, function(err, todo) {
    todo.todo_state = req.body.todo_state;
    todo.save(function(err){console.log(err);});
    console.log('saved');
  });
  res.redirect('/');
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
// vim: set ts=2 sw=2 sts=2 expandtab fenc=utf-8:
