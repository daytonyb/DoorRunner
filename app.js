// ---------------------- MENU ELEMENTS ----------------------
const mainMenu = document.getElementById('main-menu');
const startBtn = document.getElementById('startBtn');
const controlBtn = document.getElementById('controlBtn');
const controlPanel = document.getElementById('controlPanel');
const difficultyRange = document.getElementById('difficultyRange');
const difficultyPanel = document.getElementById('difficultyPanel');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const livesPanel = document.getElementById('livesPanel');
const livesBtns = document.querySelectorAll('.lives-btn');
const speedPanel = document.getElementById('speedPanel');
const speedBtns = document.querySelectorAll('.speed-btn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');

// --- MAIN CATEGORY BUTTONS ---
const difficultyToggleBtn = document.getElementById('difficultyToggleBtn');
const livesToggleBtn = document.getElementById('livesToggleBtn');
const speedToggleBtn = document.getElementById('speedToggleBtn');
const cooldownToggleBtn = document.getElementById('cooldownToggleBtn'); 
const skinsToggleBtn = document.getElementById('skinsToggleBtn'); 
const togglesToggleBtn = document.getElementById('togglesToggleBtn'); 

// --- TOGGLE PANEL ELEMENTS ---
const togglesPanel = document.getElementById('togglesPanel');
const btnMenuPlatforms = document.getElementById('btnMenuPlatforms');
const btnMenuAbilities = document.getElementById('btnMenuAbilities');
const btnToggleWalls = document.getElementById('btnToggleWalls');
const btnToggleTunnels = document.getElementById('btnToggleTunnels');
const btnToggleParticles = document.getElementById('btnToggleParticles'); 
const btnToggleBg = document.getElementById('btnToggleBg'); 
const btnToggleCoins = document.getElementById('btnToggleCoins'); 

// --- COOLDOWN ELEMENTS ---
const cooldownPanel = document.getElementById('cooldownPanel');
const cooldownBtns = document.querySelectorAll('.cooldown-btn');

// --- SKINS ELEMENTS ---
const skinsPanel = document.getElementById('skinsPanel');
const skinBtns = document.querySelectorAll('.skin-btn');

// --- SUB-PANEL ELEMENTS ---
const abilitiesPanel = document.getElementById('abilitiesPanel');
const platformsPanel = document.getElementById('platformsPanel');

const btnToggleHDash = document.getElementById('btnToggleHDash');
const btnToggleVDash = document.getElementById('btnToggleVDash');

const btnToggleBoost = document.getElementById('btnToggleBoost');
const btnToggleBouncy = document.getElementById('btnToggleBouncy');
const btnToggleCrumbling = document.getElementById('btnToggleCrumbling');


// ---------------------- GAME VARIABLES ----------------------
const canvas = document.getElementById('platformer-canvas');
const ctx = canvas.getContext('2d');
const worldWidth = 4000;
let cameraX = 0;

const spikes = [];
const spikeWidth = 20;
const spikeHeight = 20;

const walls = [];
const coins = []; 
const particles = [];
const bgObjects = [];

// Toggle States
let enableWalls = true;
let enableTunnels = true;
let enableParticles = true; 
let enableBg = true;
let enableCoins = true; 

let enableHDash = true;
let enableVDash = true;

let enableBoost = true;
let enableBouncy = true;
let enableCrumbling = true;

// Dash variables
const dashSpeed = 8;
const dashDuration = 12; 
let dashCooldownTime = 120; 

// Vertical Dash variables
const vDashPower = -12; 
const vDashDuration = 12;
let vDashCooldownTime = 120; 

// Player Skin Color
let playerSkin = '#3498db'; 

// Scoring Variables
let score = 0;
let bobOffset = 0; 

// MODIFIED: Add dash properties to player
const player = { 
    x: 30, y: 334, w: 35, h: 35, 
    vx: 0, vy: 0, onGround: false,
    dashTimer: 0, 
    dashCooldown: 0,
    vDashTimer: 0,     
    vDashCooldown: 0   
};
let levelNumber = 1;
let lives = 3;              
let startingLives = 3;    
let maxLevels = 5;
let baseMoveSpeed = 4.5;    
let moveSpeed = 4.5;        
const gravity = 0.7;
const jumpPower = -15;
const platforms = [];
let door = { x: 760, y: 46, w: 18, h: 30 };

// Boost variables
let boostTimer = 0;
const boostDuration = 90; 
const boostAmount = 2.5;

const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

let gameStarted = false;
let paused = false;
let gameWon = false;
let gameLost = false;

// ---------------------- PARTICLE SYSTEM ----------------------
class Particle {
    constructor(x, y, w, h, color, vx, vy, life, type) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
        this.type = type; 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.type === 'dust' || this.type === 'explosion' || this.type === 'crumble' || this.type === 'bounce' || this.type === 'coin') {
             this.vy += 0.2;
        }
    }

    draw(ctx, cameraX) {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - cameraX, this.y, this.w, this.h);
        ctx.globalAlpha = 1.0;
    }
}

