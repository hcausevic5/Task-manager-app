var idName

function deleteTask(id) {
    fetch('/tasks/' + id.parentNode.id.toString(), {
        method: 'DELETE'
    })
}

function updateTask(nesto) {
    var div = document.getElementById('updateDiv')
    var par = document.getElementById('par')
    par.style.visibility = 'hidden'
    div.style.display = 'inline'
    idName = nesto.parentNode.id
    var updateName = document.getElementById('updateName')
    updateName.placeholder = nesto.parentNode.id
    var updateTextArea = document.getElementById('updateTextArea')
    updateTextArea.placeholder = 'Update your description!'
}

function cancelUpdate() {
    document.getElementById('updateDiv').style.display = 'none'
}

function saveTask(event) {
    event.preventDefault()
    var div = document.getElementById('updateDiv')
    var name = document.getElementById('updateName').value
    var description = document.getElementById('updateTextArea').value
    var par = document.getElementById('par')
    par.style.visibility = 'visible'
    fetch('/tasks/' + idName, {
        method: 'PATCH',
        body: JSON.stringify({
            name: name,
            description: description
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    div.innerHTML += '<p>Task updated!</p>'
    setTimeout(() => {
        par.style.visibility = 'hidden'
        div.style.display = 'none'
    }, 3000)
}

var putTasks = (task) => {
    document.getElementById(task.completed).innerHTML += `<div class="task" id="${task.name}" draggable="true" ondragstart="dragStart(event, this)">`
            + `<p> ${task.name} </p> <br> ${task.description}<br> <button class="taskButton1" onclick="updateTask(this)"> Update </button><button href="#" class="taskButton2" onclick="deleteTask(this)"> Delete </button></div>`
}

var getTasks = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var tasks = JSON.parse(this.responseText)
        tasks.forEach(task => {
            putTasks(task)
        });
        }
    }
    xhttp.open("GET", "/tasks", true);
    xhttp.send();
}
