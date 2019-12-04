var cancelSession = () => {
    fetch('/users/logout', {
        method: 'POST',
    })
}
