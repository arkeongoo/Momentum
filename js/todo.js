const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const list = event.target.parentElement;
  list.remove();
  toDos = toDos.filter((toDO) => toDO.id !== parseInt(list.id));
  saveToDos();
}

function paintToDO(newTodo) {
  const newList = document.createElement("li");
  newList.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  newList.appendChild(span);
  newList.appendChild(button);
  toDoList.appendChild(newList);
}

function handleToSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDO(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDO);
}
