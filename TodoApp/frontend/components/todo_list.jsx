var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoList = React.createClass ({
  componentDidMount: function() {
    this.setState({all: TodoStore.all()});
  },

  getInitialState: function () {
    TodoStore.fetch();
    return {all: []};
  },

  render: function () {

    return <div>
      <ul>
        {this.all.forEach(function(todo){
          return <li>{todo.title}</li>;
        })}
      </ul>
    </div>;
  }

});
window.TodoStore = TodoStore;
module.exports = TodoList;
