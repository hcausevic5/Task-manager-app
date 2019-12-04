var global

function dragStart(ev, nesto) {
    global = nesto
    ev.dataTransfer.setData("text", ev.target.id)
}

function allowDrop(ev) {
    ev.preventDefault()
}

function dropIt(ev) {
    ev.preventDefault()
    var parent = document.getElementById(ev.target.id)
    parent.appendChild(document.getElementById(global.id))
    fetch('/tasks/' + global.id.toString(), {
        method: 'PATCH',
        body: JSON.stringify({
            completed: ev.target.id
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

function dropIt2(ev) {
    ev.preventDefault()
    let dataId = ev.dataTransfer.getData("text")
    ev.target.appendChild(document.getElementById(dataId))
    let completed = document.getElementById('completed')
    completed.value = dog.value.replace(dataId,'')
}