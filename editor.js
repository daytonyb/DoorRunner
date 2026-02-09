const ALPHABET = "ABCDEFGHI";
const GRID_SIZE = 9;

// Editor State
let currentTool = 'wall';
let levelData = {
    walls: [],
    enemies: [], 
    items: [],
    hazards: [],
    thickets: [],
    rivers: [],
    ice: [],
    boulders: [],
    spikes: [],
    warps: [],     // Starts as a simple list of coordinates ["A1", "B2"]
    crystals: [],
    crumble: [],
    playerStart: null, 
    door: null 
};

function initEditor() {
    const gridEl = document.getElementById('editor-grid');
    gridEl.innerHTML = '';

    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.coord = `${ALPHABET[x]}${y+1}`;
            
            const lbl = document.createElement('span');
            lbl.className = 'coord-label';
            lbl.textContent = cell.dataset.coord;
            cell.appendChild(lbl);

            cell.onclick = () => handleCellClick(x, y, cell.dataset.coord);
            gridEl.appendChild(cell);
        }
    }
}

function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    const buttons = document.querySelectorAll('.tool-btn');
    for (let btn of buttons) {
        if (btn.getAttribute('onclick').includes(`'${tool}'`)) {
            btn.classList.add('active');
        }
    }
}

function handleCellClick(x, y, coord) {
    removeFromData(coord);

    if (currentTool === 'erase') {
        renderGrid();
        return;
    }

    // --- ESSENTIALS ---
    if (currentTool === 'wall') levelData.walls.push(coord);
    else if (currentTool === 'player') levelData.playerStart = coord;
    else if (currentTool === 'door') levelData.door = coord;
    
    // --- TERRAIN ---
    else if (currentTool === 'warp') levelData.warps.push(coord);
    else if (currentTool === 'hazard') levelData.hazards.push(coord);
    else if (currentTool === 'thicket') levelData.thickets.push(coord);
    else if (currentTool === 'river') levelData.rivers.push(coord);
    else if (currentTool === 'ice') levelData.ice.push(coord);
    else if (currentTool === 'boulder') levelData.boulders.push(coord);
    else if (currentTool === 'spike') levelData.spikes.push(coord);
    else if (currentTool === 'crumble') levelData.crumble.push(coord);
    else if (currentTool === 'crystal') levelData.crystals.push(coord);

    // --- BOSSES ---
    else if (currentTool.startsWith('boss-')) {
        const type = currentTool.replace('boss-', '');
        levelData.enemies.push({ pos: coord, type: type, isBoss: true });
    }

    // --- ENEMIES ---
    else if (currentTool.startsWith('enemy-')) {
        const type = currentTool.replace('enemy-', '');
        levelData.enemies.push({ pos: coord, type: type });
    }

    // --- ITEMS ---
    else if (currentTool.startsWith('item-')) {
        const type = currentTool.replace('item-', '');
        let value = 0;
        let name = "";
        if (type === 'potion') { value = 5; }
        if (type === 'weapon') { value = 2; name = "Custom Sword"; }
        levelData.items.push({ pos: coord, type: type, value: value, name: name });
    }

    renderGrid();
}

function removeFromData(coord) {
    levelData.walls = levelData.walls.filter(w => w !== coord);
    levelData.hazards = levelData.hazards.filter(w => w !== coord);
    levelData.thickets = levelData.thickets.filter(w => w !== coord);
    levelData.rivers = levelData.rivers.filter(w => w !== coord);
    levelData.ice = levelData.ice.filter(w => w !== coord);
    levelData.boulders = levelData.boulders.filter(w => w !== coord);
    levelData.spikes = levelData.spikes.filter(w => w !== coord);
    levelData.crumble = levelData.crumble.filter(w => w !== coord);
    levelData.crystals = levelData.crystals.filter(w => w !== coord);
    levelData.warps = levelData.warps.filter(w => w !== coord);
    
    levelData.enemies = levelData.enemies.filter(e => e.pos !== coord);
    levelData.items = levelData.items.filter(i => i.pos !== coord);

    if (levelData.playerStart === coord) levelData.playerStart = null;
    if (levelData.door === coord) levelData.door = null;
}

function renderGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const coord = cell.dataset.coord;
        cell.className = 'cell'; 
        cell.innerHTML = `<span class="coord-label">${coord}</span>`;

        // Terrain
        if (levelData.walls.includes(coord)) cell.classList.add('wall');
        if (levelData.hazards.includes(coord)) cell.classList.add('hazard');
        if (levelData.thickets.includes(coord)) cell.classList.add('thicket');
        if (levelData.rivers.includes(coord)) cell.classList.add('river');
        if (levelData.ice.includes(coord)) cell.classList.add('tile-ice');
        if (levelData.boulders.includes(coord)) cell.classList.add('boulder');
        if (levelData.spikes.includes(coord)) cell.classList.add('spike-safe');
        if (levelData.crumble.includes(coord)) cell.classList.add('tile-crumble');
        if (levelData.crystals.includes(coord)) cell.classList.add('crystal');

        // Warps (Void)
        if (levelData.warps.includes(coord)) {
            cell.classList.add('warp-tile'); // This triggers the purple animation
        }

        // Objects
        if (levelData.door === coord) cell.classList.add('door');
        
        // Enemies & Bosses
        const enemy = levelData.enemies.find(e => e.pos === coord);
        if (enemy) {
            cell.classList.add(enemy.isBoss ? 'boss' : 'enemy');
            const icon = document.createElement('span');
            
            // Standard Enemies
            if(enemy.type === 'melee') cell.classList.add('enemy-normal');
            if(enemy.type === 'fast') cell.classList.add('enemy-fast');
            if(enemy.type === 'ranged') { cell.classList.add('enemy-ranged'); icon.textContent = "S"; }
            if(enemy.type === 'mage') { cell.classList.add('enemy-mage'); icon.textContent = "M"; }
            if(enemy.type === 'golem') { cell.classList.add('enemy-golem'); icon.textContent = "G"; }
            if(enemy.type === 'guard') { cell.classList.add('enemy-guard'); icon.textContent = "K"; }
            if(enemy.type === 'bat') { cell.classList.add('enemy-bat'); icon.textContent = "W"; }
            if(enemy.type === 'leech') { cell.classList.add('enemy-leech'); icon.textContent = "●"; }
            if(enemy.type === 'sentinel') { cell.classList.add('enemy-sentinel'); icon.textContent = "🧲"; }
            if(enemy.type === 'welder') { cell.classList.add('enemy-welder'); icon.textContent = "🔥"; }
            if(enemy.type === 'wraith') { cell.classList.add('enemy-wraith'); icon.textContent = "👻"; }

            // Bosses
            if(enemy.type === 'mud_monster') { cell.classList.add('boss-mud'); icon.textContent = "☣"; }
            if(enemy.type === 'tangler') { cell.classList.add('boss-tangler'); icon.textContent = "🥀"; }
            if(enemy.type === 'zephyr') { cell.classList.add('boss-zephyr'); icon.textContent = "🦅"; }
            if(enemy.type === 'entropy') { cell.classList.add('boss-entropy'); icon.textContent = "Ø"; }
            if(enemy.type === 'gear') { cell.classList.add('boss-gear'); icon.textContent = "⚙️"; }
            if(enemy.type === 'hydra') { icon.textContent = "🐍"; }
            if(enemy.type === 'ice') { cell.classList.add('boss-ice'); icon.textContent = "❄️"; }
            if(enemy.type === 'king') { icon.textContent = "👑"; }
            if(enemy.type === 'shaker') { icon.textContent = "🪨"; }
            if(enemy.type === 'summoner') { icon.textContent = "🕷️"; }

            cell.appendChild(icon);
        }

const item = levelData.items.find(i => i.pos === coord);
        if (item) {
            const icon = document.createElement('span');
            
            if (item.type === 'potion') { 
                cell.classList.add('item-potion'); 
                icon.textContent = "+"; // or "❤️"
            }
            else if (item.type === 'weapon') { 
                cell.classList.add('item-weapon'); 
                icon.textContent = "⚔️"; 
            }
            
            cell.appendChild(icon);
        }

        if (levelData.playerStart === coord) {
            cell.classList.add('player');
            const p = document.createElement('span'); 
            p.textContent = "P"; p.style.color="#fff";
            cell.appendChild(p);
        }
    });
}

function exportLevel() {
    if (!levelData.playerStart) { alert("You need a Player Start position!"); return; }
    if (!levelData.door) { alert("You need a Door!"); return; }

    const exportData = { ...levelData };

    // --- MAGIC CONVERSION FOR WARPS ---
    // Converts simple coordinates ["A1", "B2"] into Linked Objects [{pos:"A1", target:"B2"}, ...]
    if (exportData.warps && exportData.warps.length > 0) {
        // Warning for single warp
        if (exportData.warps.length === 1) {
            alert("Warning: You only placed 1 Warp. It won't take you anywhere!");
        }

        exportData.warps = exportData.warps.map((pos, index) => {
            // Calculate next index to create a circle (Chain logic)
            const nextIndex = (index + 1) % exportData.warps.length;
            return {
                pos: pos,
                target: exportData.warps[nextIndex] 
            };
        });
    }

    // Clean up empty arrays
    if(exportData.walls.length === 0) delete exportData.walls;
    if(exportData.hazards.length === 0) delete exportData.hazards;
    if(exportData.thickets.length === 0) delete exportData.thickets;
    if(exportData.rivers.length === 0) delete exportData.rivers;
    if(exportData.ice.length === 0) delete exportData.ice;
    if(exportData.boulders.length === 0) delete exportData.boulders;
    if(exportData.spikes.length === 0) delete exportData.spikes;
    if(exportData.items.length === 0) delete exportData.items;
    if(exportData.warps && exportData.warps.length === 0) delete exportData.warps;
    if(exportData.crystals.length === 0) delete exportData.crystals;
    if(exportData.crumble.length === 0) delete exportData.crumble;

    const json = JSON.stringify(exportData);
    const output = document.getElementById('level-code');
    const area = document.getElementById('output-area');
    
    output.value = json;
    area.style.display = 'block';
    output.select();
    document.execCommand('copy');
    alert("Level code copied! Go to the Game and click 'Load Custom Level'.");
}

initEditor();
