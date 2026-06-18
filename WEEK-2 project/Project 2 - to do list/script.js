function addtask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if(taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const li = document.createElement("li"); 
    li.classList.add("task-item");
    const span = document.createElement("span");
    span.innerText = taskText;
    span.classList.add("task-text");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-button");
    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    deleteBtn.addEventListener("click", function() {
        li.remove();
    });
    input.value = "";
}
