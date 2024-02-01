const addProject = document.getElementById('add-project');
const adicionarProjetoInfo = document.getElementById('info-adicionar-projeto')
const containerAddProject = document.getElementById('container__add-project');
const cancelButton = document.getElementById('cancel');


adicionarProjetoInfo.addEventListener('click', function () {
    if (containerAddProject.style.display === 'none') {
        containerAddProject.style.display = 'flex';
    } else {
        containerAddProject.style.display = 'none';
    }
})

// 1
cancelButton.addEventListener('click', function () {
    if (containerAddProject.style.display === 'flex') {
        containerAddProject.style.display = 'none';
    } else {
        containerAddProject.style.display = 'flex';
    }
})

// 2- mostra a imagem na tela
document.getElementById('imageInput').addEventListener('change', function (event) {
    const previewImage = document.getElementById('previewImage');

    const file = event.target.files[0];
    const additionalContent = document.querySelector('.additional-content');
    const titles = document.getElementById('titles')

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
        }

        titles.style.display = 'none';
        // additionalContent.style.top = '0'
        // previewImage.style.width = '300px'
        // previewImage.style.height = '280px';
        // previewImage.style.backgroundSize = 'contain'
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';

    }
});

// 3 - função para pegar a hora e minuto da criação do projeto
function obterDataAtual() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; 
    const ano = dataAtual.getFullYear();

    // Formatar o dia, mês e ano
    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;

    return `${diaFormatado}/${mesFormatado}`;
}

function gerarIdAleatorio() {
    return Math.floor(Math.random() * 101);
}

console.log(obterDataAtual)
// 4 - adiciona o projeto
function addProjeto() {
    // Obter os valores dos campos do formulário
    var titulo = document.querySelector('.container__input input[placeholder="Titulo"]').value;
    var tags = document.querySelector('.container__input input[placeholder="Tags"]').value;
    var links = document.querySelector('.container__input input[placeholder="Links"]').value;
    var descricao = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    const imagePath = URL.createObjectURL(imageInput.files[0]);
    const dataCriacao = obterDataAtual();
    const id = gerarIdAleatorio()

    // verificar se o campo de titulo e descrição estão preenchidos
    if (titulo === "" || descricao === "") {
        alert("Preencha os campos obrigatórios (Título e Descrição)!");
        return;
    }

    // criar um objeto representando o projeto
    var projeto = {
        id: id,
        titulo: titulo,
        tags: tags,
        links: links,
        descricao: descricao,
        imageInput: imagePath,
        dataHoraCriacao: dataCriacao
    };

    // verifica se já existem projetos armazenados no localStorage
    var projetos = JSON.parse(localStorage.getItem('projetos')) || [];

    // adicionar o novo projeto à lista de projetoss
    projetos.push(projeto);

    // armazena a lista atualizada no localStorage
    localStorage.setItem('projetos', JSON.stringify(projetos));

    // limpa os campos
    document.querySelector('.container__input input[placeholder="Titulo"]').value = "";
    document.querySelector('.container__input input[placeholder="Tags"]').value = "";
    document.querySelector('.container__input input[placeholder="Links"]').value = "";
    document.getElementById('description').value = "";

    // alert para saber se foi
    alert("Projeto adicionado com sucesso!");
}

// 5 - função para carregar e exibir projetos na página portfolio
function carregarProjetos() {
    const projectsContainer = document.querySelector('.projects');

    // obtem os projetos do localStorage
    const projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    console.log(projetos)
    const cardItem = document.getElementById('card__item');

    projectsContainer.innerHTML = '';

    // verifica se tem projetos cadastrados no LocalStorage
    if (projetos.length > 0) {
        projetos.forEach(projeto => {
            
            // pega os valores da propriedade "tags" e divide-os
            const tagsArray = projeto.tags.split(',').map(tag => tag.trim());
            const divproject = document.createElement('div');


            divproject.innerHTML = `
                <div class="card__item" id="card${projeto.id}">
                    <div class="btn__options">
                        <button class="btn__options--btn" onclick="showOptions('options${projeto.id}')">
                            <i class="fas fa-pen"></i>
                        </button>
                    </div>
                    

                    <div class="options" id="options${projeto.id}">
                        <button class="btn__option" id="editar">Editar</button>
                        <button class="btn__option" id="excluir" onclick="confirmDelete('card${projeto.id}')">Excluir</button>
                    </div>

                    <div class="image-project">
                        <img src="../assets/Profile-Image.png" alt="sua foto de perfil">
                    </div>

                    <div class="infoProject">
                        <div class="infor">
                            <img src="../assets/Profile-Image.png" alt="sua foto de perfil">
                            <p  id="name-user">Camila Soares</p>
                            <p id="hour-create">${projeto.dataHoraCriacao}</p>
                        </div>

                        <div class="tags">
                            <p>${tagsArray[0]}</p>
                            <p>${tagsArray[1]}</p>
                        </div>
                        
                    </div>

                    <div class="confirm-delete" id="confirmDeletecard${projeto.id}">
                        <p class="confirm-delete--title">Deseja excluir?</p>
                        <p class="confirm-delete--text">Se você prosseguir irá excluir o projeto do seu portfólio
                        </p>
                        <button class="btn-del-edit color__excluir"
                            onclick="deleteCard('card${projeto.id}')">Excluir</button>
                        <button class="btn-del-edit" onclick="cancelDelete('card${projeto.id}')">Cancelar</button>
                    </div>

                    <div class="confirm-delete deleteSuccess" id="deleteSuccess${projeto.id}">
                        <p>Projeto deletado com sucesso!</p>
                        <i class="fas fa-check-circle"></i>
                        <button class="btn-fechar" id="btn-fechar">Voltar para projetos</button>
                    </div>
                </div>
            `;

            projectsContainer.appendChild(divproject);
        });
    } else {
        // se não tiver projetos cadastrados mostra a div de adicionar
        const noProjectsMessage = document.createElement('button');
        noProjectsMessage.classList.add('card__project');
        noProjectsMessage.id = 'add-project';

        const noProjectsImage = document.createElement('img');
        noProjectsImage.src = '../assets/collections.png';
        noProjectsImage.alt = 'Icone de arquivos';
        noProjectsMessage.appendChild(noProjectsImage);

        const noProjectsTitles = document.createElement('div');
        noProjectsTitles.classList.add('titles');

        const noProjectsParagraph1 = document.createElement('p');
        noProjectsParagraph1.textContent = 'Adicione seu primeiro projeto';
        noProjectsTitles.appendChild(noProjectsParagraph1);

        const noProjectsParagraph2 = document.createElement('p');
        noProjectsParagraph2.classList.add('titles__title');
        noProjectsParagraph2.textContent = 'Compartilhe seu talento com milhares de pessoas';
        noProjectsTitles.appendChild(noProjectsParagraph2);

        noProjectsMessage.appendChild(noProjectsTitles);

        // adiciona o botão à lista de projetos
        projectsContainer.appendChild(noProjectsMessage);

        const addProject = document.getElementById('add-project');
        // mostra o modal
        addProject.addEventListener('click', function () {
            if (containerAddProject.style.display === 'none') {
                containerAddProject.style.display = 'flex';
            } else {
                containerAddProject.style.display = 'none';
            }
        })
    }
}

// chamar a função para carregar projetos ao carregar a página
carregarProjetos();