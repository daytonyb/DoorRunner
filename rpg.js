// --- LEVEL CONFIGURATION ---

const GRID_SIZE = 9; 
const ALPHABET = "ABCDEFGHI";

// --- TUTORIAL TEXT CONFIGURATION ---
const TUTORIAL_MESSAGES = {
    'Tutorial-1': { title: "Basics: Movement", text: "Welcome, Wizard!<br><br>Use <b>WASD</b> or <b>ARROWS</b> to move.<br>Reach <b>the door</b>." },
    'Tutorial-2': { title: "Basics: Combat", text: "Enemies block your path!<br><br>Press <b>SPACE</b> to attack orthogonally.<br>Defeat all enemies." },
    'Tutorial-3': { title: "Basics: Defense", text: "Enemies fight back.<br><br>Basic enemies only attack <b>diagonally</b>.<br>Don't stand on the corners!" },
    'Tutorial-Boss': { title: "Final Exam", text: "Defeat the Construct.<br><br>You get <b>two actions</b> for every <b>one action</b> it takes." }
};

const LEVELS = {
    '0': {
        name: "Main Menu",
        walls: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], 
        portals: [
            { pos: "A1", targetLevel: '1-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: '2-1', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: '3-1', targetPos: "A1", type: "portal", label: "3" },
            { pos: "G1", targetLevel: '4-1', targetPos: "A1", type: "portal", label: "4" },
            { pos: "I1", targetLevel: '5-1', targetPos: "A1", type: "portal", label: "5" },
            { pos: "A5", type: "inventory", label: "📦" },
            // NEW PORTAL TO INDEX.HTML
            { pos: "I5", type: "portal", label: "🏠", redirect: "index.html" },
            { pos: "E4", targetLevel: 'Tutorial-1', targetPos: "E2", type: "portal", label: "?" } 
        ],
        enemies: [], items: []
    },

    // --- TUTORIAL ---
    'Tutorial-1': { name: "Tutorial: Movement", walls: ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7"], portals: [{ pos: "E8", targetLevel: 'Tutorial-2', targetPos: "E2", type: "door" }] },
    'Tutorial-2': { name: "Tutorial: Attacking", walls: ["D4","D5","D6", "F4","F5","F6"], portals: [{ pos: "E8", targetLevel: 'Tutorial-3', targetPos: "E2", type: "door" }], enemies: [{ pos: "E5", hp: 5 }] },
    'Tutorial-3': { name: "Tutorial: Defense", walls: [], portals: [{ pos: "E8", targetLevel: 'Tutorial-Boss', targetPos: "E2", type: "door" }], enemies: [{ pos: "E5", hp: 8 }] },
    'Tutorial-Boss': { name: "Tutorial: Final Exam", walls: ["A1","A9","I1","I9"], portals: [{ pos: "E8", targetLevel: '0', targetPos: "E4", type: "door" }], enemies: [{ pos: "D5"},{ pos: "F5"}] },

    // --- LEVEL 1: SEWERS ---
    '1-1': { name: "Sewers - The Tunnels", walls: ["B3", "B5", "B6", "D2", "D4", "D5", "F4", "F5", "F7", "H4", "H6"], hazards: ["C4", "C5", "G3", "G4", "E6", "F6"], portals: [ { pos: "I9", targetLevel: '1-2', targetPos: "A1", type: "door" } ], enemies: [{pos: "C8"}, {pos: "E1"}, {pos: "A5"}] },
    '1-2': { name: "Sewers - Sludge Pit", walls: ["C3", "C4", "C5", "C6", "G3", "G4", "G5", "G6"], hazards: ["D4", "D5", "E4", "E5", "F4", "F5"], portals: [ { pos: "I9", targetLevel: '1-3', targetPos: "A1", type: "door" } ], enemies: [{pos: "E3"}, {pos: "E6"}, {pos: "B5"}, {pos: "H4"}, {pos: "H8"}] },
    '1-3': { name: "Sewers - The Armory", walls: ["C2", "C3", "C4", "G2", "G3", "G4", "C7", "D7", "F7", "G7",], portals: [ { pos: "I9", targetLevel: '1-Boss', targetPos: "E1", type: "door" } ], enemies: [{pos: "E3"}, {pos: "E5"}, {pos: "E7"}, {pos: "E1"}, {pos: "E9"}], items: [{pos: "A9", type: "weapon", value: 2, name: "Rusty Sword"}, {pos: "I1", type: "potion", value: 5}] },
    '1-Boss': { name: "Sewers - BOSS FIGHT", walls: [], portals: [ { pos: "E9", targetLevel: '0', targetPos: "E6", type: "door" } ], enemies: [{pos: "E5", isBoss: true}] },
    
    // --- LEVEL 2: FOREST ---
    '2-1': { name: "Forest - Overgrowth", walls: ["B2", "B3", "B4", "H6", "H7", "H8"], thickets: ["C2", "C3", "C4", "D2", "D3", "G6", "G7", "F6", "F7"], portals: [{pos: "I9", targetLevel: '2-2', targetPos: "A1", type: "door"}], enemies: [{pos: "D5"}, {pos: "G2"}, {pos: "B8"}] },
    '2-2': { name: "Forest - Rapids", walls: ["A5", "B5", "H5", "I5"], rivers: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], thickets: ["D2", "D8", "F2", "F8"], portals: [{pos: "I9", targetLevel: '2-3', targetPos: "A1", type: "door"}], enemies: [{pos: "C5"}, {pos: "G5"}, {pos: "F1"}] },
    '2-3': { name: "Forest - Spider Nest", walls: ["C3", "C7", "G3", "G7", "E5"], portals: [{pos: "I9", targetLevel: '2-Boss', targetPos: "E1", type: "door"}], enemies: [ {pos: "C5", type: "ranged"}, {pos: "G5", type: "ranged"}, {pos: "E3", type: "ranged"} ], items: [ {pos: "A9", type: "potion", value: 5}, {pos: "E9", type: "weapon", value: 2, name: "Rusty Sword"} ] },
    '2-Boss': { name: "Forest - BROODMOTHER", walls: ["A1", "A9", "I1", "I9"], thickets: ["C3", "C7", "G3", "G7"], portals: [{pos: "E9", targetLevel: '0', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "summoner"}] },

    // --- LEVEL 3: MINES ---
    '3-1': { name: "Mines - Collapse", walls: ["B2", "B8", "H2", "H8"], boulders: ["C5", "D5", "E5", "F5", "G5", "E3", "E7"], portals: [{pos: "I9", targetLevel: '3-2', targetPos: "A1", type: "door"}], enemies: [{pos: "E5", type: "golem", hp: 15}] },
    '3-2': { name: "Mines - Golem Hall", walls: ["C3", "C7", "G3", "G7"], boulders: ["B2", "B8", "H2", "H8", "D5", "F5"], portals: [{pos: "I9", targetLevel: '3-3', targetPos: "A1", type: "door"}], enemies: [{pos: "E2", type: "golem", hp: 15}, {pos: "E8", type: "golem", hp: 15}, {pos: "H5", type: "golem", hp: 15}], items: [{pos: "E5", type: "potion", value: 5}] },
    '3-3': { name: "Mines - The Colony", walls: [], boulders: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8"], portals: [{pos: "I9", targetLevel: '3-Boss', targetPos: "E1", type: "door"}], enemies: [{pos: "E4", type: "golem", hp: 15}, {pos: "E6", type: "golem", hp: 15}, {pos: "A5", type: "bat", hp: 4}, {pos: "B5", type: "bat", hp: 4}, {pos: "H2", type: "bat", hp: 4}, {pos: "H8", type: "bat", hp: 4}], items: [{pos: "A9", type: "weapon", value: 2, name: "Rusty Sword"}] },
    '3-Boss': { name: "Mines - EARTHSHAKER", walls: ["A1", "A9", "I1", "I9"], boulders: ["C3", "C7", "G3", "G7"], portals: [{pos: "E9", targetLevel: '0', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "shaker", hp: 50}] },

    // --- LEVEL 4: THE CASTLE ---
    '4-1': { name: "Castle - Gatehouse", walls: ["C3","C7","G3","G7"], spikes: ["C5","D5","E5","F5","G5", "E3","E7"], portals: [{pos: "I9", targetLevel: '4-2', targetPos: "A1", type: "door"}], enemies: [{pos: "E5", type: "guard", hp: 12}] },
    '4-2': { name: "Castle - Clockwork Hall", walls: ["B2","B8","H2","H8"], spikes: ["C2","C4","C6","C8", "E2","E4","E6","E8", "G2","G4","G6","G8"], portals: [{pos: "I9", targetLevel: '4-3', targetPos: "A1", type: "door"}], enemies: [ {pos: "E5", type: "guard", hp: 12}, {pos: "C5", type: "guard", hp: 12}, {pos: "G5", type: "guard", hp: 12} ], items: [{pos: "E2", type: "potion", value: 5}] },
    '4-3': { name: "Castle - Royal Quarters", walls: [], spikes: ["B2","B3","B4","B5","B6","B7","B8", "H2","H3","H4","H5","H6","H7","H8"], portals: [{pos: "I9", targetLevel: '4-Boss', targetPos: "E1", type: "door"}], enemies: [ {pos: "E5", type: "guard", hp: 12}, {pos: "A5", type: "mage", hp: 6}, {pos: "I5", type: "mage", hp: 6} ], items: [{pos: "A9", type: "weapon", value: 2, name: "Steel Sword"}] },
    '4-Boss': { name: "Castle - THE MAD KING", walls: ["A1","A9","I1","I9"], spikes: ["C3","C7","G3","G7"], portals: [{pos: "E9", targetLevel: '0', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "king", hp: 60}] },

    // --- EX LEVELS ---
    'EX-1-1': { name: "EX-1: Rabid Tunnels", walls: ["B2", "D2", "F2", "H2", "B8", "D8", "F8", "H8"], hazards: ["C5", "E5", "G5"], portals: [ { pos: "I5", targetLevel: 'EX-1-2', targetPos: "A5", type: "door" } ], enemies: [ {pos: "E3", type: "fast", hp: 4}, {pos: "E7", type: "fast", hp: 4} ] },
    'EX-1-2': { name: "EX-1: Toxic Nest", walls: ["C3", "C7", "G3", "G7"], hazards: ["A1","A2","A3","A7","A8","A9", "I1","I2","I3","I7","I8","I9"], portals: [ { pos: "E9", targetLevel: 'EX-1-3', targetPos: "E1", type: "door" } ], enemies: [ {pos: "B5", type: "fast", hp: 4}, {pos: "H4", type: "fast", hp: 4},{pos: "H6", type: "fast", hp: 4}, {pos: "E6", type: "melee", hp: 12},{pos: "E4", type: "melee", hp: 12} ] },
    'EX-1-3': { name: "EX-1: The Swarm", walls: [], hazards: ["E5"], portals: [ { pos: "I9", targetLevel: 'EX-1-Boss', targetPos: "A1", type: "door" } ], enemies: [ {pos: "C3", type: "fast", hp: 4}, {pos: "G3", type: "fast", hp: 4}, {pos: "C7", type: "fast", hp: 4},{pos: "G5", type: "fast", hp: 4},{pos: "C5", type: "fast", hp: 4}, {pos: "G7", type: "fast", hp: 4} ], items: [ {pos: "A9", type: "potion", value: 5}, {pos: "I1", type: "weapon", value: 2, name: "Rusty Sword"} ] },
    'EX-1-Boss': { name: "EX-BOSS: PLAGUE KING", walls: ["B2", "B8", "H2", "H8"], hazards: ["A1", "A9", "I1", "I9"], portals: [ { pos: "E5", targetLevel: '0', targetPos: "A9", type: "door" } ], enemies: [{pos: "E5", isBoss: true, type: "summoner", hp: 40}] },

    'EX-2-1': { name: "EX-2: Poison Flow", walls: ["B2","B8","H2","H8"], rivers: ["D1","D2","D3","D4","D5","D6","D7","D8", "F1","F2","F3","F4","F5","F6","F7","F8"], thickets: ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7"], hazards:  ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7", "D9", "F9"], portals: [{pos: "E9", targetLevel: 'EX-2-2', targetPos: "A5", type: "door"}], enemies: [{pos: "A5", type: "fast", hp: 6}, {pos: "I5", type: "fast", hp: 6}, {pos: "E4", type: "ranged"},{pos: "E6", type: "ranged"} ] },
    'EX-2-2': { name: "EX-2: Thorny Mud", walls: ["B2","B4","B6","B8", "H2","H4","H6","H8"], thickets: ["C2","C3","C4","C5","C6","C7","C8", "E2","E3","E4","E5","E6","E7","E8", "G2","G3","G4","G5","G6","G7","G8"], hazards: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8"], portals: [{pos: "I5", targetLevel: 'EX-2-3', targetPos: "A5", type: "door"}], enemies: [{pos: "D5", type: "fast", hp: 6}, {pos: "F5", type: "fast", hp: 6}, {pos: "E9", type: "ranged"},{pos: "E1", type: "ranged"},{pos: "I5", type: "ranged"}] },
    'EX-2-3': { name: "EX-2: The Drain", walls: [], rivers: ["B2","B3","B4","B5","B6","B7","B8", "H2","H3","H4","H5","H6","H7","H8"], thickets: ["A1","A9","I1","I9"], hazards: ["E5", "D5", "F5", "E4", "E6"], portals: [{pos: "E9", targetLevel: 'EX-2-Boss', targetPos: "E1", type: "door"}], enemies: [{pos: "C5", type: "fast", hp: 8}, {pos: "G5", type: "fast", hp: 8}, {pos: "E2", type: "ranged"}, {pos: "E8", type: "ranged"}], items: [{pos: "A4", type: "potion", value: 5}, {pos: "A6", type: "weapon", value: 2, name: "Rusty Sword"}] },
    'EX-2-Boss': { name: "EX-BOSS: SWAMP HYDRA", walls: ["A1","A9","I1","I9"], thickets: ["D4","D5","D6", "F4","F5","F6", "E4","E6"], hazards:  ["D4","D5","D6", "F4","F5","F6", "E4","E6"], portals: [{pos: "E9", targetLevel: '0', targetPos: "C9", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "summoner", hp: 50}] },

    // --- EX-3: FROZEN DEPTHS ---
    'EX-3-1': { 
        name: "EX-3: Slippery Slope", walls: ["B2","B8","H2","H8"], 
        ice: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8", "D5","E5","F5"],
        portals: [{pos: "E9", targetLevel: 'EX-3-2', targetPos: "A5", type: "door"}], 
        enemies: [{pos: "E5", type: "yeti", hp: 15}] 
    },
    'EX-3-2': { 
        name: "EX-3: Frozen Lake", walls: [], 
        ice: ["B2","B3","B4","B5","B6","B7","B8","C2","C3","C4","C5","C6","C7","C8","D2","D3","D4","D5","D6","D7","D8","E2","E3","E4","E5","E6","E7","E8","F2","F3","F4","F5","F6","F7","F8","G2","G3","G4","G5","G6","G7","G8","H2","H3","H4","H5","H6","H7","H8"],
        portals: [{pos: "E9", targetLevel: 'EX-3-3', targetPos: "A5", type: "door"}], 
        enemies: [ {pos: "C5", type: "wraith", hp: 6}, {pos: "G5", type: "wraith", hp: 6}, {pos: "E5", type: "yeti", hp: 15} ],
        items: [{pos: "A1", type: "potion", value: 10}]
    },
    'EX-3-3': { 
        name: "EX-3: The Glacier", walls: ["C3","G3","C7","G7"], 
        ice: ["A2","A3","A4","A5","A6","A7","A8", "I2","I3","I4","I5","I6","I7","I8"], 
        portals: [{pos: "E9", targetLevel: 'EX-3-Boss', targetPos: "E2", type: "door"}], 
        enemies: [ {pos: "B5", type: "fast", hp: 8}, {pos: "H5", type: "fast", hp: 8}, {pos: "E5", type: "yeti", hp: 15} ] 
    },
    'EX-3-Boss': { 
        name: "EX-BOSS: ICE QUEEN", walls: ["A1","A9","I1","I9"], ice: ["B2","B8","H2","H8", "C3","C7","G3","G7"],
        portals: [{pos: "E9", targetLevel: '0', targetPos: "E9", type: "door"}], 
        enemies: [{pos: "E5", isBoss: true, type: "summoner", hp: 50}] 
    },
    '5-1': { name: "Void - Stage 1", walls: [], portals: [{pos: "I9", targetLevel: '5-2', targetPos: "A1", type: "door"}], enemies: [{pos: "D5"}] },
    '5-2': { name: "Void - Stage 2", walls: [], portals: [{pos: "I9", targetLevel: '5-3', targetPos: "A1", type: "door"}], enemies: [{pos: "D5"}] },
    '5-3': { name: "Void - Stage 3", walls: [], portals: [{pos: "I9", targetLevel: '5-Boss', targetPos: "E1", type: "door"}], enemies: [{pos: "D5"}] },
    '5-Boss': { name: "Void - BOSS", walls: [], portals: [{pos: "E9", targetLevel: '0', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true}] },
};

// --------------------------------

let currentLevelId = '0'; 
let player = { 
    x: 0, y: 0, hp: 10, maxHp: 10, damage: 2, 
    wasHit: false, hasCharm: false, hasIronStomach: false, hasAntidote: false, hasThorns: false 
};
let enemies = []; 
let items = []; 
let boulders = []; 
let playerActionsLeft = 2; 

let gameProgress = { level1Complete: false, level2Complete: false, level3Complete: false, level4Complete: false };
let spikesActive = false; // LEVEL 4 MECHANIC

function parseCoord(coordString) {
    const colChar = coordString.charAt(0).toUpperCase();
    const rowChar = coordString.slice(1);
    const x = ALPHABET.indexOf(colChar); 
    const y = parseInt(rowChar) - 1;     
    return { x: x, y: y };
}

function isWall(x, y) {
    const levelData = LEVELS[currentLevelId];
    return levelData.walls.some(w => {
        const c = parseCoord(w);
        return c.x === x && c.y === y;
    });
}

function isBoulder(x, y) {
    return boulders.find(b => b.x === x && b.y === y && b.hp > 0);
}

// --- SAVE / LOAD SYSTEM ---
function saveGame() {
    const gameState = {
        currentLevelId: currentLevelId,
        player: player,
        enemies: enemies,
        items: items,
        boulders: boulders,
        gameProgress: gameProgress,
        playerActionsLeft: playerActionsLeft
    };
    localStorage.setItem('rpgSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('rpgSave');
    if (!saved) return false;
    try {
        const state = JSON.parse(saved);
        currentLevelId = state.currentLevelId;
        player = state.player;
        player.wasHit = false; 
        
        // Defaults for old saves
        if(player.hasCharm === undefined) player.hasCharm = false;
        if(player.hasIronStomach === undefined) player.hasIronStomach = false;
        if(player.hasAntidote === undefined) player.hasAntidote = false;
        if(player.hasThorns === undefined) player.hasThorns = false; 

        enemies = state.enemies;
        items = state.items;
        boulders = state.boulders || [];
        gameProgress = state.gameProgress || { level1Complete: false };
        playerActionsLeft = state.playerActionsLeft;

        if (currentLevelId === '0') applyMainMenuUnlocks();

        document.querySelector('h1').textContent = LEVELS[currentLevelId].name;
        log("Progress Loaded!");
        drawGrid();
        updateStats();
        return true;
    } catch (e) {
        console.error("Save file corrupt", e);
        return false;
    }
}

function resetGame() { localStorage.removeItem('rpgSave'); location.reload(); }

function respawn() {
    player.hp = player.maxHp;
    currentLevelId = '0';
    player.x = 4; player.y = 5; 
    playerActionsLeft = 2;
    enemies = []; items = []; boulders = [];
    saveGame(); location.reload();
}

function applyMainMenuUnlocks() {
    if (gameProgress.level1Complete) {
        if(LEVELS['0'].walls.includes("C2")) LEVELS['0'].walls.splice(LEVELS['0'].walls.indexOf("C2"), 1);
        if(!LEVELS['0'].portals.some(p => p.targetLevel === 'EX-1-1')) LEVELS['0'].portals.push({ pos: "A9", targetLevel: 'EX-1-1', targetPos: "A1", type: "portal", label: "EX1" });
    }
    if (gameProgress.level2Complete) {
        if(LEVELS['0'].walls.includes("E2")) LEVELS['0'].walls.splice(LEVELS['0'].walls.indexOf("E2"), 1);
        if(!LEVELS['0'].portals.some(p => p.targetLevel === 'EX-2-1')) LEVELS['0'].portals.push({ pos: "C9", targetLevel: 'EX-2-1', targetPos: "A1", type: "portal", label: "EX2" });
    }
    if (gameProgress.level3Complete) {
        if(LEVELS['0'].walls.includes("G2")) LEVELS['0'].walls.splice(LEVELS['0'].walls.indexOf("G2"), 1);
        if(!LEVELS['0'].portals.some(p => p.targetLevel === 'EX-3-1')) LEVELS['0'].portals.push({ pos: "E9", targetLevel: 'EX-3-1', targetPos: "A1", type: "portal", label: "EX3" });
    }
}

function initGame() {
    const uiPanel = document.getElementById('ui-panel');
    let resetBtn = uiPanel.querySelector('button');
    if(!resetBtn) {
        resetBtn = document.createElement('button');
        resetBtn.textContent = "Reset Data";
        resetBtn.className = "btn";
        resetBtn.style.backgroundColor = "#555";
        resetBtn.style.marginTop = "10px";
        resetBtn.onclick = () => { if(confirm("Restart from Level 1?")) resetGame(); };
        uiPanel.appendChild(resetBtn);
    }

    const container = document.getElementById('game-container');
    const grid = document.getElementById('grid');
    container.style.position = 'relative';

    let mainCol = document.getElementById('main-game-col');
    if (!mainCol) {
        mainCol = document.createElement('div');
        mainCol.id = 'main-game-col';
        mainCol.style.display = 'flex';
        mainCol.style.flexDirection = 'column';
        mainCol.style.gap = '5px';
        mainCol.style.position = 'relative'; 
        container.insertBefore(mainCol, uiPanel);
        mainCol.appendChild(grid);
    }

    let bossHud = document.getElementById('boss-hud');
    if (!bossHud) {
        bossHud = document.createElement('div');
        bossHud.id = "boss-hud";
        bossHud.innerHTML = `<div class="boss-name-label" id="boss-name">BOSS</div><div class="boss-bar-container"><div class="boss-bar-fill" id="boss-fill"></div></div>`;
        mainCol.insertBefore(bossHud, grid);
    }

    if (!loadGame()) loadLevel('0', "E6");
}

function triggerDamage(x, y, amount, isPlayer) {
    const topPos = (y * 52) + 25; const leftPos = (x * 52) + 25;
    const el = document.createElement('div');
    el.className = `damage-text ${isPlayer ? 'dmg-player' : 'dmg-enemy'}`;
    el.textContent = "-" + amount;
    el.style.top = topPos + "px"; el.style.left = leftPos + "px";
    document.getElementById('main-game-col').appendChild(el);
    setTimeout(() => el.remove(), 1000);
    if (isPlayer) player.wasHit = true;
}

function triggerHeal(x, y, amount) {
    const topPos = (y * 52) + 25; const leftPos = (x * 52) + 25;
    const el = document.createElement('div');
    el.className = "heal-text"; el.textContent = "+" + amount;
    el.style.top = topPos + "px"; el.style.left = leftPos + "px";
    document.getElementById('main-game-col').appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function triggerAttackAnim(x, y, type) {
    const grid = document.getElementById('grid');
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    const topPos = rect.top + 4 + (y * 52); 
    const leftPos = rect.left + 4 + (x * 52);

    const el = document.createElement('div');
    el.className = `attack-anim ${type}`;
    el.style.position = 'fixed'; 
    el.style.top = topPos + "px"; el.style.left = leftPos + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
}

function loadLevel(levelId, startCoord) {
    currentLevelId = levelId;
    if (levelId === '0') applyMainMenuUnlocks();
    
    const levelData = LEVELS[levelId];
    document.querySelector('h1').textContent = levelData.name;
    const start = parseCoord(startCoord);
    player.x = start.x; player.y = start.y;
    playerActionsLeft = 2; 

    if (TUTORIAL_MESSAGES[levelId]) showTutorial(levelId);

    // HP Scaling
    if (levelId.endsWith('-3') || levelId.endsWith('-Boss') || levelId.startsWith('EX-') || levelId.startsWith('4-')) {
        if(player.maxHp < 15) player.maxHp = 15;
    } else {
        if(player.maxHp < 10) player.maxHp = 10;
    }

    if (levelId === '0' || levelId.endsWith('-1')) {
        player.hp = player.maxHp; player.damage = 2; log("Stats Reset/Healed.");
    } 
    if (player.hp > player.maxHp) player.hp = player.maxHp;

    let standardEnemyHp = 10; 
    if (levelId.startsWith('4-')) standardEnemyHp = 12; // Guards are tough
    if (levelId.endsWith('-3')) standardEnemyHp = 15;

    enemies = [];
    if (levelData.enemies) {
        levelData.enemies.forEach((data, index) => {
            const ePos = parseCoord(data.pos);
            let eHp = data.isBoss ? 50 : standardEnemyHp; 
            if (data.type === 'ranged' || data.type === 'mage' || data.type === 'wraith') eHp = 6;
            if (data.type === 'fast') eHp = 8;
            if (data.type === 'bat') eHp = 6;
            if (data.type === 'yeti') eHp = 15; 
            if (data.hp) eHp = data.hp;

            enemies.push({
                id: index, x: ePos.x, y: ePos.y,
                hp: eHp, maxHp: eHp, alive: true, wasHit: false,
                isBoss: data.isBoss || false,
                type: data.type || 'melee',
                summonCooldown: 0, stunned: false, canMove: true 
            });
        });
    }

    items = [];
    if (levelData.items) {
        levelData.items.forEach((data, index) => {
            const iPos = parseCoord(data.pos);
            items.push({
                id: index, x: iPos.x, y: iPos.y,
                type: data.type, value: data.value, name: data.name, collected: false
            });
        });
    }

    boulders = [];
    if (levelData.boulders) {
        levelData.boulders.forEach(bPosStr => {
            const bPos = parseCoord(bPosStr);
            boulders.push({ x: bPos.x, y: bPos.y, hp: 6 });
        });
    }

    log(`Entered ${levelData.name}`);
    drawGrid(); updateStats(); saveGame(); 
}

function drawGrid() {
    const gridEl = document.getElementById('grid');
    gridEl.innerHTML = ''; 
    gridEl.className = ''; 
    const currentMap = LEVELS[currentLevelId];

    if (currentLevelId.includes('EX-2')) gridEl.classList.add('biome-toxic'); 
    else if (currentLevelId.includes('EX-3')) gridEl.classList.add('biome-ice');
    else if (currentLevelId.includes('1-') || currentLevelId.includes('EX-1')) gridEl.classList.add('biome-sewer');
    else if (currentLevelId.includes('2-')) gridEl.classList.add('biome-forest');
    else if (currentLevelId.includes('3-')) gridEl.classList.add('biome-mine'); 
    else if (currentLevelId.includes('4-')) gridEl.classList.add('biome-castle'); 

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            const coordLabel = document.createElement('span');
            coordLabel.classList.add('coord-label');
            coordLabel.textContent = `${ALPHABET[x]}${y+1}`;
            cell.appendChild(coordLabel);

            const isPlayerHere = (x === player.x && y === player.y);
            const enemyHere = enemies.find(e => e.x === x && e.y === y && e.alive);
            const itemHere = items.find(i => i.x === x && i.y === y && !i.collected);
            const wallHere = isWall(x, y);
            const boulderHere = isBoulder(x, y); 
            
            const isHazard = currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[x]}${y+1}`);
            const isThicket = currentMap.thickets && currentMap.thickets.includes(`${ALPHABET[x]}${y+1}`);
            const isRiver = currentMap.rivers && currentMap.rivers.includes(`${ALPHABET[x]}${y+1}`);
            const isSpike = currentMap.spikes && currentMap.spikes.includes(`${ALPHABET[x]}${y+1}`);
            const isIce = currentMap.ice && currentMap.ice.includes(`${ALPHABET[x]}${y+1}`);

            const portalHere = currentMap.portals.find(p => {
                const c = parseCoord(p.pos);
                return c.x === x && c.y === y;
            });

            if (isPlayerHere) {
                const pIcon = document.createElement('span'); pIcon.textContent = 'P';
                cell.classList.add('player');
                if (player.wasHit) cell.classList.add('player-hit-anim');
                cell.appendChild(pIcon);
            } else if (enemyHere) {
                const eIcon = document.createElement('span');
                if (enemyHere.isBoss) {
                    eIcon.textContent = 'B'; cell.classList.add('boss');
                    if (enemyHere.hp <= enemyHere.maxHp / 2) cell.classList.add('boss-enraged');
                } else if (enemyHere.type === 'ranged') {
                    eIcon.textContent = 'S'; cell.classList.add('enemy', 'enemy-ranged');
                } else if (enemyHere.type === 'mage') {
                    eIcon.textContent = 'M'; cell.classList.add('enemy', 'enemy-mage');
                } else if (enemyHere.type === 'fast') {
                    eIcon.textContent = 'F'; cell.classList.add('enemy', 'enemy-fast');
                } else if (enemyHere.type === 'bat') {
                    eIcon.textContent = 'W'; cell.classList.add('enemy', 'enemy-bat');
                } else if (enemyHere.type === 'golem') {
                    eIcon.textContent = 'G'; cell.classList.add('enemy', 'enemy-golem');
                } else if (enemyHere.type === 'guard') {
                    eIcon.textContent = 'K'; cell.classList.add('enemy', 'enemy-guard');
                } else if (enemyHere.type === 'yeti') {
                    eIcon.textContent = 'Y'; cell.classList.add('enemy', 'enemy-yeti');
                } else if (enemyHere.type === 'wraith') {
                    eIcon.textContent = '👻'; cell.classList.add('enemy', 'enemy-wraith');
                } else {
                    eIcon.textContent = 'E'; cell.classList.add('enemy');
                }
                if (enemyHere.wasHit) cell.classList.add('enemy-hit-anim');
                cell.appendChild(eIcon);
            } else if (itemHere) {
                const iIcon = document.createElement('span');
                if (itemHere.type === 'weapon') { iIcon.textContent = '⚔️'; cell.classList.add('item-weapon'); } 
                else if (itemHere.type === 'relic' || itemHere.type === 'heart_container') { iIcon.textContent = '🧿'; cell.classList.add('item-relic'); } 
                else { iIcon.textContent = '+'; cell.classList.add('item-potion'); }
                cell.appendChild(iIcon);
            } else if (boulderHere) {
                cell.classList.add('boulder'); if (boulderHere.hp <= 3) cell.classList.add('boulder-cracked');
            } else if (wallHere) {
                cell.classList.add('wall');
            } else if (portalHere) {
                if (portalHere.type === 'door') {
                    const allEnemiesDead = enemies.filter(e => e.alive).length === 0;
                    if (allEnemiesDead) {
                        const portIcon = document.createElement('span'); portIcon.textContent = "D"; 
                        cell.classList.add('door'); cell.appendChild(portIcon);
                    }
                } else {
                    const portIcon = document.createElement('span');
                    if (portalHere.type === 'inventory') { portIcon.textContent = "📦"; cell.classList.add('portal'); cell.style.backgroundColor = "#d4af37"; } 
                    else { portIcon.textContent = portalHere.label; cell.classList.add('portal'); }
                    cell.appendChild(portIcon);
                }
            } 
            
            if (isHazard) cell.classList.add('hazard');
            if (isThicket) cell.classList.add('thicket');
            if (isRiver) cell.classList.add('river');
            if (isIce) cell.classList.add('tile-ice');
            if (isSpike) {
                if (spikesActive) cell.classList.add('spike-active');
                else cell.classList.add('spike-safe');
            }

            gridEl.appendChild(cell);
        }
    }

    if (player.wasHit) {
        setTimeout(() => {
            player.wasHit = false;
            const pCell = document.querySelector('.player-hit-anim');
            if(pCell) pCell.classList.remove('player-hit-anim');
        }, 300);
    }
}

function updateStats() {
    let hpText = player.hp + " / " + player.maxHp;
    if (player.hasCharm) hpText += " 🧿";
    
    document.getElementById('player-hp').textContent = hpText;
    const aliveCount = enemies.filter(e => e.alive).length;
    document.getElementById('enemy-count').textContent = aliveCount;
    if (enemies.length > 0 && aliveCount === 0) log("Area Clear! Door Unlocked.");
    
    const boss = enemies.find(e => e.isBoss && e.alive);
    const bossHud = document.getElementById('boss-hud');
    if (boss && bossHud) {
        bossHud.style.display = 'block';
        const pct = Math.max(0, (boss.hp / boss.maxHp) * 100);
        document.getElementById('boss-fill').style.width = pct + "%";
        document.getElementById('boss-name').textContent = LEVELS[currentLevelId].name;
    } else if (bossHud) {
        bossHud.style.display = 'none';
    }

    if (player.hp <= 0) endGame(false);
}

function log(message) {
    const logBox = document.getElementById('game-log');
    const entry = document.createElement('div');
    entry.classList.add('log-entry');
    entry.textContent = `> ${message}`;
    logBox.prepend(entry);
}

function consumeAction() {
    if (playerActionsLeft <= 0) {
        drawGrid();
        setTimeout(() => {
            log("-- Enemy Turn --");
            moveEnemies();
            playerActionsLeft = 2; 
            saveGame(); 
        }, 100); 
    } else {
        log(`Actions left: ${playerActionsLeft}`);
    }
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('tutorial-overlay').style.display === 'block') return;
    if (document.getElementById('inventory-overlay').style.display === 'block') return;
    if (player.hp <= 0) return;
    if (playerActionsLeft <= 0) return; 
    
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) e.preventDefault();

    let dx = 0, dy = 0;
    if (e.key === 'ArrowUp' || e.key === 'w') dy = -1;
    if (e.key === 'ArrowDown' || e.key === 's') dy = 1;
    if (e.key === 'ArrowLeft' || e.key === 'a') dx = -1;
    if (e.key === 'ArrowRight' || e.key === 'd') dx = 1;

    if (e.key === ' ') {
        e.preventDefault(); playerAttack();
        playerActionsLeft--; consumeAction(); return;
    }

    if (dx !== 0 || dy !== 0) handleTurn(dx, dy);
});

function playerAttack() {
    let hitSomething = false;
    const directions = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    
    directions.forEach(dir => {
        const targetX = player.x + dir.x;
        const targetY = player.y + dir.y;
        
        const enemy = enemies.find(e => e.x === targetX && e.y === targetY && e.alive);
        const boulder = boulders.find(b => b.x === targetX && b.y === targetY && b.hp > 0);
        
        if (enemy) {
            hitSomething = true;
            let dmg = player.damage;
            triggerAttackAnim(enemy.x, enemy.y, 'anim-slash');
            enemy.hp -= dmg; enemy.wasHit = true; 
            triggerDamage(enemy.x, enemy.y, dmg, false);
            log(`Hit Enemy for ${dmg} damage!`);

            // MAGE BLINK MECHANIC
            if (enemy.type === 'mage' && enemy.hp > 0) {
                let safeSpots = [];
                for(let my=0; my<9; my++) {
                    for(let mx=0; mx<9; mx++) {
                        if (!isWall(mx, my) && !isBoulder(mx, my) && !enemies.some(e=>e.x===mx && e.y===my && e.alive) && (mx!==player.x || my!==player.y)) {
                            safeSpots.push({x:mx, y:my});
                        }
                    }
                }
                if (safeSpots.length > 0) {
                    const spot = safeSpots[Math.floor(Math.random() * safeSpots.length)];
                    enemy.x = spot.x; enemy.y = spot.y;
                    log("Mage blinked away!");
                }
            }

            if (enemy.hp <= 0) {
                enemy.alive = false;
                log(enemy.isBoss ? "BOSS DEFEATED!" : "Enemy defeated!");
                if (currentLevelId === 'EX-1-Boss' && enemy.isBoss) items.push({ id: items.length, x: 4, y: 1, type: "relic", value: 0, name: "Vampiric Charm", collected: false });
                else if (currentLevelId === 'EX-2-Boss' && enemy.isBoss) items.push({ id: items.length, x: 4, y: 5, type: "relic", value: 0, name: "Hydra Scale", collected: false });
                
                if (player.hasCharm && player.hp < player.maxHp) {
                    player.hp += 1; triggerHeal(player.x, player.y, 1);
                }
            }
        } else if (boulder) {
            hitSomething = true; let dmg = player.damage;
            triggerAttackAnim(boulder.x, boulder.y, 'anim-slash');
            boulder.hp -= dmg; triggerDamage(boulder.x, boulder.y, dmg, false);
            if (boulder.hp <= 0) {
                log("Boulder destroyed!");
                
                // --- BOULDER DROP LOGIC ---
                // 10% chance for a Small Potion (Value 3)
                if (Math.random() < 0.1) {
                    items.push({ x: boulder.x, y: boulder.y, type: "potion", value: 3, name: "Small Potion", collected: false });
                    log("Found a small potion in the rubble!");
                }
                // --------------------------
            }
        }
    });

    if(!hitSomething) log("Swung at nothing.");
    drawGrid(); updateStats(); saveGame(); 
    setTimeout(() => { enemies.forEach(e => e.wasHit = false); drawGrid(); }, 250);
}

function handleTurn(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return;
    if (isWall(newX, newY)) { log("Blocked by a wall!"); return; }
    if (isBoulder(newX, newY)) { log("Blocked by a boulder! Use SPACE to mine."); return; }

    const enemyIdx = enemies.findIndex(e => e.x === newX && e.y === newY && e.alive);
    if (enemyIdx !== -1) { log("Blocked by enemy! Press SPACE to attack."); return; } 

    const currentMap = LEVELS[currentLevelId];
    const isThicket = currentMap.thickets && currentMap.thickets.includes(`${ALPHABET[newX]}${newY+1}`);
    const moveCost = isThicket ? 2 : 1;

    if (playerActionsLeft < 1) return;

    // --- ICE SLIDING LOGIC ---
    let finalX = newX; let finalY = newY; let sliding = true;
    while (sliding) {
        if (finalX < 0 || finalX >= GRID_SIZE || finalY < 0 || finalY >= GRID_SIZE) { finalX -= dx; finalY -= dy; sliding = false; } 
        else if (isWall(finalX, finalY) || isBoulder(finalX, finalY)) { finalX -= dx; finalY -= dy; sliding = false; } 
        else if (enemies.some(e => e.alive && e.x === finalX && e.y === finalY)) { finalX -= dx; finalY -= dy; sliding = false; log("Slid into an enemy!"); }
        else {
            const isTileIce = currentMap.ice && currentMap.ice.includes(`${ALPHABET[finalX]}${finalY+1}`);
            if (isTileIce) { finalX += dx; finalY += dy; } else { sliding = false; }
        }
    }
    // -------------------------

    let targetPortal = currentMap.portals.find(p => { const c = parseCoord(p.pos); return c.x === finalX && c.y === finalY; });
    if (targetPortal && targetPortal.type === 'door') {
        if (enemies.filter(e => e.alive).length > 0) targetPortal = null;
    }

    if (targetPortal && targetPortal.type === 'inventory') { openInventory(); return; }
    
    // --- REDIRECT LOGIC FOR HOME PORTAL ---
    if (targetPortal && targetPortal.redirect) {
        window.location.href = targetPortal.redirect;
        return;
    }
    // --------------------------------------

    player.x = finalX; player.y = finalY;
    playerActionsLeft -= moveCost;

    if (Math.abs(finalX - newX) > 0 || Math.abs(finalY - newY) > 0) log("Whoa! You slid on the ice!");

    // LEVEL 4 SPIKE TOGGLE
    if (currentMap.spikes) {
        spikesActive = !spikesActive;
        const isSpike = currentMap.spikes.includes(`${ALPHABET[finalX]}${finalY+1}`);
        if (isSpike && spikesActive) {
            player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
            log("Stepped on active spike!");
        }
    }

    if (isThicket) log("Thicket slows you down! (2 Actions)");

    if (currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
        if (player.hasIronStomach) log("Iron Stomach prevents toxic damage!");
        else {
            player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
            log("Toxic Sludge! -1 HP");
        }
    }

    if (currentMap.rivers && currentMap.rivers.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
        setTimeout(() => {
            log("Current sweeps you downstream!");
            const slipY = player.y + 1;
            if (slipY < GRID_SIZE && !isWall(player.x, slipY)) { player.y = slipY; drawGrid(); } 
            else { log("Crashed into bank! -1 HP"); player.hp -= 1; triggerDamage(player.x, player.y, 1, true); drawGrid(); }
            saveGame(); 
        }, 300);
    }

    if (targetPortal) {
        if (currentLevelId === '1-Boss' && targetPortal.targetLevel === '0') gameProgress.level1Complete = true;
        if (currentLevelId === '2-Boss' && targetPortal.targetLevel === '0') gameProgress.level2Complete = true;
        if (currentLevelId === '3-Boss' && targetPortal.targetLevel === '0') gameProgress.level3Complete = true;
        if (currentLevelId === '4-Boss' && targetPortal.targetLevel === '0') gameProgress.level4Complete = true;

        loadLevel(targetPortal.targetLevel, targetPortal.targetPos);
        return; 
    }
    
    const itemIdx = items.findIndex(i => i.x === finalX && i.y === finalY && !i.collected);
    if (itemIdx !== -1) {
        const item = items[itemIdx];
        item.collected = true;
        if (item.type === 'potion') { player.hp = Math.min(player.hp + item.value, player.maxHp); log(`Used Potion (+${item.value} HP).`); } 
        else if (item.type === 'weapon') { player.damage += item.value; log("Got Weapon."); } 
        else if (item.type === 'relic') {
            if (item.name === 'Vampiric Charm') player.hasCharm = true;
            if (item.name === 'Antidote Vial') player.hasAntidote = true;
            if (item.name === 'Hydra Scale') player.hasThorns = true;
            log(`Picked up ${item.name}!`);
        } else if (item.type === 'heart_container') { player.maxHp += item.value; player.hp += item.value; log(`Consumed ${item.name}! Max HP +${item.value}.`); }
    }

    drawGrid(); saveGame(); consumeAction(); 
}

function processOneEnemyTurn(enemy) {
    if (enemy.stunned) { return false; }

    // BOSS: EARTHSHAKER
    if (enemy.isBoss && enemy.type === "shaker") {
        enemy.quakeCooldown = (enemy.quakeCooldown || 0) + 1;
        if (enemy.quakeCooldown >= 3) {
            log("EARTHSHAKER slams the ground!");
            document.getElementById('grid').classList.add('quake-anim');
            setTimeout(() => document.getElementById('grid').classList.remove('quake-anim'), 500);
            player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
            const shifts = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
            const s = shifts[Math.floor(Math.random()*shifts.length)];
            const nx = player.x + s.x; const ny = player.y + s.y;
            if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9 && !isWall(nx,ny) && !isBoulder(nx,ny)) { player.x = nx; player.y = ny; }
            enemy.quakeCooldown = 0; return true; 
        }
    }

    // BOSS: SUMMONER / KING
    if (enemy.isBoss && (enemy.type === "summoner" || enemy.type === "king")) {
        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        
        let limit = (currentLevelId === 'EX-2-Boss') ? 4 : 5; // HYDRA SUMMONS FASTER (4 turns)

        if (enemy.summonCooldown >= limit) { 
            const openSpots = [{x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1}].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y) && !isBoulder(p.x, p.y));
            if (openSpots.length > 0) {
                const spawn = openSpots[Math.floor(Math.random() * openSpots.length)];
                
                let typeToSummon = 'ranged'; // Default
                
                // HYDRA SUMMONS RANGED HEADS
                if (currentLevelId === 'EX-2-Boss') typeToSummon = 'ranged';
                else if (currentLevelId.startsWith('EX-')) typeToSummon = 'fast';
                
                if (enemy.type === 'king') typeToSummon = 'guard';

                let summonHp = 6;
                if (typeToSummon === 'fast') summonHp = 4;
                if (typeToSummon === 'guard') summonHp = 10;

                enemies.push({ id: enemies.length, x: spawn.x, y: spawn.y, hp: summonHp, maxHp: summonHp, alive: true, type: typeToSummon, wasHit: false });
                log(`BOSS summons a ${typeToSummon}!`);
                enemy.summonCooldown = 0; return true; 
            }
        }
    }

    // SLOW LOGIC
    if (enemy.type === 'golem' || enemy.type === 'guard' || enemy.type === 'yeti') {
        if (!enemy.canMove) { enemy.canMove = true; return false; }
        enemy.canMove = false; 
    }

    const dx = Math.abs(player.x - enemy.x);
    const dy = Math.abs(player.y - enemy.y);
    const dist = dx + dy;

    // RANGED / MAGE LOGIC
    if (enemy.type === 'ranged' || enemy.type === 'mage') {
        const alignedX = (player.x === enemy.x);
        const alignedY = (player.y === enemy.y);
        
        if ((alignedX || alignedY) && dist <= 3 && dist > 1) {
            let blocked = false;
            if (alignedX) { 
                const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y);
                for (let checkY = start; checkY < end; checkY++) { if (isWall(player.x, checkY) || isBoulder(player.x, checkY) || enemies.some(e => e.alive && e.x === player.x && e.y === checkY)) { blocked = true; break; } }
            } else { 
                const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x);
                for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, player.y) || isBoulder(checkX, player.y) || enemies.some(e => e.alive && e.x === checkX && e.y === player.y)) { blocked = true; break; } }
            }
            if (!blocked) {
                triggerAttackAnim(player.x, player.y, 'anim-web');
                player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
                log(`${enemy.type === 'mage' ? 'Mage' : 'Spider'} shoots! -1 HP`);
                return true;
            }
        }
    }

    let canAttack = false;

    // ATTACK LOGIC
    if (enemy.isBoss || enemy.type === 'guard' || enemy.type === 'yeti') {
        // Boss, Guard, Yeti hit all adjacent (8 directions)
        if (dx <= 1 && dy <= 1 && dist > 0) canAttack = true;
    } else if (enemy.type === 'golem') {
        if (dx <= 1 && dy <= 1 && dist > 0) canAttack = true; 
        else if ((player.x === enemy.x || player.y === enemy.y) && dist <= 3) {
            let blocked = false;
            if (player.x === enemy.x) { 
                const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y);
                for (let checkY = start; checkY < end; checkY++) { if (isWall(enemy.x, checkY) || isBoulder(enemy.x, checkY)) blocked = true; }
            } else { 
                const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x);
                for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, enemy.y) || isBoulder(checkX, enemy.y)) blocked = true; }
            }
            if (!blocked) {
                canAttack = true; log("Golem launches a shockwave!");
                if (player.x === enemy.x) { for(let i=Math.min(player.y, enemy.y)+1; i<Math.max(player.y, enemy.y); i++) triggerAttackAnim(enemy.x, i, 'anim-shockwave'); } 
                else { for(let i=Math.min(player.x, enemy.x)+1; i<Math.max(player.x, enemy.x); i++) triggerAttackAnim(i, enemy.y, 'anim-shockwave'); }
            }
        }
    } else {
        // NORMAL ENEMIES: Strictly diagonal
        if (dx === 1 && dy === 1) canAttack = true;
    }

    if (canAttack) { 
         let dmg = (enemy.isBoss && enemy.hp < 15) ? 4 : 1;
         if (enemy.type === 'golem') dmg = 3; 
         if (enemy.type === 'guard' || enemy.type === 'yeti') dmg = 3; 

         triggerAttackAnim(player.x, player.y, 'anim-scratch');
         player.hp -= dmg; triggerDamage(player.x, player.y, dmg, true);
         log(`${enemy.type.toUpperCase()} attacks!`);
         
         if (player.hasThorns) {
             enemy.hp -= 1; triggerDamage(enemy.x, enemy.y, 1, false);
             if (enemy.hp <= 0) {
                 enemy.alive = false; log("Enemy killed by thorns!");
                 if (player.hasCharm && player.hp < player.maxHp) { player.hp += 1; triggerHeal(player.x, player.y, 1); }
             }
         }
         return true;
    }

    // MOVEMENT
    let potentialTargets = [];
    if (enemy.isBoss || enemy.type === 'guard' || enemy.type === 'yeti') {
        potentialTargets = [ {x: player.x, y: player.y - 1}, {x: player.x, y: player.y + 1}, {x: player.x - 1, y: player.y}, {x: player.x + 1, y: player.y}, {x: player.x - 1, y: player.y - 1}, {x: player.x + 1, y: player.y - 1}, {x: player.x - 1, y: player.y + 1}, {x: player.x + 1, y: player.y + 1} ];
    } else if (enemy.type === 'melee' || enemy.type === 'fast' || enemy.type === 'golem' || enemy.type === 'bat' || enemy.type === 'wraith') {
        potentialTargets = [ {x: player.x - 1, y: player.y - 1}, {x: player.x + 1, y: player.y - 1}, {x: player.x - 1, y: player.y + 1}, {x: player.x + 1, y: player.y + 1} ];
    } else {
        potentialTargets = [{x: player.x, y: player.y}];
    }

    const validTargets = potentialTargets.filter(t => {
        let obstructed = false;
        // WRAITHS PASS WALLS
        if (enemy.type !== 'wraith' && isWall(t.x, t.y)) obstructed = true;
        if (enemy.type !== 'bat' && enemy.type !== 'wraith') if (isBoulder(t.x, t.y)) obstructed = true;
        return t.x >= 0 && t.x < GRID_SIZE && t.y >= 0 && t.y < GRID_SIZE && !obstructed;
    });

    let bestTarget = {x: player.x, y: player.y};
    let minTargetDist = 999;
    if (validTargets.length > 0) {
        validTargets.forEach(t => { const d = Math.abs(enemy.x - t.x) + Math.abs(enemy.y - t.y); if (d < minTargetDist) { minTargetDist = d; bestTarget = t; } });
    }

    const moves = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    moves.sort(() => Math.random() - 0.5); 
    let bestMove = null;
    let minMoveDist = Math.abs(enemy.x - bestTarget.x) + Math.abs(enemy.y - bestTarget.y);

    for (let m of moves) {
        const tx = enemy.x + m.x; const ty = enemy.y + m.y;
        if (tx < 0 || tx >= GRID_SIZE || ty < 0 || ty >= GRID_SIZE) continue;
        if (enemy.type !== 'wraith' && isWall(tx, ty)) continue;
        if (enemy.type !== 'bat' && enemy.type !== 'wraith' && isBoulder(tx, ty)) continue;
        if (tx === player.x && ty === player.y) continue; 
        if (enemies.some(e => e !== enemy && e.alive && e.x === tx && e.y === ty)) continue; 
        const d = Math.abs(bestTarget.x - tx) + Math.abs(bestTarget.y - ty);
        if (d < minMoveDist) { minMoveDist = d; bestMove = {x: tx, y: ty}; }
    }

    if (bestMove) { enemy.x = bestMove.x; enemy.y = bestMove.y; return true; }
    return false;
}

function moveEnemies() {
    let enemyAction = false;
    let oldHp = player.hp;

    enemies.forEach((enemy) => {
        if (!enemy.alive) return;
        if (enemy.stunned) { enemy.stunned = false; log("Enemy is reeling from knockback!"); return; }

        let moves = 1;
        if (enemy.type === 'fast' || enemy.type === 'bat') moves = 2; 

        for (let i = 0; i < moves; i++) {
            const didSomething = processOneEnemyTurn(enemy);
            
            // HAZARD DAMAGE FOR ENEMIES
            const currentMap = LEVELS[currentLevelId];
            const isHazard = currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[enemy.x]}${enemy.y+1}`);
            const isSpike = currentMap.spikes && currentMap.spikes.includes(`${ALPHABET[enemy.x]}${enemy.y+1}`) && spikesActive;

            // WRAITHS are immune to hazards (they float)
            if ((isHazard || isSpike) && enemy.type !== 'wraith' && enemy.type !== 'bat') {
                if (!enemy.isBoss) {
                    enemy.hp -= 1; triggerDamage(enemy.x, enemy.y, 1, false);
                    if(enemy.hp <= 0) {
                        enemy.alive = false; log("Enemy died in trap!");
                        if (player.hasCharm && player.hp < player.maxHp) { player.hp += 1; triggerHeal(player.x, player.y, 1); }
                        break;
                    }
                }
            }

            if (didSomething) enemyAction = true;
            if (player.hp < oldHp) { oldHp = player.hp; break; }
        }
    });

    if (player.hp < oldHp || enemyAction) {
        if (player.hp < oldHp) {
             document.getElementById('grid').classList.add('screen-shake');
             setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400);
        }
        drawGrid(); updateStats();
    }
}

