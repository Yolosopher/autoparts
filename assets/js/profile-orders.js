const profileContentMainOrders = document.querySelector('.profileContent__main__orders')
const backToAll = document.querySelector('.profileContent__main__orders__opened__navigation__backbtn')
const statusbtns = document.querySelectorAll('.statusbtn')

statusbtns.forEach(btn => {
    btn.addEventListener('click', () => {
        profileContentMainOrders.classList.add('selected')
    })
})

backToAll.addEventListener('click', () => {
    profileContentMainOrders.classList.remove('selected')
})