function createDust(x, y) {
    if (!enableParticles) return;
    const count = 4;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 4 + 2;
        let vx = (Math.random() - 0.5) * 2;
        let vy = -Math.random() * 2 - 1;
        particles.push(new Particle(x, y, size, size, '#ffffff', vx, vy, 20, 'dust'));
    }
}

function createTrail(x, y, w, h, color) {
    if (!enableParticles) return;
    particles.push(new Particle(x, y, w, h, color, 0, 0, 10, 'trail'));
}

function createExplosion(x, y, color) {
    if (!enableParticles) return;
    const count = 20;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 6 + 4;
        let vx = (Math.random() - 0.5) * 10;
        let vy = (Math.random() - 0.5) * 10;
        particles.push(new Particle(x, y, size, size, color, vx, vy, 40, 'explosion'));
    }
}

function createCrumbleDebris(x, y, w, h) {
    if (!enableParticles) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 6 + 3;
        let px = x + Math.random() * w;
        let py = y + Math.random() * h;
        let vx = (Math.random() - 0.5) * 2;
        let vy = Math.random() * 2; 
        particles.push(new Particle(px, py, size, size, '#f39c12', vx, vy, 30, 'crumble'));
    }
}

function createDoorGlow() {
    if (!enableParticles) return;
    if (Math.random() > 0.3) return; 
    let size = Math.random() * 3 + 2;
    let px = door.x + Math.random() * door.w;
    let py = door.y + door.h - Math.random() * 5; 
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = -Math.random() * 1.5 - 0.5; 
    particles.push(new Particle(px, py, size, size, '#ffeb3b', vx, vy, 45, 'glow'));
}

function createBoostSparks(x, y, w, h) {
    if (!enableParticles) return;
    const count = 8;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 4 + 2;
        let px = x + Math.random() * w;
        let py = y + Math.random() * h;
        let vx = (Math.random() - 0.5) * 6; 
        let vy = (Math.random() - 0.5) * 2;
        particles.push(new Particle(px, py, size, size, '#2ecc71', vx, vy, 20, 'boost'));
    }
}

function createBouncyRipple(x, y, w) {
    if (!enableParticles) return;
    const count = 6;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 5 + 2;
        let px = x + Math.random() * w;
        let py = y; 
        let vx = (Math.random() - 0.5) * 4;
        let vy = -Math.random() * 4 - 2; 
        particles.push(new Particle(px, py, size, size, '#9b59b6', vx, vy, 25, 'bounce'));
    }
}

function createCoinSparkle(x, y) {
    if (!enableParticles) return;
    const count = 10;
    for (let i = 0; i < count; i++) {
        let size = Math.random() * 4 + 2;
        let vx = (Math.random() - 0.5) * 5;
        let vy = (Math.random() - 0.5) * 5;
        particles.push(new Particle(x, y, size, size, '#f1c40f', vx, vy, 25, 'coin'));
    }
}


// ---------------------- MENU HANDLERS ----------------------
startBtn.onclick = () => {
    mainMenu.style.display = 'none';
    resetGame();
};

function resetGame() {
    gameStarted = true;
    paused = false;
    gameWon = false;
    gameLost = false;
    levelNumber = 1;
    lives = startingLives;
    score = 0; 
    particles.length = 0; 
    randomLevel(); 
}

controlBtn.onclick = () => {
    controlPanel.style.display = controlPanel.style.display === 'flex' ? 'none' : 'flex';
};

// SETTINGS BUTTON logic
settingsBtn.onclick = () => {
    settingsPanel.style.display = settingsPanel.style.display === 'flex' ? 'none' : 'flex';
    if (settingsPanel.style.display === 'none') {
        hideAllPanels();
    }
};

// --- MAIN TAB HANDLERS ---
function hideAllPanels() {
    difficultyPanel.style.display = 'none';
    livesPanel.style.display = 'none';
    speedPanel.style.display = 'none';
    cooldownPanel.style.display = 'none'; 
    skinsPanel.style.display = 'none'; 
    togglesPanel.style.display = 'none';
    abilitiesPanel.style.display = 'none';
    platformsPanel.style.display = 'none';
}

difficultyToggleBtn.onclick = () => {
    let wasVisible = difficultyPanel.style.display === 'flex';
    hideAllPanels();
    if (!wasVisible) difficultyPanel.style.display = 'flex';
};

livesToggleBtn.onclick = () => {
    let wasVisible = livesPanel.style.display === 'flex';
    hideAllPanels();
    if (!wasVisible) livesPanel.style.display = 'flex';
};

speedToggleBtn.onclick = () => {
    let wasVisible = speedPanel.style.display === 'flex';
    hideAllPanels();
    if (!wasVisible) speedPanel.style.display = 'flex';
};

