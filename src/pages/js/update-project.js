function updateProject() {
    var titulo = document.querySelector('.container__input input[placeholder="Titulo"]').value;
    var tags = document.querySelector('.container__input input[placeholder="Tags"]').value;
    var links = document.querySelector('.container__input input[placeholder="Links"]').value;
    var descricao = document.getElementById('description').value;
    const imageInput = document.getElementById('imageInput');
    const imagePath = URL.createObjectURL(imageInput.files[0]);
    const dataCriacao = obterDataAtual();
    const id = gerarIdAleatorio();

    if (titulo === "" || tags === "" || links === "" || descricao === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    var dadosAtualizados = {
        id: id,
        titulo: titulo,
        tags: tags,
        links: links,
        descricao: descricao,
        imagePath: imagePath,
        dataCriacao: dataCriacao
    };


    fetch('https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/projects/', {
        method: 'PUT', // atualiza 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na solicitação: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert("Dados atualizados com sucesso!");
        })
        .catch(error => {
            console.error('Erro durante a atualização dos dados:', error);
            alert("Erro ao atualizar os dados. Verifique o console para mais detalhes.");
        });
}
