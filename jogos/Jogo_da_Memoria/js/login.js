const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

// função para validar o input do usuário
const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

// função para lidar com o envio do formulário
const handleSubmit = (event) => {
  event.preventDefault();

  // armazenar o nome do usuário no localStorage
  localStorage.setItem('player', input.value);
  
  // redirecionar para a página do jogo
  window.location = 'pages/game.html';
}

// adicionando um ouvinte de eventos para validar o input do usuário
input.addEventListener('input', validateInput);

// adicionando um ouvinte de eventos para lidar com o envio do formulário
form.addEventListener('submit', handleSubmit);