cooldownToggleBtn.onclick = () => {
    let wasVisible = cooldownPanel.style.display === 'flex';
    hideAllPanels();
    if (!wasVisible) cooldownPanel.style.display = 'flex';
};

skinsToggleBtn.onclick = () => {
    let wasVisible = skinsPanel.style.display === 'flex';
    hideAllPanels();
    if (!wasVisible) skinsPanel.style.display = 'flex';
};

togglesToggleBtn.onclick = () => {
    if (abilitiesPanel.style.display === 'flex' || platformsPanel.style.display === 'flex') {
        hideAllPanels();
        togglesPanel.style.display = 'flex';
    } else {
        let wasVisible = togglesPanel.style.display === 'flex';
        hideAllPanels();
        if (!wasVisible) togglesPanel.style.display = 'flex';
    }
};

// --- SUB-MENU NAVIGATION ---
btnMenuAbilities.onclick = () => {
    togglesPanel.style.display = 'none';
    abilitiesPanel.style.display = 'flex';
};

btnMenuPlatforms.onclick = () => {
    togglesPanel.style.display = 'none';
    platformsPanel.style.display = 'flex';
};


// --- TOGGLE BUTTON LOGIC ---
function updateToggleBtn(btn, state, name) {
    if (state) {
        btn.style.backgroundColor = '#2ecc71'; // Green
        btn.textContent = `${name}: ON`;
    } else {
        btn.style.backgroundColor = '#ddd'; // Gray
        btn.textContent = `${name}: OFF`;
    }
}

// Standard Toggles
btnToggleWalls.onclick = () => { 
    enableWalls = !enableWalls; 
    updateToggleBtn(btnToggleWalls, enableWalls, "Walls"); 
};
btnToggleTunnels.onclick = () => { 
    enableTunnels = !enableTunnels; 
    updateToggleBtn(btnToggleTunnels, enableTunnels, "Tunnels"); 
};
btnToggleParticles.onclick = () => { 
    enableParticles = !enableParticles; 
    updateToggleBtn(btnToggleParticles, enableParticles, "Particles"); 
};
// BG
btnToggleBg.onclick = () => { 
    enableBg = !enableBg; 
    updateToggleBtn(btnToggleBg, enableBg, "Background"); 
};
// Coins
btnToggleCoins.onclick = () => {
    enableCoins = !enableCoins;
    updateToggleBtn(btnToggleCoins, enableCoins, "Coins");
};

// Ability Toggles
btnToggleHDash.onclick = () => { 
    enableHDash = !enableHDash; 
    updateToggleBtn(btnToggleHDash, enableHDash, "Dash (Shift)"); 
};
btnToggleVDash.onclick = () => { 
    enableVDash = !enableVDash; 
    updateToggleBtn(btnToggleVDash, enableVDash, "V-Dash (Enter)"); 
};

// Platform Toggles
btnToggleBoost.onclick = () => { 
    enableBoost = !enableBoost; 
    updateToggleBtn(btnToggleBoost, enableBoost, "Boost"); 
};
btnToggleBouncy.onclick = () => { 
    enableBouncy = !enableBouncy; 
    updateToggleBtn(btnToggleBouncy, enableBouncy, "Bouncy"); 
};
btnToggleCrumbling.onclick = () => { 
    enableCrumbling = !enableCrumbling; 
    updateToggleBtn(btnToggleCrumbling, enableCrumbling, "Crumbling"); 
};


// --- EXISTING SETTINGS LOGIC ---
function updateDifficultyVisuals() {
    difficultyBtns.forEach(btn => {
        const levels = btn.dataset.levels;
        if (levels === 'endless') {
            if (maxLevels === Infinity) {
                btn.style.backgroundColor = '#e67e22'; 
                btn.textContent = 'Endless (Selected)';
            } else {
                btn.style.backgroundColor = '#ddd';
                btn.textContent = 'Endless';
            }
        } else {
            const levelNum = parseInt(levels);
            if (levelNum === maxLevels) {
                btn.style.backgroundColor = '#2ecc71'; 
                btn.textContent = `${levelNum} Levels (Default)`;
            } else {
                btn.style.backgroundColor = '#ddd';
                btn.textContent = `${levelNum} Levels`;
            }
        }
    });
}

difficultyBtns.forEach(btn => {
    btn.onclick = () => {
        const levels = btn.dataset.levels;
        if (levels === 'endless') maxLevels = Infinity;
        else maxLevels = parseInt(levels);
        updateDifficultyVisuals();
    };
});

function updateLivesVisuals() {
    livesBtns.forEach(btn => {
        let num = btn.dataset.lives;
        let text = `${num} ${num === '1' ? 'Life' : 'Lives'}`;
        if (parseInt(num) === startingLives) {
            btn.style.backgroundColor = '#2ecc71'; 
            btn.textContent = `${text} (Default)`;
        } else {
            btn.style.backgroundColor = '#ddd'; 
            btn.textContent = text;
        }
    });
}

