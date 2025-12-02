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
    const btnToggleEnemies = document.getElementById('btnToggleEnemies'); 

    // --- Ability Toggle Buttons ---
    const btnToggleHDash = document.getElementById('btnToggleHDash');
    const btnToggleVDash = document.getElementById('btnToggleVDash');

    // --- Platform Toggle Buttons ---
    const btnToggleBoost = document.getElementById('btnToggleBoost');
    const btnToggleBouncy = document.getElementById('btnToggleBouncy');
    const btnToggleCrumbling = document.getElementById('btnToggleCrumbling');
    const btnToggleSlow = document.getElementById('btnToggleSlow'); 

    // --- GAME MODE BUTTONS ---
    const btnModeCasual = document.getElementById('btnModeCasual');
    const btnModeProgressive = document.getElementById('btnModeProgressive');
    const btnModePlatformer = document.getElementById('btnModePlatformer'); 
    const btnModeCompetition = document.getElementById('btnModeCompetition');

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
    const slowDuration = 90; 
    const slowAmount = 2.0;   
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
        vDashCooldown: 0,
        dashDir: 1 
    };
    const platforms = [];
    const spikes = [];
    const walls = [];
    const coins = []; 
    const particles = [];
    const bgObjects = [];
    const swoopers = [];    
    const poppers = [];     
    const projectiles = []; 
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
    let slowTimer = 0; 
    let coinComboMultiplier = 1;
    let coinComboTimer = 0;
    let coinsCollectedThisLevel = 0; 

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
    let enableEnemies = true; 
    let enableSlow = true; 

    // --- GAME MODE STATE ---
    let gameMode = 'casual'; // 'casual', 'progressive', 'competition', 'platformer'
    let progressiveFeaturePool = [];
    let featureUnlockMessage = '';
    let featureUnlockTimer = 0;

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
        
        if (enableEnemies) {
            updateEnemies();
            updateProjectiles();
        }

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
        
        if (enableEnemies) {
            drawEnemies();
        }
        
        drawPlayer();
        drawCooldownBars();
        drawHUD();
        drawFeatureUnlockMessage(); // NEW: Draw unlock message
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
        if (slowTimer > 0) slowTimer--; 

        // Update coin combo timer
        if (coinComboTimer > 0) {
            coinComboTimer--;
            if (coinComboTimer === 0) {
                coinComboMultiplier = 1; // Reset combo
            }
        }
        
        // NEW: Update feature unlock timer
        if (featureUnlockTimer > 0) {
            featureUnlockTimer--;
            if (featureUnlockTimer === 0) {
                featureUnlockMessage = '';
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
    
    function updateEnemies() {
        // Update Swoopers
        for (let i = swoopers.length - 1; i >= 0; i--) {
            const swooper = swoopers[i];
            swooper.x += swooper.vx;
            swooper.bobTimer += 0.05; // Sine wave speed
            swooper.drawY = swooper.y + Math.sin(swooper.bobTimer) * 30; // 30px amplitude
            
            // Remove if off-screen
            if (swooper.x + swooper.w < cameraX - 100) {
                swoopers.splice(i, 1);
            }
        }

        // Update Poppers
        for (const popper of poppers) {
            popper.fireCooldown--;
            if (popper.fireCooldown <= 0) {
                // Check if player is somewhat nearby before firing
                if (popper.x > cameraX && popper.x < cameraX + canvas.width + 200) {
                    createProjectile(popper.x, popper.y + popper.h / 2 - 5);
                    popper.fireCooldown = 180; // 3 second cooldown
                    playSound('dash'); // Re-using a sound, you might want a new one
                }
            }
        }
    }

    function updateProjectiles() {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const proj = projectiles[i];
            proj.x += proj.vx;
            
            // Remove if off-screen
            if (proj.x + proj.w < cameraX - 100 || proj.x > worldWidth) {
                projectiles.splice(i, 1);
            }
        }
    }

    /**
     * Checks for player input (jump, dash) and applies actions.
     */
    function handleInput() {
        // Horizontal Dash
        if (enableHDash && (keys['ShiftLeft'] || keys['KeyX'] || keys['ShiftRight']) && player.dashCooldown === 0) {
            
            // MODIFIED: Set dash direction
            if (gameMode === 'platformer') {
                if (keys['ArrowLeft'] || keys['KeyA']) player.dashDir = -1;
                else player.dashDir = 1;
            } else {
                player.dashDir = 1; // Always dash right
            }

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
        // Calculate base move speed
        let currentSpeed = moveSpeed;
        if (boostTimer > 0) currentSpeed += boostAmount;
        if (slowTimer > 0) currentSpeed -= slowAmount;
        if (player.dashTimer <= 0) {
            currentSpeed = Math.max(1.0, currentSpeed);
        }

        if (gameMode === 'platformer') {
            // --- Platformer Mode Controls ---
            let targetVx = 0;
            if (player.dashTimer <= 0) { // Don't take input during dash
                if (keys['ArrowLeft'] || keys['KeyA']) {
                    targetVx = -currentSpeed;
                }
                if (keys['ArrowRight'] || keys['KeyD']) {
                    targetVx = currentSpeed;
                }
            } else {
                // Is dashing
                targetVx = player.dashDir * (currentSpeed + dashSpeed);
            }
            player.x += targetVx;

        } else {
            // --- Auto-runner Modes ---
            let runSpeed = currentSpeed;
            if (player.dashTimer > 0) runSpeed += dashSpeed;
            player.x += runSpeed;
        }

        // Gravity / Dash overrides (Vertical is the same, horizontal is handled above)
        if (player.vDashTimer > 0) {
            player.vDashTimer--;
            player.vy = vDashPower; 
            if (player.vDashTimer % 3 === 0) {
                createTrail(player.x, player.y, player.w, player.h, '#1abc9c'); 
            }
        } else if (player.dashTimer > 0) {
            player.dashTimer--;
            player.vy = 0; // Horizontal dash flattens gravity
            if (player.dashTimer % 3 === 0) {
                 createTrail(player.x, player.y, player.w, player.h, '#9b59b6'); 
            }
        } else {
            // Regular gravity
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

            const playerBottom = player.y + player.h;
            const playerTop = player.y;
            const playerRight = player.x + player.w;
            const playerLeft = player.x;
            
            const platTop = plat.y;
            const platBottom = plat.y + plat.h;
            const platLeft = plat.x;
            const platRight = plat.x + plat.w;
            
            // Calculate overlap on each side
            const overlapBottom = (playerBottom - platTop);
            const overlapTop = (platBottom - playerTop);
            const overlapLeft = (playerRight - platLeft);
            const overlapRight = (platRight - playerLeft);

            // Find the *smallest* overlap. This is the side of collision.
            const minOverlap = Math.min(overlapBottom, overlapTop, overlapLeft, overlapRight);
            

            if (plat.isTunnel) {
                // Tunnel logic (only cares about top/bottom)
                if (minOverlap === overlapTop && player.vy < 0) {
                    player.y = plat.y + plat.h; // Hit head
                    player.vy = 0; 
                }
                else if (minOverlap === overlapBottom && player.vy >= 0) {
                    player.y = plat.y - player.h; // Land on top
                    if (player.vy > 5) playSound('land');
                    player.vy = 0; 
                    player.onGround = true; 
                    createDust(player.x + player.w / 2, player.y + player.h);
                }
            } else {
                // Regular platform logic
                
                // Check for landing on top
                if (player.vy >= 0 && (player.y + player.h - player.vy) <= plat.y + 1) { // Added +1 for tolerance
                    
                    if (plat.isBouncy) {
                        player.y = plat.y - player.h;
                        player.vy = jumpPower * 1.5; 
                        player.onGround = false;
                        createBouncyRipple(plat.x, plat.y, plat.w);
                        createDust(player.x + player.w / 2, player.y + player.h);
                        playSound('powerup');
                        if(enableCoins) score += 25;
                    } else {
                        player.y = plat.y - player.h; // Snap to top
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
                        else if (plat.isSlow) { 
                             if(slowTimer === 0) {
                                 if(enableCoins) score += 25; 
                                 playSound('land'); 
                             }
                             slowTimer = slowDuration;
                             createDust(player.x + player.w / 2, player.y + player.h);
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
                // NEW: Handle side collisions for platformer mode
                else if (gameMode === 'platformer') {
                    if (minOverlap === overlapLeft) {
                        player.x = plat.x - player.w; // Hit from left
                    } else if (minOverlap === overlapRight) {
                        player.x = plat.x + plat.w; // Hit from right
                    } else if (minOverlap === overlapTop) {
                        player.y = plat.y + plat.h; // Hit from bottom
                        player.vy = 0;
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
                const playerTop = player.y;
                const playerRight = player.x + player.w;
                const playerLeft = player.x;
                
                const wallTop = wall.y;
                const wallBottom = wall.y + wall.h;
                const wallLeft = wall.x;
                const wallRight = wall.x + wall.w;

                // Calculate overlap on each side
                const overlapBottom = (playerBottom - wallTop);
                const overlapTop = (wallBottom - playerTop);
                const overlapLeft = (playerRight - wallLeft);
                const overlapRight = (wallRight - playerLeft);

                // Find the *smallest* overlap. This is the side of collision.
                const minOverlap = Math.min(overlapBottom, overlapTop, overlapLeft, overlapRight);

                if (minOverlap === overlapBottom && player.vy >= 0) {
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
                } 
                else if (gameMode === 'platformer') {
                    // Platformer mode side collision
                    if (minOverlap === overlapLeft) {
                        player.x = wall.x - player.w; // Hit from left
                    } else if (minOverlap === overlapRight) {
                        player.x = wall.x + wall.w; // Hit from right
                    }
                }
                else {
                    // Auto-runner side collision (death)
                    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                         if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
                         handlePlayerDeath();
                         return;
                    }
                }
            }
        }

        if (enableEnemies) {
            // Player vs. Swooper
            for (const swooper of swoopers) {
                // Use swooper.drawY for accurate collision
                if (rectsCollide(player, { x: swooper.x, y: swooper.drawY, w: swooper.w, h: swooper.h })) {
                    if (player.dashTimer > 0 || player.vDashTimer > 0) {
                        continue; 
                    }
                    handlePlayerDeath();
                    return;
                }
            }

            // Player vs. Popper (body)
            for (const popper of poppers) {
                if (rectsCollide(player, popper)) {
                    if (player.dashTimer > 0 || player.vDashTimer > 0) continue; 
                    handlePlayerDeath();
                    return;
                }
            }

            // Player vs. Projectile
            for (let i = projectiles.length - 1; i >= 0; i--) {
                const proj = projectiles[i];
                if (rectsCollide(player, proj)) {
                    if (player.dashTimer > 0 || player.vDashTimer > 0) {
                        // SKILL: Dashing through a projectile destroys it!
                        projectiles.splice(i, 1);
                        createExplosion(proj.x, proj.y, '#f39c12'); // Particle burst
                        playSound('powerup'); // Or a new "parry" sound
                    } else {
                        // Hit!
                        handlePlayerDeath();
                        return;
                    }
                }
            }
        }
        // --- END: Enemy Collisions ---

        // Coin Collision
        if (enableCoins) {
            for (let i = coins.length - 1; i >= 0; i--) {
                if (rectsCollide(player, coins[i])) {
                    let speedMult = (moveSpeed / 4.5); 
                    let lifeMult = 1 + (2 / startingLives); 
                    let levelMult = 1 + (levelNumber * 0.2);
                    
                    let basePoints = Math.floor(100 * speedMult * lifeMult * levelMult);
                    let points = basePoints * coinComboMultiplier; 
                    score += points; 
                    
                    coinComboMultiplier++; 
                    coinComboTimer = COMBO_TIMER_DURATION; 

                    playSound('coin');
                    createCoinSparkle(coins[i].x, coins[i].y);
                    coins.splice(i, 1);
                    
                    coinsCollectedThisLevel++; 
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
                let speedMult = (moveSpeed / 4.5); 
                let lifeMult = 1 + (2 / startingLives); 
                let levelMult = 1 + (levelNumber * 0.2);
                let levelBonus = Math.floor(500 * speedMult * lifeMult * levelMult);
                score += levelBonus; 
                
                if (coinsCollectedThisLevel === COINS_FOR_EXTRA_LIFE) {
                    lives++;
                    playSound('powerup'); 
                }
            }

            playSound('win');
            
            // --- NEW: Progressive Mode Logic ---
            if (gameMode === 'progressive' && progressiveFeaturePool.length > 0) {
                const featureKey = progressiveFeaturePool.pop();
                unlockFeature(featureKey);
            }
            // --- End Progressive Mode Logic ---

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
    // MODIFIED: This function now locks the camera from moving left in ALL modes
    function updateCamera() {
        const cameraMargin = 300;
        let newCamX = Math.max(0, Math.min(player.x - cameraMargin, worldWidth - canvas.width));
        
        // Camera can only move right, or stay still.
        // This now applies to ALL game modes as requested.
        cameraX = Math.max(cameraX, newCamX);
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
        // --- NEW: Add shadow to all entities ---
        ctx.save(); 
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowOffsetX = 2;

        // Platforms
        for (const plat of platforms) {
            if (plat.isTunnel) ctx.fillStyle = '#777'; 
            else if (plat.isBoost) ctx.fillStyle = '#2ecc71'; 
            else if (plat.isSlow) ctx.fillStyle = '#3498db'; // NEW: Draw slow platform
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

        // --- NEW: Restore context to remove shadow for next draw calls ---
        ctx.restore(); 
    }

    function drawEnemies() {
        // --- NEW: Add shadow to all enemies ---
        ctx.save(); 
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowOffsetX = 2;
        
        // Draw Swoopers (use drawY for sine wave)
        ctx.fillStyle = '#c0392b'; // Dark red
        for (const swooper of swoopers) {
            ctx.fillRect(swooper.x - cameraX, swooper.drawY, swooper.w, swooper.h);
        }

        // Draw Poppers
        ctx.fillStyle = '#8e44ad'; // Purple
        for (const popper of poppers) {
            ctx.fillRect(popper.x - cameraX, popper.y, popper.w, popper.h);
        }

        // Draw Projectiles
        ctx.fillStyle = '#f39c12'; // Orange
        for (const proj of projectiles) {
            ctx.fillRect(proj.x - cameraX, proj.y, proj.w, proj.h);
        }

        // --- NEW: Restore context to remove shadow ---
        ctx.restore();
    }

    function drawPlayer() {
        // Don't draw player if they are in the death transition
        if (isTransitioning) return;

        // --- NEW: Add shadow to player ---
        ctx.save(); 
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetY = 3;
        ctx.shadowOffsetX = 2;


        if (player.dashTimer > 0 || player.vDashTimer > 0) {
            ctx.fillStyle = (Math.floor(player.dashTimer / 3) % 2 === 0 || Math.floor(player.vDashTimer / 3) % 2 === 0) ? '#ffffff' : playerSkin;
        } else if (boostTimer > 0) {
            ctx.fillStyle = (Math.floor(boostTimer / 5) % 2 === 0) ? '#2ecc71' : playerSkin;
        } else if (slowTimer > 0) { // NEW: Visual indicator for slow
             ctx.fillStyle = (Math.floor(slowTimer / 5) % 2 === 0) ? '#3498db' : playerSkin;
        } else {
            ctx.fillStyle = playerSkin; 
        }
        ctx.fillRect(player.x - cameraX, player.y, player.w, player.h);

        // --- NEW: Restore context to remove shadow ---
        ctx.restore();
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

    // NEW: Draw function for feature unlock message
    function drawFeatureUnlockMessage() {
        if (featureUnlockTimer > 0) {
            let alpha = Math.min(1.0, featureUnlockTimer / 30); // Fade in/out
            if (featureUnlockTimer < 30) alpha = featureUnlockTimer / 30;
            if (featureUnlockTimer > 150) alpha = (180 - featureUnlockTimer) / 30;
            
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(canvas.width / 2 - 200, canvas.height / 2 - 40, 400, 80);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(featureUnlockMessage, canvas.width / 2, canvas.height / 2 + 8);
            ctx.restore();
        }
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
        coinsCollectedThisLevel = 0; 
        
        // NEW: Apply game mode settings
        applyGameModeSettings();
        
        randomLevel(); 
    }
    
    // MODIFIED: Handle game mode logic
    function applyGameModeSettings() {
        // Reset all toggles to their saved state first (for casual)
        loadSettings(); 
        
        if (gameMode === 'casual' || gameMode === 'platformer') {
            // Settings are already loaded, just use them.
        } 
        else if (gameMode === 'competition') {
            // Force all settings ON, use defaults for values
            startingLives = 3;
            maxLevels = Infinity; 
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
            enableEnemies = true; 
            enableSlow = true;
        }
        else if (gameMode === 'progressive') {
            // Force gameplay settings OFF, but cosmetics ON.
            startingLives = 3; // Use default lives
            maxLevels = Infinity; // Progressive is endless
            baseMoveSpeed = 4.5; // Use default speed
            
            enableWalls = false;
            enableTunnels = false;
            enableParticles = true; // <-- Stays ON
            enableBg = true;        // <-- Stays ON
            enableCoins = true; 
            enableSound = true;     // <-- Stays ON
            enableHDash = false;
            enableVDash = false;
            enableBoost = false;
            enableBouncy = false;
            enableCrumbling = false;
            enableEnemies = false; 
            enableSlow = false;
            
            // Build and shuffle the feature pool
            buildProgressiveFeaturePool();
        }
    }
    
    // MODIFIED: Create the pool of features to unlock
    function buildProgressiveFeaturePool() {
        // Removed Particles, Bg, and Sound
        progressiveFeaturePool = [
            'enableWalls', 'enableTunnels', 'enableHDash', 'enableVDash',
            'enableBoost', 'enableBouncy', 'enableCrumbling', 'enableEnemies',
            'enableSlow'
        ];
        
        // Shuffle the pool
        shuffle(progressiveFeaturePool);
    }
    
    // MODIFIED: Logic to unlock a feature and set the message
    function unlockFeature(featureKey) {
        let featureName = 'Unknown';
        
        switch (featureKey) {
            case 'enableWalls': enableWalls = true; featureName = 'Walls'; break;
            case 'enableTunnels': enableTunnels = true; featureName = 'Tunnels'; break;
            case 'enableHDash': enableHDash = true; featureName = 'Horizontal Dash'; break;
            case 'enableVDash': enableVDash = true; featureName = 'Vertical Dash'; break;
            case 'enableBoost': enableBoost = true; featureName = 'Boost Platforms'; break;
            case 'enableBouncy': enableBouncy = true; featureName = 'Bouncy Platforms'; break;
            case 'enableCrumbling': enableCrumbling = true; featureName = 'Crumbling Platforms'; break;
            case 'enableEnemies': enableEnemies = true; featureName = 'Enemies'; break;
            case 'enableSlow': enableSlow = true; featureName = 'Slow Platforms'; break;
        }
        
        featureUnlockMessage = `Feature Unlocked: ${featureName}!`;
        featureUnlockTimer = 180; // 3 seconds
        playSound('win'); // Play a little chime
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
        swoopers.length = 0;    
        poppers.length = 0;     
        projectiles.length = 0; 
        
        // Reset player
        player.x = 50; player.y = 334; player.vx = 0; player.vy = 0;
        cameraX = 0;
        boostTimer = 0;
        slowTimer = 0; 
        player.dashTimer = 0; 
        player.dashCooldown = 0; 
        player.vDashTimer = 0;     
        player.vDashCooldown = 0; 
        coinComboMultiplier = 1; 
        coinComboTimer = 0;      
        coinsCollectedThisLevel = 0; 

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
        if (gameMode !== 'platformer') {
            platforms.push({ x: 0, y: 376, w: worldWidth, h: 24 });
        }

        // Platforms
        const numPlatforms = 20 + difficulty;
        let currentX = player.x, currentY = player.y;

        if (gameMode === 'platformer') {
            platforms.push({ x: 30, y: 376, w: 100, h: 14 }); // Starting platform
            currentX = 30;
            currentY = 376;
            player.x = 50; // Place player on it
            player.y = 376 - player.h;
        }

        for (let i = 0; i < numPlatforms; i++) {
            const pw = Math.max(30, 50 - difficulty + Math.random() * 50);
            let nextX, nextY;

            if (gameMode === 'platformer') {
                let hGap = 50 + Math.random() * 60; // Horizontal gap
                let vGap = Math.random() * 140 - 70; // Vertical gap
                nextX = Math.min(currentX + hGap, worldWidth - 100);
                nextY = Math.max(100, Math.min(currentY + vGap, 360)); // Clamp Y
            } else {
                let gap = 100 + Math.random() * 80 + difficulty * 5;
                nextX = Math.min(currentX + gap, worldWidth - 100);
                nextY = Math.max(250, Math.min(currentY + (Math.random() * 40 - 20), 360));
                if (Math.random() < 0.3) nextY -= 50; // Chance for a higher jump (auto-runner)
            }

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
            else if (enableBoost && typeRoll < 0.35) platform.isBoost = true;
            else if (enableBouncy && typeRoll < 0.45) platform.isBouncy = true;
            else if (enableCrumbling && typeRoll < 0.55) { 
                platform.isCrumbling = true;
                platform.crumbleTimer = -1; 
            }
            else if (enableSlow && typeRoll < 0.65) { 
                platform.isSlow = true;
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
        if (gameMode === 'platformer') {
            // Spawn on the last platform
            let lastPlat = platforms[platforms.length - 1];
            door.x = lastPlat.x + (lastPlat.w / 2) - (door.w / 2);
            door.y = lastPlat.y - door.h;
        } else {
            // Original logic
            door.x = worldWidth - 60;
            door.y = Math.max(currentY - 50, 60);
        }


        // Spikes
        // MODIFIED: Improved safe-zone checking
        const numPatterns = Math.min(2 + difficulty, 10);
        for (let i = 0; i < numPatterns; i++) {
            const patternType = Math.random() < 0.5 ? 'line' : (Math.random() < 0.5 ? 'staggered' : 'gap');
            let baseX, baseY;
            let safeToSpawn = false;

            do {
                // 1. Get a position
                baseX = 100 + Math.random() * (worldWidth - 200);
                if (gameMode === 'platformer') {
                     // In platformer, spikes MUST be on platforms
                    let plat = platforms[Math.floor(Math.random() * platforms.length)];
                    if (plat) {
                        baseY = plat.y - spikeHeight;
                        baseX = plat.x + Math.random() * (plat.w - (spikeWidth * 3)); // *3 for pattern width
                    } else {
                        baseY = 500; // off-screen
                    }
                } else {
                    // Original logic
                    baseY = Math.random() < 0.7 ? 376 - spikeHeight : platforms[Math.floor(Math.random() * platforms.length)].y - spikeHeight;
                }
                
                // 2. Check if it's safe
                const playerSafeZone = { x: player.x - 50, y: player.y - 100, w: 200, h: 200 };
                const doorSafeZone = { x: door.x - 60, y: door.y - 60, w: 120, h: 120 };
                const spikeRect = { x: baseX, y: baseY, w: spikeWidth * 3, h: spikeHeight }; // *3 for pattern
                
                safeToSpawn = !rectsCollide(spikeRect, playerSafeZone) && !rectsCollide(spikeRect, doorSafeZone);

            } while (!safeToSpawn); // 3. Reroll if not safe
            
            placeSpikePattern(baseX, baseY, patternType, 3 + Math.floor(Math.random() * 3));
        }

        // Walls
        // MODIFIED: REMOVED "&& gameMode !== 'platformer'"
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

        if (enableEnemies) {
            const usablePlatforms = platforms.slice(1); 

            // Spawn Poppers on platforms
            const numPoppers = 1 + Math.floor(difficulty / 2);
            for (let i = 0; i < numPoppers && usablePlatforms.length > 0; i++) {
                const plat = usablePlatforms[Math.floor(Math.random() * usablePlatforms.length)];
                
                if (plat.vx || plat.vy) continue; 

                poppers.push({
                    x: plat.x + plat.w / 2 - 10,
                    y: plat.y - 20, 
                    w: 20, h: 20,
                    fireCooldown: 120 + Math.random() * 60 
                });
            }

            // Spawn Swoopers in the air
            const numSwoopers = 1 + Math.floor(difficulty / 2);
            for (let i = 0; i < numSwoopers; i++) {
                let spawnX;
                do {
                    spawnX = 400 + Math.random() * (worldWidth - 600);
                } while ((spawnX > player.x - 100 && spawnX < player.x + 200) || (spawnX > door.x - 150 && spawnX < door.x + 150));
                
                let spawnY = 150 + Math.random() * 100; 
                swoopers.push({
                    x: spawnX,
                    y: spawnY,      
                    drawY: spawnY,  
                    w: 25, h: 25,
                    vx: -1.5 - (difficulty * 0.1), 
                    bobTimer: Math.random() * Math.PI * 2 
                });
            }
        }
    }

    // ----------------------------------------------------
    // 9. UTILITY, SOUND, & PARTICLE HELPERS
    // ----------------------------------------------------
    
    // NEW: Shuffle array utility
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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

    function createProjectile(x, y) {
        projectiles.push({
            x: x,
            y: y,
            w: 10,
            h: 10,
            vx: -3 - (levelNumber * 0.1) 
        });
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
        // The death explosion should always play, regardless of settings.
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
            btnToggleHDash, btnToggleVDash, btnToggleBoost, btnToggleBouncy, btnToggleCrumbling,
            btnToggleEnemies, btnToggleSlow 
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
     * Loads all settings from localStorage on game start.
     */
    function loadSettings() {
        // Load game mode
        gameMode = localStorage.getItem('gameMode') || 'casual';
    
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
        enableEnemies = saved('enableEnemies') === null ? true : (saved('enableEnemies') === 'true'); 
        enableSlow = saved('enableSlow') === null ? true : (saved('enableSlow') === 'true'); 
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
        updateToggleBtn(btnToggleEnemies, enableEnemies, "Enemies"); 
        updateToggleBtn(btnToggleHDash, enableHDash, "Dash (Shift)");
        updateToggleBtn(btnToggleVDash, enableVDash, "V-Dash (Enter)");
        updateToggleBtn(btnToggleBoost, enableBoost, "Boost");
        updateToggleBtn(btnToggleBouncy, enableBouncy, "Bouncy");
        updateToggleBtn(btnToggleCrumbling, enableCrumbling, "Crumbling");
        updateToggleBtn(btnToggleSlow, enableSlow, "Slow");

        // NEW: Update game mode button visuals
        updateModeButtonVisuals();
    }
    
    // MODIFIED: Function to update game mode buttons
    function updateModeButtonVisuals() {
        // Reset all
        btnModeCasual.classList.remove('selected');
        btnModeProgressive.classList.remove('selected');
        btnModePlatformer.classList.remove('selected'); 
        btnModeCompetition.classList.remove('selected');
        
        // Apply 'selected' class to the active mode
        if (gameMode === 'casual') {
            btnModeCasual.classList.add('selected');
        } else if (gameMode === 'progressive') {
            btnModeProgressive.classList.add('selected');
        } else if (gameMode === 'platformer') { 
            btnModePlatformer.classList.add('selected');
        } else if (gameMode === 'competition') {
            btnModeCompetition.classList.add('selected');
        }
        
        // Lock or unlock the settings panel
        const isSettingsLocked = (gameMode === 'progressive' || gameMode === 'competition');
        updateSettingsLock(isSettingsLocked);
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
        // --- Lock settings on load based on saved mode ---
        updateSettingsLock(gameMode === 'progressive' || gameMode === 'competition');

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
                // In comp or progressive mode, only allow restart on game over
                if (gameMode === 'competition' || gameMode === 'progressive') {
                    if (gameLost || gameWon) {
                        resetGame();
                    }
                } else {
                    // Original logic for casual/platformer mode
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
        
        btnToggleEnemies.onclick = () => {
            enableEnemies = !enableEnemies;
            saveSetting('enableEnemies', enableEnemies);
            updateToggleBtn(btnToggleEnemies, enableEnemies, "Enemies");
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

        // NEW: Event handler for the slow toggle
        btnToggleSlow.onclick = () => { 
            enableSlow = !enableSlow; 
            saveSetting('enableSlow', enableSlow);
            updateToggleBtn(btnToggleSlow, enableSlow, "Slow"); 
        };

        // --- NEW: GAME MODE BUTTON HANDLERS ---
        btnModeCasual.onclick = () => {
            gameMode = 'casual';
            saveSetting('gameMode', gameMode);
            updateModeButtonVisuals();
        };
        btnModeProgressive.onclick = () => {
            gameMode = 'progressive';
            saveSetting('gameMode', gameMode);
            updateModeButtonVisuals();
            hideAllPanels(); // Hide settings panels as they are now locked
        };
        btnModePlatformer.onclick = () => { 
            gameMode = 'platformer';
            saveSetting('gameMode', gameMode);
            updateModeButtonVisuals();
        };
        btnModeCompetition.onclick = () => {
            gameMode = 'competition';
            saveSetting('gameMode', gameMode);
            updateModeButtonVisuals();
            hideAllPanels(); // Hide settings panels as they are now locked
        };
    }

    // ----------------------------------------------------
    // 11. INITIALIZATION
    // ----------------------------------------------------
    
    loadSettings();
    updateAllVisuals();
    initEventHandlers();
    loop(); // Start the game loop

})(); // End of IIFE
