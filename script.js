
const taskForm = document.getElementById("taskForm");


const taskInput = document.getElementById("taskInput");


const dateInput = document.getElementById("dateInput");


const errorMsg = document.getElementById("errorMsg");


const taskList = document.getElementById("taskList");





let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



function saveTasks() {
   
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



function renderTasks() {
   
    taskList.innerHTML = "";

   
    tasks.forEach((task, index) => {
       
        const card = document.createElement("div");

        
        card.className =
            "bg-white p-4 rounded-lg shadow flex justify-between items-start";

        
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

       
        taskList.appendChild(card);
    });
}



taskForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

   
    const taskName = taskInput.value.trim();

    
    const dueDate = dateInput.value;

    
    if (taskName === "" || dueDate === "") {
       
        errorMsg.classList.remove("hidden");
        return;
    }

   
    errorMsg.classList.add("hidden");

   
    const newTask = {
        name: taskName,
        date: dueDate
    };

    
    tasks.push(newTask);

   
    saveTasks();

    
    renderTasks();

    
    taskInput.value = "";
    dateInput.value = "";
});



function deleteTask(index) {
   
    tasks.splice(index, 1);

    
    saveTasks();

   
    renderTasks();
}



renderTasks();