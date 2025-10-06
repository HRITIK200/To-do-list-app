// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add task on button click
addTaskBtn.addEventListener("click", addTask);

// Function to add task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">Delete</button>
  `;

  // Delete button functionality
  li.querySelector(".deleteBtn").addEventListener("click", () => {
    li.remove();
  });

  // Mark task complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  taskList.appendChild(li);
  taskInput.value = ""; // clear input
}
