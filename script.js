// Selectors
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const prioritySelect = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const clearAllBtn = document.getElementById("clearAll");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save and display
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Display tasks
function displayTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter((task) => {
    if (statusFilter.value === "completed") return task.completed;
    if (statusFilter.value === "pending") return !task.completed;
    return true;
  });

  const searchText = searchInput.value.toLowerCase();
  filteredTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchText)
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `${task.priority} ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div>
        <strong>${task.text}</strong>
        <small>(${task.priority.toUpperCase()} | ${task.dueDate || "No due"})</small>
      </div>
      <div>
        <button class="editBtn"><i class="fa-solid fa-pen"></i></button>
        <button class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // Delete
    li.querySelector(".deleteBtn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    // Edit
    li.querySelector(".editBtn").addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
      }
    });

    // Toggle complete
    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON" && e.target.tagName !== "I") {
        task.completed = !task.completed;
        saveTasks();
      }
    });

    taskList.appendChild(li);
  });

  // Counters
  totalTasks.textContent = `Total: ${tasks.length}`;
  completedTasks.textContent = `Completed: ${tasks.filter(t => t.completed).length}`;
  pendingTasks.textContent = `Pending: ${tasks.filter(t => !t.completed).length}`;
}

// Add task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = prioritySelect.value;

  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = { text, dueDate, priority, completed: false };
  tasks.push(newTask);
  saveTasks();

  taskInput.value = "";
  dueDateInput.value = "";
  prioritySelect.value = "low";
});

// Search, filter, clear
searchInput.addEventListener("input", displayTasks);
statusFilter.addEventListener("change", displayTasks);
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveTasks();
  }
});

// On load
displayTasks();
