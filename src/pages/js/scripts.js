// POST
const form = document.getElementById('form-api');

const url = 'https://orange-portifolio-api-a03fcc01e1a7.herokuapp.com/add'; 

form.addEventListener('submit', evento => {
    evento.preventDefault();

    const validCadastro = document.querySelector('#valid-cadastro');
    const message = validCadastro.querySelector('p');
    const icon = validCadastro.querySelector('i');

    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    let emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailStandard.test(email) && password.length >= 8) {

        const valuesInputs = {
            firstName: name,
            lastName: lastname,
            email: email,
            password: password
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valuesInputs)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erro na autenticação');
            }
        })
            .then(data => {
                validCadastro.style.display = "flex";
                setTimeout(function () {
                    window.location = "../../index.html";
                }, 1000);
            })
            .catch(error => {
                // Exibe mensagem de erro em caso de falha na autenticação
                validCadastro.style.display = "flex";
                icon.style.display = 'none';
                validCadastro.style.backgroundColor = '#ee483ca5';
                message.style.textAlign = 'center'
                message.textContent = "Erro na autenticação. Verifique suas credenciais.";
            });

    }
    else if (!emailStandard.test(email) || password.length < 8 || name === '' || lastname === '') {
        const icon = validCadastro.querySelector('i');

        validCadastro.style.display = "flex";
        validCadastro.style.backgroundColor = '#ee483ca5';
        icon.style.display = 'none';
        message.innerText = 'Revise os campos e tente novamente.';
        message.style.color = '#222244';


        // aguarda 1s para recarregar a página
        setTimeout(function () {
            location.reload();
        }, 1000); // 1s
        return false; // não envia o form
    }
})


