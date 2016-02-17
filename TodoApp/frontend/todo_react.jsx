// window.TodoStore = require('./stores/todo_store.js');
var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = require('./components/todo_list.jsx');

document.addEventListener("DOMContentLoaded", function() {
 ReactDOM.render(<TodoList />, document.getElementById('root'));
});