livesBtns.forEach(btn => {
    btn.onclick = () => {
        startingLives = parseInt(btn.dataset.lives);
        updateLivesVisuals();
    };
});
updateLivesVisuals();

function updateSpeedVisuals() {
    speedBtns.forEach(btn => {
        const speed = parseFloat(btn.dataset.speed);
        if (speed === baseMoveSpeed) {
            btn.style.backgroundColor = '#2ecc71'; 
            if (speed === 4.5) btn.textContent = 'Medium (Default)';
            else if (speed === 3.0) btn.textContent = 'Slow';
            else if (speed === 6.0) btn.textContent = 'Fast';
            else if (speed === 7.5) btn.textContent = 'Faster';
            else if (speed === 10) btn.textContent = 'Extreme';
        } else {
            btn.style.backgroundColor = '#ddd';
            if (speed === 3.0) btn.textContent = 'Slow';
            if (speed === 4.5) btn.textContent = 'Medium';
            if (speed === 6.0) btn.textContent = 'Fast';
            if (speed === 7.5) btn.textContent = 'Faster';
            if (speed === 10) btn.textContent = 'Extreme';
        }
    });
}

speedBtns.forEach(btn => {
    btn.onclick = () => {
        baseMoveSpeed = parseFloat(btn.dataset.speed);
        updateSpeedVisuals(); 
    };
});
updateSpeedVisuals();


// --- COOLDOWN SETTINGS LOGIC ---
function updateCooldownVisuals() {
    cooldownBtns.forEach(btn => {
        const cd = parseInt(btn.dataset.cd);
        if (cd === dashCooldownTime) { // Assuming both dashes synced for UI
            btn.style.backgroundColor = '#2ecc71'; 
            if (cd === 150) btn.textContent = 'Slow (2.5s)';
            else if (cd === 120) btn.textContent = 'Medium (2.0s) (Default)';
            else if (cd === 90) btn.textContent = 'Fast (1.5s)';
            else if (cd === 60) btn.textContent = 'Faster (1.0s)';
        } else {
            btn.style.backgroundColor = '#ddd'; 
            if (cd === 150) btn.textContent = 'Slow (2.5s)';
            else if (cd === 120) btn.textContent = 'Medium (2.0s)';
            else if (cd === 90) btn.textContent = 'Fast (1.5s)';
            else if (cd === 60) btn.textContent = 'Faster (1.0s)';
        }
    });
}

cooldownBtns.forEach(btn => {
    btn.onclick = () => {
        const val = parseInt(btn.dataset.cd);
        dashCooldownTime = val;
        vDashCooldownTime = val;
        updateCooldownVisuals();
    }
});
updateCooldownVisuals();

// --- SKIN SETTINGS LOGIC ---
function updateSkinVisuals() {
    skinBtns.forEach(btn => {
        const color = btn.dataset.color;
        if (color === playerSkin) {
            btn.style.border = "3px solid white";
            btn.style.transform = "scale(1.1)";
        } else {
            btn.style.border = "none";
            btn.style.transform = "scale(1.0)";
        }
    });
}

skinBtns.forEach(btn => {
    btn.onclick = () => {
        playerSkin = btn.dataset.color;
        updateSkinVisuals();
    }
});
updateSkinVisuals();


// Pause & Menu toggle
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') paused = !paused;
    if (e.code === 'KeyM') {
        gameStarted = false;
        mainMenu.style.display = 'flex';
        paused = false;
        gameWon = false;
        gameLost = false; 
        levelNumber = 1;
        lives = startingLives;
    }
    if (e.code === 'KeyR') {
        if (gameStarted || gameLost || gameWon) {
            resetGame();
        }
    }
});

// ---------------------- UTILITY FUNCTIONS ----------------------
function rectsCollide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function placeSpikePattern(baseX, baseY, patternType, count = 3, spacing = 25) {
    for (let i = 0; i < count; i++) {
        let sx = baseX;
        if (patternType === 'line') sx += i * spacing;
        else if (patternType === 'staggered') sx += i * spacing;
        else if (patternType === 'gap') { if (i === Math.floor(count / 2)) continue; sx += i * spacing; }
        spikes.push({ x: sx, y: baseY, w: spikeWidth, h: spikeHeight });
    }
}

