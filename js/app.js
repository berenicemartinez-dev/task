const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
})

function addTask(){
    const text = taskInput.value;

    if(text === "")return;
    const li = document.createElement("li");
    li.classList.add("task-enter");
     li.innerHTML = `<label class="task-item">
        <input type="checkbox" class = "complete">
        <span>${text}</span>
     </label>

     <button class = "delete">X</button>`;
     taskList.appendChild(li);
     taskInput.value = "";

     saveTasks();
};

taskList.addEventListener("click", function(e){ 
    const deleteBtn = e.target.closest(".delete");
    if(deleteBtn){
        deleteBtn.parentElement.remove();
        showToast("Has eleiminado una tarea");
        saveTasks();
        return;
    }
    if(e.target.classList.contains("complete")){
        const taskText = e.target.nextElementSibling;
        const isChecked = e.target.checked;
        taskText.classList.toggle("completed", isChecked);
        if(isChecked){
            showToast("Feleicidades has completado una tarea");
        }else{
            taskText.classList.remove("completed");
        }
        saveTasks();
    } 
}); 

function showToast(message){
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() =>{
        toast.classList.remove("show");
    }, 2000);
};

function saveTasks(){
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector(".complete").checked;

        tasks.push({
            text: text,
            completed: completed
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

function loadTasks(){
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `<label class="task-item">
            <input type="checkbox" class="complete" ${task.completed ? "checked" : ""}>
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        </label>

        <button class = "delete">✖️</button>`;
        taskList.appendChild(li);
    });
};

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("Service Worker regidtered"));
}

loadTasks();