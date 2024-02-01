function showOptions(optionsId) {
    const options = document.getElementById(optionsId);

    if (options.style.display === 'none') {
        options.style.display = 'flex';
    } else {
        options.style.display = 'none';
    }
}

let currentCardId;
const btnFechar = document.getElementById('btn-fechar');

// mostra a opção de excluir o card
function confirmDelete(cardId) {
    console.log(cardId)
    currentCardId = cardId;
    const confDelete = document.getElementById(`confirmDelete${cardId}`);
    confDelete.style.display = 'block'
}

// exibe a mensagem de sucesso
function deleteSuccess(id) {
    const msgSucess = document.getElementById(id);
    msgSucess.style.display = 'flex';
}

// exclui o card do documento - deve excluir do db
function deleteCard(id) {
    console.log(id)
    const confDelete = document.getElementById(id);

    setTimeout(function () {
        confDelete.style.display = 'none';
        // document.getElementById(currentCardId).remove();
    }, 3000);
    // Obter projetos do localStorage
    var projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    console.log(projetos)

    // Filtrar o projeto com base no ID para removê-lo
    projetos = projetos.filter(projeto => projeto.id !== id);

    // Atualizar localStorage com a lista filtrada
    localStorage.setItem('projetos', JSON.stringify(projetos));

    // Remover o elemento do documento
    document.getElementById(id).remove();
}

// não exclui o card 
function cancelDelete(cardId) {
    currentCardId = null;
    const cancelDelete = document.getElementById(`confirmDelete${cardId}`);
    cancelDelete.style.display = 'none';
}





