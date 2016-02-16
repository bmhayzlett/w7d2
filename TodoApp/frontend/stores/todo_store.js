var _todos = {};
var _callbacks = [];

var TodoStore = {

  changed: function () {
    _callbacks.forEach (function (cb) {
      cb.apply(null, _todos);
    });
  },

  addChangedHandler: function (callback) {
    _callbacks.push(callback);
    this.changed();
  },

  removeChangedHandler: function (callback) {
    var index = _callbacks.indexOf(callback);
    _callbacks.splice(index, 1);
    this.changed();
  },

  all: function () {
    return _todos;
  },

  fetch: function () {
    $.get( "api/todos", function (data) {
      _todos = data;
    } );
    this.changed();
  },

  create: function(todo) {
    $.post("api/todos", todo).done(
      function(data) {
        _todos[data.id] = data;
      });

    this.changed();
  },

  destroy: function(id) {
    if (Object.keys(_todos).includes(id.toString())) {
      $.ajax({
        url: "/api/todos/" + id,
        type: 'post',
        data: {_method: 'delete', id: id},
        success: function() {
          _todos = _todos.filter(function(obj) {return obj.id !== id;});
        }});
      this.changed();
    }
  },

  toggleDone: function(id) {
    var truthy = _todos.filter(function(obj) {return obj.id === id;})[0].done;
    $.ajax({
      url: "/api/todos/" + id,
      type: 'post',
      data: {_method: 'patch', id: id, todo: {done: !truthy}},
      success: function() {
        _todos.forEach(function(todo) {
          if (todo.id === id) {
            todo.done = !truthy;
          }
        });

      }});
    this.changed();
  }

};



module.exports = TodoStore;
