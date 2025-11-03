document.addEventListener('DOMContentLoaded', function() {
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('#menu-list');
const menuLinks = document.querySelectorAll('#menu-list a');

if (menuToggle && menuList) {
menuToggle.addEventListener('click', function() {
const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
menuToggle.setAttribute('aria-expanded', !isExpanded);
menuList.classList.toggle('show');
});

menuLinks.forEach(link => {
link.addEventListener('click', () => {
if (menuList.classList.contains('show')) {
menuList.classList.remove('show');
menuToggle.setAttribute('aria-expanded', 'false');
}
});
});
}

const modal = document.getElementById('imagemModal');
const modalImg = document.getElementById('imagemAmpliada');
const descricao = document.getElementById('descricaoImagem');
const fechar = document.querySelector('.fechar');
const galleryImgs = document.querySelectorAll('.mini-galeria img');

galleryImgs.forEach(img => {
img.addEventListener('click', function() {
modal.style.display = 'block';
modalImg.src = this.src;
descricao.textContent = this.alt;
});
});

if (fechar) {
fechar.onclick = function() {
modal.style.display = 'none';
};
}

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
let gameOver = true;

const playerBottom = 0;
const jumpHeight = 80;
const obstacleSpeed = 3;
const obstacleGenerationTime = 2100;

function startGame() {
if (!gameOver) return;

gameOver = false;
score = 0;
scoreElement.textContent = `Pontuação: ${score}`;

const oldObstacles = document.querySelectorAll('.obstacle');
oldObstacles.forEach(obs => obs.remove());

player.style.bottom = `${playerBottom}px`;

obstacleInterval = setInterval(generateObstacle, obstacleGenerationTime);

gameInterval = setInterval(gameLoop, 20);

startGameBtn.textContent = "Reiniciar Jogo";
}

function jump() {
if (isJumping || gameOver) return;
    
isJumping = true;
player.classList.add('jump');
player.addEventListener('animationend', () => {
player.classList.remove('jump');
isJumping = false;
}, { once: true });
}

function generateObstacle() {
if (gameOver) return;

const obstacle = document.createElement('div');
obstacle.classList.add('obstacle');
gameArea.appendChild(obstacle);

let obstaclePosition = gameArea.offsetWidth;
    
const verticalTolerance = 15;
const horizontalTolerance = 8;

let moveObstacleInterval = setInterval(() => {
if (gameOver) {
clearInterval(moveObstacleInterval);
obstacle.remove();
return;
}

obstaclePosition -= obstacleSpeed;
obstacle.style.left = `${obstaclePosition}px`;

const playerRect = player.getBoundingClientRect();
const obstacleRect = obstacle.getBoundingClientRect();

const collision =
playerRect.left + horizontalTolerance < obstacleRect.right &&
playerRect.right - horizontalTolerance > obstacleRect.left &&
playerRect.bottom > obstacleRect.top + verticalTolerance;

if (collision) {
endGame();
clearInterval(moveObstacleInterval);
}

if (obstaclePosition > gameArea.offsetWidth + 50) {
clearInterval(moveObstacleInterval);
obstacle.remove();
}

if (obstaclePosition < (gameArea.offsetWidth - playerRect.right) && !obstacle.passedPlayer) {
score++;
scoreElement.textContent = `Pontuação: ${score}`;
obstacle.passedPlayer = true;
}

}, 20);
}

function gameLoop() {
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

document.addEventListener('keydown', (e) => {
if (e.code === 'Space') {
jump();
}
});

gameArea.addEventListener('touchstart', (e) => {
e.preventDefault(); 
jump();
});

startGameBtn.addEventListener('click', startGame);

startGameBtn.textContent = "Começar Jogo";
