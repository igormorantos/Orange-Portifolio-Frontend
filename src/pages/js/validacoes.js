// variáveis/const do HTML
const validCadastro = document.querySelector('#valid-cadastro');

const btnValidar = document.getElementById('entrar');
const togglePasswordButton = document.getElementById('togglePassword');
const eyeIcon = togglePasswordButton.querySelector("i");

// expressão regular para validar o e-mail
let emailStandard = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// função para exibir e esconder a senha
togglePasswordButton.addEventListener('click', function () {
    password.type = password.type === 'password' ? 'text' : 'password';

    // remove as classes
    eyeIcon.classList.remove("fas", "fa-eye", "fa-eye-slash");

    if (password.type === 'password') {
        eyeIcon.classList.add("fas", "fa-eye"); // senha oculta
    } else {
        eyeIcon.classList.add("fas", "fa-eye-slash"); // senha visível
    }
});