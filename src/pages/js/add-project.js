const addProject = document.getElementById('add-project');
const containerAddProject = document.getElementById('container__add-project');
const cancelButton = document.getElementById('cancel');

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
function obterHoraMinutoAtual() {
    const dataHoraAtual = new Date();
    const hora = dataHoraAtual.getHours();
    const minuto = dataHoraAtual.getMinutes();

    // Formatar a hora e o minuto
    const horaFormatada = hora < 10 ? '0' + hora : hora;
    const minutoFormatado = minuto < 10 ? '0' + minuto : minuto;

    return `${horaFormatada}:${minutoFormatado}`;
}

// 4 - adiciona o projeto
function addProjeto() {
    // Obter os valores dos campos do formulário
    var titulo = document.querySelector('.container__input input[placeholder="Titulo"]').value;
    var tags = document.querySelector('.container__input input[placeholder="Tags"]').value;
    var links = document.querySelector('.container__input input[placeholder="Links"]').value;
    var descricao = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    const imagePath = URL.createObjectURL(imageInput.files[0]);
    const dataHoraCriacao = obterHoraMinutoAtual()

    // verificar se o campo de titulo e descrição estão preenchidos
    if (titulo === "" || descricao === "") {
        alert("Preencha os campos obrigatórios (Título e Descrição)!");
        return;
    }

    // criar um objeto representando o projeto
    var projeto = {
        titulo: titulo,
        tags: tags,
        links: links,
        descricao: descricao,
        imageInput: imagePath,
        dataHoraCriacao: dataHoraCriacao
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


    projectsContainer.innerHTML = '';

    // verifica se tem projetos cadastrados no LocalStorage
    if (projetos.length > 0) {
        projetos.forEach(projeto => {
            console.log()
            // cria um elemento para cada projeto
            const projectElement = document.createElement('button');
            projectElement.classList.add('card__project');

            // adicionar a imagem do projeto
            const projectImage = document.createElement('img');
            projectImage.src = projeto.imageInput; // deve vir o src, mas está, por ora, com a url - erro
            projectImage.alt = 'Imagem do projeto';
            projectElement.appendChild(projectImage);

            // adiciona informações do projeto
            const projectTitles = document.createElement('div');
            projectTitles.classList.add('titles');

            const projectDate = document.createElement('p');
            projectDate.textContent = 'Data de Criação: ' + projeto.dataHoraCriacao;
            projectTitles.appendChild(projectDate);

            const projectTags = document.createElement('p');
            projectTags.textContent = 'Tags: ' + projeto.tags; 
            projectTitles.appendChild(projectTags);

            projectElement.appendChild(projectTitles);

            // adiciona o botão do projeto à lista de projetos
            projectsContainer.appendChild(projectElement);
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