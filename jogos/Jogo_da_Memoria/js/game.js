// Seleciona o elemento HTML com a classe "grid"
const grid = document.querySelector('.grid');
// Seleciona o elemento HTML com a classe "player"
const spanPlayer = document.querySelector('.player');
// Seleciona o elemento HTML com a classe "timer"
const timer = document.querySelector('.timer');

// Array de personagens
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
];

// Função para criar um novo elemento HTML com a classe especificada
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Variáveis para armazenar as duas cartas que foram viradas
let firstCard = '';
let secondCard = '';

// Função para verificar se todas as cartas foram desabilitadas
const checkEndGame = () => {
  // Seleciona todas as cartas que foram desabilitadas
  const disabledCards = document.querySelectorAll('.disabled-card');

  // Se todas as cartas foram desabilitadas, encerra o jogo
  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

// Função para verificar se as duas cartas viradas são iguais ou diferentes
const checkCards = () => {
  // Obtém o nome do personagem da primeira e segunda carta virada
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  // Se os personagens das duas cartas são iguais, desabilita as cartas
  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Reseta as variáveis das cartas viradas
    firstCard = '';
    secondCard = '';

    // Verifica se todas as cartas foram desabilitadas
    checkEndGame();

  } else {
    // Se os personagens das duas cartas são diferentes, aguarda 500ms e vira as cartas novamente
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      // Reseta as variáveis das cartas viradas
      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

// Função para virar uma carta
const revealCard = ({ target }) => {
  // Se a carta já estiver virada, não faz nada
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  // Se é a primeira carta virada, armazena a carta na variável firstCard
  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  // Se é a segunda carta virada, armazena a carta na variável secondCard e verifica se as cartas são iguais
  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

// Função para criar uma nova carta com o personagem especificado
const createCard = (character) => {
  // Cria um elemento div com a classe 'card'
  const card = createElement('div', 'card');
  // Cria um elemento div com a classe 'face front'
  const front = createElement('div', 'face front');
  // Cria um elemento div com a classe 'face back'
  const back = createElement('div', 'face back');

  // Define a imagem de fundo da face da frente da carta
  front.style.backgroundImage = `url('../images/${character}.png')`;

  // Adiciona as faces à carta
  card.appendChild(front);
  card.appendChild(back);

  // Adiciona um event listener para a carta, que chama a função revealCard
  card.addEventListener('click', revealCard);
  // Adiciona um atributo de data à carta com o nome do personagem
  card.setAttribute('data-character', character)

  // Retorna a carta
  return card;
}

// Função para carregar o jogo
const loadGame = () => {
  // Cria um novo array com os personagens duplicados
  const duplicateCharacters = [...characters, ...characters];

  // Embaralha os personagens do array
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  // Para cada personagem do array, cria uma nova carta e adiciona à grade
  shuffledArray.forEach((character) => {  
    const card = createCard(character);
    grid.appendChild(card);
  });
}

// Função para iniciar o temporizador
const startTimer = () => {
  // Define um intervalo de 1 segundo para atualizar o tempo na página
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

// Quando a janela é carregada, define o nome do jogador e inicia o jogo
window.onload = () => {
  // Define o nome do jogador na página com base no armazenamento local
  spanPlayer.innerHTML = localStorage.getItem('player');
  // Inicia o temporizador
  startTimer();
  // Carrega o jogo
  loadGame();
}
