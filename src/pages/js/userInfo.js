const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));
const namUser = document.getElementById('name')

namUser.textContent = dataLoggedUser.usuario.firstName + ' ' + lastName