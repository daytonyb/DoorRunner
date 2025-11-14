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
const togglesToggleBtn = document.getElementById('togglesToggleBtn'); 

// --- TOGGLE PANEL ELEMENTS ---
const togglesPanel = document.getElementById('togglesPanel');
const btnMenuPlatforms = document.getElementById('btnMenuPlatforms');
const btnMenuAbilities = document.getElementById('btnMenuAbilities');
const btnToggleWalls = document.getElementById('btnToggleWalls');
const btnToggleTunnels = document.getElementById('btnToggleTunnels');

// --- NEW: SUB-PANEL ELEMENTS ---
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

// NEW: Toggle States (Granular)
let enableWalls = true;
let enableTunnels = true;

let enableHDash = true;
let enableVDash = true;

let enableBoost = true;
let enableBouncy = true;
let enableCrumbling = true;

// Dash variables
const dashSpeed = 8;
const dashDuration = 12; 
const dashCooldownTime = 120; 

// Vertical Dash variables
const vDashPower = -12; 
const vDashDuration = 12;
const vDashCooldownTime = 120; 

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
    randomLevel(); 
}

controlBtn.onclick = () => {
    controlPanel.style.display = controlPanel.style.display === 'flex' ? 'none' : 'flex';
};

// SETTINGS BUTTON logic
settingsBtn.onclick = () => {
    settingsPanel.style.display = settingsPanel.style.display === 'flex' ? 'none' : 'flex';
    // Hide all sub-panels when closing main panel
    if (settingsPanel.style.display === 'none') {
        difficultyPanel.style.display = 'none';
        livesPanel.style.display = 'none';
        speedPanel.style.display = 'none';
        togglesPanel.style.display = 'none';
        abilitiesPanel.style.display = 'none';
        platformsPanel.style.display = 'none';
    }
};

// --- MAIN TAB HANDLERS ---
// When clicking a main tab, hide all content panels, then show the right one
function hideAllPanels() {
    difficultyPanel.style.display = 'none';
    livesPanel.style.display = 'none';
    speedPanel.style.display = 'none';
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

togglesToggleBtn.onclick = () => {
    // If we are in a sub-menu (abilities/platforms), clicking Toggles should go back to main Toggles list
    // If we are already in main list, close it.
    // If we are closed, open main list.
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

        // MODIFIED: Check specific toggle flags
        const typeRoll = Math.random();

        if (typeRoll < 0.15 && i > 0) { // Moving (Horizontal)
            platform.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + difficulty * 0.2);
            platform.range = 50 + Math.random() * 50;
            platform.baseX = nextX;
        } else if (typeRoll < 0.25 && i > 0) { // Moving (Vertical)
            platform.vy = (Math.random() < 0.5 ? -1 : 1) * (0.8 + difficulty * 0.1);
            platform.range = 30 + Math.random() * 40;
            platform.baseY = nextY;
        } 
        // GRANULAR CHECKS
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

    // Crumbling platform update
    for (let i = platforms.length - 1; i >= 0; i--) {
        const plat = platforms[i];
        if (plat.crumbleTimer > 0) {
            plat.crumbleTimer--;
        } else if (plat.crumbleTimer === 0) {
            platforms.splice(i, 1); 
        }
    }

    // Cooldowns
    if (player.dashCooldown > 0) player.dashCooldown--;
    if (player.vDashCooldown > 0) player.vDashCooldown--;

    // MODIFIED: Granular Ability Checks
    
    // Horizontal Dash
    if (enableHDash) {
        if ((keys['ShiftLeft'] || keys['KeyX'] || keys['ShiftRight']) && player.dashCooldown === 0) {
            player.dashTimer = dashDuration;
            player.dashCooldown = dashCooldownTime;
        }
    }

    // Vertical Dash
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
    }

    // Gravity
    if (player.vDashTimer > 0) {
        player.vDashTimer--;
        player.vy = vDashPower; 
    } else if (player.dashTimer > 0) {
        player.dashTimer--;
        player.vy = 0; 
    } else {
        player.vy += gravity;
    }
    player.y += player.vy; 


    // Platform Collision Logic
    player.onGround = false;
    for (const plat of platforms) {
        if (rectsCollide(player, plat)) {

            // TUNNEL BEHAVIOR
            if (plat.isTunnel) {
                if (player.vy < 0 && (player.y - player.vy >= plat.y + plat.h)) {
                    player.y = plat.y + plat.h; 
                    player.vy = 0; 
                }
                else if (player.vy >= 0 && (player.y + player.h - player.vy <= plat.y)) {
                    player.y = plat.y - player.h; 
                    player.vy = 0; 
                    player.onGround = true; 
                }
            }
            // NORMAL PLATFORM BEHAVIOR
            else {
                if (player.vy >= 0 && player.y + player.h - player.vy <= plat.y) {
                    if (plat.isBouncy) {
                        player.y = plat.y - player.h;
                        player.vy = jumpPower * 1.5; 
                        player.onGround = false;
                    } else {
                        player.y = plat.y - player.h;
                        player.vy = 0;
                        player.onGround = true;

                        if (plat.isBoost) boostTimer = boostDuration;
                        if (plat.isCrumbling && plat.crumbleTimer === -1) plat.crumbleTimer = 5;
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
                player.vy = 0;
                player.onGround = true;
            } else if (fromLeft || fromRight) {
                if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
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

    // Door collision
    if (rectsCollide(player, door)) {
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

    // Door
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(door.x - cameraX, door.y, door.w, door.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(door.x + door.w / 2 - 2 - cameraX, door.y + door.h - 8, 4, 4);

    // Player
    if (player.dashTimer > 0 || player.vDashTimer > 0) {
        ctx.fillStyle = (Math.floor(player.dashTimer / 3) % 2 === 0 || Math.floor(player.vDashTimer / 3) % 2 === 0) ? '#ffffff' : '#3498db';
    } else if (boostTimer > 0) {
        ctx.fillStyle = (Math.floor(boostTimer / 5) % 2 === 0) ? '#2ecc71' : '#3498db';
    } else {
        ctx.fillStyle = '#3498db'; 
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

    // Level text
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.font = '20px Arial';
    ctx.fillText(`Level ${levelNumber}`, 16, 28);

    // Lives text
    ctx.textAlign = 'right'; 
    ctx.fillText(`❤️ ${lives}`, canvas.width - 16, 28);
    ctx.textAlign = 'left';  

    // Cooldown Bars
    let barWidth = 50;
    let barHeight = 8;

    // Only draw dashes if abilities are enabled
    
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
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '20px Arial';
        ctx.fillText(`You completed all ${maxLevels} levels!`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Press 'R' to restart or Press 'M' to return to the Menu", canvas.width / 2, canvas.height / 2 + 60);
        ctx.textAlign = 'left';
    }
    else if (gameLost) {
        ctx.fillStyle = 'rgba(192, 57, 43, 0.8)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '20px Arial';
        ctx.fillText("You are out of lives.", canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Press 'R' to restart or Press 'M' to return to the Menu", canvas.width / 2, canvas.height / 2 + 60);
        ctx.textAlign = 'left';
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
