let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let DB = [];
if (localStorage.getItem("taskes") != null) {
  console.log("!=null");
  DB = JSON.parse(localStorage.getItem("taskes"));
  DisplayTaskInPage();
} else {
  DB = [];
}
submit.addEventListener("click", function () {
  if (input.value !== "") {
    AddTaskToArray(input.value);
    input.value = "";
  }
});
function AddTaskToArray(taskText) {
  //Task Data
  let task = {
    id: Date.now(),
    title: taskText,
    complet: false,
  };
  //push task (Object) to array of tasks
  DB.push(task);

  //add taskes to local Storage
  localStorage.setItem("taskes", JSON.stringify(DB));

  //Add Tasks to page
  DisplayTaskInPage();

  window.onload = input.focus();
}
//DB =====> ArrayOftaskes
function DisplayTaskInPage() {
  let cartonna = ``;
  let x=[]
  let y=[]
  for (let i = 0; i < DB.length; i++) {
      
    if (DB[i].complet) {
        let completTaskes=DB[i].complet;
        x.push(completTaskes)
        
      cartonna += `
            <div class="task done" data-id="${DB[i].id}">${DB[i].title}
                <span class="del" onclick="deleteTask(${i})">Delete</span>
            </div>
            `;
    } else {
        let completTaskes=DB[i].complet;
        y.push(completTaskes)
      cartonna += `
            <div class="task" data-id="${DB[i].id}">${DB[i].title}
                <span class="del" onclick="deleteTask(${i})">Delete</span>
            </div>
            `;
    }
  }
  tasks.innerHTML = cartonna;
  console.log(x.length,y.length)
  document.getElementById('completNumber').innerHTML=x.length
  document.getElementById('TasksProcess').innerHTML=y .length
}

function deleteTask(e) {
  DB.splice(e, 1);
  localStorage.setItem("taskes", JSON.stringify(DB));
  DisplayTaskInPage();
}
tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < DB.length; i++) {
    if (DB[i].id == taskId) {
      DB[i].complet == false ? (DB[i].complet = true) : (DB[i].complet = false);
    }
  }

  localStorage.setItem("taskes", JSON.stringify(DB));
}