function endGame(victory) {
    const overlay = document.getElementById('message-overlay');
    const title = document.getElementById('end-title');
    const btn = overlay.querySelector('button');
    overlay.style.display = 'flex';
    title.textContent = victory ? "VICTORY!" : "GAME OVER";
    title.style.color = victory ? "#22c55e" : "#ef4444";
    btn.textContent = victory ? "Continue" : "Try Again";
    btn.onclick = () => { respawn(); };
}

function showTutorial(levelId) {
    const data = TUTORIAL_MESSAGES[levelId];
    if(!data) return;
    document.getElementById('tutorial-title').textContent = data.title;
    document.getElementById('tutorial-text').innerHTML = data.text;
    document.getElementById('tutorial-overlay').style.display = 'block';
}
function closeTutorial() { document.getElementById('tutorial-overlay').style.display = 'none'; }

function openInventory() {
    const list = document.getElementById('inventory-list'); list.innerHTML = ''; 
    let foundAny = false;
    function addItem(name, icon, desc) {
        const li = document.createElement('li'); li.className = 'inv-item';
        li.innerHTML = `<span class="inv-icon">${icon}</span><div><strong>${name}</strong><br><small style="color:#aaa;">${desc}</small></div>`;
        list.appendChild(li); foundAny = true;
    }
    if (player.hasCharm) addItem("Vampiric Charm", "🧿", "Heals +1 HP on Kill");
    if (player.hasIronStomach) addItem("Iron Stomach", "🤢", "Immune to Hazards");
    if (player.hasAntidote) addItem("Antidote Vial", "🧪", "Symbol of Hope");
    if (player.hasThorns) addItem("Hydra Scale", "🐲", "Reflects 1 DMG on hit"); 

    if (!foundAny) list.innerHTML = '<li class="inv-item" style="justify-content:center; color:#777;">No relics collected yet.</li>';
    document.getElementById('inventory-overlay').style.display = 'block';
}
function closeInventory() { document.getElementById('inventory-overlay').style.display = 'none'; }

initGame();