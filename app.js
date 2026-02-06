let todos = [];

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todosList = document.getElementById("todosList");

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  render();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("activeTasks").textContent = active;
  document.getElementById("completedTasks").textContent = completed;
}

function render() {
  if (todos.length === 0) {
    todosList.innerHTML =
      '<div class="empty-state">No tasks yet. Add one above!</div>';
  } else {
    todosList.innerHTML = todos
      .map(
        (todo) => `
                <li class="todo-item ${todo.completed ? "completed" : ""}">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? "checked" : ""}
                        onchange="toggleTodo(${todo.id})"
                    >
                    <span class="todo-text">${todo.text}</span>
                    <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
                </li>
            `,
      )
      .join("");
  }
  updateStats();
}

render();
