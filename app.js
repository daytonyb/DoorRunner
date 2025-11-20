(function() {
    'use strict'; // Helps catch common coding errors

    // ----------------------------------------------------
    // 1. DOM ELEMENTS
    // ----------------------------------------------------
    
    // --- Canvas ---
    const canvas = document.getElementById('platformer-canvas');
    const ctx = canvas.getContext('2d');

    // --- Main Menu ---
    const mainMenu = document.getElementById('main-menu');
    const startBtn = document.getElementById('startBtn');
    const controlBtn = document.getElementById('controlBtn');
    const controlPanel = document.getElementById('controlPanel');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');

    // --- Settings Categories ---
    const difficultyPanel = document.getElementById('difficultyPanel');
    const livesPanel = document.getElementById('livesPanel');
    const speedPanel = document.getElementById('speedPanel');
    const cooldownPanel = document.getElementById('cooldownPanel');
    const skinsPanel = document.getElementById('skinsPanel');
    const togglesPanel = document.getElementById('togglesPanel');
    const abilitiesPanel = document.getElementById('abilitiesPanel');
    const platformsPanel = document.getElementById('platformsPanel');

    // --- Settings Category Toggles ---
    const difficultyToggleBtn = document.getElementById('difficultyToggleBtn');
    const livesToggleBtn = document.getElementById('livesToggleBtn');
    const speedToggleBtn = document.getElementById('speedToggleBtn');
    const cooldownToggleBtn = document.getElementById('cooldownToggleBtn'); 
    const skinsToggleBtn = document.getElementById('skinsToggleBtn'); 
    const togglesToggleBtn = document.getElementById('togglesToggleBtn'); 

    // --- Settings Value Buttons ---
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const livesBtns = document.querySelectorAll('.lives-btn');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const cooldownBtns = document.querySelectorAll('.cooldown-btn');
    const skinBtns = document.querySelectorAll('.skin-btn');

    // --- Toggles Sub-Menu Navigation ---
    const btnMenuPlatforms = document.getElementById('btnMenuPlatforms');
    const btnMenuAbilities = document.getElementById('btnMenuAbilities');

    // --- General Toggle Buttons ---
    const btnToggleWalls = document.getElementById('btnToggleWalls');
    const btnToggleTunnels = document.getElementById('btnToggleTunnels');
    const btnToggleParticles = document.getElementById('btnToggleParticles'); 
    const btnToggleBg = document.getElementById('btnToggleBg'); 
    const btnToggleCoins = document.getElementById('btnToggleCoins'); 
    const btnToggleSound = document.getElementById('btnToggleSound');

    // --- Ability Toggle Buttons ---
    const btnToggleHDash = document.getElementById('btnToggleHDash');
    const btnToggleVDash = document.getElementById('btnToggleVDash');

    // --- Platform Toggle Buttons ---
    const btnToggleBoost = document.getElementById('btnToggleBoost');
    const btnToggleBouncy = document.getElementById('btnToggleBouncy');
    const btnToggleCrumbling = document.getElementById('btnToggleCrumbling');

    // --- COMPETITION MODE BUTTON ---
    const btnToggleCompetition = document.getElementById('btnToggleCompetition');

    // ----------------------------------------------------
    // 2. CONFIG & CONSTANTS
    // ----------------------------------------------------
    
    const worldWidth = 4000;
    const spikeWidth = 20;
    const spikeHeight = 20;

    // --- Physics & Abilities ---
    const gravity = 0.7;
    const jumpPower = -15;
    const dashSpeed = 8;
    const dashDuration = 12; 
    const vDashPower = -12; 
    const vDashDuration = 12;
    const boostDuration = 90; 
    const boostAmount = 2.5;
    const LEVEL_TRANSITION_TIME = 60; // 60 frames = 1 second
    const COMBO_TIMER_DURATION = 120; // 2 seconds at 60fps
    const COINS_FOR_EXTRA_LIFE = 5; // How many coins to get an extra life

    // ----------------------------------------------------
    // 3. GAME STATE & ENTITIES
    // ----------------------------------------------------

    // --- Entities ---
    const player = { 
        x: 30, y: 334, w: 35, h: 35, 
        vx: 0, vy: 0, onGround: false,
        dashTimer: 0, 
        dashCooldown: 0,
        vDashTimer: 0,     
        vDashCooldown: 0   
    };
    const platforms = [];
    const spikes = [];
    const walls = [];
    const coins = []; 
    const particles = [];
    const bgObjects = [];
    let door = { x: 760, y: 46, w: 18, h: 30 };

    // --- Game State ---
    let cameraX = 0;
    let gameStarted = false;
    let paused = false;
    let gameWon = false;
    let gameLost = false;
    let isTransitioning = false;
    let levelTransitionTimer = 0;
    let keys = {};
    let audioCtx;

    // --- Scoring & Level ---
    let levelNumber = 1;
    let lives = 3;
    let score = 0;
    let bobOffset = 0; 
    let boostTimer = 0;
    let coinComboMultiplier = 1;
    let coinComboTimer = 0;
    let coinsCollectedThisLevel = 0; // NEW: For extra life

    // --- Default Settings (will be overwritten by loadSettings) ---
    let startingLives = 3;    
    let maxLevels = 5;
    let baseMoveSpeed = 4.5;    
    let moveSpeed = 4.5;        
    let dashCooldownTime = 120; 
    let vDashCooldownTime = 120; 
    let playerSkin = '#3498db'; 

    // --- Default Toggles (will be overwritten by loadSettings) ---
    let enableWalls = true;
    let enableTunnels = true;
    let enableParticles = true; 
    let enableBg = true;
    let enableCoins = true; 
    let enableSound = true;
    let enableHDash = true;
    let enableVDash = true;
    let enableBoost = true;
    let enableBouncy = true;
    let enableCrumbling = true;

    // --- COMPETITION STATE ---
    let isCompetitionMode = false;

    // ----------------------------------------------------
    // 4. CLASSES
    // ----------------------------------------------------

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

    // ----------------------------------------------------
    // 5. CORE GAME LOOP
    // ----------------------------------------------------

    /**
     * The main game loop. Orchestrates all update and draw calls.
     */
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    /**
     * Main update function. Orchestrates all game logic.
     */
    function update() {
        if (!gameStarted || paused) return;

        // Handle level transition pause (ONLY FOR DEATH)
        if (isTransitioning) {
            updateParticles(); // Allow explosion to animate
            levelTransitionTimer--;
            if (levelTransitionTimer <= 0) {
                isTransitioning = false;
                randomLevel(); // Now we reset the level
            }
            return; // Skip all other game logic
        }

        handleGameTimers();
        updateParticles();
        updateEntities();
        handleInput();
        updatePlayerPhysics();
        handleCollisions();
        checkGameStatus();
        updateCamera();
    }

    /**
     * Main draw function. Orchestrates all rendering calls.
     */
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();
        drawParticles();
        drawEntities();
        drawPlayer();
        drawCooldownBars();
        drawHUD();
        drawOverlays();
    }

    // ----------------------------------------------------
    // 6. UPDATE SUB-FUNCTIONS
    // ----------------------------------------------------

    /**
     * Updates all game timers (cooldowns, bobbing, etc).
     */
    function handleGameTimers() {
        bobOffset = Math.sin(Date.now() / 200) * 3;
        if (player.dashCooldown > 0) player.dashCooldown--;
        if (player.vDashCooldown > 0) player.vDashCooldown--;
        if (boostTimer > 0) boostTimer--;

        // Update coin combo timer
        if (coinComboTimer > 0) {
            coinComboTimer--;
            if (coinComboTimer === 0) {
                coinComboMultiplier = 1; // Reset combo
            }
        }
    }

    /**
     * Updates all particles and removes dead ones.
     */
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        createDoorGlow(); // Spawn new glow particles
    }

    /**
     * Updates all non-player entities (moving platforms, crumbling).
     */
    function updateEntities() {
        // Crumbling platforms
        for (let i = platforms.length - 1; i >= 0; i--) {
            const plat = platforms[i];
            if (plat.crumbleTimer > 0) {
                plat.crumbleTimer--;
            } else if (plat.crumbleTimer === 0) {
                createCrumbleDebris(plat.x, plat.y, plat.w, plat.h);
                platforms.splice(i, 1); 
            }
        }
        
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
    }

    /**
     * Checks for player input (jump, dash) and applies actions.
     */
    function handleInput() {
        // Horizontal Dash
        if (enableHDash && (keys['ShiftLeft'] || keys['KeyX'] || keys['ShiftRight']) && player.dashCooldown === 0) {
            player.dashTimer = dashDuration;
            player.dashCooldown = dashCooldownTime;
            playSound('dash');
        }
        
        // Vertical Dash
        if (enableVDash && (keys['Enter'] || keys['KeyZ']) && player.vDashCooldown === 0) {
            player.vDashTimer = vDashDuration;
            player.vDashCooldown = vDashCooldownTime;
            player.onGround = false; 
            playSound('dash');
        }

        // Jump
        if ((keys['ArrowUp'] || keys['Space'] || keys['KeyW']) && player.onGround) {
            player.vy = jumpPower;
            player.onGround = false;
            createDust(player.x + player.w / 2, player.y + player.h); 
            playSound('jump');
        }
    }

    /**
     * Applies physics (gravity, velocity) to the player.
     */
    function updatePlayerPhysics() {
        // Auto-run
        let currentSpeed = moveSpeed;
        if (boostTimer > 0) currentSpeed += boostAmount;
        if (player.dashTimer > 0) currentSpeed += dashSpeed;
        player.x += currentSpeed;

        // Gravity / Dash overrides
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
    }

    /**
     * Handles all collisions for the player (platforms, spikes, walls, coins).
     */
    function handleCollisions() {
        // Platform Collision
        player.onGround = false;
        for (const plat of platforms) {
            if (!rectsCollide(player, plat)) continue;

            if (plat.isTunnel) {
                // Tunnel logic
                if (player.vy < 0 && (player.y - player.vy >= plat.y + plat.h)) {
                    player.y = plat.y + plat.h; // Hit head
                    player.vy = 0; 
                }
                else if (player.vy >= 0 && (player.y + player.h - player.vy <= plat.y)) {
                    player.y = plat.y - player.h; // Land on top
                    if (player.vy > 5) playSound('land');
                    player.vy = 0; 
                    player.onGround = true; 
                    createDust(player.x + player.w / 2, player.y + player.h);
                }
            } else {
                // Regular platform logic
                if (player.vy >= 0 && player.y + player.h - player.vy <= plat.y) {
                    if (plat.isBouncy) {
                        player.y = plat.y - player.h;
                        player.vy = jumpPower * 1.5; 
                        player.onGround = false;
                        createBouncyRipple(plat.x, plat.y, plat.w);
                        createDust(player.x + player.w / 2, player.y + player.h);
                        playSound('powerup');
                        if(enableCoins) score += 25;
                    } else {
                        player.y = plat.y - player.h;
                        if (player.vy > 5) {
                             createDust(player.x + player.w / 2, player.y + player.h);
                             playSound('land');
                        } else if (player.vy > 0) {
                            createDust(player.x + player.w / 2, player.y + player.h);
                        }
                        player.vy = 0;
                        player.onGround = true;

                        // Special platform effects
                        if (plat.isBoost) {
                             if(boostTimer === 0) {
                                 if(enableCoins) score += 25; 
                                 playSound('powerup');
                             }
                             boostTimer = boostDuration;
                             createBoostSparks(player.x, player.y, player.w, player.h);
                        }
                        if (plat.isCrumbling && plat.crumbleTimer === -1) {
                            if(enableCoins) score += 25;
                            playSound('powerup');
                            plat.crumbleTimer = 5;
                        }
                        // Move with platform
                        if (plat.vy) player.y += plat.vy;
                        if (plat.vx) player.x += plat.vx;
                    }
                }
            }
        }

        // Spike collision
        for (const spike of spikes) {
            if (rectsCollide(player, spike)) {
                if (player.dashTimer > 0 || player.vDashTimer > 0) continue; // Dash invincibility
                handlePlayerDeath();
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
                
                if (fromTop) {
                    // Land on top of wall
                    player.y = wall.y - player.h;
                    if (player.vy > 5) {
                        createDust(player.x + player.w / 2, player.y + player.h);
                        playSound('land');
                    } else if (player.vy > 0) {
                        createDust(player.x + player.w / 2, player.y + player.h);
                    }
                    player.vy = 0;
                    player.onGround = true;
                } else if (fromLeft) {
                    // Hit side of wall
                    if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
                    handlePlayerDeath();
                    return;
                }
            }
        }

        // Coin Collision
        if (enableCoins) {
            for (let i = coins.length - 1; i >= 0; i--) {
                if (rectsCollide(player, coins[i])) {
                    let speedMult = (moveSpeed / 4.5); 
                    let lifeMult = 1 + (2 / startingLives); 
                    let levelMult = 1 + (levelNumber * 0.2);
                    
                    // --- MODIFIED SCORING FOR COMBO ---
                    let basePoints = Math.floor(100 * speedMult * lifeMult * levelMult);
                    let points = basePoints * coinComboMultiplier; // Apply combo!
                    score += points; 
                    
                    coinComboMultiplier++; // Increase combo
                    coinComboTimer = COMBO_TIMER_DURATION; // Reset timer
                    // --- END MODIFICATION ---

                    playSound('coin');
                    createCoinSparkle(coins[i].x, coins[i].y);
                    coins.splice(i, 1);
                    
                    coinsCollectedThisLevel++; // NEW: Increment for extra life
                }
            }
        }
    }

    /**
     * Checks for win/loss conditions (door, falling).
     */
    function checkGameStatus() {
        // Door collision (Win level)
        if (rectsCollide(player, door)) {
            if (enableCoins) {
                // Add level bonus
                let speedMult = (moveSpeed / 4.5); 
                let lifeMult = 1 + (2 / startingLives); 
                let levelMult = 1 + (levelNumber * 0.2);
                let levelBonus = Math.floor(500 * speedMult * lifeMult * levelMult);
                score += levelBonus; 
                
                // --- NEW: Check for extra life ---
                if (coinsCollectedThisLevel === COINS_FOR_EXTRA_LIFE) {
                    lives++;
                    playSound('powerup'); // Play sound for getting extra life
                }
            }

            playSound('win');
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

        // Fall off screen (Die)
        if (player.y > canvas.height) {
            handlePlayerDeath();
            return;
        }
    }
    
    /**
     * Updates the camera position based on player.
     */
    function updateCamera() {
        const cameraMargin = 300;
        cameraX = Math.max(0, Math.min(player.x - cameraMargin, worldWidth - canvas.width));
    }

    // ----------------------------------------------------
    // 7. DRAW SUB-FUNCTIONS
    // ----------------------------------------------------

    function drawBackground() {
        if (!enableBg) return;
        for (const bg of bgObjects) {
            let parallaxX = bg.x - cameraX * 0.2;
            ctx.fillStyle = bg.color;
            ctx.beginPath();
            ctx.moveTo(parallaxX, bg.y); 
            ctx.lineTo(parallaxX + bg.w/2, bg.y - bg.h); 
            ctx.lineTo(parallaxX + bg.w, bg.y); 
            ctx.fill();
        }
    }

    function drawParticles() {
        for (const p of particles) {
            p.draw(ctx, cameraX);
        }
    }

    function drawEntities() {
        // Platforms
        for (const plat of platforms) {
            if (plat.isTunnel) ctx.fillStyle = '#777'; 
            else if (plat.isBoost) ctx.fillStyle = '#2ecc71'; 
            else if (plat.isBouncy) ctx.fillStyle = '#9b59b6'; 
            else if (plat.isCrumbling) {
                ctx.fillStyle = (plat.crumbleTimer > 0 && Math.floor(plat.crumbleTimer / 4) % 2 === 0) ? '#e74c3c' : '#f39c12';
            } else {
                ctx.fillStyle = '#654321'; 
            }
            ctx.fillRect(plat.x - cameraX, plat.y, plat.w, plat.h);
        }

        // Walls
        ctx.fillStyle = '#555';
        for (const wall of walls) ctx.fillRect(wall.x - cameraX, wall.y, wall.w, wall.h);

        // Coins
        if (enableCoins) {
            ctx.fillStyle = '#f1c40f';
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
    }

    function drawPlayer() {
        // Don't draw player if they are in the death transition
        if (isTransitioning) return;

        if (player.dashTimer > 0 || player.vDashTimer > 0) {
            ctx.fillStyle = (Math.floor(player.dashTimer / 3) % 2 === 0 || Math.floor(player.vDashTimer / 3) % 2 === 0) ? '#ffffff' : playerSkin;
        } else if (boostTimer > 0) {
            ctx.fillStyle = (Math.floor(boostTimer / 5) % 2 === 0) ? '#2ecc71' : playerSkin;
        } else {
            ctx.fillStyle = playerSkin; 
        }
        ctx.fillRect(player.x - cameraX, player.y, player.w, player.h);
    }

    function drawCooldownBars() {
        if (isTransitioning) return; // Don't draw bars on dead player

        let barWidth = 50;
        let barHeight = 8;
        let yPos;

        // H-Dash Cooldown
        if (enableHDash && player.dashCooldown > 0) {
            yPos = player.y - 15;
            let progress = (player.dashCooldown / dashCooldownTime) * barWidth;
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth, barHeight);
            ctx.fillStyle = '#9b59b6'; 
            ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth - progress, barHeight);
        }

        // V-Dash Cooldown
        if (enableVDash && player.vDashCooldown > 0) {
            yPos = (enableHDash && player.dashCooldown > 0) ? player.y - 25 : player.y - 15; // Stack bars
            let progress = (player.vDashCooldown / vDashCooldownTime) * barWidth;
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth, barHeight);
            ctx.fillStyle = '#1abc9c'; 
            ctx.fillRect(player.x - cameraX + player.w / 2 - barWidth / 2, yPos, barWidth - progress, barHeight);
        }
    }

    function drawHUD() {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Level ${levelNumber}`, 16, 28);

        if (enableCoins) {
            ctx.fillText(`Score: ${score}`, 16, 56);
        }

        // --- COMBO HUD ---
        if (enableCoins && coinComboMultiplier > 1) {
            ctx.fillStyle = '#f1c40f'; // Gold color for combo
            ctx.font = 'bold 22px Arial';
            ctx.fillText(`x${coinComboMultiplier} COMBO!`, 16, 84);
            
            // Draw combo bar
            let barWidth = 150;
            let barHeight = 8;
            let barX = 16;
            let barY = 92;
            let progress = (coinComboTimer / COMBO_TIMER_DURATION) * barWidth;

            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(barX, barY, barWidth, barHeight);
            ctx.fillStyle = '#f1c40f';
            ctx.fillRect(barX, barY, progress, barHeight);

            // Reset font and color
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.font = '20px Arial';
        }
        // --- END COMBO HUD ---

        ctx.textAlign = 'right'; 
        ctx.fillText(`❤️ ${lives}`, canvas.width - 16, 28);
        ctx.textAlign = 'left'; 
    }

    function drawOverlays() {
        if (paused) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        } 
        else if (gameWon) {
            ctx.fillStyle = 'rgba(26, 188, 156, 0.8)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 40);
            if (enableCoins) ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText(`You completed all ${maxLevels} levels!`, canvas.width / 2, canvas.height / 2 + 40);
            ctx.fillText("Press 'R' to restart or 'M' for Menu", canvas.width / 2, canvas.height / 2 + 80);
        }
        else if (gameLost) {
            ctx.fillStyle = 'rgba(192, 57, 43, 0.8)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 40);
            if (enableCoins) ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText("You are out of lives.", canvas.width / 2, canvas.height / 2 + 40);
            ctx.fillText("Press 'R' to restart or 'M' for Menu", canvas.width / 2, canvas.height / 2 + 80);
        }
        ctx.textAlign = 'left'; // Reset alignment
    }


    // ----------------------------------------------------
    // 8. GAME MECHANICS & LEVEL GEN
    // ----------------------------------------------------

    /**
     * Resets the game to the starting state.
     */
    function resetGame() {
        gameStarted = true;
        paused = false;
        gameWon = false;
        gameLost = false;
        isTransitioning = false;
        levelTransitionTimer = 0;
        levelNumber = 1;
        lives = startingLives;
        score = 0; 
        particles.length = 0; 
        coinsCollectedThisLevel = 0; // NEW: Reset for extra life
        randomLevel(); 
    }

    /**
     * Handles all logic for when the player dies.
     */
    function handlePlayerDeath() {
        createExplosion(player.x + player.w/2, player.y + player.h/2, playerSkin);
        playSound('death');
        
        if (enableCoins) {
            score = score - (500 * levelNumber); // This can now go below zero
        }

        lives--;
        if (lives <= 0) {
            gameStarted = false;
            gameLost = true;
        } else {
            isTransitioning = true;
            levelTransitionTimer = LEVEL_TRANSITION_TIME;
        }
    }

    /**
     * Generates a new random level.
     */
    function randomLevel() {
        // Clear old entities
        platforms.length = 0;
        spikes.length = 0;
        walls.length = 0;
        coins.length = 0; 
        bgObjects.length = 0;
        
        // Reset player
        player.x = 50; player.y = 334; player.vx = 0; player.vy = 0;
        cameraX = 0;
        boostTimer = 0;
        player.dashTimer = 0; 
        player.dashCooldown = 0; 
        player.vDashTimer = 0;     
        player.vDashCooldown = 0; 
        coinComboMultiplier = 1; // Reset combo
        coinComboTimer = 0;      // Reset combo timer
        coinsCollectedThisLevel = 0; // NEW: Reset for extra life

        // Apply difficulty scaling
        moveSpeed = baseMoveSpeed + levelNumber * 0.15;
        const difficulty = levelNumber;

        // Background
        if (enableBg) {
            for (let i=0; i<30; i++) {
                 let heightFactor = 40 + (levelNumber * 40);
                 bgObjects.push({
                     x: Math.random() * worldWidth,
                     y: canvas.height, 
                     w: 200 + Math.random() * 400,
                     h: 40 + Math.random() * heightFactor,
                     color: Math.random() > 0.5 ? '#b0b0b0' : '#909090' 
                 });
            }
        }

        // Ground
        platforms.push({ x: 0, y: 376, w: worldWidth, h: 24 });

        // Platforms
        const numPlatforms = 20 + difficulty;
        let currentX = player.x, currentY = player.y;

        for (let i = 0; i < numPlatforms; i++) {
            const gap = 100 + Math.random() * 80 + difficulty * 5;
            let nextX = Math.min(currentX + gap, worldWidth - 100);
            let nextY = Math.max(250, Math.min(currentY + (Math.random() * 40 - 20), 360));
            if (Math.random() < 0.3) nextY -= 50; // Chance for a higher jump
            const pw = Math.max(30, 50 - difficulty + Math.random() * 50);

            const platform = { x: nextX, y: nextY, w: pw, h: 14 };
            const typeRoll = Math.random();

            // Add special platform types
            if (typeRoll < 0.15 && i > 0) { 
                platform.vx = (Math.random() < 0.5 ? -1 : 1) * (1 + difficulty * 0.2);
                platform.range = 50 + Math.random() * 50;
                platform.baseX = nextX;
            } else if (typeRoll < 0.25 && i > 0) { 
                platform.vy = (Math.random() < 0.5 ? -1 : 1) * (0.8 + difficulty * 0.1);
                platform.range = 30 + Math.random() * 40;
                platform.baseY = nextY;
            } 
            else if (enableBoost && typeRoll < 0.35) platform.isBoost = true;
            else if (enableBouncy && typeRoll < 0.45) platform.isBouncy = true;
            else if (enableCrumbling && typeRoll < 0.55) { 
                platform.isCrumbling = true;
                platform.crumbleTimer = -1; 
            }
            
            platforms.push(platform);
            currentX = nextX;
            currentY = nextY;
        }

        // Coins
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
                coins.push({ x: coinX, y: coinY, w: 15, h: 15 });
            }
        }

        // Door
        door.x = worldWidth - 60;
        door.y = Math.max(currentY - 50, 60);

        // Spikes
        const numPatterns = Math.min(2 + difficulty, 10);
        for (let i = 0; i < numPatterns; i++) {
            const patternType = Math.random() < 0.5 ? 'line' : (Math.random() < 0.5 ? 'staggered' : 'gap');
            let baseX;
            do {
                baseX = 100 + Math.random() * (worldWidth - 200);
            } while ((baseX > player.x - 50 && baseX < player.x + 150) || (baseX > door.x - 60 && baseX < door.x + 80));
            let baseY = Math.random() < 0.7 ? 376 - spikeHeight : platforms[Math.floor(Math.random() * platforms.length)].y - spikeHeight;
            placeSpikePattern(baseX, baseY, patternType, 3 + Math.floor(Math.random() * 3));
        }

        // Walls
        if (enableWalls) {
            const numWalls = Math.min(2 + Math.floor(difficulty / 2), 6);
            for (let i = 0; i < numWalls; i++) {
                let wallX;
                do {
                    wallX = 300 + Math.random() * (worldWidth - 500);
                } while ((wallX > player.x - 50 && wallX < player.x + 150) || (wallX > door.x - 100 && wallX < door.x + 120));
                
                walls.push({
                    x: wallX,
                    y: 376 - (60 + Math.random() * 80),
                    w: 20 + Math.random() * 15,
                    h: 60 + Math.random() * 80
                });
            }
        }

        // Tunnels
        if (enableTunnels) {
            const numTunnels = Math.min(2 + Math.floor(difficulty / 2), 6);
            for (let i = 0; i < numTunnels; i++) {
                let tunnelX;
                do {
                    tunnelX = 200 + Math.random() * (worldWidth - 400);
                } while ((tunnelX > player.x - 100 && tunnelX < player.x + 200) || (tunnelX > door.x - 150 && tunnelX < door.x + 150));
                
                platforms.push({
                    x: tunnelX,
                    y: 150 + Math.random() * 100,
                    w: 100 + Math.random() * 150,
                    h: 20 + Math.random() * 15,
                    isTunnel: true
                });
            }
        }
    }

    // ----------------------------------------------------
    // 9. UTILITY, SOUND, & PARTICLE HELPERS
    // ----------------------------------------------------

    // --- Collision ---
    function rectsCollide(a, b) {
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    // --- Level Gen ---
    function placeSpikePattern(baseX, baseY, patternType, count = 3, spacing = 25) {
        for (let i = 0; i < count; i++) {
            let sx = baseX;
            if (patternType === 'line') sx += i * spacing;
            else if (patternType === 'staggered') sx += i * spacing;
            else if (patternType === 'gap') { if (i === Math.floor(count / 2)) continue; sx += i * spacing; }
            spikes.push({ x: sx, y: baseY, w: spikeWidth, h: spikeHeight });
        }
    }

    // --- Sound ---
    function createNoiseNode(duration) {
        if (!audioCtx) return null;
        const bufferSize = audioCtx.sampleRate * duration;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        return noise;
    }

    function playSound(type) {
        if (!audioCtx || !enableSound) return;
        const now = audioCtx.currentTime;
        const gainNode = audioCtx.createGain();
        gainNode.connect(audioCtx.destination);
        let osc, noise;

        switch(type) {
            case 'jump':
                osc = audioCtx.createOscillator(); osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, now);
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.linearRampToValueAtTime(880, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gainNode); osc.start(now); osc.stop(now + 0.1);
                break;
            case 'land':
                osc = audioCtx.createOscillator(); osc.type = 'square';
                gainNode.gain.setValueAtTime(0.2, now);
                osc.frequency.setValueAtTime(150, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.connect(gainNode); osc.start(now); osc.stop(now + 0.05);
                break;
            case 'coin':
                osc = audioCtx.createOscillator(); osc.type = 'triangle';
                gainNode.gain.setValueAtTime(0.3, now);
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gainNode); osc.start(now); osc.stop(now + 0.1);
                break;
            case 'powerup':
                osc = audioCtx.createOscillator(); osc.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, now);
                osc.frequency.setValueAtTime(600, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.connect(gainNode); osc.start(now); osc.stop(now + 0.1);
                break;
            case 'dash':
                noise = createNoiseNode(0.15);
                gainNode.gain.setValueAtTime(0.4, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                noise.connect(gainNode); noise.start(now);
                break;
            case 'death':
                noise = createNoiseNode(0.5);
                gainNode.gain.setValueAtTime(0.5, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                noise.connect(gainNode); noise.start(now);
                break;
            case 'win':
                osc = audioCtx.createOscillator(); osc.type = 'triangle';
                gainNode.gain.setValueAtTime(0.4, now);
                osc.frequency.setValueAtTime(523, now); 
                osc.frequency.linearRampToValueAtTime(1046, now + 0.2);
                osc.connect(gainNode); osc.start(now); osc.stop(now + 0.2);
                break;
        }
    }

    // --- Particle Creation ---
    function createDust(x, y) {
        if (!enableParticles) return;
        for (let i = 0; i < 4; i++) {
            let size = Math.random() * 4 + 2;
            particles.push(new Particle(x, y, size, size, '#ffffff', (Math.random() - 0.5) * 2, -Math.random() * 2 - 1, 20, 'dust'));
        }
    }

    function createTrail(x, y, w, h, color) {
        if (!enableParticles) return;
        particles.push(new Particle(x, y, w, h, color, 0, 0, 10, 'trail'));
    }

    function createExplosion(x, y, color) {
        if (!enableParticles) return;
        for (let i = 0; i < 20; i++) {
            let size = Math.random() * 6 + 4;
            particles.push(new Particle(x, y, size, size, color, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, 40, 'explosion'));
        }
    }

    function createCrumbleDebris(x, y, w, h) {
        if (!enableParticles) return;
        for (let i = 0; i < 8; i++) {
            let size = Math.random() * 6 + 3;
            let px = x + Math.random() * w;
            let py = y + Math.random() * h;
            particles.push(new Particle(px, py, size, size, '#f39c12', (Math.random() - 0.5) * 2, Math.random() * 2, 30, 'crumble'));
        }
    }

    function createDoorGlow() {
        if (!enableParticles || Math.random() > 0.3) return; 
        let size = Math.random() * 3 + 2;
        let px = door.x + Math.random() * door.w;
        let py = door.y + door.h - Math.random() * 5; 
        particles.push(new Particle(px, py, size, size, '#ffeb3b', (Math.random() - 0.5) * 0.5, -Math.random() * 1.5 - 0.5, 45, 'glow'));
    }

    function createBoostSparks(x, y, w, h) {
        if (!enableParticles) return;
        for (let i = 0; i < 8; i++) {
            let size = Math.random() * 4 + 2;
            let px = x + Math.random() * w;
            let py = y + Math.random() * h;
            particles.push(new Particle(px, py, size, size, '#2ecc71', (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 2, 20, 'boost'));
        }
    }

    function createBouncyRipple(x, y, w) {
        if (!enableParticles) return;
        for (let i = 0; i < 6; i++) {
            let size = Math.random() * 5 + 2;
            let px = x + Math.random() * w;
            particles.push(new Particle(px, y, size, size, '#9b59b6', (Math.random() - 0.5) * 4, -Math.random() * 4 - 2, 25, 'bounce'));
        }
    }

    function createCoinSparkle(x, y) {
        if (!enableParticles) return;
        for (let i = 0; i < 10; i++) {
            let size = Math.random() * 4 + 2;
            particles.push(new Particle(x, y, size, size, '#f1c40f', (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 25, 'coin'));
        }
    }

    // ----------------------------------------------------
    // 10. SETTINGS & UI HANDLERS
    // ----------------------------------------------------

    /**
     * Saves a key/value pair to localStorage.
     */
    function saveSetting(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * Disables or enables all settings UI elements
     */
    function updateSettingsLock(isLocked) {
        const mainToggles = [
            difficultyToggleBtn, livesToggleBtn, speedToggleBtn, 
            cooldownToggleBtn, skinsToggleBtn, togglesToggleBtn
        ];
        const subToggles = [
            btnMenuPlatforms, btnMenuAbilities, btnToggleWalls, btnToggleTunnels,
            btnToggleParticles, btnToggleBg, btnToggleCoins, btnToggleSound,
            btnToggleHDash, btnToggleVDash, btnToggleBoost, btnToggleBouncy, btnToggleCrumbling
        ];
        const valueButtons = [
            ...difficultyBtns, ...livesBtns, ...speedBtns, ...cooldownBtns, ...skinBtns
        ];

        const allButtons = [...mainToggles, ...subToggles, ...valueButtons];

        allButtons.forEach(btn => {
            if (btn) {
                btn.disabled = isLocked;
                btn.style.opacity = isLocked ? 0.5 : 1.0;
                btn.style.cursor = isLocked ? 'not-allowed' : 'pointer';
            }
        });
    }

    /**
     * Force-applies all competition mode settings
     */
    function applyCompetitionMode(isEnabled) {
        if (isEnabled) {
            // 1. Force all game variables to competition standard
            startingLives = 3;
            maxLevels = Infinity; // <-- CHANGED: No level limit
            baseMoveSpeed = 4.5;
            dashCooldownTime = 120;
            vDashCooldownTime = 120;
            
            enableWalls = true;
            enableTunnels = true;
            enableParticles = true; 
            enableBg = true;
            enableCoins = true; 
            enableSound = true;
            enableHDash = true;
            enableVDash = true;
            enableBoost = true;
            enableBouncy = true;
            enableCrumbling = true;

            // 2. Update all visuals to show these locked-in settings
            updateAllVisuals();
            
            // 3. Lock the UI
            updateSettingsLock(true);
            
            // 4. Close any open settings panels
            hideAllPanels();
        } else {
            // 1. Unlock the UI
            updateSettingsLock(false);
            // Settings variables remain as they were, but are now changeable.
        }
    }


    /**
     * Loads all settings from localStorage on game start.
     */
    function loadSettings() {
        // Load numbers
        const savedMaxLevels = localStorage.getItem('maxLevels');
        if (savedMaxLevels) maxLevels = savedMaxLevels === 'Infinity' ? Infinity : parseInt(savedMaxLevels);

        const savedLives = localStorage.getItem('startingLives');
        if (savedLives) startingLives = parseInt(savedLives);

        const savedSpeed = localStorage.getItem('baseMoveSpeed');
        if (savedSpeed) baseMoveSpeed = parseFloat(savedSpeed);

        const savedCooldown = localStorage.getItem('dashCooldown');
        if (savedCooldown) {
            dashCooldownTime = parseInt(savedCooldown);
            vDashCooldownTime = parseInt(savedCooldown);
        }

        // Load strings
        const savedSkin = localStorage.getItem('playerSkin');
        if (savedSkin) playerSkin = savedSkin;

        // Load toggles (booleans)
        const saved = (key) => localStorage.getItem(key);
        // Check for 'null' to keep default 'true' if never set
        enableWalls = saved('enableWalls') === null ? true : (saved('enableWalls') === 'true');
        enableTunnels = saved('enableTunnels') === null ? true : (saved('enableTunnels') === 'true');
        enableParticles = saved('enableParticles') === null ? true : (saved('enableParticles') === 'true');
        enableBg = saved('enableBg') === null ? true : (saved('enableBg') === 'true');
        enableCoins = saved('enableCoins') === null ? true : (saved('enableCoins') === 'true');
        enableSound = saved('enableSound') === null ? true : (saved('enableSound') === 'true');
        enableHDash = saved('enableHDash') === null ? true : (saved('enableHDash') === 'true');
        enableVDash = saved('enableVDash') === null ? true : (saved('enableVDash') === 'true');
        enableBoost = saved('enableBoost') === null ? true : (saved('enableBoost') === 'true');
        enableBouncy = saved('enableBouncy') === null ? true : (saved('enableBouncy') === 'true');
        enableCrumbling = saved('enableCrumbling') === null ? true : (saved('enableCrumbling') === 'true');

        // --- Load Competition Mode ---
        isCompetitionMode = saved('isCompetitionMode') === 'true';

        // --- If in comp mode, override all loaded settings ---
        if (isCompetitionMode) {
            startingLives = 3;
            maxLevels = Infinity; // <-- CHANGED: No level limit
            baseMoveSpeed = 4.5;
            dashCooldownTime = 120;
            vDashCooldownTime = 120;
            enableWalls = true;
            enableTunnels = true;
            enableParticles = true; 
            enableBg = true;
            enableCoins = true; 
            enableSound = true;
            enableHDash = true;
            enableVDash = true;
            enableBoost = true;
            enableBouncy = true;
            enableCrumbling = true;
        }
    }

    /**
     * Updates all visual elements in the settings menu to match loaded settings.
     */
    function updateAllVisuals() {
        updateDifficultyVisuals();
        updateLivesVisuals();
        updateSpeedVisuals();
        updateCooldownVisuals();
        updateSkinVisuals();
        
        // Update all toggle buttons to match loaded state
        updateToggleBtn(btnToggleWalls, enableWalls, "Walls");
        updateToggleBtn(btnToggleTunnels, enableTunnels, "Tunnels");
        updateToggleBtn(btnToggleParticles, enableParticles, "Particles");
        updateToggleBtn(btnToggleBg, enableBg, "Background");
        updateToggleBtn(btnToggleCoins, enableCoins, "Coins");
        updateToggleBtn(btnToggleSound, enableSound, "Sound");
        updateToggleBtn(btnToggleHDash, enableHDash, "Dash (Shift)");
        updateToggleBtn(btnToggleVDash, enableVDash, "V-Dash (Enter)");
        updateToggleBtn(btnToggleBoost, enableBoost, "Boost");
        updateToggleBtn(btnToggleBouncy, enableBouncy, "Bouncy");
        updateToggleBtn(btnToggleCrumbling, enableCrumbling, "Crumbling");

        // Update competition button visuals
        if (btnToggleCompetition) {
            updateToggleBtn(btnToggleCompetition, isCompetitionMode, "Competition Mode");
        }
    }

    /**
     * Hides all settings sub-panels.
     */
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

    /**
     * Updates a toggle button's appearance (text and color).
     */
    function updateToggleBtn(btn, state, name) {
        if (!btn) return; // Safety check if button doesn't exist
        btn.style.backgroundColor = state ? '#2ecc71' : '#ddd';
        btn.textContent = `${name}: ${state ? 'ON' : 'OFF'}`;
    }

    // --- Settings UI Visual Updaters ---

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
                    btn.textContent = btn.dataset.levels === '5' ? 'Medium (5 Levels)' : `${levelNum} Levels (Selected)`;
                } else {
                    btn.style.backgroundColor = '#ddd';
                    btn.textContent = btn.dataset.levels === '3' ? 'Easy (3 Levels)' : btn.dataset.levels === '5' ? 'Medium (5 Levels)' : `Hard (7 Levels)`;
                }
            }
        });
    }

    function updateLivesVisuals() {
        livesBtns.forEach(btn => {
            let num = btn.dataset.lives;
            let text = `${num} ${num === '1' ? 'Life' : 'Lives'}`;
            if (parseInt(num) === startingLives) {
                btn.style.backgroundColor = '#2ecc71'; 
                btn.textContent = `${text} ${num === '3' ? '(Default)' : '(Selected)'}`;
            } else {
                btn.style.backgroundColor = '#ddd'; 
                btn.textContent = text;
            }
        });
    }

    function updateSpeedVisuals() {
        speedBtns.forEach(btn => {
            const speed = parseFloat(btn.dataset.speed);
            let text = '...'; // Placeholder
            if (speed === 4.5) text = 'Medium';
            else if (speed === 3.0) text = 'Slow';
            else if (speed === 6.0) text = 'Fast';
            else if (speed === 7.5) text = 'Faster';
            else if (speed === 10) text = 'Extreme';

            if (speed === baseMoveSpeed) {
                btn.style.backgroundColor = '#2ecc71'; 
                btn.textContent = `${text} ${speed === 4.5 ? '(Default)' : '(Selected)'}`;
            } else {
                btn.style.backgroundColor = '#ddd';
                btn.textContent = text;
            }
        });
    }

    function updateCooldownVisuals() {
        cooldownBtns.forEach(btn => {
            const cd = parseInt(btn.dataset.cd);
            let text = '...'; // Placeholder
            if (cd === 150) text = 'Slow (2.5s)';
            else if (cd === 120) text = 'Medium (2.0s)';
            else if (cd === 90) text = 'Fast (1.5s)';
            else if (cd === 60) text = 'Faster (1.0s)';

            if (cd === dashCooldownTime) {
                btn.style.backgroundColor = '#2ecc71'; 
                btn.textContent = `${text} ${cd === 120 ? '(Default)' : '(Selected)'}`;
            } else {
                btn.style.backgroundColor = '#ddd'; 
                btn.textContent = text;
            }
        });
    }

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

    /**
     * Initializes all event listeners for keyboard and UI buttons.
     */
    function initEventHandlers() {
        // --- Lock settings on load if comp mode is on ---
        updateSettingsLock(isCompetitionMode);

        // --- Keyboard Listeners ---
        document.addEventListener('keydown', e => {
            keys[e.code] = true;
            // Pause
            if (e.code === 'KeyP') paused = !paused;
            // Menu
            if (e.code === 'KeyM') {
                gameStarted = false;
                mainMenu.style.display = 'flex';
                paused = false; gameWon = false; gameLost = false; 
                levelNumber = 1; lives = startingLives;
            }
            
            // --- MODIFIED RESTART LOGIC ---
            if (e.code === 'KeyR') {
                if (isCompetitionMode) {
                    // In comp mode, only allow restart on game over
                    if (gameLost || gameWon) {
                        resetGame();
                    }
                } else {
                    // Original logic for non-comp mode
                    if (gameStarted || gameLost || gameWon) {
                        resetGame();
                    }
                }
            }
        });
        document.addEventListener('keyup', e => keys[e.code] = false);

        // --- Main Menu Buttons ---
        startBtn.onclick = () => {
            mainMenu.style.display = 'none';
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            resetGame();
        };

        controlBtn.onclick = () => {
            controlPanel.style.display = controlPanel.style.display === 'flex' ? 'none' : 'flex';
        };

        settingsBtn.onclick = () => {
            settingsPanel.style.display = settingsPanel.style.display === 'flex' ? 'none' : 'flex';
            if (settingsPanel.style.display === 'none') hideAllPanels();
        };

        // --- Settings Main Tab Buttons ---
        difficultyToggleBtn.onclick = () => {
            let wasVisible = difficultyPanel.style.display === 'flex';
            hideAllPanels(); if (!wasVisible) difficultyPanel.style.display = 'flex';
        };
        livesToggleBtn.onclick = () => {
            let wasVisible = livesPanel.style.display === 'flex';
            hideAllPanels(); if (!wasVisible) livesPanel.style.display = 'flex';
        };
        speedToggleBtn.onclick = () => {
            let wasVisible = speedPanel.style.display === 'flex';
            hideAllPanels(); if (!wasVisible) speedPanel.style.display = 'flex';
        };
        cooldownToggleBtn.onclick = () => {
            let wasVisible = cooldownPanel.style.display === 'flex';
            hideAllPanels(); if (!wasVisible) cooldownPanel.style.display = 'flex';
        };
        skinsToggleBtn.onclick = () => {
            let wasVisible = skinsPanel.style.display === 'flex';
            hideAllPanels(); if (!wasVisible) skinsPanel.style.display = 'flex';
        };
        togglesToggleBtn.onclick = () => {
            if (abilitiesPanel.style.display === 'flex' || platformsPanel.style.display === 'flex') {
                hideAllPanels(); togglesPanel.style.display = 'flex';
            } else {
                let wasVisible = togglesPanel.style.display === 'flex';
                hideAllPanels(); if (!wasVisible) togglesPanel.style.display = 'flex';
            }
        };

        // --- Settings Value Buttons (with saving) ---
        difficultyBtns.forEach(btn => {
            btn.onclick = () => {
                const levels = btn.dataset.levels;
                maxLevels = (levels === 'endless') ? Infinity : parseInt(levels);
                saveSetting('maxLevels', maxLevels);
                updateDifficultyVisuals();
            };
        });

        livesBtns.forEach(btn => {
            btn.onclick = () => {
                startingLives = parseInt(btn.dataset.lives);
                saveSetting('startingLives', startingLives);
                updateLivesVisuals();
            };
        });

        speedBtns.forEach(btn => {
            btn.onclick = () => {
                baseMoveSpeed = parseFloat(btn.dataset.speed);
                saveSetting('baseMoveSpeed', baseMoveSpeed);
                updateSpeedVisuals(); 
            };
        });

        cooldownBtns.forEach(btn => {
            btn.onclick = () => {
                const val = parseInt(btn.dataset.cd);
                dashCooldownTime = val; vDashCooldownTime = val;
                saveSetting('dashCooldown', val);
                updateCooldownVisuals();
            }
        });

        skinBtns.forEach(btn => {
            btn.onclick = () => {
                playerSkin = btn.dataset.color;
                saveSetting('playerSkin', playerSkin);
                updateSkinVisuals();
            }
        });

        // --- Toggles Sub-Menu Navigation ---
        btnMenuAbilities.onclick = () => {
            togglesPanel.style.display = 'none';
            abilitiesPanel.style.display = 'flex';
        };
        btnMenuPlatforms.onclick = () => {
            togglesPanel.style.display = 'none';
            platformsPanel.style.display = 'flex';
        };

        // --- Toggle Buttons (with saving) ---
        btnToggleWalls.onclick = () => { 
            enableWalls = !enableWalls; 
            saveSetting('enableWalls', enableWalls);
            updateToggleBtn(btnToggleWalls, enableWalls, "Walls"); 
        };
        btnToggleTunnels.onclick = () => { 
            enableTunnels = !enableTunnels; 
            saveSetting('enableTunnels', enableTunnels);
            updateToggleBtn(btnToggleTunnels, enableTunnels, "Tunnels"); 
        };
        btnToggleParticles.onclick = () => { 
            enableParticles = !enableParticles; 
            saveSetting('enableParticles', enableParticles);
            updateToggleBtn(btnToggleParticles, enableParticles, "Particles"); 
        };
        btnToggleBg.onclick = () => { 
            enableBg = !enableBg; 
            saveSetting('enableBg', enableBg);
            updateToggleBtn(btnToggleBg, enableBg, "Background"); 
        };
        btnToggleCoins.onclick = () => {
            enableCoins = !enableCoins;
            saveSetting('enableCoins', enableCoins);
            updateToggleBtn(btnToggleCoins, enableCoins, "Coins");
        };
        btnToggleSound.onclick = () => {
            enableSound = !enableSound;
            saveSetting('enableSound', enableSound);
            updateToggleBtn(btnToggleSound, enableSound, "Sound");
        };
        btnToggleHDash.onclick = () => { 
            enableHDash = !enableHDash; 
            saveSetting('enableHDash', enableHDash);
            updateToggleBtn(btnToggleHDash, enableHDash, "Dash (Shift)"); 
        };
        btnToggleVDash.onclick = () => { 
            enableVDash = !enableVDash; 
            saveSetting('enableVDash', enableVDash);
            updateToggleBtn(btnToggleVDash, enableVDash, "V-Dash (Enter)"); 
        };
        btnToggleBoost.onclick = () => { 
            enableBoost = !enableBoost; 
            saveSetting('enableBoost', enableBoost);
            updateToggleBtn(btnToggleBoost, enableBoost, "Boost"); 
        };
        btnToggleBouncy.onclick = () => { 
            enableBouncy = !enableBouncy; 
            saveSetting('enableBouncy', enableBouncy);
            updateToggleBtn(btnToggleBouncy, enableBouncy, "Bouncy"); 
        };
        btnToggleCrumbling.onclick = () => { 
            enableCrumbling = !enableCrumbling; 
            saveSetting('enableCrumbling', enableCrumbling);
            updateToggleBtn(btnToggleCrumbling, enableCrumbling, "Crumbling"); 
        };

        // --- COMPETITION BUTTON HANDLER ---
        if (btnToggleCompetition) {
            btnToggleCompetition.onclick = () => {
                isCompetitionMode = !isCompetitionMode;
                saveSetting('isCompetitionMode', isCompetitionMode);
                updateToggleBtn(btnToggleCompetition, isCompetitionMode, "Competition Mode");
                applyCompetitionMode(isCompetitionMode);
            };
        }
    }

    // ----------------------------------------------------
    // 11. INITIALIZATION
    // ----------------------------------------------------
    
    loadSettings();
    updateAllVisuals();
    initEventHandlers();
    loop(); // Start the game loop

})(); // End of IIFE
