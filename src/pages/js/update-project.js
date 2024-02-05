const updateModel = document.getElementById('container__update-project');

function updateProject() {
    var titulo = document.querySelector('.container__input input[placeholder="Titulo"]').value;
    var tags = document.querySelector('.container__input input[placeholder="Tags"]').value;
    var links = document.querySelector('.container__input input[placeholder="Links"]').value;
    var descricao = document.getElementById('description').value;
    const imageInput = document.getElementById('imageUpdate');
    const imagePath = URL.createObjectURL(imageInput.files[0]);
    const dataCriacao = obterDataAtual();

   /* if (titulo === "" || tags === "" || links === "" || descricao === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }*/

    var dadosAtualizados = {
        title: titulo,
        tags: tags,
        link: links,
        description: descricao,
        coverphoto: imagePath,
        updatedAt: dataCriacao
    };


    const response = fetch(`https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/projects/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  dataLoggedUser.token,
        },
        body: JSON.stringify(dadosAtualizados),
    })
       
    if(response.ok){
        console.log(dadosAtualizados)
        return response.status(200).JSON("projeto editado");
    }
}

function openUpdate() {
    updateModel.style.display = 'block'
}


const btnCancelUpdate = document.getElementById('cancelUpdate');
btnCancelUpdate.addEventListener('click', function(){
    updateModel.style.display = 'none'
})