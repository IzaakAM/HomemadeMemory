// Game state variables
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let movesCount = 0;
let timerInterval;
let secondsElapsed = 0;
let canFlip = true;
let currentDifficulty = 'easy';

// Food icons
const allIcons = ['🍕', '🍔', '🍟', '🌭', '🍗', '🥩', '🍖', '🌮', '🌯', '🥪', '🍱', '🍛', '🍜', '🍝', '🍣', '🍤', '🥗', '🥘', '🍲', '🥫'];

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', () => {
    setupGame();
    
    // Set up button event listeners
    document.getElementById('resetButton').addEventListener('click', resetGame);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('easyBtn').addEventListener('click', () => setDifficulty('easy'));
    document.getElementById('mediumBtn').addEventListener('click', () => setDifficulty('medium'));
    document.getElementById('hardBtn').addEventListener('click', () => setDifficulty('hard'));
});

function setupGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Set grid size based on difficulty
    let gridSize;
    let numPairs;
    
    switch(currentDifficulty) {
        case 'easy':
            gridSize = 2;
            numPairs = 2; // 2x2 has 4 spaces, so 2 pairs
            break;
        case 'medium':
            gridSize = 4;
            numPairs = 8; // 4x4 has 16 spaces, so 8 pairs
            break;
        case 'hard':
            gridSize = 6;
            numPairs = 18; // 6x6 has 36 spaces, so 18 pairs
            break;
        default:
            gridSize = 4;
            numPairs = 8;
    }
    
    // Set the grid template
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    
    // Get the icons needed for this difficulty
    const icons = allIcons.slice(0, numPairs);
    
    // Create pairs of cards
    cards = [...icons, ...icons];
    
    // Shuffle the cards
    shuffleArray(cards);
    
    // Create the DOM elements for each card
    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.icon = icon;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'icon';
        iconElement.textContent = icon;
        
        card.appendChild(iconElement);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    
    // Start the timer
    startTimer();
}

function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }
    
    // Flip the card
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Check if we have two cards flipped
    if (flippedCards.length === 2) {
        canFlip = false;
        movesCount++;
        document.getElementById('moves').textContent = movesCount;
        
        // Check if the cards match
        if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
            // Match found
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.add('matched');
                });
                flippedCards = [];
                matchedCards += 2;
                
                // Check if game is complete
                if (matchedCards === cards.length) {
                    gameComplete();
                }
                
                canFlip = true;
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                });
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
}

function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    document.getElementById('time').textContent = '0s';
    
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById('time').textContent = `${secondsElapsed}s`;
    }, 1000);
}

function gameComplete() {
    clearInterval(timerInterval);
    document.getElementById('completeMessage').style.display = 'block';
}

function resetGame() {
    // Reset game state
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    movesCount = 0;
    secondsElapsed = 0;
    canFlip = true;
    
    // Reset UI
    document.getElementById('moves').textContent = '0';
    document.getElementById('completeMessage').style.display = 'none';
    
    // Setup new game
    setupGame();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const button = document.getElementById('themeToggle');
    button.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    
    // Update active button
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${difficulty}Btn`).classList.add('active');
    
    // Reset game with new difficulty
    resetGame();
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}