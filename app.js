// ---------------------- MENU ELEMENTS ----------------------
const mainMenu = document.getElementById('main-menu');
const startBtn = document.getElementById('startBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const difficultyRange = document.getElementById('difficultyRange');

// ---------------------- GAME VARIABLES ----------------------
const canvas = document.getElementById('platformer-canvas');
const ctx = canvas.getContext('2d');
const worldWidth = 4000;
let cameraX = 0;

const spikes = [];
const spikeWidth = 20;
const spikeHeight = 20;

const player = { x: 30, y: 334, w: 35, h: 35, vx: 0, vy: 0, onGround: false };
let levelNumber = 1;
let moveSpeed = 4.5;
const gravity = 0.7;
const jumpPower = -15;
const platforms = [];
let door = { x: 760, y: 46, w: 18, h: 30 };

const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

let gameStarted = false;
let paused = false;

// ---------------------- MENU HANDLERS ----------------------
startBtn.onclick = () => {
    mainMenu.style.display = 'none';
    gameStarted = true;
    randomLevel();
};

settingsBtn.onclick = () => {
    settingsPanel.style.display = settingsPanel.style.display === 'flex' ? 'none' : 'flex';
};

// Pause & Menu toggle
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') paused = !paused;
    if (e.code === 'KeyM') {
        gameStarted = false;
        mainMenu.style.display = 'flex';
        paused = false;
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

    // Full ground
    platforms.push({ x: 0, y: 376, w: worldWidth, h: 24 });

    // Player start
    const startX = 50, startY = 334;
    player.x = startX; player.y = startY; player.vx = 0; player.vy = 0;
    cameraX = 0;

    const difficulty = levelNumber;
    moveSpeed = 4.5 + difficulty * 0.15;

    const numPlatforms = 20 + difficulty;
    let currentX = startX, currentY = startY;

    for (let i = 0; i < numPlatforms; i++) {
        // Horizontal gap grows with difficulty
        const gap = 100 + Math.random() * 80 + difficulty * 5;
        let nextX = Math.min(currentX + gap, worldWidth - 100);

        // Vertical variation
        let nextY = currentY + (Math.random() * 40-20);
        if (Math.random() < 0.3) nextY -= 50; // tricky jump
        nextY = Math.max(250, Math.min(nextY, 360));

        // Platform width
        const pw = Math.max(30, 50 - difficulty + Math.random() * 50);
        const platform = { x: nextX, y: nextY, w: pw, h: 14 };

        // 15% chance to be a moving platform
        if (Math.random() < 0.15) {
            platform.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + difficulty * 0.2);
            platform.range = 50 + Math.random() * 50;
            platform.baseX = nextX;
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
        let baseX = 100 + Math.random() * (worldWidth - 200);
        let baseY = isGround ? 376 - spikeHeight : platforms[Math.floor(Math.random() * platforms.length)].y - spikeHeight;
        placeSpikePattern(baseX, baseY, patternType, 3 + Math.floor(Math.random() * 3), 25 + Math.random() * 10);
    }
}

// ---------------------- GAME LOOP ----------------------
function update() {
    if (!gameStarted || paused) return;

    // Moving platforms
    for (const plat of platforms) {
        if (plat.vx) {
            plat.x += plat.vx;
            if (plat.x > plat.baseX + plat.range || plat.x < plat.baseX) plat.vx *= -1;
        }
    }

    // Auto-run
    player.x += moveSpeed;

    // Jump
    if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && player.onGround) {
        player.vy = jumpPower;
        player.onGround = false;
    }

    // Gravity
    player.vy += gravity;
    player.y += player.vy;

    // Platform collision
    player.onGround = false;
    for (const plat of platforms) {
        if (rectsCollide(player, plat) && player.vy >= 0 && player.y + player.h - player.vy <= plat.y) {
            player.y = plat.y - player.h;
            player.vy = 0;
            player.onGround = true;
        }
    }

    // Spike collision
    for (const spike of spikes) {
        if (rectsCollide(player, spike)) {
            levelNumber = 1;
            randomLevel();
            return;
        }
    }

    // Door collision
    if (rectsCollide(player, door)) {
        levelNumber++;
        randomLevel();
        return;
    }

    // Fall off screen
    if (player.y > canvas.height) {
        levelNumber = 1;
        randomLevel();
        return;
    }

    // Camera
    const cameraMargin = 300;
    cameraX = Math.max(0, Math.min(player.x - cameraMargin, worldWidth - canvas.width));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platforms
    ctx.fillStyle = '#654321';
    for (const plat of platforms) ctx.fillRect(plat.x - cameraX, plat.y, plat.w, plat.h);

    // Door
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(door.x - cameraX, door.y, door.w, door.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(door.x + door.w / 2 - 2, door.y + door.h - 8, 4, 4);

    // Player
    ctx.fillStyle = '#3498db';
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

    // Pause overlay
    if (paused) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'left';
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();