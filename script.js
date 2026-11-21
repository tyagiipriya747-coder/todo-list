
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Update task count
    totalTasks.textContent = "Total: " + tasks.length;

    const completedCount = tasks.filter(
        task => task.completed
    ).length;

    completedTasks.textContent =
        "Completed: " + completedCount;

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

// Click event
addBtn.addEventListener("click", addTask);

// Enter key event
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Display saved tasks when page loads
displayTasks();
