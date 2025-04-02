const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

// Função responsável por fazer o personagem Mario pular
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// Define um intervalo de tempo de 10 milissegundos para atualizar a posição do Mario e do cano continuamente
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    console.log(pipePosition);
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom);
    console.log(marioPosition);
    // Verifica se o Mario colidiu com o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Remove a animação do cano e define sua posição atual
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        // Remove a animação do Mario e define sua posição atual
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        // Define a imagem do Mario como "game-over"
        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        // Para o loop de atualização das posições
        clearInterval(loop);
    }
}, 10);

// Adiciona um evento de tecla pressionada para o documento HTML
document.addEventListener('keydown', jump);
