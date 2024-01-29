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
    const confDelete = document.getElementById(id);

    setTimeout(function () {
        confDelete.style.display = 'none';
        document.getElementById(currentCardId).remove();
    }, 3000);
    deleteSuccess(id);
}

// não exclui o card 
function cancelDelete(cardId) {
    currentCardId = null;
    const cancelDelete = document.getElementById(`confirmDelete${cardId}`);
    cancelDelete.style.display = 'none';
}





