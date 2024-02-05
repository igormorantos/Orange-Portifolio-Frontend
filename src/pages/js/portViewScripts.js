const button = document.getElementById("modal-button-image");
const modal = document.querySelector("dialog");
const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));
console.log(dataLoggedUser)

button.onclick = function() {
    modal.showModal()
}

window.addEventListener('resize', function() {
    // Verifique se a tela tem 700px ou menos
    if (window.innerWidth <= 700) {
      // Se o modal estiver aberto, mude para a outra página
      if (document.querySelector('dialog').open) {
        window.location.href = "modal-cel.html";
      }
    }
  });

  if (window.location.href.indexOf("modal-cel.html") != -1) {
    // Adicione o evento de redimensionamento de janela
    window.addEventListener('resize', function() {
      // Se a tela for maior que 700px, redirecione para portView.html
      if (window.innerWidth > 700) {
        window.location.href = "portView.html";
      }
    });
  }
  