document.addEventListener('DOMContentLoaded', function() {
// --- 1. FUNCIONALIDADE DO MENU MOBILE ---
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('#menu-list');
const menuLinks = document.querySelectorAll('#menu-list a');
    
 if (menuToggle && menuList) {
 menuToggle.addEventListener('click', function() {
 // Usa o atributo ARIA para controlar o estado
 const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
 menuToggle.setAttribute('aria-expanded', !isExpanded);
 menuList.classList.toggle('show');
});
    
 // Fechar menu ao clicar em um link (mobile)
 menuLinks.forEach(link => {
 link.addEventListener('click', () => {
if (menuList.classList.contains('show')) {
 menuList.classList.remove('show');
 menuToggle.setAttribute('aria-expanded', 'false');
 }
 });
 });
 }
    
// --- 2. FUNCIONALIDADE DE ZOOM NA GALERIA (MODAL) ---
const modal = document.getElementById('imagemModal');
const modalImg = document.getElementById('imagemAmpliada');
const descricao = document.getElementById('descricaoImagem');
const fechar = document.querySelector('.fechar');
const galleryImgs = document.querySelectorAll('.mini-galeria img');
    
// Ao clicar em qualquer imagem da mini galeria
 galleryImgs.forEach(img => {
 img.addEventListener('click', function() {
 modal.style.display = 'block';
 modalImg.src = this.src;
 // Usa o alt da imagem como descrição
descricao.textContent = this.alt;
});
});
    
 // Fecha o modal ao clicar no X
 if (fechar) {
 fechar.onclick = function() {
 modal.style.display = 'none';
 };
 }
    
// Fecha ao clicar fora da imagem
window.onclick = function(event) {
if (event.target === modal) {
modal.style.display = 'none';
}
 };
    });
    
    
    const gameArea = document.getElementById('gameArea');
    const player = document.getElementById('player');
    const scoreElement = document.getElementById('score');
    const startGameBtn = document.getElementById('startGameBtn');
    
    let isJumping = false;
    let gameInterval;
    let obstacleInterval;
    let score = 0;
    let gameOver = true; // Começa como game over até o botão ser clicado
    
    // Configurações do jogo
    const playerBottom = 0; // Posição inicial do player no chão
    const jumpHeight = 80; // Altura máxima do pulo
    const obstacleSpeed = 3; // Velocidade de movimento dos obstáculos (pixels por frame)
    const obstacleGenerationTime = 2100; // Tempo em ms para gerar um novo obstáculo
    
    function startGame() {
 if (!gameOver) return; // Não iniciar se já estiver jogando
    
 gameOver = false;
 score = 0;
 scoreElement.textContent = `Pontuação: ${score}`;
 
 // Remover obstáculos antigos
 const oldObstacles = document.querySelectorAll('.obstacle');
 oldObstacles.forEach(obs => obs.remove());
    
 player.style.bottom = `${playerBottom}px`; // Reseta a posição do player
    
 // Inicia a geração de obstáculos
 obstacleInterval = setInterval(generateObstacle, obstacleGenerationTime);
    
 // Inicia o loop principal do jogo (colisão e pontuação)
 gameInterval = setInterval(gameLoop, 20); // Verifica a cada 20ms
 
 startGameBtn.textContent = "Reiniciar Jogo";
    }
    
    function jump() {
        if (isJumping || gameOver) return;
        
        isJumping = true;
        player.classList.add('jump'); // Adiciona a classe de animação de pulo
        player.addEventListener('animationend', () => {
            player.classList.remove('jump');
            isJumping = false;
        }, { once: true }); // Garante que o listener seja removido após uma execução
    }
    
    function generateObstacle() {
 if (gameOver) return;
    
 const obstacle = document.createElement('div');
 obstacle.classList.add('obstacle');
 gameArea.appendChild(obstacle);
    
 let obstaclePosition = gameArea.offsetWidth; // Começa na borda direita
        
 // VARIÁVEIS CHAVE DE TOLERÂNCIA
 const verticalTolerance = 15; // Mantém a tolerância vertical para a queda suave
 const horizontalTolerance = 8; // NOVA TOLERÂNCIA: Adiciona 8px de margem nas laterais

// Animação manual para controle de colisão mais fácil
 let moveObstacleInterval = setInterval(() => {
 if (gameOver) {
 clearInterval(moveObstacleInterval);
 obstacle.remove(); // Remove o obstáculo se o jogo acabar
 return;
 }
    
 obstaclePosition -= obstacleSpeed;
 obstacle.style.left = `${obstaclePosition}px`;
    
 // Colisão
 const playerRect = player.getBoundingClientRect();
 const obstacleRect = obstacle.getBoundingClientRect();
    
 // Condições de colisão:
 const collision = 
 // Colisão Horizontal AJUSTADA
 playerRect.left + horizontalTolerance < obstacleRect.right &&
 playerRect.right - horizontalTolerance > obstacleRect.left &&
 // Colisão Vertical AJUSTADA
 playerRect.bottom > obstacleRect.top + verticalTolerance;
    
 if (collision) {
    endGame();
 clearInterval(moveObstacleInterval);
 }
    
 // Obstáculo saiu da tela
 if (obstaclePosition > gameArea.offsetWidth + 50) { // Garante que está fora
clearInterval(moveObstacleInterval);
obstacle.remove();
 }
    
 // Pontuação - quando o obstáculo passa o player
 if (obstaclePosition < (gameArea.offsetWidth - playerRect.right) && !obstacle.passedPlayer) {
 score++;
 scoreElement.textContent = `Pontuação: ${score}`;
 obstacle.passedPlayer = true; // Marca que este obstáculo já pontuou
 }
    
 }, 20); // Atualiza a posição do obstáculo a cada 20ms
    }
    
    function gameLoop() {
 // A principal lógica de colisão e pontuação já está no generateObstacle
 // Este loop pode ser usado para coisas como dificuldade progressiva ou efeitos gerais
 if (gameOver) {
 clearInterval(gameInterval);
 clearInterval(obstacleInterval);
 }
    }
    
    
    function endGame() {
 gameOver = true;
 clearInterval(gameInterval);
 clearInterval(obstacleInterval);
 alert(`Game Over! Sua pontuação: ${score}`);
  startGameBtn.textContent = "Jogar Novamente";
    }
    
    // Evento de pulo (barra de espaço)
    document.addEventListener('keydown', (e) => {
if (e.code === 'Space') { // 'Space' é mais moderno que keyCode 32
  jump();
 }
    });
    
    // Evento de clique no botão "Começar Jogo"
    startGameBtn.addEventListener('click', startGame);
    
    // Garante que o jogo não comece automaticamente
    startGameBtn.textContent = "Começar Jogo";

    // ... [O restante do seu script.js permanece igual]

// Evento de pulo (barra de espaço)
document.addEventListener('keydown', (e) => {
if (e.code === 'Space') { // 'Space' é mais moderno que keyCode 32
jump();
 }
    });
    
    // NOVO: Evento de pulo (toque na tela para mobile)
    gameArea.addEventListener('touchstart', (e) => {
 // Evita o comportamento padrão do touch (como o zoom ou rolagem)
e.preventDefault(); 
 jump();
    });
    
    
    // Evento de clique no botão "Começar Jogo"
    // ... [restante do código]
