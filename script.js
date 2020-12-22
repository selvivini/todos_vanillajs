var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
    
  }
}

function init() {
  // Write code here to check if there are todos in localStorage
  var storedTodos= JSON.parse(localStorage.getItem("todos"));
  // If so, parse the value from localStorage and assign it to the todos variable

  // Render todos to the DOM
  if(!storedTodos){
    return;
  }else {
    todos= storedTodos;
  }

  renderTodos();
}

function storeTodos() {
  // Add code here to stringify the todos array and save it to the "todos" key in localStorage
localStorage.setItem("todos",JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

 

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});
 // remove completed todo from the todos Array
 todoList.addEventListener("click", function(event){
  if (event.target.matches("button")){
    var index = event.target.parentElement.getAttribute("data-index");
    todos.splice(index,1);
  }
  storeTodos();
  renderTodos();
  })