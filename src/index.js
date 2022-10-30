const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector("#todo-form");
const todoContainer = document.querySelector(".todo-container");

let todos = JSON.parse(localStorage.getItem("todos") ?? "[]");

const updateStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const makeTodo = (title, id, done = false) => {
  const todo = document.createElement("li");
  todo.classList.add("todo");
  if (done) todo.classList.add("done");

  const toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("type", "button");
  toggleBtn.classList.add("toggle-btn");
  toggleBtn.textContent = title;

  toggleBtn.addEventListener("click", () => {
    const todoStorage = todos.find((todo) => todo.id === id);
    todoStorage.done = !todoStorage.done;
    updateStorage();
    todo.classList.toggle("done");
  });

  todo.appendChild(toggleBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "x";

  deleteBtn.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id !== id);
    todo.remove();
  });

  todo.appendChild(deleteBtn);

  todoContainer.appendChild(todo);
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = todoInput.value;
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  makeTodo(title, id);
  todos.push({ title, id, done: false });
  updateStorage();
  todoInput.value = "";
});

todos.forEach((todo) => {
  makeTodo(todo.title, todo.id, todo.done);
});
