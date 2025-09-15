// Game State Management
class EcoKidsApp {
    constructor() {
        this.gameState = {
            ecoPoints: 0,
            level: 1,
            challengesCompleted: 0,
            treesPlanted: 0,
            wasteReduced: 0,
            achievements: new Set(),
            challengeProgress: {
                recycling: 0,
                energy: 0,
                water: 0,
                wildlife: 0
            }
        };
        
        this.ecoTips = [
            "Did you know? Turning off the lights when you leave a room can save enough energy to power a TV for 3 hours!",
            "Recycling one aluminum can saves enough energy to run a computer for 3 hours!",
            "Taking shorter showers can save up to 25 gallons of water per shower!",
            "Planting trees helps clean the air and provides homes for wildlife!",
            "Using both sides of paper can reduce paper waste by 50%!",
            "Walking or biking instead of driving helps reduce air pollution!"
        ];
        
        this.init();
    }
    
    init() {
        this.loadGameState();
        this.setupEventListeners();
        this.updateUI();
        this.showRandomTip();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });
        
        // Challenge buttons
        document.querySelectorAll('.challenge-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const challengeType = e.target.closest('.challenge-card').dataset.challenge;
                this.startChallenge(challengeType);
            });
        });
        
        // Topic buttons
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const topic = e.target.closest('.topic-card').dataset.topic;
                this.showLearningContent(topic);
            });
        });
        
        // Game buttons
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.target.closest('.game-card').dataset.game;
                this.startGame(game);
            });
        });
        
        // Modal close buttons
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    
    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Show section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');
    }
    
    startChallenge(challengeType) {
        const modal = document.getElementById('challengeModal');
        const content = document.getElementById('challengeContent');
        
        switch(challengeType) {
            case 'recycling':
                content.innerHTML = this.createRecyclingChallenge();
                break;
            case 'energy':
                content.innerHTML = this.createEnergyChallenge();
                break;
            case 'water':
                content.innerHTML = this.createWaterChallenge();
                break;
            case 'wildlife':
                content.innerHTML = this.createWildlifeChallenge();
                break;
        }
        
        modal.style.display = 'block';
        this.setupChallengeInteractions(challengeType);
    }
    
    createRecyclingChallenge() {
        return `
            <h2>🗂️ Recycling Master Challenge</h2>
            <p>Drag each item to the correct recycling bin!</p>
            <div class="game-area">
                <div class="drag-drop-area">
                    <div class="drop-zone" data-type="paper">
                        <div>📄<br>Paper</div>
                    </div>
                    <div class="drop-zone" data-type="plastic">
                        <div>🥤<br>Plastic</div>
                    </div>
                    <div class="drop-zone" data-type="glass">
                        <div>🍶<br>Glass</div>
                    </div>
                    <div class="drop-zone" data-type="metal">
                        <div>🥫<br>Metal</div>
                    </div>
                </div>
                <div class="draggable-items">
                    <div class="draggable-item" data-type="paper" draggable="true">📰</div>
                    <div class="draggable-item" data-type="plastic" draggable="true">🍼</div>
                    <div class="draggable-item" data-type="glass" draggable="true">🍷</div>
                    <div class="draggable-item" data-type="metal" draggable="true">🥤</div>
                    <div class="draggable-item" data-type="paper" draggable="true">📦</div>
                    <div class="draggable-item" data-type="plastic" draggable="true">🧴</div>
                </div>
                <div class="score-display">Items sorted: <span id="recyclingScore">0</span>/6</div>
            </div>
        `;
    }
    
    createEnergyChallenge() {
        return `
            <h2>⚡ Energy Saver Challenge</h2>
            <p>Click on items that waste energy to turn them off!</p>
            <div class="game-area">
                <div class="energy-house">
                    <div class="energy-item active" data-item="light">💡</div>
                    <div class="energy-item active" data-item="tv">📺</div>
                    <div class="energy-item active" data-item="computer">💻</div>
                    <div class="energy-item active" data-item="fan">🌀</div>
                    <div class="energy-item active" data-item="heater">🔥</div>
                    <div class="energy-item active" data-item="charger">🔌</div>
                </div>
                <div class="score-display">Energy wasters found: <span id="energyScore">0</span>/6</div>
            </div>
            <style>
                .energy-house { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
                .energy-item { font-size: 4rem; text-align: center; cursor: pointer; padding: 20px; border-radius: 15px; transition: all 0.3s ease; }
                .energy-item.active { background: #ffeb3b; box-shadow: 0 0 20px rgba(255, 235, 59, 0.5); }
                .energy-item.inactive { background: #e0e0e0; opacity: 0.5; }
            </style>
        `;
    }
    
    createWaterChallenge() {
        return `
            <h2>💧 Water Guardian Challenge</h2>
            <p>Find and fix the water leaks by clicking on them!</p>
            <div class="game-area">
                <div class="water-scene">
                    <div class="water-leak" data-leak="1">🚿💧</div>
                    <div class="water-leak" data-leak="2">🚰💧</div>
                    <div class="water-leak" data-leak="3">🚽💧</div>
                    <div class="water-leak" data-leak="4">🏠💧</div>
                    <div class="water-leak" data-leak="5">🌊💧</div>
                </div>
                <div class="score-display">Leaks fixed: <span id="waterScore">0</span>/5</div>
            </div>
            <style>
                .water-scene { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin: 20px 0; }
                .water-leak { font-size: 3rem; cursor: pointer; padding: 15px; border-radius: 15px; background: #e3f2fd; transition: all 0.3s ease; animation: drip 1s infinite; }
                .water-leak:hover { background: #bbdefb; transform: scale(1.1); }
                .water-leak.fixed { background: #c8e6c9; animation: none; }
                @keyframes drip { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            </style>
        `;
    }
    
    createWildlifeChallenge() {
        return `
            <h2>🐾 Wildlife Protector Challenge</h2>
            <p>Create safe habitats by matching animals with their homes!</p>
            <div class="game-area">
                <div class="wildlife-matching">
                    <div class="animals">
                        <div class="animal-item" data-animal="bird" draggable="true">🐦</div>
                        <div class="animal-item" data-animal="fish" draggable="true">🐟</div>
                        <div class="animal-item" data-animal="bear" draggable="true">🐻</div>
                        <div class="animal-item" data-animal="bee" draggable="true">🐝</div>
                        <div class="animal-item" data-animal="frog" draggable="true">🐸</div>
                    </div>
                    <div class="habitats">
                        <div class="habitat-zone" data-habitat="bird">🌳 Tree</div>
                        <div class="habitat-zone" data-habitat="fish">🌊 Water</div>
                        <div class="habitat-zone" data-habitat="bear">🏔️ Forest</div>
                        <div class="habitat-zone" data-habitat="bee">🌸 Flowers</div>
                        <div class="habitat-zone" data-habitat="frog">🏞️ Pond</div>
                    </div>
                </div>
                <div class="score-display">Habitats created: <span id="wildlifeScore">0</span>/5</div>
            </div>
            <style>
                .wildlife-matching { display: flex; justify-content: space-between; gap: 30px; margin: 20px 0; }
                .animals, .habitats { display: flex; flex-direction: column; gap: 15px; }
                .animal-item { font-size: 2.5rem; cursor: grab; padding: 10px; background: white; border-radius: 10px; text-align: center; }
                .habitat-zone { padding: 15px; background: #f0f0f0; border-radius: 10px; border: 2px dashed #ccc; text-align: center; min-height: 60px; display: flex; align-items: center; justify-content: center; }
                .habitat-zone.drag-over { background: #e8f5e8; border-color: #4CAF50; }
            </style>
        `;
    }
    
    setupChallengeInteractions(challengeType) {
        switch(challengeType) {
            case 'recycling':
                this.setupRecyclingDragDrop();
                break;
            case 'energy':
                this.setupEnergyClicks();
                break;
            case 'water':
                this.setupWaterClicks();
                break;
            case 'wildlife':
                this.setupWildlifeDragDrop();
                break;
        }
    }
    
    setupRecyclingDragDrop() {
        let score = 0;
        const items = document.querySelectorAll('.draggable-item');
        const zones = document.querySelectorAll('.drop-zone');
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.type);
                e.target.classList.add('dragging');
            });
            
            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                const itemType = e.dataTransfer.getData('text/plain');
                const zoneType = zone.dataset.type;
                
                zone.classList.remove('drag-over');
                
                if (itemType === zoneType) {
                    score++;
                    document.getElementById('recyclingScore').textContent = score;
                    
                    // Remove the dragged item
                    const draggedItem = document.querySelector('.dragging') || 
                                       document.querySelector(`[data-type="${itemType}"]`);
                    if (draggedItem) draggedItem.remove();
                    
                    if (score === 6) {
                        this.completeChallenge('recycling', 50);
                    }
                } else {
                    this.showFeedback('Try again! That item belongs in a different bin.', 'error');
                }
            });
        });
    }
    
    setupEnergyClicks() {
        let score = 0;
        const items = document.querySelectorAll('.energy-item');
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.classList.add('inactive');
                    score++;
                    document.getElementById('energyScore').textContent = score;
                    
                    if (score === 6) {
                        this.completeChallenge('energy', 40);
                    }
                }
            });
        });
    }
    
    setupWaterClicks() {
        let score = 0;
        const leaks = document.querySelectorAll('.water-leak');
        
        leaks.forEach(leak => {
            leak.addEventListener('click', () => {
                if (!leak.classList.contains('fixed')) {
                    leak.classList.add('fixed');
                    leak.innerHTML = leak.innerHTML.replace('💧', '✅');
                    score++;
                    document.getElementById('waterScore').textContent = score;
                    
                    if (score === 5) {
                        this.completeChallenge('water', 35);
                    }
                }
            });
        });
    }
    
    setupWildlifeDragDrop() {
        let score = 0;
        const animals = document.querySelectorAll('.animal-item');
        const habitats = document.querySelectorAll('.habitat-zone');
        
        animals.forEach(animal => {
            animal.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.animal);
            });
        });
        
        habitats.forEach(habitat => {
            habitat.addEventListener('dragover', (e) => {
                e.preventDefault();
                habitat.classList.add('drag-over');
            });
            
            habitat.addEventListener('dragleave', () => {
                habitat.classList.remove('drag-over');
            });
            
            habitat.addEventListener('drop', (e) => {
                e.preventDefault();
                const animalType = e.dataTransfer.getData('text/plain');
                const habitatType = habitat.dataset.habitat;
                
                habitat.classList.remove('drag-over');
                
                if (animalType === habitatType) {
                    score++;
                    document.getElementById('wildlifeScore').textContent = score;
                    
                    const animal = document.querySelector(`[data-animal="${animalType}"]`);
                    if (animal) animal.remove();
                    
                    habitat.style.background = '#c8e6c9';
                    
                    if (score === 5) {
                        this.completeChallenge('wildlife', 45);
                    }
                } else {
                    this.showFeedback('That animal needs a different habitat!', 'error');
                }
            });
        });
    }
    
    startGame(gameType) {
        const modal = document.getElementById('gameModal');
        const content = document.getElementById('gameContent');
        
        switch(gameType) {
            case 'quiz':
                content.innerHTML = this.createQuizGame();
                break;
            case 'memory':
                content.innerHTML = this.createMemoryGame();
                break;
            case 'puzzle':
                content.innerHTML = this.createPuzzleGame();
                break;
        }
        
        modal.style.display = 'block';
        this.setupGameInteractions(gameType);
    }
    
    createQuizGame() {
        const questions = [
            {
                question: "What are the 3 R's of environmental protection?",
                options: ["Read, Write, Repeat", "Reduce, Reuse, Recycle", "Run, Rest, Relax", "Red, Green, Blue"],
                correct: 1
            },
            {
                question: "Which energy source is renewable?",
                options: ["Coal", "Oil", "Solar", "Gas"],
                correct: 2
            },
            {
                question: "How long does it take for a plastic bottle to decompose?",
                options: ["1 year", "10 years", "100 years", "450+ years"],
                correct: 3
            }
        ];
        
        return `
            <h2>🧠 Eco Quiz Challenge</h2>
            <div id="quizContainer">
                <div class="quiz-question">
                    <h3 id="questionText">${questions[0].question}</h3>
                    <div class="quiz-options" id="quizOptions">
                        ${questions[0].options.map((option, index) => 
                            `<div class="quiz-option" data-answer="${index}">${option}</div>`
                        ).join('')}
                    </div>
                </div>
                <div class="score-display">Score: <span id="quizScore">0</span>/3</div>
                <button id="nextQuestion" style="display: none;">Next Question</button>
            </div>
        `;
    }
    
    setupGameInteractions(gameType) {
        if (gameType === 'quiz') {
            this.setupQuizGame();
        }
    }
    
    setupQuizGame() {
        let currentQuestion = 0;
        let score = 0;
        const questions = [
            {
                question: "What are the 3 R's of environmental protection?",
                options: ["Read, Write, Repeat", "Reduce, Reuse, Recycle", "Run, Rest, Relax", "Red, Green, Blue"],
                correct: 1
            },
            {
                question: "Which energy source is renewable?",
                options: ["Coal", "Oil", "Solar", "Gas"],
                correct: 2
            },
            {
                question: "How long does it take for a plastic bottle to decompose?",
                options: ["1 year", "10 years", "100 years", "450+ years"],
                correct: 3
            }
        ];
        
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedAnswer = parseInt(e.target.dataset.answer);
                const correctAnswer = questions[currentQuestion].correct;
                
                options.forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
                
                setTimeout(() => {
                    if (selectedAnswer === correctAnswer) {
                        e.target.classList.add('correct');
                        score++;
                    } else {
                        e.target.classList.add('incorrect');
                        options[correctAnswer].classList.add('correct');
                    }
                    
                    document.getElementById('quizScore').textContent = score;
                    
                    if (currentQuestion < questions.length - 1) {
                        document.getElementById('nextQuestion').style.display = 'block';
                    } else {
                        setTimeout(() => {
                            this.completeGame('quiz', score * 20);
                        }, 2000);
                    }
                }, 1000);
            });
        });
    }
    
    completeChallenge(challengeType, points) {
        this.gameState.ecoPoints += points;
        this.gameState.challengesCompleted++;
        this.gameState.challengeProgress[challengeType]++;
        
        if (challengeType === 'recycling') this.gameState.wasteReduced += 6;
        if (challengeType === 'wildlife') this.gameState.treesPlanted += 2;
        
        this.checkLevelUp();
        this.checkAchievements();
        this.updateUI();
        this.saveGameState();
        
        this.showFeedback(`🎉 Challenge completed! You earned ${points} Eco Points!`, 'success');
        
        setTimeout(() => {
            document.getElementById('challengeModal').style.display = 'none';
        }, 2000);
    }
    
    completeGame(gameType, points) {
        this.gameState.ecoPoints += points;
        this.updateUI();
        this.saveGameState();
        
        this.showFeedback(`🎮 Great job! You earned ${points} Eco Points!`, 'success');
        
        setTimeout(() => {
            document.getElementById('gameModal').style.display = 'none';
        }, 2000);
    }
    
    checkLevelUp() {
        const newLevel = Math.floor(this.gameState.ecoPoints / 100) + 1;
        if (newLevel > this.gameState.level) {
            this.gameState.level = newLevel;
            this.showFeedback(`🎊 Level Up! You're now level ${newLevel}!`, 'success');
        }
    }
    
    checkAchievements() {
        const achievements = [
            { id: 'first-challenge', condition: () => this.gameState.challengesCompleted >= 1 },
            { id: 'recycling-pro', condition: () => this.gameState.wasteReduced >= 50 },
            { id: 'energy-saver', condition: () => this.gameState.challengeProgress.energy >= 5 },
            { id: 'planet-protector', condition: () => this.gameState.ecoPoints >= 1000 }
        ];
        
        achievements.forEach(achievement => {
            if (!this.gameState.achievements.has(achievement.id) && achievement.condition()) {
                this.gameState.achievements.add(achievement.id);
                this.unlockAchievement(achievement.id);
            }
        });
    }
    
    unlockAchievement(achievementId) {
        const achievementCard = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (achievementCard) {
            achievementCard.classList.remove('locked');
            achievementCard.classList.add('unlocked');
            achievementCard.querySelector('.achievement-status').textContent = 'Unlocked!';
        }
        
        this.showFeedback(`🏅 Achievement Unlocked: ${achievementId.replace('-', ' ')}!`, 'success');
    }
    
    showLearningContent(topic) {
        const modal = document.getElementById('learningModal');
        const content = document.getElementById('learningContent');
        
        const learningData = {
            climate: {
                title: "🌡️ Climate Change",
                content: `
                    <h3>What is Climate Change?</h3>
                    <p>Climate change refers to long-term changes in Earth's weather patterns and temperatures.</p>
                    
                    <h3>Why is it happening?</h3>
                    <ul>
                        <li>Burning fossil fuels releases greenhouse gases</li>
                        <li>Deforestation reduces CO2 absorption</li>
                        <li>Industrial activities increase emissions</li>
                    </ul>
                    
                    <h3>What can you do?</h3>
                    <ul>
                        <li>Use less energy at home</li>
                        <li>Walk, bike, or use public transport</li>
                        <li>Plant trees and support reforestation</li>
                        <li>Reduce, reuse, and recycle</li>
                    </ul>
                `
            },
            recycling: {
                title: "♻️ Recycling & Waste",
                content: `
                    <h3>The 3 R's</h3>
                    <p><strong>Reduce:</strong> Use less stuff<br>
                    <strong>Reuse:</strong> Find new uses for old things<br>
                    <strong>Recycle:</strong> Turn waste into new products</p>
                    
                    <h3>Fun Recycling Facts</h3>
                    <ul>
                        <li>Recycling one aluminum can saves enough energy to run a TV for 3 hours!</li>
                        <li>It takes 2,000 years for a glass bottle to decompose</li>
                        <li>Recycling paper saves trees and water</li>
                    </ul>
                `
            }
        };
        
        const data = learningData[topic] || { title: "Learning Content", content: "Content coming soon!" };
        content.innerHTML = `<h2>${data.title}</h2>${data.content}`;
        modal.style.display = 'block';
    }
    
    showFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
    
    showRandomTip() {
        const randomTip = this.ecoTips[Math.floor(Math.random() * this.ecoTips.length)];
        document.getElementById('dailyTip').querySelector('p').textContent = randomTip;
    }
    
    updateUI() {
        document.getElementById('ecoPoints').textContent = this.gameState.ecoPoints;
        document.getElementById('currentLevel').textContent = this.gameState.level;
        document.getElementById('challengesCompleted').textContent = this.gameState.challengesCompleted;
        document.getElementById('treesPlanted').textContent = this.gameState.treesPlanted;
        document.getElementById('wasteReduced').textContent = this.gameState.wasteReduced;
        
        // Update progress bars
        Object.keys(this.gameState.challengeProgress).forEach(challenge => {
            const card = document.querySelector(`[data-challenge="${challenge}"]`);
            if (card) {
                const progress = this.gameState.challengeProgress[challenge];
                const maxProgress = { recycling: 10, energy: 8, water: 6, wildlife: 5 }[challenge];
                const percentage = (progress / maxProgress) * 100;
                
                card.querySelector('.progress-fill').style.width = `${Math.min(percentage, 100)}%`;
                card.querySelector('.progress-text').textContent = `${progress}/${maxProgress} completed`;
            }
        });
    }
    
    saveGameState() {
        localStorage.setItem('ecoKidsGameState', JSON.stringify({
            ...this.gameState,
            achievements: Array.from(this.gameState.achievements)
        }));
    }
    
    loadGameState() {
        const saved = localStorage.getItem('ecoKidsGameState');
        if (saved) {
            const parsedState = JSON.parse(saved);
            this.gameState = {
                ...parsedState,
                achievements: new Set(parsedState.achievements || [])
            };
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.ecoKidsApp = new EcoKidsApp();
});

// Global function for navigation (used by HTML onclick)
function showSection(sectionName) {
    if (window.ecoKidsApp) {
        window.ecoKidsApp.showSection(sectionName);
    }
}

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
