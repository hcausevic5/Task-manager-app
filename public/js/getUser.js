var deleteCurrentPicture = () => {
    fetch('/users/me/avatar', {
        method: 'DELETE'
    })
}

var deleteAccount = () => {
    fetch('/users/me', {
        method: 'DELETE'
    })
}

var editUserData = () => {
    var div = document.getElementById('changeData')
    div.style.display = 'flex'
}

var closeChange = () => {
    var div = document.getElementById('changeData')
    document.getElementById('changeName').focus()
    var age = document.getElementById('changeAge')
    var email = document.getElementById('changeEmail')

    div.style.display = 'none'
}

var executeChange = () => {
    var name = document.getElementById('changeName').value
    var age = document.getElementById('changeAge').value
    var email = document.getElementById('changeEmail').value

    fetch('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            age,
            email
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    var div = document.getElementById('changeData')
    div.style.display = 'none'
}