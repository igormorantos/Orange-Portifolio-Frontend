const form = document.getElementById('form-api');
const massegeValid = document.querySelector('#valid-cadastro');
const massege = massegeValid.querySelector('p');

const url = 'https://orange-portifolio-api-a03fcc01e1a7.herokuapp.com/login';

// função para o login
form.addEventListener('submit', evento => {
    evento.preventDefault();

    const email = document.getElementById('email-adress').value;
    const password = document.getElementById('user-password').value;

    const fullName = document.getElementById('fullName').value;
    const sub = document.getElementById('sub').value;
    const family_name = document.getElementById('given_name').value;
    const gEmail = document.getElementById('given_name').value;
    const picture = document.getElementById('given_name').value;
    const given_Name = document.getElementById('given_name').value;

    const emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailStandard.test(email) && password.length >= 8) {
        
        const valuesInputs = {
            email: email,
            password: password
        }
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valuesInputs),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Erro na autenticação');
            }
        })
        .then(data => {
            // se autenticação for bem-sucedida, redireciona para usuarios.html
            window.location = 'usuarios.html';
        })
        .catch(error => {
            // exibe a mensagem de erro em caso de falha na autenticação
            massegeValid.style.display = "flex";
            massegeValid.style.backgroundColor = '#ee483ca5';
            massege.textContent = error;
        });
    } else if (fullName && sub && gEmail){
        firstName = given_Name
        lastName = family_name
        password = sub
        email = gEmail

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                
            }
        })
        .then(data => {
            // se autenticação for bem-sucedida, redireciona para usuarios.html
            window.location = 'usuarios.html';
        })
        .catch(error => {
            // exibe a mensagem de erro em caso de falha na autenticação
            massegeValid.style.display = "flex";
            massegeValid.style.backgroundColor = '#ee483ca5';
            massege.textContent = "Erro na autenticação. Verifique suas credenciais.";
        });
    }
    else {
        massegeValid.style.display = "flex";
        massegeValid.style.backgroundColor = '#ee483ca5';
        massege.textContent = "Informe email e senha válidos.";

        // Aguarda 1s para recarregar a página
        setTimeout(function () {
            location.reload();
        }, 1000); // 1s
        return false; // Não envia o form
        }
});