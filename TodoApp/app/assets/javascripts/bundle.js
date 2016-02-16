/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.TodoStore = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var _todos = {};
	var _callbacks = [];
	
	var TodoStore = {
	
	  changed: function () {
	    _callbacks.forEach(function (cb) {
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
	    $.get("api/todos", function (data) {
	      _todos = data;
	    });
	    this.changed();
	  },
	
	  create: function (todo) {
	    $.post("api/todos", todo).done(function (data) {
	      _todos[data.id] = data;
	    });
	
	    this.changed();
	  },
	
	  destroy: function (id) {
	    if (Object.keys(_todos).includes(id.toString())) {
	      $.ajax({
	        url: "/api/todos/" + id,
	        type: 'post',
	        data: { _method: 'delete', id: id },
	        success: function () {
	          console.log("message deleted");
	          _todos = _todos.filter(function (obj) {
	            return obj.id !== id;
	          });
	        } });
	      this.changed();
	    }
	  },
	
	  toggleDone: function (id) {
	    var truthy = _todos[id].done;
	    $.patch("api/todos/" + id, { todo: { done: !truthy } });
	    this.changed();
	  }
	
	};
	
	module.exports = TodoStore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map