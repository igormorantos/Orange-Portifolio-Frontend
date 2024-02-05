
const addProject = document.getElementById('add-project');
const adicionarProjetoInfo = document.getElementById('info-adicionar-projeto')
const containerAddProject = document.getElementById('container__add-project');
const cancelButton = document.getElementById('cancel');
const dataLoggedUser = JSON.parse(sessionStorage.getItem('data'));
const userNamePrincipal = document.getElementById('name');
nomeCompleto = dataLoggedUser.usuario.firstName + ' ' + dataLoggedUser.usuario.lastName
userNamePrincipal.textContent = nomeCompleto
console.log(dataLoggedUser.token);

adicionarProjetoInfo.addEventListener('click', function () {
    if (containerAddProject.style.display === 'none') {''
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

    const diaFormatado = dia < 10 ? '0' + dia : dia;
    const mesFormatado = mes < 10 ? '0' + mes : mes;

    return `${diaFormatado}/${mesFormatado}`;
}

function gerarIdAleatorio() {
    return Math.floor(Math.random() * 101);
}


function addProjeto() {
    // Obter os valores dos campos do formulário
    var titulo = document.querySelector('.container__input input[placeholder="Titulo"]').value;
    var tags = document.querySelector('.container__input input[placeholder="Tags"]').value;
    var links = document.querySelector('.container__input input[placeholder="Links"]').value;
    var descricao = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    const imagePath = URL.createObjectURL(imageInput.files[0]);

    if (titulo === "" || tags === "" || links === "" || descricao === "") {
        alert("Preencha todos os campos obrigatórios (Título, Tags, Links e Descrição)!");
        return;
    }

    // criar um objeto representando o projeto
    var projeto = {
        title: titulo,
        tags: tags,
        link: links,
        description: descricao,
        coverphoto: imagePath,
        fk_iduser: dataLoggedUser.usuario.id
    };

   
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  dataLoggedUser.token,
        },
        body: JSON.stringify(projeto),
    };

    // url da api
    fetch('https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/projects', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Projeto adicionado com sucesso:', data);
            const msgProjetoCadastrado = document.getElementById('cad-sucess');
            msgProjetoCadastrado.style.display = "flex";
            setTimeout(function () {
                location.reload();
            }, 3000);
        })
        .catch(error => {
            console.error('Erro ao adicionar projeto:', error);
        });
}

function transformData(dataCriacao){
    const data = new Date(dataCriacao);
    const dataFormatada = data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
});
    return dataFormatada
}

function msgAdicionado(){
    if (document.getElementById('cad-sucess').style.display === 'flex') {
        document.getElementById('cad-sucess').style.display = 'none';
    } else {
        document.getElementById('cad-sucess').style.display = 'flex';
    }
}

// carrega os projetos do banco
//---------------------------------------------------------------------------------------
async function carregarProjetos() {
    const projectsContainer = document.querySelector('.projects');
    try {
            const response = await fetch(`https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/projects/${dataLoggedUser.usuario.id}`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' +  dataLoggedUser.token,
              },
            })
            
            if (response.ok) {
                const projetos = await response.json();
                
        projectsContainer.innerHTML = '';

        // se existir projetos cadastrados:
        if (projetos.length > 0) {
            projetos.forEach(projeto => {
                const tagsArray = projeto.tags.split(',').map(tag => tag.trim());
                const divproject = document.createElement('div');

               const dataCriada = transformData(projeto.createdAt);



               divproject.innerHTML = `
               <div class="card__item" id="card${projeto.id}">
       
                       <button class="btn__options--btn" onclick="showOptions('options${projeto.id}')">
                           <i class="fas fa-pen"></i>
                       </button>


                   <div class="options" id="options${projeto.id}">
                       <button class="btn__option" id="update" onclick="openUpdate()">Editar</button>
                       <button class="btn__option" id="excluir" onclick="confirmDelete('card${projeto.id}')">Excluir</button>
                   </div>

                       <img src="../assets/Profile-Image.png" alt="sua foto de perfil">

                   <div class="infoProject">
                       <div class="infor">
                           <img src="${projeto.link}"  alt="sua foto de perfil">
                           <p  id="name-user">${dataLoggedUser.usuario.firstName} ${dataLoggedUser.usuario.lastName}</p>
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
                           onclick="deleteCard('card${projeto.id}', ${projeto.id})">Excluir</button>
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
               return projetos
        } else {
                // se não tiver projetos cadastrados mostra a div de adicionar
                const noProjectsMessage = document.createElement('button');
                noProjectsMessage.classList.add('cardproject');
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
                noProjectsParagraph2.classList.add('titlestitle');
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
    }catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}


carregarProjetos();