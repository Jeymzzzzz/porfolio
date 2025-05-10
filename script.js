
// Dark mode functionality with animations
function toggleDarkMode() {
  document.body.style.transition = 'all 0.5s ease-in-out';
  document.body.classList.toggle('dark-mode');

  const darkModeIcon = document.querySelector('.dark-mode-btn i');
  darkModeIcon.style.transform = 'rotate(180deg)';

  setTimeout(() => {
    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
      darkModeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    darkModeIcon.style.transform = 'rotate(0deg)';
  }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdownContent = document.querySelector('.dropdown-content');
  const menuBtn = document.querySelector('.menu-btn');

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  dropdownContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    dropdownContent.style.display = 'none';
  });
});

// Save dark mode preference
document.addEventListener('DOMContentLoaded', () => {
  // Background animation is now handled by CSS

  // Add typing effect when image is clicked
  const textBubbles = document.querySelectorAll('.text-bubble');
  textBubbles.forEach(bubble => {
    const originalText = bubble.textContent;
    bubble.dataset.originalText = originalText;
    bubble.textContent = '';
  });
});

function typeText(element, text) {
  let index = 0;
  element.innerHTML = '';
  const interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

function handleProfileClick() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  const textBubble = document.createElement('div');
  textBubble.className = 'text-bubble profile-bubble';
  textBubble.dataset.originalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo vel metus consectetur efficitur. Nullam eget lectus in nunc commodo tincidunt.";
  document.body.appendChild(textBubble);

  overlay.onclick = () => {
    overlay.remove();
    textBubble.remove();
  };

  typeText(textBubble, textBubble.dataset.originalText);
}

// Dinosaur Game
let isJumping = false;
let gameOver = false;
let score = 0;
let highScores = [
  { name: "Krishe", score: 42 },
  { name: "Sarah", score: 38 },
  { name: "Mike", score: 35 },
  { name: "Emma", score: 31 },
  { name: "John", score: 28 }
];

function updateLeaderboard() {
  const leaderboardEl = document.querySelector('.leaderboard');
  leaderboardEl.innerHTML = '<h3>Leaderboard</h3>' +
    highScores.map(player => `<div>${player.name}: ${player.score}</div>`).join('');
}

function jump(dino) {
  if (!isJumping && !gameOver) {
    isJumping = true;
    let velocity = 10;
    let gravity = 1; // Reduced gravity for the basic jump
    let position = 0;
    const jumpInterval = setInterval(() => {
      velocity -= gravity;
      position += velocity;
      if (position <= 0) {
        clearInterval(jumpInterval);
        position = 0;
        isJumping = false;
      }
      dino.style.bottom = position + 'px';
    }, 20);
  }
}

function createCactus() {
  if (gameOver) return;

  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  const gameContainer = document.querySelector('.game-container');
  gameContainer.appendChild(cactus);

  let position = 580;
  let speed = 5 + Math.floor(score / 5); // Speed increases every 5 points

  const moveInterval = setInterval(() => {
    if (position <= -20) {
      clearInterval(moveInterval);
      gameContainer.removeChild(cactus);
      score++;
      document.querySelector('.score').textContent = `Score: ${score}`;
    } else {
      position -= speed;
      cactus.style.left = position + 'px';

      const dino = document.querySelector('.dino');
      const dinoBottom = parseInt(getComputedStyle(dino).bottom);

      if (position > 0 && position < 50 && dinoBottom < 50) {
        clearInterval(moveInterval);
        handleGameOver();
      }
    }
  }, 40);

  const spawnDelay = Math.max(3000 - (score * 100), 1000); // Spawn delay decreases with score
  setTimeout(createCactus, Math.random() * spawnDelay + 1000);
}

function startGame() {
  gameOver = false;
  score = 0;
  document.querySelector('.score').textContent = 'Score: 0';
  document.querySelector('.game-over').style.display = 'none';
  const gameContainer = document.querySelector('.game-container');
  const ground = document.createElement('div');
  ground.className = 'ground';
  gameContainer.appendChild(ground);
  const dino = document.querySelector('.dino');

  const jumpHandler = (e) => {
    if ((e.code === 'Space' || e.type === 'touchstart') && !gameOver) {
      e.preventDefault();
      jump(dino);
    }
  };

  document.addEventListener('keydown', jumpHandler);
  document.querySelector('.game-container').addEventListener('touchstart', jumpHandler);

  createCactus();
  updateLeaderboard();

  // Clean up previous event listener
  return () => document.removeEventListener('keydown', jumpHandler);
}

function handleGameOver() {
  gameOver = true;
  const gameOverEl = document.querySelector('.game-over');
  gameOverEl.textContent = `Game Over! Score: ${score}`;
  gameOverEl.style.display = 'block';

  // Update leaderboard
  const playerName = "You";
  highScores.push({ name: playerName, score: score });
  highScores.sort((a, b) => b.score - a.score);
  highScores = highScores.slice(0, 5);
  updateLeaderboard();
}

function expandImage(img) {
  if (!document.querySelector('.overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
  }

  if (!document.querySelector('.close-btn')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '×';
    document.body.appendChild(closeBtn);
  }

  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-btn');
  const textBubble = img.nextElementSibling;

  function closeExpandedImage() {
    img.classList.remove('expanded');
    overlay.style.display = 'none';
    closeBtn.style.display = 'none';
    textBubble.style.display = 'none';
  }

  if (img.classList.contains('expanded')) {
    closeExpandedImage();
  } else {
    img.classList.add('expanded');
    overlay.style.display = 'block';
    closeBtn.style.display = 'block';
    textBubble.style.display = 'block';
    typeText(textBubble, textBubble.dataset.originalText);
  }

  closeBtn.onclick = (e) => {
    e.stopPropagation();
    closeExpandedImage();
  };

  overlay.onclick = closeExpandedImage;
}
