const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));
console.log("teste de usuario logado: ", dataLoggedUser );

module.exports = dataLoggedUser;