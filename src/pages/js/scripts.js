// POST
const form = document.getElementById('form-api');
const url = 'http://localhost:3000/add'; // fake para teste

form.addEventListener('submit', evento => {
    evento.preventDefault();

    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (emailStandard.test(email) && password.length >= 8) {
        validCadastro.style.display = "flex";
    }
    else if (!emailStandard.test(email) || password.length < 8 || name === '' || lastname === '') {
        const icon = validCadastro.querySelector('i');
        const message = validCadastro.querySelector('p');

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
    }).then(res => res.json()).then(data => console.log(data))

})


