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
    const msgSucess = document.getElementById(`deleteSuccess${id}`);
    msgSucess.style.display = 'flex';
}

// exclui o card do documento - deve excluir do db
function deleteCard(id, idCard) {
    // chama a função deleteSuccess primeiro para exibir a mensagem de sucesso
    deleteSuccess(idCard);

    // espera 3s antes de continuar com a exclusão
    setTimeout(function () {
        const confDelete = document.getElementById(id);

        // verifica se o elemento ainda existe antes de tentar manipulá-lo
        if (confDelete) {
            confDelete.style.display = 'none';
        }

        var projetos = JSON.parse(localStorage.getItem('projetos')) || [];

        projetos = projetos.filter(projeto => projeto.id !== idCard);
        localStorage.setItem('projetos', JSON.stringify(projetos));

        // verifica se o elemento ainda existe antes de tentar removê-lo
        const elementToRemove = document.getElementById(id);
        if (elementToRemove) {
            elementToRemove.remove();
        }
    }, 2000);
}


// não exclui o card 
function cancelDelete(cardId) {
    currentCardId = null;
    const cancelDelete = document.getElementById(`confirmDelete${cardId}`);
    cancelDelete.style.display = 'none';
}





