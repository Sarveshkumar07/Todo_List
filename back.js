
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask() {
  let name = document.getElementById("taskName").value;
  let date = document.getElementById("taskDate").value;
  let priority = document.getElementById("taskPriority").value;

  if (name === "" || date === "" || priority === "") {
    alert("Fill all fields");
    return;
  }

  let task = {
    name: name,
    date: date,
    priority: priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  showTasks();

  document.getElementById("taskName").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskPriority").value = "";
}

function showTasks() {
  document.getElementById("todayTasks").innerHTML = "";
  document.getElementById("futureTasks").innerHTML = "";
  document.getElementById("completedTasks").innerHTML = "";

  let today = new Date().toISOString().split("T")[0];

  tasks.forEach((task, index) => {
    let div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      ${task.name} | ${task.date} | ${task.priority}
      <button onclick="completeTask(${index})">✔</button>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    if (task.completed) {
      div.classList.add("completed");
      document.getElementById("completedTasks").appendChild(div);
    } else if (task.date === today) {
      document.getElementById("todayTasks").appendChild(div);
    } else {
      document.getElementById("futureTasks").appendChild(div);
    }
  });
}


function completeTask(index) {
  tasks[index].completed = true;
  saveTasks();
  showTasks();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

showTasks();
