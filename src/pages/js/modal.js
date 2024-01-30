const lista = document.querySelector('.lista');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
    if(lista.style.display === 'none'){
        lista.classList.add('lista__hamburguer');
        lista.style.display = 'flex';
    } else{
        lista.style.display = 'none';
    }
});