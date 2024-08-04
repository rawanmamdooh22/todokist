// Name Of input
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let img = document.getElementById("imgg");

// Function Use To Add Tasks
function addTask() {
  const taskText = inputBox.value.trim();
  if (!taskText) {
    alert("You must write something");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  const span = document.createElement("span");
  span.textContent = "\u00d7";
  li.appendChild(span);
  listContainer.appendChild(li);

  img.style.display = "none";
  saveData();
  completeTask();
  incompleteTask();

  inputBox.value = "";
}

//  Save Data In Local Storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

//  Show Saved Task From Local Storage
function showTasks() {
  // Delete Img When Adding Tasks and versa
  if (localStorage.getItem("data")) {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.children.length === 0) {
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  } else {
    img.style.display = "block";
  }

  completeTask();
  incompleteTask();
}

// Make Tasks Completed
listContainer.addEventListener("click",function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      completeTask();
      incompleteTask();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      showTasks();
    }
  },
  false
);

// Delete All Tasks
function deleteAll() {
  listContainer.innerHTML = "";
  saveData();
  showTasks();
}

// Calculate The Number Of Completed Tasks And Display It
function completeTask() {
  const completeCount = listContainer.querySelectorAll("li.checked").length;
  document.getElementById("com-count").textContent = completeCount;
  // To Storage Number In Local Storage
  localStorage.setItem("completeCount", completeCount.toString());
}
function incompleteTask() {
  const incompleteCount = listContainer.querySelectorAll("li:not(.checked)").length;
  document.getElementById("comm-count").textContent = incompleteCount;
  // To Storage Number In Local Storage
  localStorage.setItem("incompleteCount", incompleteCount.toString());
}

showTasks();
