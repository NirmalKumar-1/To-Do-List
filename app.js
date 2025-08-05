const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
const extraS = document.querySelector(".multi-task");
let taskCount = 0;

const displayS = (count)=>{
    if(count>1){
        extraS.innerText = 's';
    }else {
        extraS.innerText = "";
    }
}

displayS(0);
const displayCount = (taskCount) =>{
    countValue.innerText = taskCount;
};

const  addTask = async() =>{
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    
    if(!taskName){
        await setTimeout(()=>{
            error.style.display = "block";
        }, 200);
        await setTimeout(()=>{
            error.style.display = "none";
        }, 3000);
        return;
    }

    const task = `
    <div class="task"> 
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete"> 
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
    `

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            displayS(taskCount);
        }
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;

            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount-=1;
            displayCount(taskCount);
            displayS(taskCount);
        }
    })
    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            let editBtn = checkBox.nextElementSibling.nextElementSibling;
            let deleteBtn = editBtn.nextElementSibling;
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount -= 1;
                editBtn.disabled  = true;
                deleteBtn.disabled = true;
                editBtn.classList.add('checkEdit');
                deleteBtn.classList.add('checkDelete');
            } 
            else {
                editBtn.disabled  = false;
                deleteBtn.disabled = false;
                editBtn.classList.remove('checkEdit');
                deleteBtn.classList.remove('checkDelete');
                taskCount+= 1;
            }
            displayCount(taskCount);
            displayS(taskCount);
        }
    })
    taskCount += 1;
    displayCount(taskCount);
    displayS(taskCount);
    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    displayS(taskCount);
    newTaskInput.value = "";
}