// ---------------------- LEVEL GENERATION ----------------------
function randomLevel() {
    platforms.length = 0;
    spikes.length = 0;
    walls.length = 0;
    coins.length = 0; 
    bgObjects.length = 0;
    // pendingScore = 0; // Removed
    
    if (enableBg) {
        for (let i=0; i<30; i++) {
             let heightFactor = 40 + (levelNumber * 40);
             let baseHeight = 40;

             bgObjects.push({
                 x: Math.random() * worldWidth,
                 y: canvas.height, 
                 w: 200 + Math.random() * 400,
                 h: baseHeight + Math.random() * heightFactor,
                 color: Math.random() > 0.5 ? '#b0b0b0' : '#909090' 
             });
        }
    }

    // Full ground
    platforms.push({ x: 0, y: 376, w: worldWidth, h: 24 });

    // Player start
    const startX = 50, startY = 334;
    player.x = startX; player.y = startY; player.vx = 0; player.vy = 0;
    cameraX = 0;
    boostTimer = 0;
    player.dashTimer = 0; 
    player.dashCooldown = 0; 
    player.vDashTimer = 0;     
    player.vDashCooldown = 0; 

    const difficulty = levelNumber;
    moveSpeed = baseMoveSpeed + difficulty * 0.15;

    const numPlatforms = 20 + difficulty;
    let currentX = startX, currentY = startY;

    for (let i = 0; i < numPlatforms; i++) {
        
        const gap = 100 + Math.random() * 80 + difficulty * 5;
        let nextX = Math.min(currentX + gap, worldWidth - 100);
        let nextY = currentY + (Math.random() * 40 - 20);
        if (Math.random() < 0.3) nextY -= 50;
        nextY = Math.max(250, Math.min(nextY, 360));
        const pw = Math.max(30, 50 - difficulty + Math.random() * 50);

        const platform = { x: nextX, y: nextY, w: pw, h: 14 };

        const typeRoll = Math.random();

        if (typeRoll < 0.15 && i > 0) { 
            platform.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + difficulty * 0.2);
            platform.range = 50 + Math.random() * 50;
            platform.baseX = nextX;
        } else if (typeRoll < 0.25 && i > 0) { 
            platform.vy = (Math.random() < 0.5 ? -1 : 1) * (0.8 + difficulty * 0.1);
            platform.range = 30 + Math.random() * 40;
            platform.baseY = nextY;
        } 
        else if (enableBoost && typeRoll < 0.35) { 
            platform.isBoost = true;
        } else if (enableBouncy && typeRoll < 0.45) { 
            platform.isBouncy = true;
        } else if (enableCrumbling && typeRoll < 0.55) { 
            platform.isCrumbling = true;
            platform.crumbleTimer = -1; 
        }
        
        platforms.push(platform);
        currentX = nextX;
        currentY = nextY;
    }

    // --- PLACING EXACTLY 5 COINS ---
    if (enableCoins && platforms.length > 6) {
        const usablePlatforms = platforms.slice(1); // Ignore ground
        const totalPlats = usablePlatforms.length;
        const segmentSize = Math.floor(totalPlats / 5);

        for (let i = 0; i < 5; i++) {
            let startIndex = i * segmentSize;
            let endIndex = Math.min((i + 1) * segmentSize, totalPlats - 1);
            if (startIndex >= endIndex) continue;

            let chosenIndex = startIndex + Math.floor(Math.random() * (endIndex - startIndex));
            let plat = usablePlatforms[chosenIndex];

            let coinY = plat.y - 40;
            let coinX = plat.x + plat.w / 2 - 7;

            // Gap Risk 
            let prevPlat = platforms[chosenIndex]; 
            let dist = plat.x - (prevPlat ? (prevPlat.x + prevPlat.w) : 0);
            
            if (dist > 150 && Math.random() < 0.5) {
                coinX = plat.x - dist/2;
                coinY = plat.y - 20;
            } 
            // High Altitude Risk
            else if (plat.y > 300 && Math.random() < 0.4) {
                coinY = plat.y - 120; 
            }

            coins.push({ x: coinX, y: coinY, w: 15, h: 15 });
        }
    }


    // Door at end
    door.x = worldWidth - 60;
    door.y = Math.max(currentY - 50, 60);

    // Spikes
    const numPatterns = Math.min(2 + difficulty, 10);
    for (let i = 0; i < numPatterns; i++) {
        const patternType = Math.random() < 0.5 ? 'line' : (Math.random() < 0.5 ? 'staggered' : 'gap');
        const isGround = Math.random() < 0.7;
        let baseX;
        do {
            baseX = 100 + Math.random() * (worldWidth - 200);
        } while ((baseX > startX - 50 && baseX < startX + 150) || (baseX > door.x - 60 && baseX < door.x + 80));

        let baseY = isGround ? 376 - spikeHeight : platforms[Math.floor(Math.random() * platforms.length)].y - spikeHeight;
        placeSpikePattern(baseX, baseY, patternType, 3 + Math.floor(Math.random() * 3), 25 + Math.random() * 10);
    }

    // Walls
    if (enableWalls) {
        const numWalls = Math.min(2 + Math.floor(difficulty / 2), 6);
        for (let i = 0; i < numWalls; i++) {
            let wallX;
            do {
                wallX = 300 + Math.random() * (worldWidth - 500);
            } while ((wallX > startX - 50 && wallX < startX + 150) || (wallX > door.x - 100 && wallX < door.x + 120));

            const wallHeight = 60 + Math.random() * 80;
            const wall = {
                x: wallX,
                y: 376 - wallHeight,
                w: 20 + Math.random() * 15,
                h: wallHeight
            };
            walls.push(wall);
        }
    }

    // Tunnels
    if (enableTunnels) {
        const numTunnels = Math.min(2 + Math.floor(difficulty / 2), 6);
        for (let i = 0; i < numTunnels; i++) {
            let tunnelX;
            do {
                tunnelX = 200 + Math.random() * (worldWidth - 400);
            } while ((tunnelX > startX - 100 && tunnelX < startX + 200) || (tunnelX > door.x - 150 && tunnelX < door.x + 150));

            const tunnelY = 150 + Math.random() * 100; // Place it high up
            const tunnelWidth = 100 + Math.random() * 150;
            
            platforms.push({
                x: tunnelX,
                y: tunnelY,
                w: tunnelWidth,
                h: 20 + Math.random() * 15,
                isTunnel: true // Mark this as a tunnel
            });
        }
    }
}

// ---------------------- GAME LOOP ----------------------
function update() {
    if (!gameStarted || paused) return;

    // Coin Bobbing
    bobOffset = Math.sin(Date.now() / 200) * 3;

    // Spawn Door Glow
    createDoorGlow();

    // Particle update
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Crumbling platform update
    for (let i = platforms.length - 1; i >= 0; i--) {
        const plat = platforms[i];
        if (plat.crumbleTimer > 0) {
            plat.crumbleTimer--;
        } else if (plat.crumbleTimer === 0) {
            createCrumbleDebris(plat.x, plat.y, plat.w, plat.h);
            platforms.splice(i, 1); 
        }
    }

    // Cooldowns
    if (player.dashCooldown > 0) player.dashCooldown--;
    if (player.vDashCooldown > 0) player.vDashCooldown--;

    // Ability Checks
    if (enableHDash) {
        if ((keys['ShiftLeft'] || keys['KeyX'] || keys['ShiftRight']) && player.dashCooldown === 0) {
            player.dashTimer = dashDuration;
            player.dashCooldown = dashCooldownTime;
        }
    }
    if (enableVDash) {
        if ((keys['Enter'] || keys['KeyZ']) && player.vDashCooldown === 0) {
            player.vDashTimer = vDashDuration;
            player.vDashCooldown = vDashCooldownTime;
            player.onGround = false; 
        }
    }

    if (boostTimer > 0) boostTimer--;

    // Moving platforms
    for (const plat of platforms) {
        if (plat.vx) {
            plat.x += plat.vx;
            if (plat.x > plat.baseX + plat.range || plat.x < plat.baseX) plat.vx *= -1;
        }
        if (plat.vy) {
            plat.y += plat.vy;
            if (plat.y > plat.baseY + plat.range || plat.y < plat.baseY) plat.vy *= -1;
        }
    }

    // Auto-run
    let currentSpeed = moveSpeed;
    if (boostTimer > 0) currentSpeed += boostAmount;
    if (player.dashTimer > 0) currentSpeed += dashSpeed;
    player.x += currentSpeed;

    // Jump
    if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && player.onGround) {
        player.vy = jumpPower;
        player.onGround = false;
        createDust(player.x + player.w / 2, player.y + player.h); 
    }

    // Gravity
    if (player.vDashTimer > 0) {
        player.vDashTimer--;
        player.vy = vDashPower; 
        if (player.vDashTimer % 3 === 0) {
            createTrail(player.x, player.y, player.w, player.h, '#1abc9c'); 
        }
    } else if (player.dashTimer > 0) {
        player.dashTimer--;
        player.vy = 0; 
        if (player.dashTimer % 3 === 0) {
             createTrail(player.x, player.y, player.w, player.h, '#9b59b6'); 
        }
    } else {
        player.vy += gravity;
    }
    player.y += player.vy; 


    // Platform Collision Logic
    player.onGround = false;
    
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {
            if (plat.isTunnel) {
                if (player.vy < 0 && (player.y - player.vy >= plat.y + plat.h)) {
                    player.y = plat.y + plat.h; 
                    player.vy = 0; 
                }
                else if (player.vy >= 0 && (player.y + player.h - player.vy <= plat.y)) {
                    player.y = plat.y - player.h; 
                    player.vy = 0; 
                    player.onGround = true; 
                    if (player.vy > 0) createDust(player.x + player.w / 2, player.y + player.h);
                }
            }
            else {
                if (player.vy >= 0 && player.y + player.h - player.vy <= plat.y) {
                    if (plat.isBouncy) {
                        player.y = plat.y - player.h;
                        player.vy = jumpPower * 1.5; 
                        player.onGround = false;
                        createBouncyRipple(plat.x, plat.y, plat.w);
                        createDust(player.x + player.w / 2, player.y + player.h);
                        if(enableCoins) score += 25;
                    } else {
                        player.y = plat.y - player.h;
                        if (player.vy > 0) {
                             createDust(player.x + player.w / 2, player.y + player.h);
                        }
                        player.vy = 0;
                        player.onGround = true;

                        if (plat.isBoost) {
                             if(boostTimer === 0 && enableCoins) score += 25; 
                             boostTimer = boostDuration;
                             createBoostSparks(player.x, player.y, player.w, player.h);
                        }
                        if (plat.isCrumbling && plat.crumbleTimer === -1) {
                            if(enableCoins) score += 25;
                            plat.crumbleTimer = 5;
                        }
                        if (plat.vy) player.y += plat.vy;
                        if (plat.vx) player.x += plat.vx;
                    }
                }
            }
        }
    }

    // Spike collision
    for (const spike of spikes) {
        if (rectsCollide(player, spike)) {
           if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
            createExplosion(player.x + player.w/2, player.y + player.h/2, playerSkin);
            
            // Score Penalty
            if (enableCoins) {
                score = score - (500 * levelNumber); // MODIFIED
            }

            lives--;
            if (lives <= 0) {
                gameStarted = false;
                gameLost = true;
            } else {
                randomLevel();
            }
            return;
        }
    }

    // Wall collision
    for (const wall of walls) {
        if (rectsCollide(player, wall)) {
            const playerBottom = player.y + player.h;
            const wallTop = wall.y;
            const playerRight = player.x + player.w;
            const wallLeft = wall.x;
            const playerLeft = player.x;
            const wallRight = wall.x + wall.w;

            const fromTop = playerBottom - wallTop < 10 && player.vy >= 0;
            const fromLeft = playerRight > wallLeft && player.x < wallLeft && playerBottom > wallTop + 5;
            const fromRight = playerLeft < wallRight && playerRight > wallRight && playerBottom > wallTop + 5;

            if (fromTop) {
                player.y = wall.y - player.h;
                if (player.vy > 0) createDust(player.x + player.w / 2, player.y + player.h);
                player.vy = 0;
                player.onGround = true;
            } else if (fromLeft || fromRight) {
                if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
                createExplosion(player.x + player.w/2, player.y + player.h/2, playerSkin);
                
                // Score Penalty
                if (enableCoins) {
                    score = score - (500 * levelNumber); // MODIFIED
                }

                lives--;
                if (lives <= 0) {
                    gameStarted = false;
                    gameLost = true;
                } else {
                    randomLevel();
                }
                return;
            }
        }
    }

    // Coin Collision Logic
    if (enableCoins) {
        for (let i = coins.length - 1; i >= 0; i--) {
            if (rectsCollide(player, coins[i])) {
                let speedMult = (moveSpeed / 4.5); 
                let lifeMult = 1 + (2 / startingLives); 
                let levelMult = 1 + (levelNumber * 0.2);
                
                let points = Math.floor(100 * speedMult * lifeMult * levelMult);
                score += points; // MODIFIED

                createCoinSparkle(coins[i].x, coins[i].y);
                coins.splice(i, 1);
            }
        }
    }

    // Door collision
    if (rectsCollide(player, door)) {
        
        // Level Clear Bonus
        if (enableCoins) {
            let speedMult = (moveSpeed / 4.5); 
            let lifeMult = 1 + (2 / startingLives); 
            let levelMult = 1 + (levelNumber * 0.2);
            let levelBonus = Math.floor(500 * speedMult * lifeMult * levelMult); // Base 500
            score += levelBonus; // MODIFIED
        }

        if (maxLevels === Infinity) {
            levelNumber++;
            randomLevel();
        } else if (levelNumber === maxLevels) { 
            gameWon = true;
            gameStarted = false; 
        } else {
            levelNumber++;
            randomLevel();
        }
        return;
    }

    // Fall off screen
    if (player.y > canvas.height) {
        createExplosion(player.x + player.w/2, player.y + player.h/2, playerSkin);
        
        // Score Penalty
        if (enableCoins) {
            score = score - (500 * levelNumber); // MODIFIED
        }

        lives--;
        if (lives <= 0) {
            gameStarted = false;
            gameLost = true;
        } else {
            randomLevel();
        }
        return;
    }

    const cameraMargin = 300;
    cameraX = Math.max(0, Math.min(player.x - cameraMargin, worldWidth - canvas.width));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background
    if (enableBg) {
        for (const bg of bgObjects) {
            let parallaxX = bg.x - cameraX * 0.2;
            ctx.fillStyle = bg.color;
            ctx.beginPath();
            ctx.moveTo(parallaxX, bg.y); // Bottom left
            ctx.lineTo(parallaxX + bg.w/2, bg.y - bg.h); // Top tip
            ctx.lineTo(parallaxX + bg.w, bg.y); // Bottom right
            ctx.fill();
        }
    }

    // Draw Particles
    for (const p of particles) {
        p.draw(ctx, cameraX);
    }

    // Platforms
    for (const plat of platforms) {
        if (plat.isTunnel) {
            ctx.fillStyle = '#777'; 
        } else if (plat.isBoost) {
            ctx.fillStyle = '#2ecc71'; 
        } else if (plat.isBouncy) {
            ctx.fillStyle = '#9b59b6'; 
        } else if (plat.isCrumbling) {
            if (plat.crumbleTimer > 0 && Math.floor(plat.crumbleTimer / 4) % 2 === 0) {
                ctx.fillStyle = '#e74c3c'; 
            } else {
                ctx.fillStyle = '#f39c12'; 
            }
        } else {
            ctx.fillStyle = '#654321'; 
        }
        ctx.fillRect(plat.x - cameraX, plat.y, plat.w, plat.h);
    }

    // Walls
    ctx.fillStyle = '#555';
    for (const wall of walls) ctx.fillRect(wall.x - cameraX, wall.y, wall.w, wall.h);

    // Draw Coins
    if (enableCoins) {
        ctx.fillStyle = '#f1c40f'; // Gold
        for (const c of coins) {
            let drawY = c.y + bobOffset;
            ctx.fillRect(c.x - cameraX, drawY, c.w, c.h);
            ctx.fillStyle = '#fff';
            ctx.fillRect(c.x - cameraX + 4, drawY + 4, 4, 4);
            ctx.fillStyle = '#f1c40f'; 
        }
    }

    // Door
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(door.x - cameraX, door.y, door.w, door.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(door.x + door.w / 2 - 2 - cameraX, door.y + door.h - 8, 4, 4);

    // Player
    if (player.dashTimer > 0 || player.vDashTimer > 0) {
        ctx.fillStyle = (Math.floor(player.dashTimer / 3) % 2 === 0 || Math.floor(player.vDashTimer / 3) % 2 === 0) ? '#ffffff' : playerSkin;
    } else if (boostTimer > 0) {
        ctx.fillStyle = (Math.floor(boostTimer / 5) % 2 === 0) ? '#2ecc71' : playerSkin;
    } else {
        ctx.fillStyle = playerSkin; 
    }
    ctx.fillRect(player.x - cameraX, player.y, player.w, player.h);

    // Spikes
    ctx.fillStyle = '#e74c3c';
    for (const spike of spikes) {
        ctx.beginPath();
        ctx.moveTo(spike.x - cameraX, spike.y + spike.h);
        ctx.lineTo(spike.x + spike.w / 2 - cameraX, spike.y);
        ctx.lineTo(spike.x + spike.w - cameraX, spike.y + spike.h);
        ctx.closePath();
        ctx.fill();
    }
    
    // Cooldown Bars
    let barWidth = 50;
    let barHeight = 8;

    if (enableHDash && player.dashCooldown > 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        let progress = (player.dashCooldown / dashCooldownTime) * barWidth;
        let yPos = player.y - 15;
        ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth, barHeight);
        ctx.fillStyle = '#9b59b6'; 
        ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth - progress, barHeight);
    }

    if (enableVDash && player.vDashCooldown > 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        let yPos = player.y - 25; 
        let progress = (player.vDashCooldown / vDashCooldownTime) * barWidth;
        ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth, barHeight);
        ctx.fillStyle = '#1abc9c'; 
        ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth - progress, barHeight);
    }

    // --- HUD ---
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = '20px Arial';
    ctx.fillText(`Level ${levelNumber}`, 16, 28);

    // Score Display (No pending)
    if (enableCoins) {
        let scoreText = `Score: ${score}`;
        ctx.fillText(scoreText, 16, 56);
    }

    // Lives text
    ctx.textAlign = 'right'; 
    ctx.fillText(`❤️ ${lives}`, canvas.width - 16, 28);
    ctx.textAlign = 'left';  


    // Menus
    if (paused) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'left';
    } 
    else if (gameWon) {
        ctx.fillStyle = 'rgba(26, 188, 156, 0.8)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 40);
        // Score Display
        if (enableCoins) ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText(`You completed all ${maxLevels} levels!`, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("Press 'R' to restart or Press 'M' to return to the Menu", canvas.width / 2, canvas.height / 2 + 80);
        ctx.textAlign = 'left';
    }
    else if (gameLost) {
        ctx.fillStyle = 'rgba(192, 57, 43, 0.8)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 40);
        // Score Display
        if (enableCoins) ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText("You are out of lives.", canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("Press 'R' to restart or Press 'M' to return to the Menu", canvas.width / 2, canvas.height / 2 + 80);
        ctx.textAlign = 'left';
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();

