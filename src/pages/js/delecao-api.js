let currentCardId;
const btnFechar = document.getElementById('btn-fechar');
const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));


function confirmDelete(cardId) {
    console.log(cardId)
    currentCardId = cardId;
    const confDelete = document.getElementById(`confirmDelete${cardId}`);
    confDelete.style.display = 'block'
}

// função que exibe a mensagem de sucesso
function deleteSuccess(id) {
    const msgSucess = document.getElementById(`deleteSuccess${id}`);
    msgSucess.style.display = 'flex';
}

// exclui o card/projeto do documento e do banco de dados
async function deleteCard(id, idCard) {
    // exibe a mensage de sucesso na tela
    deleteSuccess(idCard);

    // aguarda 3s 
    setTimeout(async function () {
        try {
            // realiza uma requisição HTTP DELETE para o endpoint da sua API
            const response = await fetch(`https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/projects/${idCard}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +  dataLoggedUser.token,
                },
            });

            // verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            // remove o projeto da interface do usuário
            const elementToRemove = document.getElementById(id);
            if (elementToRemove) {
                elementToRemove.remove();
            }
        } catch (error) {
            console.error('Erro ao excluir projeto:', error.message);
        }
    }, 2000);
}

// não exclui o card 
function cancelDelete(cardId) {
    currentCardId = null;
    const cancelDelete = document.getElementById(`confirmDelete${cardId}`);
    cancelDelete.style.display = 'none';
}

// chamada inicial para carregar os projetos quando a página carrega
carregarProjetos();
