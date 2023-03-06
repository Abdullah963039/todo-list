const taskInput = document.getElementById("task-input");
const addTask = document.getElementById("addTask");
const taskContainer = document.querySelector(".tasks");

// Declare An Empty Array To Store Tasks
let arrOfTasks;

taskInput.focus();

// Check If Local Storage Contains Any Task
if (localStorage.getItem("tasks")) {
  arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
  createTasks(arrOfTasks);
} else {
  arrOfTasks = [];
}

// Events
addTask.onclick = createNewTask;

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTask(e.target);
  }
  if (e.target.classList.contains("status")) {
    doneToggler(e.target.parentElement.parentElement);
  }
});

// Functions
function createNewTask() {
  // Check If User Input Not Empty
  let taskTitle;
  let val = taskInput.value;
  if (val.trim().length != 0) {
    // Clear Tasks Div
    taskContainer.innerHTML = "";
    // If Value Not Empty
    taskTitle = val;

    // Create task Object => Store Data
    const task = {
      id: new Date().getTime(),
      title: taskTitle,
      completed: false,
    };
    // Add Task Data To Main Array
    arrOfTasks.push(task);
    // Create Tasks
    createTasks(arrOfTasks);
    // Save Tasks In Local Storage
    updateData(arrOfTasks);

    taskInput.value = "";
  } else {
    console.log("Invalid Input");
  }
}

function createTasks(tasks = []) {
  // Clear Tasks Div
  taskContainer.innerHTML = "";

  // Looping On Every Task
  tasks.forEach((task) => {
    // Fetch Task Title
    let title = task.title;
    // Create Task Div
    let taskDiv = document.createElement("div");
    let innerDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.appendChild(document.createTextNode(title));
    // Create Status Span
    let span = document.createElement("span");
    span.className = "status";
    if (task.completed) {
      span.classList.add("done");
      span.appendChild(document.createTextNode("Completed"));
    } else {
      span.classList.add("in-progress");
      span.appendChild(document.createTextNode("In Progress"));
    }
    innerDiv.appendChild(span);
    // Create Delete Button
    let button = document.createElement("button");
    button.className = "delete";
    button.innerText = "Delete";
    innerDiv.appendChild(button);
    // Add Inner Div To Task Div
    taskDiv.appendChild(innerDiv);
    // Add Final Task Div To Container
    taskContainer.appendChild(taskDiv);
  });
}

function updateData(tasks = []) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(btn) {
  let id = parseInt(btn.parentElement.parentElement.getAttribute("data-id"));
  btn.parentElement.parentElement.remove();
  arrOfTasks = arrOfTasks.filter((task) => task.id !== id);
  updateData(arrOfTasks);
}

function doneToggler(task) {
  let id = task.getAttribute("data-id");
  arrOfTasks.map((task) => {
    if (task.id == id) {
      // Toggle Values
      task.completed = !task.completed;
    }
  });
  task.classList.toggle("done");
  updateData(arrOfTasks);
  createTasks(arrOfTasks);
}
