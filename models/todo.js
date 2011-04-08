// todo.js
require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/todo');
var Schema = mongoose.Schema;

var Todo = new Schema({
  name: {type: String, index: true},
  status: Number,
  memo: String,
  created_at: Date
});
//Todo.method('save', function() {
//  this.created_at = new Date();
//  this.__super__(fn);
//});
mongoose.model('Todo', Todo);

//module.exports = Todo;
module.exports = db.model('Todo');

// vim: set ts=2 sw=2 sts=2 expandtab fenc=utf-8:
