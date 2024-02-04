const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));
console.log("teste de usuario logado: ", dataLoggedUser );

export default dataLoggedUser;