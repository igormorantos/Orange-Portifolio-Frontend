const form = document.getElementById('form-api');
const massegeValid = document.querySelector('#valid-cadastro');
const massege = massegeValid.querySelector('p');

const url = 'https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/login';
const url2 = 'https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/add';
let data;

// função para o login
form.addEventListener('submit', evento => {
    evento.preventDefault();

    const email = document.getElementById('email-adress').value;
    const password = document.getElementById('user-password').value;



    const emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //emailStandard.test(email) && password.length >= 4
    if (1 == 1) {
        
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
          console.log(data, "Login bem sucedido")
          sessionStorage.setItem('data', JSON.stringify(data));
          window.location = "../pages/portfolio.html";
          return response.json(data);
        })
        .catch(error => {
            // exibe a mensagem de erro em caso de falha na autenticação
            massegeValid.style.display = "flex";
            massegeValid.style.backgroundColor = '#ee483ca5';
            massege.textContent = error;
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

  async function sendDataToAPI(dataUser) {
    try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    })
    
    if (response.ok) {
       const data = await response.json();
       console.log(data, "Login bem sucedido")
       sessionStorage.setItem('data', JSON.stringify(data));
       window.location = "../pages/portfolio.html";
       return response.json(data)
    } else {
        console.log(dataUser)
        sendDataToOtherRoute(dataUser)
        return response.json({mensagem: 'Primeiro Acesso do Usuario'})
    }
  }
  catch(error){
  }
}


async function sendDataToOtherRoute(dataUser) {
    try{
    const response = await fetch('https://orange-port-ambiente-teste-566d37c661f3.herokuapp.com/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    })
    console.log(response)
    if (response.ok) {
       const data = await response.json(); 
       console.log(data.user[0], "cadastro feito com sucesso")
       sessionStorage.setItem('data', JSON.stringify(data.user));
       window.location = "../pages/portfolio.html";
       return data.user[0]
    } else {
        
        return response.json({mesnagem: "erro de cadastro"})
    }
  }
  catch(error){
    console.log(error.message)
    massegeValid.style.display = "flex";
    massegeValid.style.backgroundColor = '#ee483ca5';
    massege.textContent = error;
  }
}