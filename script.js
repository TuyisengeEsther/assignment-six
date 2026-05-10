// =============================
// Get HTML elements from the page
// =============================

// The form element used to add tasks
const taskForm = document.getElementById("taskForm");

// Input field where the user types the task name
const taskInput = document.getElementById("taskInput");

// Date picker input
const dateInput = document.getElementById("dateInput");

// Paragraph used to display validation errors
const errorMsg = document.getElementById("errorMsg");

// Container where all tasks will be displayed
const taskList = document.getElementById("taskList");


// =============================
// Load tasks from Local Storage
// =============================

// Try to get saved tasks from localStorage.
// If there is no saved data, use an empty array [].
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// =============================
// Save tasks to Local Storage
// =============================
function saveTasks() {
    // Convert the tasks array into a JSON string
    // and store it in localStorage under the key "tasks".
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// =============================
// Render all tasks to the page
// =============================
function renderTasks() {
    // Remove all existing HTML inside taskList
    taskList.innerHTML = "";

    // Loop through every task object in the array
    tasks.forEach((task, index) => {
        // Create a card element
        const card = document.createElement("div");

        // Add Tailwind CSS classes
        card.className =
            "bg-white p-4 rounded-lg shadow flex justify-between items-start";

        // Insert task content into the card
        card.innerHTML = `
            <div>
                <h3 class="font-bold text-lg">${task.name}</h3>
                <p class="text-gray-600">Due: ${task.date}</p>
            </div>
            <button
                onclick="deleteTask(${index})"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
                Delete
            </button>
        `;

        // Add card to task list
        taskList.appendChild(card);
    });
}


// =============================
// Add a new task
// =============================
taskForm.addEventListener("submit", function (e) {
    // Prevent page refresh
    e.preventDefault();

    // Remove extra spaces from task name
    const taskName = taskInput.value.trim();

    // Get selected date
    const dueDate = dateInput.value;

    // Validate inputs
    if (taskName === "" || dueDate === "") {
        // Show error message
        errorMsg.classList.remove("hidden");
        return;
    }

    // Hide error message if validation passes
    errorMsg.classList.add("hidden");

    // Create a task object
    const newTask = {
        name: taskName,
        date: dueDate
    };

    // Add task to array
    tasks.push(newTask);

    // Save to localStorage
    saveTasks();

    // Re-render task list
    renderTasks();

    // Clear form inputs
    taskInput.value = "";
    dateInput.value = "";
});


// =============================
// Delete a task
// =============================
function deleteTask(index) {
    // Remove one item from tasks array
    tasks.splice(index, 1);

    // Save updated array
    saveTasks();

    // Re-render tasks
    renderTasks();
}


// =============================
// Load tasks when page opens
// =============================
renderTasks();