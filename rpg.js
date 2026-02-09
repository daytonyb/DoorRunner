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
    // --- NEW STARTING MENU ---
    '0': {
        name: "The Beginning",
        walls: [],
        portals: [
            { pos: "A1", targetLevel: 'World-Select', targetPos: "E6", type: "portal", label: "W" },
            { pos: "C1", targetLevel: 'Endless-Start', targetPos: "E9", type: "portal", label: "∞" },
            { pos: "E9", type: "door", redirect: "index.html" },
            { pos: "I1", type: "portal", redirect: "editor.html", label: "E" },
            { pos: "G1", targetLevel: 'Story-Select', targetPos: "E6", type: "portal", label: "S" },
            { pos: "E3", targetLevel: 'Tutorial-1', targetPos: "E2", type: "portal", label: "?" },
            { pos: "E1", targetLevel: '0D', targetPos: "E6", type: "portal", label: "D" },
        ],
        enemies: [], items: []
    },

    'World-Select':{
        name: "000 - World Selection",
        walls: ["H6","H7","H8","H9","I6","I7","I8"],
        portals: [
            { pos: "A1", targetLevel: 'Level-Select', targetPos: "E6", type: "portal", label: "W1" },
            { pos: "E1", targetLevel: 'World-2-Select', targetPos: "E6", type: "portal", label: "W2" },
            { pos: "I1", targetLevel: 'World-3-Select', targetPos: "E6", type: "portal", label: "W3" },
            { pos: "I9", targetLevel: 'World-4-Select', targetPos: "E6", type: "portal", label: "???" },
            { pos: "E9", type: "door", targetLevel: '0', targetPos: "E6" },
        ],
        enemies: [], items: []
    },

    // --- ENDLESS MODE CONTAINER (Populated Dynamically) ---
    'Endless': {
        name: "Endless Dungeon",
        walls: [], enemies: [], items: [], portals: []
    },

    // --- CUSTOM LEVEL SLOT ---
    'Custom': {
        name: "Custom Level",
        walls: [], enemies: [], items: [], portals: []
    },

    // --- WORLD SELECTION (Formerly Level 0) ---
    'Level-Select': {
        name: "World 1 - The Introduction",
        walls: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], 
        portals: [
            { pos: "A1", targetLevel: '1-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: '2-1', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: '3-1', targetPos: "A1", type: "portal", label: "3" },
            { pos: "G1", targetLevel: '4-1', targetPos: "A1", type: "portal", label: "4" },
            { pos: "I1", targetLevel: '5-1', targetPos: "A1", type: "portal", label: "5" },
            { pos: "I5", targetLevel: 'World-Select', targetPos: "E6", type: "door" },
            { pos: "A5", type: "inventory", label: "📦" },
        ],
        enemies: [], items: []
    },

    // --- TUTORIAL ---
    'Tutorial-1': { name: "Tutorial: Movement", walls: ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7"], portals: [{ pos: "E8", targetLevel: 'Tutorial-2', targetPos: "E2", type: "door" }], 
        speaker: "Old Man",
        text: [
            "Welcome Wizard!",
            "Use WASD or the arrow keys to move.",
            "Reach the door to continue."
        ],
},
    'Tutorial-2': { name: "Tutorial: Attacking", walls: ["D1","D2","D3","D4","D5","D6","D7","D8","D9","F1","F2","F3","F4","F5","F6","F7","F8","F9"], portals: [{ pos: "E8", targetLevel: 'Tutorial-3', targetPos: "E2", type: "door" }], enemies: [{ pos: "E5", hp: 5 }],
        speaker: "Old Man",
        text: [
            "Now we can introduce attacking!",
            "Click the spacebar to attack orthogonally.",
            "You have to defeat all enemies in a room to move on."
        ],
},
    'Tutorial-3': { name: "Tutorial: Defense", walls: [], portals: [{ pos: "E8", targetLevel: 'Tutorial-Boss', targetPos: "E2", type: "door" }], enemies: [{ pos: "E5", hp: 8 }] ,
        speaker: "Old Man",
        text: [
            "Enemies can also attack you!",
            "Basic enemies only attack diagonally, but you will encounter other types.",
            "Please note, this game has a turn based combat system, so if you are struggling, just slow down!"
        ],
},
    'Tutorial-Boss': { name: "Tutorial: Final Exam", walls: ["A1","A9","I1","I9"], portals: [{ pos: "E8", targetLevel: '0', targetPos: "E6", type: "door" }], enemies: [{ pos: "D5"},{ pos: "F5"}] ,
        speaker: "Old Man",
        text: [
            "Now for a final test of knowledge!",
            "After finishing this, feel free to check out our several levels!",
            "Go into the W portal to explore the 3 different worlds in the game, or check out our different modes by using the different portals on the main menu.",
            "Our game modes include Endless Mode, a Dungeon Mode, a Story Mode, and a Level Maker!"
        ],
},

    // --- LEVEL 1: SEWERS ---
    '1-1': { name: "Sewers - The Sludge", speaker: "Dirty Rags", text: [
            "Welcome to the first level!","These are the Sewers, home to many dangerous creatures.","Watch out for the sludge pits, they will damage you if you step in them!"
        ],walls: ["B3", "B5", "B6", "D2", "D4", "D5", "F4", "F5", "F7", "H4", "H6"], hazards: ["C4", "C5", "G3", "G4", "E6", "F6"], portals: [ { pos: "I9", targetLevel: '1-2', targetPos: "A1", type: "door" } ], enemies: [{pos: "C8"}, {pos: "E1"}, {pos: "A5"}] },
    '1-2': { name: "Sewers - Using The Sludge", speaker: "Dirty Rags", text: [
            "Now there are a lot more enemies in this room.","While the enemies can easily overwhelm you...","You can use the sludge pits to damage them also!"
        ], walls: ["C3", "C4", "C5", "C6", "G3", "G4", "G5", "G6"], hazards: ["D4", "D5", "E4", "E5", "F4", "F5"], portals: [ { pos: "I9", targetLevel: '1-3', targetPos: "A1", type: "door" } ], enemies: [{pos: "E3"}, {pos: "E6"}, {pos: "B5"}, {pos: "H4"}, {pos: "H8"}] },
    '1-3': { name: "Sewers - Using Items", speaker: "Dirty Rags", text: [
            "You might notice there's no sludge to help you in this level...","Instead, you can use the various items in the room to help you!","This is your toughest challenge yet, so make sure to be careful!"
        ], walls: ["C2", "C3", "C4", "G2", "G3", "G4", "C7", "D7", "F7", "G7",], portals: [ { pos: "I9", targetLevel: '1-Boss', targetPos: "E1", type: "door" } ], enemies: [{pos: "E3"}, {pos: "E5"}, {pos: "E7"}, {pos: "E1"}, {pos: "E9"}], items: [{pos: "A9", type: "weapon", value: 2, name: "Rusty Sword"}, {pos: "I1", type: "potion", value: 5}] },
    '1-Boss': { name: "Sewers - The Boss?", speaker: "Dirty Rags", text: [
            "Woah there adventurer!","It seems you have stumbled upon a new type of enemy!","This is the boss fight for this stage!","Beating it will unlock stage 2 and and a harder version of this level..."
        ], walls: [], portals: [ { pos: "E9", targetLevel: 'Level-Select', targetPos: "E6", type: "door" } ], enemies: [{pos: "E5", isBoss: true}] },

    // --- LEVEL 2: FOREST ---
    '2-1': { name: "Forest - Overgrowth",speaker: "Bushman", text: [
            "Welcome to the second level!","Here you can find bushes that can slow you down...","Either avoid them, or use them if you want to."
        ], walls: ["B2", "B3", "B4", "H6", "H7", "H8"], thickets: ["C2", "C3", "C4", "D2", "D3", "G6", "G7", "F6", "F7"], portals: [{pos: "I9", targetLevel: '2-2', targetPos: "A1", type: "door"}], enemies: [{pos: "D5"}, {pos: "G2"}, {pos: "B8"}] },
    '2-2': { name: "Forest - Rapids", speaker: "Bushman", text: [
            "Here you can find rivers that sweep you downstream!","If they sweep you into an object, you can take damage...","Be careful and defeat the enemies!"
        ],walls: ["A5", "B5", "H5", "I5"], rivers: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"], thickets: ["D2", "D8", "F2", "F8"], portals: [{pos: "I9", targetLevel: '2-3', targetPos: "A1", type: "door"}], enemies: [{pos: "C5"}, {pos: "G5"}, {pos: "F1"}] },
    '2-3': { name: "Forest - Spider Nest", speaker: "Bushman", text: [
            "Wow! A new type of enemy!","This is the first enemy with a ranged attack!","Watch out and fight strategically!"
        ],walls: ["C3", "C7", "G3", "G7", "E5"], portals: [{pos: "I9", targetLevel: '2-Boss', targetPos: "E1", type: "door"}], enemies: [ {pos: "C5", type: "ranged"}, {pos: "G5", type: "ranged"}, {pos: "E3", type: "ranged"} ], items: [ {pos: "A9", type: "potion", value: 5}, {pos: "E9", type: "weapon", value: 2, name: "Rusty Sword"} ] },
    '2-Boss': { name: "Forest - BROODMOTHER", speaker: "Bushman", text: [
            "This is another type of boss!","This boss will spawn enemies that you have to defeat.",
        ],walls: ["A1", "A9", "I1", "I9"], thickets: ["C3", "C7", "G3", "G7"], portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "summoner"}] },

    // --- LEVEL 3: MINES ---
    '3-1': { name: "Mines - Collapse", walls: ["B2", "B8", "H2", "H8"], boulders: ["C5", "D5", "E5", "F5", "G5", "E3", "E7"], portals: [{pos: "I9", targetLevel: '3-2', targetPos: "A1", type: "door"}], enemies: [{pos: "E5", type: "golem", hp: 15}] },
    '3-2': { name: "Mines - Golem Hall", walls: ["C3", "C7", "G3", "G7"], boulders: ["B2", "B8", "H2", "H8", "D5", "F5"], portals: [{pos: "I9", targetLevel: '3-3', targetPos: "A1", type: "door"}], enemies: [{pos: "E2", type: "golem", hp: 15}, {pos: "E8", type: "golem", hp: 15}, {pos: "H5", type: "golem", hp: 15}], items: [{pos: "E5", type: "potion", value: 5}] },
    '3-3': { name: "Mines - The Colony", walls: [], boulders: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8"], portals: [{pos: "I9", targetLevel: '3-Boss', targetPos: "E1", type: "door"}], enemies: [{pos: "E4", type: "golem", hp: 15}, {pos: "E6", type: "golem", hp: 15}, {pos: "A5", type: "bat", hp: 4}, {pos: "B5", type: "bat", hp: 4}, {pos: "H2", type: "bat", hp: 4}, {pos: "H8", type: "bat", hp: 4}], items: [{pos: "A9", type: "weapon", value: 2, name: "Rusty Sword"}] },
    '3-Boss': { name: "Mines - EARTHSHAKER", walls: ["A1", "A9", "I1", "I9"], boulders: ["C3", "C7", "G3", "G7"], portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "shaker", hp: 50}] },

    // --- LEVEL 4: THE CASTLE ---
    '4-1': { name: "Castle - Gatehouse", walls: ["C3","C7","G3","G7"], spikes: ["C5","D5","E5","F5","G5", "E3","E7","E4","E6","A5","B5","E1","E2","E8","E9","H5","I5"], portals: [{pos: "I9", targetLevel: '4-2', targetPos: "A1", type: "door"}], enemies: [{pos: "D4", type: "guard", hp: 12},{pos: "F4", type: "guard", hp: 12},{pos: "D6", type: "guard", hp: 12},{pos: "F6", type: "guard", hp: 12},] },
    '4-2': { name: "Castle - Clockwork Hall", walls: ["B2","B8","H2","H8"], spikes: ["C2","C4","C6","C8", "E2","E4","E6","E8", "G2","G4","G6","G8"], portals: [{pos: "I9", targetLevel: '4-3', targetPos: "A1", type: "door"}], enemies: [ {pos: "E5", type: "guard", hp: 12}, {pos: "C5", type: "guard", hp: 12}, {pos: "G5", type: "guard", hp: 12},{pos: "F5", type: "guard", hp: 12},{pos: "D5", type: "guard", hp: 12}], items: [] },
    '4-3': { name: "Castle - Royal Quarters", walls: [], spikes: ["B2","B3","B4","B5","B6","B7","B8", "H2","H3","H4","H5","H6","H7","H8"], portals: [{pos: "I9", targetLevel: '4-Boss', targetPos: "E1", type: "door"}], enemies: [ {pos: "E5", type: "guard", hp: 12}, {pos: "A5", type: "mage", hp: 6}, {pos: "I5", type: "mage", hp: 6} ], items: [{pos: "I1", type: "weapon", value: 2, name: "Steel Sword"},{pos: "A9", type: "potion", value: 5}] },
    '4-Boss': { name: "Castle - THE MAD KING", walls: ["A1","A9","I1","I9"], spikes: ["C3","C7","G3","G7"], portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "E6", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "king", hp: 60}] },

    // --- LEVEL 5: THE VOID ---
    '5-1': { 
        name: "Void - Fractured Path", 
        walls: ["C2","C8","G2","G8", "E4","E6"], 
        warps: [ {pos: "B5", target: "H5"}, {pos: "H5", target: "B5"} ],
        portals: [{pos: "I9", targetLevel: '5-2', targetPos: "A1", type: "door"}], 
        enemies: [{pos: "E3"},{pos: "E5"},{pos: "E7"},{pos: "D5", type: "leech", hp: 8}, {pos: "F5", type: "leech", hp: 8}] 
    },
    '5-2': { 
        name: "Void - Gravity Well", 
        walls: ["C4","C5","C6","G4","G5","G6","D2","E2","F2","D8","E8","F8"], 
        spikes: [],
        warps: [ {pos: "A1", target: "I9"}, {pos: "I9", target: "A1"}, {pos: "A9", target: "I1"}, {pos: "I1", target: "A9"} ],
        portals: [{pos: "E5", targetLevel: '5-3', targetPos: "A1", type: "door"}], 
        enemies: [
            {pos: "D5"},
            {pos: "F5"},
            {pos: "E4"},
            {pos: "E6"},
            {pos: "C3", type: "sentinel", hp: 10}, 
            {pos: "G7", type: "sentinel", hp: 10}, 
            {pos: "B8", type: "leech", hp: 8}, 
            {pos: "H2", type: "leech", hp: 8}
        ] 
    },
    '5-3': { 
        name: "Void - Shifting Maze", 
        walls:    ["B2","B3","B4", "D6","D7","D8", "F2","F3","F4", "H6","H7","H8"], // Set A
        altWalls: ["B6","B7","B8", "D2","D3","D4", "F6","F7","F8", "H2","H3","H4"], // Set B
        portals: [{pos: "I5", targetLevel: '5-Boss', targetPos: "E1", type: "door"}], 
        enemies: [
            {pos: "A5"},
            {pos: "I5"},
            {pos: "E5", type: "golem", hp: 15},
            {pos: "C5", type: "sentinel", hp: 12}, 
            {pos: "G5", type: "sentinel", hp: 12},
            {pos: "E9", type: "leech", hp: 8},
            {pos: "E1", type: "leech", hp: 8}
        ] ,
        items: [{pos: "F7", type: "potion", value: 5}, {pos: "D3", type: "weapon", value: 2, name: "Rusty Sword"}]
    },
    '5-Boss': { 
        name: "Void - ENTROPY", 
        walls: [], 
        portals: [{pos: "E5", targetLevel: 'Level-Select', targetPos: "E6", type: "door"}], // Spawns after win
        enemies: [{pos: "E5", isBoss: true, type: "entropy", hp: 80}] 
    },

    // --- EX LEVELS ---
    'EX-1-1': { name: "EX-1: Rabid Tunnels", walls: ["B2", "D2", "F2", "H2", "B8", "D8", "F8", "H8"], hazards: ["C5", "E5", "G5"], portals: [ { pos: "I5", targetLevel: 'EX-1-2', targetPos: "A5", type: "door" } ], enemies: [ {pos: "E3", type: "fast", hp: 4}, {pos: "E7", type: "fast", hp: 4} ] },
    'EX-1-2': { name: "EX-1: Toxic Nest", walls: ["C3", "C7", "G3", "G7"], hazards: ["A1","A2","A3","A7","A8","A9", "I1","I2","I3","I7","I8","I9"], portals: [ { pos: "E9", targetLevel: 'EX-1-3', targetPos: "E1", type: "door" } ], enemies: [ {pos: "B5", type: "fast", hp: 4}, {pos: "H4", type: "fast", hp: 4},{pos: "H6", type: "fast", hp: 4}, {pos: "E6", type: "melee", hp: 12},{pos: "E4", type: "melee", hp: 12} ] },
    'EX-1-3': { name: "EX-1: The Swarm", walls: [], hazards: ["E5"], portals: [ { pos: "I9", targetLevel: 'EX-1-Boss', targetPos: "A1", type: "door" } ], enemies: [ {pos: "C3", type: "fast", hp: 4}, {pos: "G3", type: "fast", hp: 4}, {pos: "C7", type: "fast", hp: 4},{pos: "G5", type: "fast", hp: 4},{pos: "C5", type: "fast", hp: 4}, {pos: "G7", type: "fast", hp: 4} ], items: [ {pos: "A9", type: "potion", value: 5}, {pos: "I1", type: "weapon", value: 2, name: "Rusty Sword"} ] },
    'EX-1-Boss': { name: "EX-BOSS: PLAGUE KING", walls: ["B2", "B8", "H2", "H8"], hazards: ["A1", "A9", "I1", "I9"], portals: [ { pos: "E5", targetLevel: 'Level-Select', targetPos: "A9", type: "door" } ], enemies: [{pos: "E5", isBoss: true, type: "summoner", hp: 40}] },

    'EX-2-1': { name: "EX-2: Poison Flow", walls: ["B2","B8","H2","H8"], rivers: ["D1","D2","D3","D4","D5","D6","D7","D8", "F1","F2","F3","F4","F5","F6","F7","F8"], thickets: ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7"], hazards:  ["C3","C4","C5","C6","C7", "G3","G4","G5","G6","G7", "D9", "F9"], portals: [{pos: "E9", targetLevel: 'EX-2-2', targetPos: "A5", type: "door"}], enemies: [{pos: "A5", type: "fast", hp: 6}, {pos: "I5", type: "fast", hp: 6}, {pos: "E4", type: "ranged"},{pos: "E6", type: "ranged"} ] },
    'EX-2-2': { name: "EX-2: Thorny Mud", walls: ["B2","B4","B6","B8", "H2","H4","H6","H8"], thickets: ["C2","C3","C4","C5","C6","C7","C8", "E2","E3","E4","E5","E6","E7","E8", "G2","G3","G4","G5","G6","G7","G8"], hazards: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8"], portals: [{pos: "I5", targetLevel: 'EX-2-3', targetPos: "A5", type: "door"}], enemies: [{pos: "D5", type: "fast", hp: 6}, {pos: "F5", type: "fast", hp: 6}, {pos: "E9", type: "ranged"},{pos: "E1", type: "ranged"},{pos: "I5", type: "ranged"}] },
    'EX-2-3': { name: "EX-2: The Drain", walls: [], rivers: ["B2","B3","B4","B5","B6","B7","B8", "H2","H3","H4","H5","H6","H7","H8"], thickets: ["A1","A9","I1","I9"], hazards: ["E5", "D5", "F5", "E4", "E6"], portals: [{pos: "E9", targetLevel: 'EX-2-Boss', targetPos: "E1", type: "door"}], enemies: [{pos: "C5", type: "fast", hp: 8}, {pos: "G5", type: "fast", hp: 8}, {pos: "E2", type: "ranged"}, {pos: "E8", type: "ranged"}], items: [{pos: "A4", type: "potion", value: 5}, {pos: "A6", type: "weapon", value: 2, name: "Rusty Sword"}] },
    'EX-2-Boss': { name: "EX-BOSS: SWAMP HYDRA", walls: ["A1","A9","I1","I9"], thickets: ["D4","D5","D6", "F4","F5","F6", "E4","E6"], hazards:  ["D4","D5","D6", "F4","F5","F6", "E4","E6"], portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "C9", type: "door"}], enemies: [{pos: "E5", isBoss: true, type: "hydra", hp: 60}] },

    // --- EX-3: FROZEN DEPTHS ---
    'EX-3-1': { 
        name: "EX-3: Slippery Slope", walls: ["B2","B8","H2","H8"], 
        ice: ["C2","C3","C4","C5","C6","C7","C8", "G2","G3","G4","G5","G6","G7","G8", "D5","E5","F5"],
        portals: [{pos: "E9", targetLevel: 'EX-3-2', targetPos: "A5", type: "door"}], 
        enemies: [{pos: "D5", type: "golem", hp: 15},{pos: "F5", type: "golem", hp: 15}] 
    },
    'EX-3-2': { 
        name: "EX-3: Frozen Lake", walls: [], 
        ice: ["B2","B3","B4","B5","B6","B7","B8","C2","C3","C4","C5","C6","C7","C8","D2","D3","D4","D5","D6","D7","D8","E2","E3","E4","E5","E6","E7","E8","F2","F3","F4","F5","F6","F7","F8","G2","G3","G4","G5","G6","G7","G8","H2","H3","H4","H5","H6","H7","H8"],
        portals: [{pos: "E9", targetLevel: 'EX-3-3', targetPos: "A5", type: "door"}], 
        enemies: [ {pos: "C5", hp: 6}, {pos: "G5",type:"fast", hp: 6}, {pos: "E5", type: "golem", hp: 15} ],
    },
    'EX-3-3': { 
        name: "EX-3: The Glacier", walls: ["C3","G3","C7","G7"], 
        ice: ["A2","A3","A4","A5","A6","A7","A8", "I2","I3","I4","I5","I6","I7","I8"], 
        portals: [{pos: "E9", targetLevel: 'EX-3-Boss', targetPos: "E2", type: "door"}], 
        enemies: [ {pos: "B5", type: "fast", hp: 8}, {pos: "H5", type: "fast", hp: 8},{pos: "E8", type: "fast", hp: 8},{pos: "E2", type: "fast", hp: 8}, {pos: "E5", type: "golem", hp: 15} ],
        items: [{pos: "A9", type: "potion", value: 5}, {pos: "I1", type: "weapon", value: 2, name: "Rusty Sword"}]
    },
    'EX-3-Boss': { 
        name: "EX-BOSS: ICE QUEEN", walls: ["A1","A9","I1","I9"], ice: ["B2","B8","H2","H8", "C3","C7","G3","G7"],
        portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "E9", type: "door"}], 
        enemies: [{pos: "E5", isBoss: true, type: "summoner", hp: 50}] 
    },

    // --- EX-4: THE CLOCKWORK DUNGEON ---
    'EX-4-1': { 
        name: "EX-4: The Switch Track", 
        walls: ["B2","B4","B6","B8", "H2","H4","H6","H8"], 
        conveyors: [ {y: 2, dir: 1}, {y: 6, dir: -1} ], // Row indices (0-8)
        levers: ["E5"], // Toggle direction
        spikes: ["E2","E4","E6","E8","C4","C6","G4","G6","A5","I5"], // Hazards on the belts
        portals: [{pos: "I9", targetLevel: 'EX-4-2', targetPos: "A1", type: "door"}], 
        enemies: [{pos: "C5", type: "guard", hp: 12}, {pos: "G5", type: "guard", hp: 12}] 
    },
    'EX-4-2': { 
        name: "EX-4: The Foundry", 
        walls: ["C3","C7","G3","G7"], 
        conveyors: [ {y: 1, dir: 1}, {y: 3, dir: -1}, {y: 5, dir: 1}, {y: 7, dir: -1} ],
        levers: ["E5"],
        spikes: ["B2","E2","H2","B4","E4","H4","B6","E6","H6","B8","E8","H8"], // Hazards on the belts
        portals: [{pos: "I9", targetLevel: 'EX-4-3', targetPos: "A1", type: "door"}], 
        enemies: [{pos: "E3", type: "welder", hp: 10}, {pos: "E7", type: "welder", hp: 10}, {pos: "A5", type: "guard", hp: 12}, {pos: "I5", type: "guard", hp: 12}, {pos: "E1", type: "guard", hp: 12}, {pos: "E9", type: "guard", hp: 12}] 
    },
    'EX-4-3': { 
        name: "EX-4: Assembly Line", 
        walls: [], 
        conveyors: [ {y: 2, dir: 1}, {y: 6, dir: -1} ],
        levers: ["E5"],
        spikes: ["B2","C2","D2","F2","G2","H2", "B6","C6","D6","F6","G6","H6"], // Hazards on the belts
        portals: [{pos: "I9", targetLevel: 'EX-4-Boss', targetPos: "E1", type: "door"}], 
        enemies: [ {pos: "A5", type: "welder", hp: 10}, {pos: "I5", type: "welder", hp: 10}, {pos: "E4", type: "guard"},{pos: "E6", type: "guard", hp: 12},{pos: "D5", type: "guard", hp: 12}, {pos: "F5", type: "guard", hp: 12},{pos: "E2", type: "welder", hp: 10},{pos: "E8", type: "welder", hp: 10}] 
    },
    'EX-4-Boss': { 
        name: "EX-BOSS: GEAR GRINDER", 
        walls: [], 
        portals: [{pos: "E9", targetLevel: 'Level-Select', targetPos: "G9", type: "door"}], 
        enemies: [{pos: "E5", isBoss: true, type: "gear", hp: 70}] 
    },

    'World-2-Select': {
        name: "200 - The Swamp",
        walls: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], 
        portals: [
            { pos: "A1", targetLevel: 'W2-1', targetPos: "E6", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W2-2', targetPos: "E6", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W2-3', targetPos: "E6", type: "portal", label: "3" },
            { pos: "G1", targetLevel: 'W2-4', targetPos: "E6", type: "portal", label: "4" },
            { pos: "I1", targetLevel: 'W2-5', targetPos: "E6", type: "portal", label: "5" },
            { pos: "I5", targetLevel: 'World-Select', targetPos: "E6", type: "door" },
            { pos: "A5", type: "inventory", label: "📦" },
        ],
        enemies: [], items: []
    },
    'W2-1': { 
        name: "210 Muddy Water", 
        walls: ["I2","H2","B2","D2","F2","G2"], 
        portals: [
            { pos: "A1", targetLevel: 'W2-1-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W2-1-2', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W2-1-3', targetPos: "A1", type: "portal", label: "3" },
            { pos: "E9", targetLevel: 'World-2-Select', targetPos: "E6", type: "door" },
            { pos: "I1", type: "portal", label: "B" },
        ],
    },

        'W2-1-1': { 
        name: "211 - Getting Wet", 
        walls: ["B3","C2","D3","F3","G2","H3","B7","C8","D7","F7","G8","H7","E6","E4"], 
        enemies: [
            { pos: "C3"}, { pos: "G3"}, { pos: "C7"}, { pos: "G7"}, { pos: "E3"}, { pos: "E7"}, { pos: "E5"},{pos: "C5"}, {pos: "G5"}
        ],
        hazards: ["A5","E1","I5","E9"],
        portals: [
            { pos: "I9", targetLevel: 'W2-1', targetPos: "E6", type: "door" },
        ],
    },

        'W2-1-2': { 
        name: "212 - Getting Dirty", 
        walls: ["A4","A5","A6","I4","I5","I6","D1","E1","F1","D9","E9","F9"], 
        enemies: [{pos: "G2"},{pos: "G3"},{pos: "H3"},{pos: "B7"},{pos: "C7"},{pos: "C8"},{pos: "G7"},{pos: "I8", type:"fast"},{pos: "H9", type:"fast"}],
        hazards: ["D4","D5","D6","F4","F5","F6","E4","E6","E5"],
        portals: [
            { pos: "I9", targetLevel: 'W2-1', targetPos: "E6", type: "door" },
        ],
    },

        'W2-1-3': { 
        name: "213 Big Fight", 
        walls: ["C1","A3","G9","I7","G1","I3","A7","C9"], 
        enemies: [{pos: "H1"},{pos: "I2"},{pos: "A8"},{pos: "B9"},{pos: "H9"},{pos: "I8"},{pos: "I1", type: "fast"},{pos: "A9", type: "fast"},{pos: "H8", type: "fast"}], 
        hazards: ["A4","A5","A6","I4","I5","I6","D1","E1","F1","D9","E9","F9"],
        portals: [
            { pos: "I9", targetLevel: 'W2-1', targetPos: "E6", type: "door" },
        ],
    },

'W2-1-4': { 
        name: "21B The Mud Monster", 
        walls: ["A1","A9","I1","I9"], 
        hazards: [], // Starts clean, gets dirty as boss moves
        portals: [
            { pos: "E9", targetLevel: 'W2-1', targetPos: "E6", type: "door" }, // Exit
        ],
        enemies: [{ pos: "E5", isBoss: true, type: "mud_monster", hp: 100 }] 
    },
        'W2-2': { 
        name: "220 Muddy Plants", 
        walls: ["I2","H2","B2","D2","F2","G2"], 
        portals: [
            { pos: "A1", targetLevel: 'W2-2-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W2-2-2', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W2-2-3', targetPos: "A1", type: "portal", label: "3" },
            { pos: "E9", targetLevel: 'World-2-Select', targetPos: "E6", type: "door" },
            { pos: "I1", type: "portal", label: "B" },
        ],
    },

        'W2-2-1': { 
        name: "221 Small Obstacles", 
        walls: ["C1","D1","E1","F1","G1","C9","D9","E9","F9","G9","I3","I4","I5","I6","I7","A3","A4","A5","A6","A7"], 
        enemies: [
            { pos: "I1", type: "fast"}, { pos: "A9", type: "fast"}, {pos: "E5", type: "golem"},{pos: "D5"}, {pos: "F5"},{pos: "E4"},{pos: "E6"}
        ],
        hazards: ["D2","E2","F2","D8","E8","F8","B5","H5","H4","H6","B4","B6"],
        thickets: ["A1","A2","B1","B2","H1","H2","I1","I2","A8","A9","B8","B9","H8","H9","I8","I9"],
        portals: [
            { pos: "I9", targetLevel: 'W2-2', targetPos: "E6", type: "door" },
        ],
    },

        'W2-2-2': { 
        name: "222 Thorny Paths", 
        walls: ["A3","A4","A6","A7","I3","I4","I6","I7","C1","D1","F1","G1","C9","D9","F9","G9"], 
        enemies: [{ pos:"I1", type:"golem"}, { pos:"A9", type:"golem"},{pos: "D5"},{pos: "F5"},{pos: "E4"},{pos: "E6"},{pos: "E5", type:"fast"}],
        hazards: ["E1","E2","E3","E7","E8","E9","B5","H5","A5","C5","G5","I5"],
        thickets: ["D4","E4","F4","D6","E6","F6","D5","E5","F5"],
        portals: [
            { pos: "I9", targetLevel: 'W2-2', targetPos: "E6", type: "door" },
        ],
    },

        'W2-2-3': { 
        name: "223 Muddy Manouvers", 
        walls: ["A2","C5","C6","C7","E2","A3","B3","E3","A9","B9","C9","F6","F7","G6","G7"], 
        enemies: [{pos: "A5", type:"golem"},{pos: "A6", type:"golem"},{pos: "A7", type:"golem"},{pos: "B5", type:"fast"},{pos: "B6", type:"fast"},{pos: "B7", type:"fast"},{pos: "A4"},{pos: "B4"},{pos: "A8"},{pos: "B8"},], 
        hazards: ["C4","C8","F5","I4","H8","E7"],
        thickets: ["F2","G2","H2","F3","G3","H3","I2","I3","D8","H5","E4","I8"],
        portals: [
            { pos: "I9", targetLevel: 'W2-2', targetPos: "E6", type: "door" },
        ],
    },

'W2-2-4': { 
        name: "22B - The Tangler", 
        walls: ["A1","A9","I1","I9"], 
        hazards: [], 
        thickets: [], // Starts clear, grows as boss moves
        portals: [
            { pos: "E9", targetLevel: 'W2-2', targetPos: "E6", type: "door" }, // Exit
        ],
        enemies: [{ pos: "E5", isBoss: true, type: "tangler", hp: 100 }] 
    },
            'W2-3': { 
        name: "230 Swampy Forests", 
        walls: ["I2","H2","B2","D2","F2","G2"], 
        portals: [
            { pos: "A1", targetLevel: 'W2-3-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W2-3-2', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W2-3-3', targetPos: "A1", type: "portal", label: "3" },
            { pos: "E9", targetLevel: 'World-2-Select', targetPos: "E6", type: "door" },
            { pos: "I1", type: "portal", label: "B" },
        ],
    },
            'W2-3-1': { 
        name: "231 The Roots", 
        walls: ["F3","G3","G4","D7","C7","C6","F7","G7","G6"], 
        enemies: [
            { pos:"E4", type: "ranged"}, { pos:"F5", type: "ranged"}, { pos:"E6", type: "ranged"}, { pos:"D5", type: "ranged"}, {pos: "D4", type: "fast"}, {pos: "D6", type: "fast"}, {pos: "F4", type: "fast"}, {pos: "F6", type: "fast"}, {pos: "E3"}, {pos: "E7"}, {pos: "C5"}, {pos: "G5"}
        ],
        hazards: ["E1","A5","I5","E9","C3","D3","C4"],
        thickets: ["B2","B8","H2","H8"],
        portals: [
            { pos: "I9", targetLevel: 'W2-3', targetPos: "E6", type: "door" },
        ],
    },
                'W2-3-2': { 
        name: "232 The Trunks", 
        walls: ["A7","B7","C7","A8","B8","C8","G1","H1","I1","G2","H2","I2","A9","B9","C9","G3","H3","I3","A5","B6","A6","D8","D9","E9","E1","F1","F2","H4","I4","I5"],
        enemies: [
            {pos: "I8", type: "golem"},{pos: "H9", type: "golem"},
            {pos: "G8", type: "ranged"},{pos: "H7", type: "ranged"},
            {pos: "F7", type: "fast"},{pos: "G6", type: "fast"},
            {pos: "E6"},{pos: "F5"}
        ],
        hazards: ["A4","B5","C6","D7","E8","F9","D1","E2","F3","G4","H5","I6"],
        thickets: ["A3","B4","C5","D6","E7","F8","G9","C1","D2","E3","F4","G5","H6","I7"],
        portals: [
            { pos: "I9", targetLevel: 'W2-3', targetPos: "E6", type: "door" },
        ],
    },
                    'W2-3-3': { 
        name: "233 The Canopy", 
        walls: [], 
        enemies: [
            {pos: "G9", type: "golem"},{pos: "I7", type: "golem"},{pos: "I9", type: "golem"},
            {pos: "F8", type: "ranged"},{pos: "H6", type: "ranged"},
            {pos: "D7", type: "fast"},{pos: "G4", type: "fast"},{pos: "D4", type: "fast"},
            {pos: "A7"},{pos: "G1"},{pos: "H9"},{pos: "I8"}
        ],
        hazards: ["B2","E2","H2","B5","E5","H5","B8","E8","H8"],
        thickets: ["G1","H1","I1","G2","H2","I2","G3","H3","I3","D4","D5","D6","E4","E5","E6","F4","F5","F6","A7","B7","C7","A8","B8","C8","A9","B9","C9"],
        portals: [
            { pos: "I9", targetLevel: 'W2-3', targetPos: "E6", type: "door" },
        ],
    },
'W2-3-4': { 
        name: "23B - The Storm Wing", 
        walls: [
            "A1","A2","A8","A9", 
            "I1","I2","I8","I9",
            "C5","G5", "E3", "E7" // Central pillars to get slammed into
        ], 
        hazards: [], 
        thickets: [],
        portals: [
            { pos: "E9", targetLevel: 'W2-3', targetPos: "E6", type: "door" }, 
        ],
        enemies: [
            { pos: "E5", isBoss: true, type: "zephyr", hp: 100 },
            { pos: "E5", isBoss: true, hp: 75}
        ] 
    },
            'W2-4': { 
        name: "240 Swampy Forests", 
        walls: ["I2","H2","B2","D2","F2","G2"], 
        portals: [
            { pos: "A1", targetLevel: 'W2-4-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W2-4-2', targetPos: "A1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W2-4-3', targetPos: "A1", type: "portal", label: "3" },
            { pos: "E9", targetLevel: 'World-2-Select', targetPos: "E6", type: "door" },
            { pos: "I1", type: "portal", label: "B" },
        ],
    },
            'W2-4-1': { 
        name: "241 ", 
        walls: ["C1","D1","E1","F1","G1","C9","D9","E9","F9","G9","A3","A4","A5","A6","A7","I3","I4","I5","I6","I7","E2","E3","E4","E5","E6","E7","E8","B5","C5","D5","F5","G5","H5"], 
        enemies: [
            { pos: "D3", type: "mage"}, {pos: "C4", type: "mage"}, {pos: "F3", type: "mage"}, {pos: "G4", type: "mage"}, {pos: "D7", type: "mage"}, {pos: "C6", type: "mage"}, {pos: "F7", type: "mage"}, {pos: "G6", type: "mage"},{pos: "G3", type: "guard"},{pos:"C7", type: "guard"},
        ],
        hazards: [],
        thickets: [],
        warps: [
            {pos: "D4",target: "F6"}, {pos: "F4", target: "D6"}, {pos: "D6", target: "F4"}, {pos: "F6", target: "D4"}, {pos: "D2", target: "F2"}, {pos: "H4", target: "H6"}, {pos: "F8", target: "D8"}, {pos: "B6", target: "B4"},
        ],
        portals: [
            { pos: "I9", targetLevel: 'W2-4', targetPos: "E6", type: "door" },
        ],
    },
                'W2-4-2': { 
        name: "242 ", 
        walls: ["A5","B6","A6","D8","D9","E9","E1","F1","F2","H4","I4","I5","G3","C7"],
        enemies: [
            {pos: "I8", type: "guard"},{pos: "H9", type: "guard"},{pos: "H8", type: "guard"},
            {pos: "G8", type: "ranged"},{pos: "H7", type: "ranged"},
            {pos: "F7", type: "mage"},{pos: "G6", type: "mage"},
            {pos: "E6"},{pos: "F5"}
        ],
        warps: [
            {pos: "D1", target: "G1"},{pos: "G1", target: "D1"}, {pos: "C9", target: "F9"}, {pos: "F9", target: "C9"},{pos: "I1", target:"A9"},{pos: "A9", target:"I1"},
        ],
        portals: [
            { pos: "I9", targetLevel: 'W2-4', targetPos: "E6", type: "door" },
        ],
    },
                    'W2-4-3': { 
        name: "243 ", 
        walls: [], 
        enemies: [
            { pos: "D3", type: "mage"},{ pos: "E3", type: "mage"},{ pos: "F3", type: "mage"},{ pos: "C4", type: "mage"},{ pos: "C5", type: "mage"},{ pos: "C6", type: "mage"},{ pos: "F6", type: "guard"},{ pos: "G5", type: "guard"},{ pos: "E7", type: "guard"},{ pos: "D4", type: "guard"},
        ],
        hazards: ["H1","I1","I2","A8","A9","B9"],
        spikes: ["B2","E2","H2","B5","E5","H5","B8","E8","H8","C3","G3","C7","G7","E4","E6","D5","F5"],
        portals: [
            { pos: "I9", targetLevel: 'W2-4', targetPos: "E6", type: "door" },
        ],
    },
'W2-4-4': { 
        name: "24B ", 
        walls: [

        ], 
        hazards: [], 
        thickets: [],
        portals: [
            { pos: "E9", targetLevel: 'W2-4', targetPos: "E6", type: "door" }, 
        ],
        enemies: [
            { pos: "E5", isBoss: true, type: "dragonfly", hp: 75 },
            { pos: "E5", isBoss: true, type: "king", hp: 50}
        ] 
    },

        'World-3-Select': {
        name: "300 - New Introductions",
        walls: ["B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2"], 
        portals: [
            { pos: "A1", targetLevel: 'W3-1', targetPos: "E6", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W3-2', targetPos: "E6", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W3-3', targetPos: "E6", type: "portal", label: "3" },
            { pos: "G1", targetLevel: 'W3-4', targetPos: "E6", type: "portal", label: "4" },
            { pos: "I1", targetLevel: 'W3-5', targetPos: "E6", type: "portal", label: "5" },
            { pos: "I5", targetLevel: 'World-Select', targetPos: "E6", type: "door" },
            { pos: "A5", type: "inventory", label: "📦" },
        ],
        enemies: [], items: []
    },

        'W3-1': { 
        name: "310 Muddy Water", 
        walls: ["I2","H2","B2","D2","F2","G2","I3"], 
        portals: [
            { pos: "A1", targetLevel: 'W3-1-1', targetPos: "A1", type: "portal", label: "1" },
            { pos: "C1", targetLevel: 'W3-1-2', targetPos: "E1", type: "portal", label: "2" },
            { pos: "E1", targetLevel: 'W3-1-3', targetPos: "A1", type: "portal", label: "3" },
            { pos: "E9", targetLevel: 'World-3-Select', targetPos: "E6", type: "door" },
            { pos: "I1", type: "portal", label: "B" },
        ],
    },

    'W3-1-1': { 
        name: "311 Unstable Ground", 
        walls: ["B1","B2","B3","H1","H2","H3", "B7","B8","B9","H7","H8","H9"], 
        crumble: [
            "C4","D4","E4","F4","G4",
            "C5","D5","E5","F5","G5",
            "C6","D6","E6","F6","G6"
        ],
        enemies: [
            { pos: "E2", type: "mage"},{ pos: "E8", type: "mage"},
            {pos: "E1", type: "golem"},{pos: "E9", type: "golem"},
        ],
        portals: [
            { pos: "I9", targetLevel: 'W3-1', targetPos: "E6", type: "door" }
        ],
    },

'W3-1-2': { 
        name: "312 Blast Mining", 
        walls: [
            "E4","D4","F4","G1","G2","G3","C1","C2","C3", 
            "D8","E8","F8"
        ],
        crystals: ["E3", "E7", "F6", "D6","E5"], 
        pits: ["A1","A2","A3","I1","I2","I3"],
        enemies: [
            { pos: "E6", type: "golem", hp: 15 }, // Hard to kill normally, easy with crystal
            { pos: "H6", type: "golem", hp: 15 },
            { pos: "B6", type: "golem", hp: 15 },
            { pos: "B9", type: "golem", hp: 15 },
            { pos: "E9", type: "golem", hp: 15 },
            { pos: "H9", type: "golem", hp: 15 },
        ],
        portals: [
            { pos: "I9", targetLevel: 'W3-1', targetPos: "E6", type: "door" } // Next level
        ],
    },

'W3-1-3': { 
        name: "313 - Volatile Bridge", 
        walls: [
            "C1","C2","C3","C4","C6","C7","C8","C9", 
            "E1","E2","E3","E4","E6","E7","E8","E9", 
            "G1","G2","G3","G4","G6","G7","G8","G9"
        ], 
        boulders: ["C5", "E5", "G5"], 
        crystals: ["B5", "D5", "F5"],
        crumble: [
            "B4","B5","B6", // Zone 1 floor
            "D4","D5","D6", // Zone 2 floor
            "F4","F5","F6", // Zone 3 floor
            "H4","H5","H6", // Exit zone floor
            "A5", "I5"      // Start and End
        ],
        enemies: [
            { pos: "D3", type: "golem", hp: 15 }, 
            { pos: "F7", type: "golem", hp: 15 },
            { pos: "H2", type: "mage" }, // Snipers at the end
            { pos: "H8", type: "mage" }
        ], 
        portals: [
            { pos: "I5", targetLevel: 'W3-1', targetPos: "A5", type: "door" }
        ],
    },

'W3-1-4': { 
        name: "31B The Mud Monster", 
        walls: ["A1","A9","I1","I9"], 
        hazards: [], 
        portals: [
            { pos: "E9", targetLevel: 'W2-1', targetPos: "E6", type: "door" }, // Exit
        ],
        enemies: [{ pos: "E5", isBoss: true, type: "mud_monster", hp: 100 }] 
    },
}

if (typeof STORY_CAMPAIGN !== 'undefined') {
    Object.assign(LEVELS, STORY_CAMPAIGN);
}

// --------------------------------

// ---------------------------------------------------------
// REPLACE ALL GLOBAL VARIABLES WITH THIS BLOCK
// ---------------------------------------------------------

let currentLevelId = '0'; 
let currentSaveSlot = 'rpgSave_1'; 
let player = { 
    x: 0, y: 0, hp: 15, maxHp: 15, damage: 2, 
    xp: 0, maxXp: 100, level: 1, 
    critChance: 0, 
    dodgeChance: 0, 
    executioner: 0, 
    skills: [], 
    cooldowns: { heal: 0, cleave: 0, dash: 0 },
    facing: { x: 0, y: 1 }
};

let enemies = []; 
let items = []; 
let boulders = []; 
let tempWalls = [];
let crystals = [];
let playerActionsLeft = 2; 

let gameProgress = { level1Complete: false, level2Complete: false, level3Complete: false, level4Complete: false, level5Complete: false };
let spikesActive = false; 
let turnCounter = 0; 
let voidRadius = 0; 
let conveyorDir = 1; 
let bossRotation = 0; 
let inputLocked = false; 
let cheatBuffer = ""; 
let currentLevelScore = 0; 
let highScores = {};        
let endlessDepth = 0; 
let endlessBiome = "biome-sewer"; 
let dialogueQueue = []; 
let isDialogueOpen = false;

function parseCoord(coordString) {
    const colChar = coordString.charAt(0).toUpperCase();
    const rowChar = coordString.slice(1);
    const x = ALPHABET.indexOf(colChar); 
    const y = parseInt(rowChar) - 1;     
    return { x: x, y: y };
}

function isWall(x, y) {
    // Check static walls from level data
    const levelData = LEVELS[currentLevelId];
    
    // 1. Standard Walls
    let isStaticWall = levelData.walls.some(w => {
        const c = parseCoord(w);
        return c.x === x && c.y === y;
    });
    
    // 2. Temp Walls (Created by Welders)
    let isTempWall = tempWalls.some(w => w.x === x && w.y === y);

    return isStaticWall || isTempWall;
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
        tempWalls: tempWalls,
        gameProgress: gameProgress,
        playerActionsLeft: playerActionsLeft,
        turnCounter: turnCounter,
        voidRadius: voidRadius,
        conveyorDir: conveyorDir,
        bossRotation: bossRotation,
        currentLevelScore: currentLevelScore,
        highScores: highScores,
        endlessDepth: endlessDepth,
        endlessBiome: endlessBiome,
        generatedLevel: LEVELS['Endless'],
        
        // --- NEW: Save Achievement Data to this specific slot ---
        achievements: unlockedAchievements, 
        visitedRooms: Array.from(roomsVisited) // Convert Set to Array for saving
    };

    localStorage.setItem(currentSaveSlot, JSON.stringify(gameState));
    console.log(`Game saved to ${currentSaveSlot}`);
}

function loadGame() {
    const saved = localStorage.getItem(currentSaveSlot);
    if (!saved) return false;

    try {
        const state = JSON.parse(saved);
        currentLevelId = state.currentLevelId;
        player = state.player;
        player.wasHit = false; 
        
        // Safety checks for older saves
        if(player.hasCharm === undefined) player.hasCharm = false;
        if(player.hasThorns === undefined) player.hasThorns = false; 
        if(player.hasFrostHit === undefined) player.hasFrostHit = false; 
        if(player.energySapped === undefined) player.energySapped = false;
        if (player.xp === undefined) player.xp = 0;
        if (player.maxXp === undefined) player.maxXp = 100;
        if (player.level === undefined) player.level = 1;
        if (player.skills === undefined) player.skills = [];
        if (player.cooldowns === undefined) player.cooldowns = { heal: 0, cleave: 0, dash: 0 };

        enemies = state.enemies;
        items = state.items;
        boulders = state.boulders || [];
        tempWalls = state.tempWalls || [];
        gameProgress = state.gameProgress || { level1Complete: false };
        playerActionsLeft = state.playerActionsLeft;

        turnCounter = state.turnCounter || 0;
        voidRadius = state.voidRadius || 0;
        conveyorDir = state.conveyorDir || 1;
        bossRotation = state.bossRotation || 0;

        currentLevelScore = state.currentLevelScore || 0;
        highScores = state.highScores || {};

        endlessDepth = state.endlessDepth || 0;
        endlessBiome = state.endlessBiome || "biome-sewer";
        if (state.generatedLevel) {
            LEVELS['Endless'] = state.generatedLevel;
        }

        // --- NEW: Load Achievement Data for this slot ---
        unlockedAchievements = state.achievements || [];
        // Convert Array back to Set
        roomsVisited = new Set(state.visitedRooms || []);

        if (currentLevelId === 'Level-Select' || currentLevelId === '0' || currentLevelId === 'World-2-Select' || currentLevelId === 'World-3-Select' || currentLevelId === 'World-Select') applyGlobalUnlocks();

        if (LEVELS[currentLevelId]) {
             document.querySelector('h1').textContent = LEVELS[currentLevelId].name;
        }
        drawGrid();
        updateStats();
        return true;
    } catch (e) {
        console.error("Save file corrupt", e);
        return false;
    }
}

function resetGame() { 
    // CHANGE: Only remove the specific slot
    localStorage.removeItem(currentSaveSlot); 
    location.reload(); 
}

function respawn() {
    player.hp = player.maxHp;
    currentLevelId = '0';
    player.x = 4; player.y = 5; 
    playerActionsLeft = 2;
    enemies = []; items = []; boulders = []; tempWalls = []; crystals = [];

    resetRPGStats(); // Wipe XP and Skills on death

    // Reset mechanics
    voidRadius = 0; turnCounter = 0; player.energySapped = false;
    conveyorDir = 1; bossRotation = 0;
    
    // Reset endless
    endlessDepth = 0;

    saveGame(); location.reload();
}

function applyGlobalUnlocks() {
    // World 1 Unlocks
    if (gameProgress.level1Complete) {
        if(LEVELS['Level-Select'].walls.includes("C2")) LEVELS['Level-Select'].walls.splice(LEVELS['Level-Select'].walls.indexOf("C2"), 1);
        if(!LEVELS['Level-Select'].portals.some(p => p.targetLevel === 'EX-1-1')) LEVELS['Level-Select'].portals.push({ pos: "A9", targetLevel: 'EX-1-1', targetPos: "A1", type: "portal", label: "EX1" });
    }
    if (gameProgress.level2Complete) {
        if(LEVELS['Level-Select'].walls.includes("E2")) LEVELS['Level-Select'].walls.splice(LEVELS['Level-Select'].walls.indexOf("E2"), 1);
        if(!LEVELS['Level-Select'].portals.some(p => p.targetLevel === 'EX-2-1')) LEVELS['Level-Select'].portals.push({ pos: "C9", targetLevel: 'EX-2-1', targetPos: "A1", type: "portal", label: "EX2" });
    }
    if (gameProgress.level3Complete) {
        if(LEVELS['Level-Select'].walls.includes("G2")) LEVELS['Level-Select'].walls.splice(LEVELS['Level-Select'].walls.indexOf("G2"), 1);
        if(!LEVELS['Level-Select'].portals.some(p => p.targetLevel === 'EX-3-1')) LEVELS['Level-Select'].portals.push({ pos: "E9", targetLevel: 'EX-3-1', targetPos: "A1", type: "portal", label: "EX3" });
    }
    if (gameProgress.level4Complete) {
        if(LEVELS['Level-Select'].walls.includes("I2")) LEVELS['Level-Select'].walls.splice(LEVELS['Level-Select'].walls.indexOf("I2"), 1);
        if(!LEVELS['Level-Select'].portals.some(p => p.targetLevel === 'EX-4-1')) LEVELS['Level-Select'].portals.push({ pos: "G9", targetLevel: 'EX-4-1', targetPos: "A1", type: "portal", label: "EX4" });
    }
    if (gameProgress.level5Complete) {
        // This adds the "W2" portal specifically to Level '0'
        const startMenu = LEVELS['0'];
        if (startMenu && !startMenu.portals.some(p => p.label === "W2")) {
            startMenu.portals.push({ 
                pos: "C1", 
                targetLevel: 'World-2-Select', 
                targetPos: "E6", 
                type: "portal", 
                label: "W2" 
            });
            log("A new path has opened in the Beginning!");
        }
    }

    if (gameProgress.w1Complete) {
        const hub = LEVELS['World-Select'];
        // Remove Wall at I6
        const wIndex = hub.walls.indexOf("I6");
        if (wIndex > -1) {
            hub.walls.splice(wIndex, 1);
            log("Wall Removed in World Select!");
        }
    }

    // World 2 Unlocks
    if (gameProgress.w2l1Complete) {
        const hub = LEVELS['World-2-Select'];
        // Remove Wall at C2 to open path to Level 2
        const wIndex = hub.walls.indexOf("C2");
        if (wIndex > -1) {
            hub.walls.splice(wIndex, 1);
            log("Path to Level 2 is open!");
        }
    }

        if (gameProgress.w2l2Complete) {
        const hub = LEVELS['World-2-Select'];
        // Remove Wall at E2 to open path to Level 3
        const wIndex = hub.walls.indexOf("E2");
        if (wIndex > -1) {
            hub.walls.splice(wIndex, 1);
            log("Path to Level 3 is open!");
        }
    }

    if (gameProgress.w2l3Complete) {
        const hub = LEVELS['World-2-Select'];
        // Remove Wall at G2 to open path to Level 4
        const wIndex = hub.walls.indexOf("G2");
        if (wIndex > -1) {
            hub.walls.splice(wIndex, 1);
            log("Path to Level 4 is open!");
        }
    }

    if (gameProgress.story1Complete) {
        const storyHub = LEVELS['Story-Select'];       
        if (storyHub) {
            const alreadyExists = storyHub.portals.some(p => p.pos === "I5");     
            if (!alreadyExists) {
                storyHub.portals.push({ 
                    pos: "I5", 
                    targetLevel: 'Story2-Select', // or whatever level you want next
                    targetPos: "E6", 
                    type: "portal",
                    label: ">"
                });
                console.log("Story Path Unlocked!");
            }
        }
    }
}

function importCustomLevel() {
    const code = prompt("Paste your Level Code here:");
    if (!code) return;

    try {
        const data = JSON.parse(code);
        
        // Validation: Only PlayerStart and Door are strictly required.
        // Walls and Enemies are optional (e.g., an open field or a puzzle level).
        if (!data.playerStart || !data.door) {
            alert("Invalid Level Code! Missing Player Start or Door.");
            return;
        }

        // Setup the Custom Level in memory
        // We use (data.walls || []) to default to an empty list if missing.
LEVELS['Custom'] = {
    name: "Custom Level",
    walls: data.walls || [],
    enemies: data.enemies || [], 
    portals: [ { pos: data.door, targetLevel: '0', targetPos: "E6", type: "door" } ],
    
    items: data.items || [],
    boulders: data.boulders || [],
    hazards: data.hazards || [],
    thickets: data.thickets || [],
    rivers: data.rivers || [],
    spikes: data.spikes || [],
    ice: data.ice || [],
    warps: data.warps || [],
    crystals: data.crystals || [],
    crumble: data.crumble || [] 
};
        
        // Load the level using the playerStart from the editor
        loadLevel('Custom', data.playerStart);

        // --- ACHIEVEMENT HOOK ---
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('custom_maker');
        }

    } catch (e) {
        alert("Could not load level. Code might be broken or incomplete.");
        console.error(e);
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

let loadBtn = document.getElementById('load-btn');
    if (!loadBtn) {
        loadBtn = document.createElement('button');
        loadBtn.id = 'load-btn';
        loadBtn.textContent = "📂 Load Custom Level";
        loadBtn.className = "btn";
        loadBtn.style.backgroundColor = "#14532d"; // Dark Green
        loadBtn.style.marginTop = "10px";
        loadBtn.onclick = importCustomLevel; // Calls the function we wrote above
        uiPanel.appendChild(loadBtn);
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

    if (!loadGame()) loadLevel('0', "E8");
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
    const topPos = rect.top + 4 + (y * 60); 
    const leftPos = rect.left + 4 + (x * 60);

    const el = document.createElement('div');
    el.className = `attack-anim ${type}`;
    el.style.position = 'fixed'; 
    el.style.top = topPos + "px"; el.style.left = leftPos + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
}

// --- ENDLESS MODE GENERATOR ---
function generateEndlessLevel(depth) {
    // 1. Determine Difficulty & Biome
    const biomes = ['biome-sewer', 'biome-forest', 'biome-mine', 'biome-castle', 'biome-void', 'biome-ice', 'biome-toxic'];
    endlessBiome = biomes[Math.floor(depth / 3) % biomes.length]; 
    
    const enemyCount = 2 + Math.floor(depth / 2); 
    
    // 2. Initialize Empty Level with all feature arrays
    const newLevel = {
        name: `Endless Depth: ${depth}`,
        walls: [],
        enemies: [],
        items: [],
        portals: [{ pos: "E1", targetLevel: 'Endless-Next', targetPos: "E9", type: "door" }],
        
        // Initialize arrays for all possible features
        hazards: [],
        thickets: [],
        ice: [],
        spikes: [],
        rivers: [],
        boulders: [],
        biome: endlessBiome 
    };

    // 3. Generate Random Walls & Environmental Features
    for (let y = 1; y < 8; y++) {
        for (let x = 1; x < 8; x++) {
            // Keep the center path (E column, index 4) clear for movement
            if (x === 4) continue; 
            
            const coord = `${ALPHABET[x]}${y+1}`;

            // 3a. Chance for a Wall
            if (Math.random() < 0.2) {
                newLevel.walls.push(coord);
                continue; // If it's a wall, don't put floor hazards here
            }

            // 3b. Add Biome-Specific Features
            const rng = Math.random();

            if (endlessBiome === 'biome-sewer') {
                if (rng < 0.2) newLevel.hazards.push(coord);
            } 
            else if (endlessBiome === 'biome-toxic') {
                if (rng < 0.15) newLevel.hazards.push(coord);
                else if (rng < 0.1) newLevel.rivers.push(coord);
            }
            else if (endlessBiome === 'biome-forest') {
                if (rng < 0.15) newLevel.thickets.push(coord);
                else if (rng < 0.1) newLevel.hazards.push(coord);
            }
            else if (endlessBiome === 'biome-ice') {
                if (rng < 0.2) newLevel.ice.push(coord);
            }
            else if (endlessBiome === 'biome-castle') {
                if (rng < 0.2) newLevel.spikes.push(coord);
            }
            else if (endlessBiome === 'biome-mine') {
                if (rng < 0.1) newLevel.boulders.push(coord);
            }
        }
    }

    // 4. Place Enemies
    const enemyTypes = ['melee', 'ranged', 'fast','leech'];
    
    if (depth > 5) enemyTypes.push('guard', 'mage','bat');
    if (depth > 10) enemyTypes.push('sentinel', 'wraith','golem');

    let placedEnemies = 0;
    while (placedEnemies < enemyCount) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 7) + 1; 
        const coord = `${ALPHABET[x]}${y+1}`;
        
        // Don't spawn on walls, hazards, or existing enemies
        const isSafe = !newLevel.walls.includes(coord) && 
                       !newLevel.hazards.includes(coord) &&
                       !newLevel.rivers.includes(coord) &&
                       !newLevel.boulders.includes(coord) &&
                       !newLevel.enemies.some(e => e.pos === coord);

if (isSafe) {
    let type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

    // 1. Calculate the "Base HP" for this depth
    let hp = 10 + Math.floor(depth / 2);

    // 2. Apply "Type Penalties" (Scale down for glass cannons)
    if (type === 'fast' || type === 'bat' || type === 'slime') {
        hp = Math.max(4, Math.floor(hp * 0.4)); // Fast/Bats have 40% health
    } else if (type === 'ranged' || type === 'mage' || type === 'wraith') {
        hp = Math.max(6, Math.floor(hp * 0.6)); // Casters have 60% health
    } else if (type === 'leech') {
        hp = Math.max(8, Math.floor(hp * 0.8)); // Leeches are slightly weaker
    } else if (type === 'golem' || type === 'sentinel' || type === 'guard') {
        hp = Math.floor(hp * 1.5);
    }

    newLevel.enemies.push({ pos: coord, type: type, hp: hp });
    placedEnemies++;
}
    }

    // 5. Add Loot 
    if (Math.random() < 0.5) {
        const x = Math.floor(Math.random() * 9);
        const y = Math.floor(Math.random() * 8);
        const coord = `${ALPHABET[x]}${y+1}`;
        if (!newLevel.walls.includes(coord) && !newLevel.rivers.includes(coord)) {
             newLevel.items.push({ pos: coord, type: "potion", value: 5 });
        }
    }

    LEVELS['Endless'] = newLevel;
}

function loadLevel(levelId, startCoord) {
    // --- ACHIEVEMENT HOOKS ---
    if (typeof trackDiscovery === 'function') trackDiscovery(levelId); 
    
    // NEW: Reset damage tracker for "Untouchable" achievement
    levelDamageTaken = false; 
    
    if (levelId === '2-CD') {
        if (typeof unlockAchievement === 'function') unlockAchievement('dungeon_crawler');
    }

    if (levelId === '0D') {
        regenerateDungeon(); 
        resetRPGStats();
        player.hp = player.maxHp;
        log("New Dungeon Run started! Level reset to 1.");
    }
    
    // Endless Mode
    if (levelId === 'Endless-Start') {
        endlessDepth = 1;
        generateEndlessLevel(endlessDepth);
        levelId = 'Endless';
        player.hp = player.maxHp;
        log("Endless Run Started: HP Restored.");
    } else if (levelId === 'Endless-Next') {
        endlessDepth++;
        currentLevelScore += 50; 
        generateEndlessLevel(endlessDepth);
        levelId = 'Endless';
    }
    
    currentLevelId = levelId;
    currentLevelScore = 0;
    
    if (levelId === 'W2-1-4') LEVELS['W2-1-4'].hazards = [];
    if (levelId === 'W2-2-4') LEVELS['W2-2-4'].thickets = [];

    // Global Unlocks check
    if (levelId === 'Level-Select' || levelId === '0' || levelId === 'World-2-Select' || levelId.endsWith("-Select")) applyGlobalUnlocks();

        // --- World 2 Boss Unlock Logic ---
    if (levelId === 'W2-1' && gameProgress.w2l1s1 && gameProgress.w2l1s2 && gameProgress.w2l1s3) {
        const wIndex = LEVELS['W2-1'].walls.indexOf("I2");
        if (wIndex > -1) LEVELS['W2-1'].walls.splice(wIndex, 1);
        const bossPort = LEVELS['W2-1'].portals.find(p => p.label === "B");
        if (bossPort) { bossPort.targetLevel = 'W2-1-4'; bossPort.targetPos = "E9"; }
    }
    if (levelId === 'W2-2' && gameProgress.w2l2s1 && gameProgress.w2l2s2 && gameProgress.w2l2s3) {
        const wIndex = LEVELS['W2-2'].walls.indexOf("I2");
        if (wIndex > -1) LEVELS['W2-2'].walls.splice(wIndex, 1);
        const bossPort = LEVELS['W2-2'].portals.find(p => p.label === "B");
        if (bossPort) { bossPort.targetLevel = 'W2-2-4'; bossPort.targetPos = "E9"; }
    }
    if (levelId === 'W2-3' && gameProgress.w2l3s1 && gameProgress.w2l3s2 && gameProgress.w2l3s3) {
        const wIndex = LEVELS['W2-3'].walls.indexOf("I2");
        if (wIndex > -1) LEVELS['W2-3'].walls.splice(wIndex, 1);
        const bossPort = LEVELS['W2-3'].portals.find(p => p.label === "B");
        if (bossPort) { bossPort.targetLevel = 'W2-3-4'; bossPort.targetPos = "E9"; }
    }
        if (levelId === 'W2-4' && gameProgress.w2l4s1 && gameProgress.w2l4s2 && gameProgress.w2l4s3) {
        const wIndex = LEVELS['W2-4'].walls.indexOf("I2");
        if (wIndex > -1) LEVELS['W2-4'].walls.splice(wIndex, 1);
        const bossPort = LEVELS['W2-4'].portals.find(p => p.label === "B");
        if (bossPort) { bossPort.targetLevel = 'W2-4-4'; bossPort.targetPos = "E9"; }
    }


        if (levelId === 'W3-1' && gameProgress.w3l1s1 && gameProgress.w3l1s2 && gameProgress.w3l1s3) {
        const wIndex = LEVELS['W3-1'].walls.indexOf("I2");
        if (wIndex > -1) LEVELS['W3-1'].walls.splice(wIndex, 1);
        const bossPort = LEVELS['W3-1'].portals.find(p => p.label === "B");
        if (bossPort) { bossPort.targetLevel = 'W3-1-4'; bossPort.targetPos = "E9"; }
    }

    const levelData = LEVELS[levelId];
    if (document.querySelector('h1')) document.querySelector('h1').textContent = levelData.name;
    
    const start = parseCoord(startCoord);
    player.x = start.x; player.y = start.y;
    playerActionsLeft = 2; 
    
    if (!player.cooldowns) player.cooldowns = { heal: 0, cleave: 0, dash: 0, wall: 0 };
    player.cooldowns.wall = 3; 

    turnCounter = 0; voidRadius = 0;
    conveyorDir = 1; bossRotation = 0;
    tempWalls = []; 

    if (levelId === '0' || levelId === 'Level-Select' || levelId.endsWith('-1') || levelId.startsWith('W2') || levelData.fullHeal || levelId === 'Story-Select') {
        player.hp = player.maxHp; 
        player.damage = 2; 
        log("Stats Reset/Healed.");
    }
    if (levelId === '0') {
        player.damage = 2;
        log("Weapon Reset.");
    }
    if (player.hp > player.maxHp) player.hp = player.maxHp;

    // Load Enemies
    let standardEnemyHp = 10; 
    if (levelId.startsWith('4-')) standardEnemyHp = 12; 
    if (levelId.endsWith('-3') && !levelId.startsWith('W2')) standardEnemyHp = 15;

    enemies = [];
    if (levelData.enemies) {
        levelData.enemies.forEach((data, index) => {
            if (data.isDead) return;

            const ePos = parseCoord(data.pos);
            let eHp = data.isBoss ? 50 : standardEnemyHp; 
            
            if (data.type === 'ranged' || data.type === 'mage' || data.type === 'wraith'|| data.type === 'bat') eHp = 6;
            if (data.type === 'fast') eHp = 4;
            if (data.type === 'leech'|| data.type === 'welder') eHp = 8;
            if (data.type === 'golem' || data.type === 'yeti') eHp = 15;
            if (data.type === 'guard' || data.type === 'sentinel') eHp = 12;
            if (data.type === 'hydra') eHp = 60;
            if (data.type === 'summoner') eHp = 50;
            if (data.type === 'entropy') eHp = 80;
            if (data.type === 'gear') eHp = 70;
            if (data.hp) eHp = data.hp;

            enemies.push({
                id: index, x: ePos.x, y: ePos.y,
                hp: eHp, maxHp: eHp, alive: true, wasHit: false,
                isBoss: data.isBoss || false,
                type: data.type || 'melee',
                isHidden: data.isHidden || false, 
                summonCooldown: 0, stunned: false, canMove: true 
            });
        });
    }

    // Load Items
    items = [];
    if (levelData.items) {
        levelData.items.forEach((data, index) => {
            if (data.isCollected) return; 
            const iPos = parseCoord(data.pos);
            items.push({
                id: index, x: iPos.x, y: iPos.y,
                type: data.type, value: data.value, name: data.name, collected: false
            });
        });
    }

    crystals = [];
    if (levelData.crystals) {
        levelData.crystals.forEach((pos, index) => {
            const p = parseCoord(pos);
            crystals.push({ x: p.x, y: p.y, ignited: false, id: index });
        });
    }
    boulders = [];
    if (levelData.boulders) {
        levelData.boulders.forEach(bPosStr => {
            const bPos = parseCoord(bPosStr);
            boulders.push({ x: bPos.x, y: bPos.y, hp: 6 });
        });
    }

    if (levelData.text) startDialogue(levelData.text, levelData.speaker || "System");

    if (levelId === '0' && !gameProgress.introSeen) {
        startDialogue([
            "Welcome, Wizard! It seems you are a new player!",
            "Your powers are weak, and the dungeon is dangerous.",
            "Please press W or the up arrow to step into the '?' portal.",
            "Good luck on your adventure!"
        ], "Old Man");
        gameProgress.introSeen = true;
        saveGame(); 
    }

    if (levelId === 'World-Select' && !gameProgress.WorldSelectSeen) {
        startDialogue([
            "Welcome, Wizard! Here you can select different worlds to explore!",
            "Your powers are weak, so W1 would be the best place to start...",
            "The W2 and W3 portals can still be explored later in the game!",
            "Good luck on your adventure!"
        ], "Old Man");
        gameProgress.WorldSelectSeen = true;
        saveGame(); 
    }

    if (levelId === '0D' && !gameProgress.DungeonSeen) {
        startDialogue([
            "Welcome Hero, and welcome to my super secret fun place of doom!",
            "Here you can unlock new abilities that can't be used in any other levels.",
            "Despite however well you did in the main game, these levels will still be a challenge.",
            "Good luck on your journey and have fun adventuring!"
        ], "Dungeon Master");
        gameProgress.DungeonSeen = true;
        saveGame(); 
    }

    log(`Entered ${levelData.name}`);
    
    // Sync HP for damage tracking
    previousHp = player.hp; 
    
    drawGrid(); updateStats(); saveGame(); 
}

function startDialogue(textData, speakerName = "Wizard") {
    // textData can be a single string or an array of strings
    if (Array.isArray(textData)) {
        dialogueQueue = [...textData]; // Copy the array
    } else {
        dialogueQueue = [textData];
    }

    document.getElementById('dialogue-speaker').textContent = speakerName;
    document.getElementById('dialogue-overlay').style.display = 'block';
    isDialogueOpen = true;
    advanceDialogue();
}

function advanceDialogue() {
    if (dialogueQueue.length > 0) {
        // Take the first line out of the queue and show it
        const line = dialogueQueue.shift();
        document.getElementById('dialogue-text').innerHTML = line;
    } else {
        // No lines left? Close the box.
        document.getElementById('dialogue-overlay').style.display = 'none';
        isDialogueOpen = false;
    }
}

function rotatePoint(x, y, cx, cy, times) {
    let nx = x; let ny = y;
    for (let i = 0; i < times; i++) {
        const tx = nx;
        nx = -(ny - cy) + cx;
        ny = (tx - cx) + cy;
    }
    return {x: nx, y: ny};
}

function drawGrid() {
    const gridEl = document.getElementById('grid');
    gridEl.innerHTML = ''; 
    gridEl.className = ''; 
    const currentMap = LEVELS[currentLevelId];

    if (currentLevelId === 'Endless') gridEl.classList.add(currentMap.biome || 'biome-sewer');
    else if (currentLevelId.includes('EX-2')) gridEl.classList.add('biome-toxic'); 
    else if (currentLevelId.includes('EX-3')) gridEl.classList.add('biome-ice');
    else if (currentLevelId.includes('EX-4') || currentLevelId.includes('4-')) gridEl.classList.add('biome-castle');
    else if (currentLevelId.includes('5-')) gridEl.classList.add('biome-void');
    else if (currentLevelId.includes('1-') || currentLevelId.includes('EX-1')) gridEl.classList.add('biome-sewer');
    else if (currentLevelId.includes('2-') || currentLevelId.includes('W2')) gridEl.classList.add('biome-forest');
    else if (currentLevelId.includes('3-') || currentLevelId.includes('W3')) gridEl.classList.add('biome-magma'); 

    if (gridEl.classList.contains('biome-sewer')) gridEl.style.backgroundColor = "#4a452a";
    else if (gridEl.classList.contains('biome-forest')) gridEl.style.backgroundColor = "#2d4a2d";
    else if (gridEl.classList.contains('biome-magma')) gridEl.style.backgroundColor = "#4a1c1c";
    else if (gridEl.classList.contains('biome-castle')) gridEl.style.backgroundColor = "#4b5563";
    else if (gridEl.classList.contains('biome-void')) gridEl.style.backgroundColor = "#240a3a";
    else if (gridEl.classList.contains('biome-ice')) gridEl.style.backgroundColor = "#1e293b";
    else if (gridEl.classList.contains('biome-toxic')) gridEl.style.backgroundColor = "#2d1b2d";
    else gridEl.style.backgroundColor = "#444"; // Fallback
    
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.onmouseenter = () => {
                const tTip = document.getElementById('tooltip');
                let text = "";
                const e = enemies.find(en => en.x === x && en.y === y && en.alive);
                const i = items.find(it => it.x === x && it.y === y && !it.collected);
                const hazard = currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[x]}${y+1}`);
                if (e) text += `Target: ${e.type.toUpperCase()}\nHP: ${e.hp}/${e.maxHp}`;
                if (i) text += `Item: ${i.name || i.type}\nMove onto to grab`;
                if (hazard) text += "Warning: Hazardous Terrain!";
                if (text) { tTip.textContent = text; tTip.style.display = 'block'; }
            };
            cell.onmouseleave = () => { document.getElementById('tooltip').style.display = 'none'; };
            
            const coordLabel = document.createElement('span');
            coordLabel.classList.add('coord-label');
            coordLabel.textContent = `${ALPHABET[x]}${y+1}`;
            cell.appendChild(coordLabel);

            let checkX = x; let checkY = y;
            if (currentLevelId === 'EX-4-Boss') {
                const invRot = (4 - (bossRotation % 4)) % 4;
                const p = rotatePoint(x, y, 4, 4, invRot);
                checkX = p.x; checkY = p.y;
            }

            let isVoidFloor = false;
            if (voidRadius > 0) {
                if (x < voidRadius || x >= GRID_SIZE - voidRadius || y < voidRadius || y >= GRID_SIZE - voidRadius) {
                    isVoidFloor = true;
                }
            }
            if (isVoidFloor) cell.classList.add('tile-void');

            const isPlayerHere = (x === player.x && y === player.y);
            const enemyHere = enemies.find(e => e.x === x && e.y === y && e.alive);
            const itemHere = items.find(i => i.x === x && i.y === y && !i.collected);
            const wallHere = isWall(x, y);
            const boulderHere = isBoulder(x, y); 
            const tempWallHere = tempWalls.some(w => w.x === x && w.y === y);
            const crystalHere = crystals.find(c => c.x === x && c.y === y);

            const isHazard = currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[x]}${y+1}`);
            const isThicket = currentMap.thickets && currentMap.thickets.includes(`${ALPHABET[x]}${y+1}`);
            const isRiver = currentMap.rivers && currentMap.rivers.includes(`${ALPHABET[x]}${y+1}`);
            const isSpike = currentMap.spikes && currentMap.spikes.includes(`${ALPHABET[x]}${y+1}`);
            const isIce = currentMap.ice && currentMap.ice.includes(`${ALPHABET[x]}${y+1}`);
            const isWindWarning = currentMap.windWarnings && currentMap.windWarnings.includes(`${ALPHABET[x]}${y+1}`);
            const warpHere = currentMap.warps && currentMap.warps.find(w => w.pos === `${ALPHABET[x]}${y+1}`);
            const isCrumble = currentMap.crumble && currentMap.crumble.includes(`${ALPHABET[x]}${y+1}`);
            const isPit = currentMap.pits && currentMap.pits.includes(`${ALPHABET[x]}${y+1}`);

            const belt = currentMap.conveyors && currentMap.conveyors.find(b => b.y === y);
            const isLever = currentMap.levers && currentMap.levers.includes(`${ALPHABET[x]}${y+1}`);
            
            let isSpikeActive = false;
            if (currentMap.spikes) {
                if (currentLevelId === 'EX-4-Boss') {
                    if(currentMap.spikes.includes(`${ALPHABET[checkX]}${checkY+1}`)) isSpikeActive = true;
                } else {
                    if(currentMap.spikes.includes(`${ALPHABET[x]}${y+1}`)) isSpikeActive = true;
                }
            }

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
                if (!enemyHere.isBoss && enemyHere.type === 'melee') cell.classList.add('enemy-normal');
                
                if (enemyHere.isBoss) {
                    if(enemyHere.type === 'dragonfly') { 
        eIcon.textContent = '🦟'; // Mosquito/Insect icon
        cell.classList.add('boss', 'boss-dragonfly'); 
    }
                     else if(enemyHere.type === 'entropy') { eIcon.textContent = 'Ø'; cell.classList.add('boss', 'boss-entropy'); }
                     else if(enemyHere.type === 'hydra') { eIcon.textContent = '🐍'; cell.classList.add('boss'); }
                     else if(enemyHere.type === 'gear') { eIcon.textContent = '⚙️'; cell.classList.add('boss', 'boss-gear'); }
                     else if(enemyHere.type === 'mud_monster') { eIcon.textContent = ''; cell.classList.add('boss', 'boss-mud'); }
                     else if(enemyHere.type === 'tangler') { eIcon.textContent = '🥀'; cell.classList.add('boss', 'boss-tangler'); }
                     else if(enemyHere.type === 'zephyr') { eIcon.textContent = ''; cell.classList.add('boss', 'boss-zephyr'); }
                     else { eIcon.textContent = 'B'; cell.classList.add('boss'); }
                     if (enemyHere.hp <= enemyHere.maxHp / 2) cell.classList.add('boss-enraged');
                } else {
                     if(enemyHere.type === 'ranged') { eIcon.textContent = ''; cell.classList.add('enemy', 'enemy-ranged'); }
                     else if(enemyHere.type === 'mage') { eIcon.textContent = 'M'; cell.classList.add('enemy', 'enemy-mage'); }
                     else if(enemyHere.type === 'fast') { eIcon.textContent = ''; cell.classList.add('enemy', 'enemy-fast'); }
                     else if(enemyHere.type === 'bat') { eIcon.textContent = 'W'; cell.classList.add('enemy', 'enemy-bat'); }
                     else if(enemyHere.type === 'golem') { eIcon.textContent = 'G'; cell.classList.add('enemy', 'enemy-golem'); }
                     else if(enemyHere.type === 'guard') { eIcon.textContent = 'K'; cell.classList.add('enemy', 'enemy-guard'); }
                     else if(enemyHere.type === 'yeti') { eIcon.textContent = 'Y'; cell.classList.add('enemy', 'enemy-yeti'); }
                     else if(enemyHere.type === 'wraith') { eIcon.textContent = '👻'; cell.classList.add('enemy', 'enemy-wraith'); }
                     else if(enemyHere.type === 'leech') { eIcon.textContent = '●'; cell.classList.add('enemy', 'enemy-leech'); }
                     else if(enemyHere.type === 'sentinel') { eIcon.textContent = '🧲'; cell.classList.add('enemy', 'enemy-sentinel'); }
                     else if(enemyHere.type === 'welder') { eIcon.textContent = '🔥'; cell.classList.add('enemy', 'enemy-welder'); }
                     else if(enemyHere.type === 'slime') { eIcon.textContent = ''; cell.classList.add('enemy', 'enemy-slime'); }
                     else { cell.classList.add('enemy'); }
                }
                
                if (enemyHere.wasHit) cell.classList.add('enemy-hit-anim');
                cell.appendChild(eIcon);
                if (enemyHere.hp < enemyHere.maxHp) {
                    const hpCont = document.createElement('div');
                    hpCont.className = 'enemy-hp-container';
                    const hpFill = document.createElement('div');
                    hpFill.className = 'enemy-hp-fill';
                    hpFill.style.width = `${(enemyHere.hp / enemyHere.maxHp) * 100}%`;
                    hpCont.appendChild(hpFill);
                    cell.appendChild(hpCont);
                }
            } else if (itemHere) {
                const iIcon = document.createElement('span');
                if (itemHere.type === 'weapon') { iIcon.textContent = '⚔️'; cell.classList.add('item-weapon'); } 
                else if (itemHere.type === 'relic' || itemHere.type === 'heart_container') { iIcon.textContent = '🧿'; cell.classList.add('item-relic'); } 
                else { iIcon.textContent = '+'; cell.classList.add('item-potion'); }
                cell.appendChild(iIcon);
            
            } else if (crystalHere) {
                const cIcon = document.createElement('span');
                cell.classList.add('crystal');
                if (crystalHere.ignited) cell.classList.add('crystal-ignited');
                cell.appendChild(cIcon);

            } else if (boulderHere) {
                cell.classList.add('boulder'); if (boulderHere.hp <= 3) cell.classList.add('boulder-cracked');
            } else if (wallHere) {
                cell.classList.add('wall');
            } else if (tempWallHere) {
                cell.classList.add('wall-iron');
            } else if (portalHere) {
                if (portalHere.type === 'door') {
                    // --- REWRITTEN DOOR VISIBILITY LOGIC ---
                    let isDoorOpen = false;

                    // Specific check for Dungeon Floor Exit (1-16D)
                    if (currentLevelId === '1-16D' && portalHere.targetLevel === '1-CD') {
                        isDoorOpen = isDungeonFloorClear();
                    } else {
                        // Standard door logic: clear current room
                        isDoorOpen = (enemies.filter(e => e.alive).length === 0);
                    }

                    if (isDoorOpen) {
                        const portIcon = document.createElement('span'); 
                        cell.classList.add('door'); cell.appendChild(portIcon);
                    }
                } else {
                    const portIcon = document.createElement('span');
                    if (portalHere.type === 'inventory') { portIcon.textContent = "📦"; cell.classList.add('portal'); } 
                    else { portIcon.textContent = portalHere.label; cell.classList.add('portal'); }
                    cell.appendChild(portIcon);
                }
            } 
            
            if (isHazard) cell.classList.add('hazard');
            if (isThicket) cell.classList.add('thicket');
            if (isRiver) cell.classList.add('river');
            if (isIce) cell.classList.add('tile-ice');
            if (isWindWarning) cell.classList.add('tile-wind-warning');
            if (warpHere) cell.classList.add('warp-tile');
            if (isCrumble) cell.classList.add('tile-crumble');
            if (isPit) cell.classList.add('tile-pit');

            if (isSpikeActive) {
                if (spikesActive) cell.classList.add('spike-active');
                else cell.classList.add('spike-safe');
            }
            if (belt) {
                cell.classList.add('tile-conveyor');
                const realDir = belt.dir * conveyorDir;
                if (realDir === 1) cell.classList.add('conveyor-right');
                else cell.classList.add('conveyor-left');
            }
            if (isLever) cell.classList.add('tile-lever');

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

    updateMinimap();
}

function updateStats() {
    // --- DAMAGE TRACKING FOR ACHIEVEMENT ---
    // If HP dropped since last check, we took damage.
    if (player.hp < previousHp) {
        levelDamageTaken = true;
    }
    previousHp = player.hp; // Update reference

    // --- 1. PLAYER HP ---
    let hpText = " ";
    if (player.hasCharm) hpText += " "; 

    const hpPct = (player.hp / player.maxHp) * 100;
    const hpFill = document.getElementById('player-hp-fill');
    if (hpFill) hpFill.style.width = `${Math.max(0, hpPct)}%`;

    const hpTextEl = document.getElementById('player-hp');
    if (hpTextEl) hpTextEl.textContent = hpText;

    const aliveCount = enemies.filter(e => e.alive).length;

    // --- ACHIEVEMENT HOOKS ---
    if (typeof unlockAchievement === 'function') {
        if (player.hp === 1) unlockAchievement('close_call');
        if (currentLevelScore >= 1000) unlockAchievement('high_roller');
        if (player.level >= 10) unlockAchievement('veteran');
        if (player.level >= 15) unlockAchievement('master_wizard');
        if (player.level >= 20) unlockAchievement('legend');
        if (player.maxHp >= 30) unlockAchievement('tank');

        if (currentLevelId === 'Endless') {
            if (endlessDepth >= 5) unlockAchievement('abyss_walker');
            if (endlessDepth >= 10) unlockAchievement('void_lord');
        }
        if (currentLevelScore >= 5000) unlockAchievement('score_king');
        if (player.skills && player.skills.length >= 5) unlockAchievement('arsenal');
        
        let relicCount = (player.hasCharm ? 1 : 0) + (player.hasThorns ? 1 : 0) + (player.hasFrostHit ? 1 : 0);
        if (relicCount >= 2) unlockAchievement('relic_hunter');

        const deadCount = enemies.length - aliveCount;
        if (deadCount >= 10) unlockAchievement('exterminator');

        if (enemies.length > 0 && aliveCount === 0) {
            unlockAchievement('clean_sweep');
            if (player.hp === player.maxHp) unlockAchievement('flawless');
        }
    }

    // --- 2. GAME PROGRESS STATS ---
    const scoreEl = document.getElementById('score-display');
    if (scoreEl) scoreEl.textContent = currentLevelScore;
    
    const countEl = document.getElementById('enemy-count');
    if (countEl) countEl.textContent = aliveCount;

    if (enemies.length > 0 && aliveCount === 0) log("Area Clear! Door Unlocked.");
    
    // --- 3. BOSS HUD ---
    const boss = enemies.find(e => e.isBoss && e.alive);
    const bossHud = document.getElementById('boss-hud');
    
    if (boss && bossHud) {
        bossHud.style.display = 'block';
        const pct = Math.max(0, (boss.hp / boss.maxHp) * 100);
        document.getElementById('boss-fill').style.width = pct + "%";
        
        const levelName = LEVELS[currentLevelId] ? LEVELS[currentLevelId].name : "BOSS";
        document.getElementById('boss-name').textContent = levelName;
    } else if (bossHud) {
        bossHud.style.display = 'none';
    }

    // Check Game Over
    if (player.hp <= 0) {
        if (typeof unlockAchievement === 'function') unlockAchievement('first_death');
        endGame(false);
    }

    // --- 4. PLAYER XP & LEVEL ---
    const lvlEl = document.getElementById('player-level');
    if (lvlEl) lvlEl.textContent = player.level;

    const xpTextEl = document.getElementById('xp-text');
    if (xpTextEl) xpTextEl.textContent = `${player.xp}/${player.maxXp}`;

    const xpFill = document.getElementById('player-xp-fill');
    if (xpFill) xpFill.style.width = `${(player.xp / player.maxXp) * 100}%`;

    // --- 5. ABILITY BAR ---
    const abBar = document.getElementById('ability-bar');
    if (abBar) {
        abBar.innerHTML = '';
        
        if (player.skills.includes('heal')) {
            const onCd = player.cooldowns.heal > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#22c55e'}; padding:2px 5px;">1: Mend (${player.cooldowns.heal})</div>`;
        }
        if (player.skills.includes('cleave')) {
            const onCd = player.cooldowns.cleave > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#ef4444'}; padding:2px 5px;">2: Cleave (${player.cooldowns.cleave})</div>`;
        }
        if (player.skills.includes('dash')) {
            const onCd = player.cooldowns.dash > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#3b82f6'}; padding:2px 5px;">3: Phase (${player.cooldowns.dash})</div>`;
        }
        if (player.skills.includes('wall')) {
            const onCd = player.cooldowns.wall > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#d97706'}; padding:2px 5px;">4: Wall (${player.cooldowns.wall})</div>`;
        }
        if (player.skills.includes('hook')) {
            const onCd = player.cooldowns.hook > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#8b5cf6'}; padding:2px 5px;">5: Hook (${player.cooldowns.hook})</div>`;
        }
        if (player.skills.includes('bomb')) {
            const onCd = player.cooldowns.bomb > 0;
            abBar.innerHTML += `<div style="background:${onCd ? '#555' : '#ec4899'}; padding:2px 5px;">6: Bomb (${player.cooldowns.bomb})</div>`;
        }
    }
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
            
            // --- EXPLOSION LOGIC STARTS HERE ---
            let explosionOccurred = false;
            
            for (let i = crystals.length - 1; i >= 0; i--) {
                const c = crystals[i];
                
                if (c.ignited) {
                    log("BOOM! The crystal explodes!");
                    explosionOccurred = true;
                    
                    if(typeof triggerDeathParticles === "function") triggerDeathParticles(c.x, c.y, "#ff0000");
                    document.getElementById('grid').classList.add('screen-shake');
                    setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400);

                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const tx = c.x + dx;
                            const ty = c.y + dy;
                            
                            if(tx >= 0 && tx < GRID_SIZE && ty >= 0 && ty < GRID_SIZE) {
                                triggerAttackAnim(tx, ty, 'anim-scratch'); 
                            }

                            // A. Damage Player
                            if (player.x === tx && player.y === ty) {
                                player.hp -= 5;
                                triggerDamage(player.x, player.y, 5, true);
                                log("Caught in the blast! -5 HP");
                            }

                            // B. Damage Enemies (Fixed 15 Damage)
                            const enemy = enemies.find(e => e.x === tx && e.y === ty && e.alive);
                            if (enemy) {
                                const bombDmg = 15;
                                enemy.hp -= bombDmg;
                                triggerDamage(tx, ty, bombDmg, false);
                                
                                // Check for Death
                                if (enemy.hp <= 0) {
                                    enemy.alive = false;
                                    log("Enemy blown to bits!");

                                    // --- Dungeon Persistence for Explosions ---
                                    if (currentLevelId.endsWith('D')) {
                                        const globalLevel = LEVELS[currentLevelId];
                                        if (globalLevel && globalLevel.enemies && globalLevel.enemies[enemy.id]) {
                                            globalLevel.enemies[enemy.id].isDead = true;
                                        }
                                    }
                                }
                            }

                            // C. Destroy Walls
                            const wallCoord = `${ALPHABET[tx]}${ty+1}`;
                            const lvl = LEVELS[currentLevelId];
                            if (lvl.walls.includes(wallCoord)) {
                                lvl.walls = lvl.walls.filter(w => w !== wallCoord);
                            }
                            
                            // D. Destroy Boulders
                            const bIdx = boulders.findIndex(b => b.x === tx && b.y === ty);
                            if(bIdx !== -1) boulders.splice(bIdx, 1);
                        }
                    }
                    
                    crystals.splice(i, 1);
                }
            }

            if (explosionOccurred) {
                updateStats();
                drawGrid(); 
            }
            // --- EXPLOSION LOGIC ENDS HERE ---

            log("-- Enemy Turn --");
            tickCooldowns();

            // Tangler Boss Passive
            if (currentLevelId === 'W2-2-4') {
                const currentMap = LEVELS[currentLevelId];
                if (currentMap.thickets && currentMap.thickets.includes(`${ALPHABET[player.x]}${player.y+1}`)) {
                    player.energySapped = true;
                    log("Vines wrap around your legs! (Energy Sapped)");
                }
            }

            moveEnemies();
            
            if (player.energySapped) {
                playerActionsLeft = 1;
                player.energySapped = false;
                log("Energy sapped! Only 1 action this turn.");
            } else {
                playerActionsLeft = 2; 
            }
            
            // Void Level 3 Shifting Walls
            if (currentLevelId === '5-3') {
                turnCounter++;
                if (turnCounter % 3 === 0) {
                    const lvl = LEVELS['5-3'];
                    const temp = lvl.walls;
                    lvl.walls = lvl.altWalls;
                    lvl.altWalls = temp;
                    log("The walls shift around you!");
                    if (isWall(player.x, player.y)) {
                        player.hp -= 2; triggerDamage(player.x, player.y, 2, true);
                        log("Crushed by a moving wall!");
                    }
                }
            }
            
            // EX-4 Boss Rotation
            if (currentLevelId === 'EX-4-Boss') {
                bossRotation = (bossRotation + 1) % 4;
                log("The room rotates!");
            }

            saveGame(); 
        }, 100); 
    } else {
        log(`Actions left: ${playerActionsLeft}`);
    }
}

// --- UPDATED INPUT HANDLING (THROTTLING + CHEAT CODE) ---
document.addEventListener('keydown', (e) => {

if (e.key === '1') castSkill('heal');
if (e.key === '2') castSkill('cleave');
if (e.key === '3') castSkill('dash');
if (e.key === '4') castSkill('wall');
if (e.key === '5') castSkill('hook');
    if (e.key === '6') castSkill('bomb');

if (e.key === 'm' || e.key === 'M') {
    toggleMap();
}

    // CHEAT CODE DETECTION
    cheatBuffer += e.key;
    if (cheatBuffer.length > 20) cheatBuffer = cheatBuffer.slice(-20); // Keep buffer small
    
    if (cheatBuffer.endsWith("devmodeon")) {
        // Unlock all paths
        gameProgress.level1Complete = true;
        gameProgress.level2Complete = true;
        gameProgress.level3Complete = true;
        gameProgress.level4Complete = true;
        gameProgress.level5Complete = true;
        applyGlobalUnlocks();

        // --- NEW: Unlock World 2 Boss ---
        gameProgress.w2l1s1 = true;
        gameProgress.w2l1s2 = true;
        gameProgress.w2l1s3 = true;

        gameProgress.w2l2s1 = true;
        gameProgress.w2l2s2 = true;
        gameProgress.w2l2s3 = true;

        gameProgress.w2l3s1 = true;
        gameProgress.w2l3s2 = true;
        gameProgress.w2l3s3 = true;

        gameProgress.w2l4s1 = true;
        gameProgress.w2l4s2 = true;
        gameProgress.w2l4s3 = true;



        gameProgress.w3l1s1 = true;
        gameProgress.w3l1s2 = true;
        gameProgress.w3l1s3 = true;
        // --- NEW: W2 L1 Complete ---
        gameProgress.w1Complete = true;

        gameProgress.w2l1Complete = true;
        
        gameProgress.w2l2Complete = true;

        gameProgress.w2l3Complete = true;

        gameProgress.story1Complete = true;

        // If currently in the hub, apply the changes instantly
        if (currentLevelId === 'W2-1') {
            const wIndex = LEVELS['W2-1'].walls.indexOf("I2");
            if (wIndex > -1) LEVELS['W2-1'].walls.splice(wIndex, 1);
            
            const bossPort = LEVELS['W2-1'].portals.find(p => p.label === "B");
            if (bossPort) {
                bossPort.targetLevel = 'W2-1-4';
                bossPort.targetPos = "E9";
            }
            log("CHEAT: Mud Monster lair opened!");
        }

                if (currentLevelId === 'W2-2') {
            const wIndex = LEVELS['W2-2'].walls.indexOf("I2");
            if (wIndex > -1) LEVELS['W2-2'].walls.splice(wIndex, 1);
            
            const bossPort = LEVELS['W2-2'].portals.find(p => p.label === "B");
            if (bossPort) {
                bossPort.targetLevel = 'W2-2-4';
                bossPort.targetPos = "E9";
            }
        }

        if (currentLevelId === 'W2-3') {
            const wIndex = LEVELS['W2-3'].walls.indexOf("I2");
            if (wIndex > -1) LEVELS['W2-3'].walls.splice(wIndex, 1);

            const bossPort = LEVELS['W2-3'].portals.find(p => p.label === "B");
            if (bossPort) {
                bossPort.targetLevel = 'W2-3-4';
                bossPort.targetPos = "E9";
            }
        }

        // Instant update for W2 Select
        if (currentLevelId === 'World-2-Select') {
             applyGlobalUnlocks();
             drawGrid();
        }
        // --------------------------------

        // Unlock specific EX Relics only (Removed IronStomach/Antidote)
        player.hasCharm = true;
        player.hasThorns = true;
        player.hasFrostHit = true;

        log("CHEAT ACTIVATED: Unlocks & EX Relics!");
        cheatBuffer = ""; // Reset buffer
        updateStats();
        drawGrid();
        saveGame();
    }


    
if (isDialogueOpen) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            advanceDialogue();
        }
        return; // STOP everything else (moving/attacking)
    }

    if (document.getElementById('tutorial-overlay').style.display === 'block') return;
    if (document.getElementById('inventory-overlay').style.display === 'block') return;
    if (player.hp <= 0) return;
    if (playerActionsLeft <= 0) return; 
    
    // INPUT LOCK CHECK
    if (inputLocked) return; 

    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) e.preventDefault();

    let dx = 0, dy = 0;
    if (e.key === 'ArrowUp' || e.key === 'w') dy = -1;
    if (e.key === 'ArrowDown' || e.key === 's') dy = 1;
    if (e.key === 'ArrowLeft' || e.key === 'a') dx = -1;
    if (e.key === 'ArrowRight' || e.key === 'd') dx = 1;

    let actionTaken = false; 

    if (e.key === ' ') {
        e.preventDefault(); 
        playerAttack();
        playerActionsLeft--; 
        consumeAction(); 
        actionTaken = true; 
    } else if (dx !== 0 || dy !== 0) {
        handleTurn(dx, dy);
        actionTaken = true;
    }

    if (actionTaken) {
        inputLocked = true;
        setTimeout(() => { inputLocked = false; }, 150); 
    }
});

function playerAttack() {
    let hitSomething = false;
    const directions = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    
    const isWorld1 = (currentLevelId.startsWith('3-') || currentLevelId.startsWith('2-') || currentLevelId.startsWith('EX') || currentLevelId.startsWith('1-') || currentLevelId.startsWith('4-') || currentLevelId.startsWith('5-')) && !currentLevelId.endsWith('D');

    directions.forEach(dir => {
        const targetX = player.x + dir.x;
        const targetY = player.y + dir.y;
        
        const enemy = enemies.find(e => e.x === targetX && e.y === targetY && e.alive);
        const boulder = boulders.find(b => b.x === targetX && b.y === targetY && b.hp > 0);
        const tempWallIdx = tempWalls.findIndex(w => w.x === targetX && w.y === targetY);
        const crystal = crystals.find(c => c.x === targetX && c.y === targetY); 

        if (enemy) {
            hitSomething = true;
            let dmg = player.damage;
            let isCrit = false;

            if (player.executioner && player.executioner > 0) {
                if (enemy.hp < (enemy.maxHp / 2)) dmg += player.executioner;
            }

            if (player.critChance && player.critChance > 0) {
                if (Math.random() < player.critChance) {
                    dmg *= 2;
                    isCrit = true;
                    if (typeof unlockAchievement === 'function') unlockAchievement('lucky');
                }
            }
            
            if (currentLevelId === 'W2-1-4') dmg = 4;
            if (currentLevelId === 'W2-2-4') dmg = 4;
            if (currentLevelId === 'W2-3-4') dmg = 4;
            if (currentLevelId === 'W2-4-4') dmg = 4;

            if (dmg >= 10 && typeof unlockAchievement === 'function') unlockAchievement('heavy_hitter');
            if (dmg >= 15 && typeof unlockAchievement === 'function') unlockAchievement('overkill');

            triggerAttackAnim(enemy.x, enemy.y, 'anim-slash');
            enemy.hp -= dmg; 
            enemy.wasHit = true; 
            
            triggerDamage(enemy.x, enemy.y, dmg, false); 
            if (isCrit) log(`CRITICAL HIT! Dealt ${dmg} damage!`);
            else log(`Hit Enemy for ${dmg} damage!`);

            if (player.hasFrostHit && isWorld1 && enemy.hp > 0) {
                if (Math.random() < 0.25) {
                    enemy.stunned = true;
                    log("Glacial Gem FREEZES the enemy!");
                    triggerAttackAnim(enemy.x, enemy.y, 'anim-web'); 

                    if (typeof unlockAchievement === 'function') unlockAchievement('ice_cold');
                }
            }

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
            
            if (enemy.type === 'mud_monster' && enemy.alive) {
                if (Math.random() < 0.5) {
                    const openSpots = [
                        {x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, 
                        {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1}
                    ].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y) && !isBoulder(p.x, p.y) && !enemies.some(e => e.alive && e.x === p.x && e.y === p.y) && !(player.x === p.x && player.y === p.y));
                    
                    if (openSpots.length > 0) {
                        const spawn = openSpots[Math.floor(Math.random() * openSpots.length)];
                        enemies.push({ 
                            id: enemies.length, 
                            x: spawn.x, y: spawn.y, 
                            hp: 3, maxHp: 3, 
                            alive: true, type: 'slime', wasHit: false 
                        });
                        log("The boss splashes! A Slime spawns.");
                    }
                }
            }

            if (enemy.hp <= 0) {
                enemy.alive = false;
                log(enemy.isBoss ? "BOSS DEFEATED!" : "Enemy defeated!");

                if (typeof unlockAchievement === 'function') {
                    unlockAchievement('first_kill');
                    if (enemy.isBoss) unlockAchievement('boss_slayer');

                    const remainingEnemies = enemies.filter(e => e.alive).length;
                    if (currentLevelId === 'Tutorial-Boss' && remainingEnemies === 0) {
                        unlockAchievement('tutorial_complete');
                    }

                    if (currentLevelId === '1-5' && enemy.isBoss) {
                        unlockAchievement('world_1_5');
                    }

                    // --- NEW: Untouchable & EX Conqueror ---
                    if (enemy.isBoss) {
                        if (!levelDamageTaken) unlockAchievement('untouchable');
                        if (currentLevelId.startsWith('EX')) unlockAchievement('ex_conqueror');
                    }
                }

                if (currentLevelId.endsWith('D')) {
                    const globalLevel = LEVELS[currentLevelId];
                    if (globalLevel && globalLevel.enemies && globalLevel.enemies[enemy.id]) {
                        globalLevel.enemies[enemy.id].isDead = true;
                    }
                }

                let xpGain = 20;
                if (enemy.type === 'golem') xpGain = 50;
                if (enemy.isBoss) xpGain = 500;
                gainXp(xpGain);

                let points = 100; 
                if (enemy.isBoss) points = 1000;
                else if (enemy.type === 'fast' || enemy.type === 'slime' || enemy.type === 'bat') points = 50;
                else if (enemy.type === 'golem' || enemy.type === 'guard') points = 150;
                
                currentLevelScore += points;

                if (currentLevelId === 'EX-1-Boss' && enemy.isBoss) items.push({ id: items.length, x: 4, y: 1, type: "relic", value: 0, name: "Vampiric Charm", collected: false });
                else if (currentLevelId === 'EX-2-Boss' && enemy.isBoss) items.push({ id: items.length, x: 4, y: 5, type: "relic", value: 0, name: "Hydra Scale", collected: false });
                else if (currentLevelId === 'EX-3-Boss' && enemy.isBoss) items.push({ id: items.length, x: 4, y: 5, type: "relic", value: 0, name: "Glacial Gem", collected: false });
                
                if (player.hasCharm && isWorld1 && player.hp < player.maxHp) {
                    player.hp += 1; triggerHeal(player.x, player.y, 1);
                }
            }
        } else if (boulder) {
            hitSomething = true; let dmg = player.damage;
            triggerAttackAnim(boulder.x, boulder.y, 'anim-slash');
            boulder.hp -= dmg; triggerDamage(boulder.x, boulder.y, dmg, false);
            if (boulder.hp <= 0) {
                log("Boulder destroyed!");

                if (typeof unlockAchievement === 'function') unlockAchievement('demolitionist');

                const roll = Math.random();

                if (roll < 0.2) {
                    enemies.push({ id: enemies.length, x: boulder.x, y: boulder.y, hp: 10, maxHp: 10, alive: true, type: 'melee', wasHit: false });
                    log("A Melee Enemy grew out of the rubble!");
                } 
                else if (roll >= 0.2 && roll < 0.3) {
                    enemies.push({ id: enemies.length, x: boulder.x, y: boulder.y, hp: 15, maxHp: 15, alive: true, type: 'golem', wasHit: false });
                    log("A Golem erupted out of the rubble!");
                }
                else if (roll > 0.8) { 
                    items.push({ x: boulder.x, y: boulder.y, type: "potion", value: 3, name: "Small Potion", collected: false });
                    log("Found a small potion!");
                }
            }
        } else if (tempWallIdx !== -1) {
            hitSomething = true;
            triggerAttackAnim(targetX, targetY, 'anim-slash');
            tempWalls.splice(tempWallIdx, 1);
            log("Smashed the iron wall!");
        } else if (crystal) {
            hitSomething = true;
            if (!crystal.ignited) {
                crystal.ignited = true;
                triggerAttackAnim(crystal.x, crystal.y, 'anim-slash');
                log("FUSE LIT! Get back!");
                if (typeof unlockAchievement === 'function') unlockAchievement('mad_bomber');
            } else {
                log("It's already going to blow!");
            }
        }
    });

    if(!hitSomething) log("Swung at nothing.");
    drawGrid(); updateStats(); saveGame(); 
    setTimeout(() => { enemies.forEach(e => e.wasHit = false); drawGrid(); }, 250);
}

function handleTurn(dx, dy) {
    player.facing = { x: dx, y: dy };

    const oldX = player.x; 
    const oldY = player.y;

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

    const belt = currentMap.conveyors && currentMap.conveyors.find(b => b.y === finalY);
    if (belt) {
        const dir = belt.dir * conveyorDir;
        const driftX = finalX + dir;
        if (driftX >= 0 && driftX < GRID_SIZE && !isWall(driftX, finalY) && !isBoulder(driftX, finalY)) {
            finalX = driftX;
            log("The belt moves you!");
        } else {
            log("Belt pushed you into a wall!");
        }
    }

    const warp = currentMap.warps && currentMap.warps.find(w => w.pos === `${ALPHABET[finalX]}${finalY+1}`);
    if (warp) {
        const target = parseCoord(warp.target);
        finalX = target.x; finalY = target.y;
        log("Entered a Void Warp!");
    }

    let targetPortal = currentMap.portals.find(p => { const c = parseCoord(p.pos); return c.x === finalX && c.y === finalY; });
    
    // --- UPDATED SMART DOOR LOGIC START ---
    if (targetPortal && targetPortal.type === 'door') {
        
        // Helper: Defines a "Active Fight Room" (Ends in D, but NOT CD)
        const isActiveDungeonRoom = (id) => id && id.endsWith('D') && !id.endsWith('CD');

        if (isActiveDungeonRoom(currentLevelId)) {
            const currentFloor = currentLevelId.split('-')[0];
            
            let targetFloor = null;
            // Check if target has a floor number (e.g. "1-CD")
            if (targetPortal.targetLevel.indexOf('-') > -1) {
                targetFloor = targetPortal.targetLevel.split('-')[0];
            }

            // We are leaving the floor if:
            // 1. Target is NOT an active fight room (e.g. "1-CD", "Hub")
            // 2. OR Target is a different floor number
            const isLeavingFloor = !isActiveDungeonRoom(targetPortal.targetLevel) || (currentFloor !== targetFloor);

            if (isLeavingFloor) {
                if (!isDungeonFloorClear(currentFloor)) {
                    log(`⛔ SEALED! You must clear ALL rooms on Floor ${currentFloor} first.`);
                    if(document.getElementById('grid')) {
                        document.getElementById('grid').classList.add('screen-shake');
                        setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400);
                    }
                    return; // Stop the player from entering
                }
            }
        }

        // Standard Check: Can't leave current room if enemies are alive
        if (enemies.filter(e => e.alive).length > 0) {
            log("Defeat all enemies to proceed!");
            targetPortal = null; // Cancel the movement
        }
    }
    // --- UPDATED SMART DOOR LOGIC END ---

    if (targetPortal && targetPortal.type === 'inventory') { openInventory(); return; }
    if (targetPortal && targetPortal.redirect) { window.location.href = targetPortal.redirect; return; }
    if (targetPortal) {
        if (currentLevelId === 'W2-1-1') gameProgress.w2l1s1 = true;
        if (currentLevelId === 'W2-1-2') gameProgress.w2l1s2 = true;
        if (currentLevelId === 'W2-1-3') gameProgress.w2l1s3 = true;
        if (currentLevelId === 'W2-2-1') gameProgress.w2l2s1 = true;
        if (currentLevelId === 'W2-2-2') gameProgress.w2l2s2 = true;
        if (currentLevelId === 'W2-2-3') gameProgress.w2l2s3 = true;
        if (currentLevelId === 'W2-3-1') gameProgress.w2l3s1 = true;
        if (currentLevelId === 'W2-3-2') gameProgress.w2l3s2 = true;
        if (currentLevelId === 'W2-3-3') gameProgress.w2l3s3 = true;
        if (currentLevelId === 'W2-1-1') gameProgress.w2l4s1 = true;
        if (currentLevelId === 'W2-1-2') gameProgress.w2l4s2 = true;
        if (currentLevelId === 'W2-1-3') gameProgress.w2l4s3 = true;

        if (currentLevelId === 'W3-1-1') gameProgress.w3l1s1 = true;
        if (currentLevelId === 'W3-1-2') gameProgress.w3l1s2 = true;
        if (currentLevelId === 'W3-1-3') gameProgress.w3l1s3 = true;

        if (currentLevelId === 'W2-1-4') gameProgress.w2l1Complete = true; 
        if (currentLevelId === 'W2-2-4') gameProgress.w2l2Complete = true;
        if (currentLevelId === 'W2-3-4') gameProgress.w2l3Complete = true;

        if (currentLevelId === '5-Boss') gameProgress.w1Complete = true; 

        if (currentLevelId === '14') gameProgress.story1Complete = true;

        if (LEVELS[currentLevelId].enemies && LEVELS[currentLevelId].enemies.length > 0) {
            const oldBest = highScores[currentLevelId] || 0;
            if (currentLevelScore > oldBest) {
                highScores[currentLevelId] = currentLevelScore;
                log(`New Record! Score: ${currentLevelScore}`);
            }
        }

        if (currentLevelId.includes('-Boss')) gameProgress[`level${currentLevelId[0]}Complete`] = true;
        
        // Heal if entering CD room
        if (targetPortal.targetLevel.endsWith('CD')) player.hp = player.maxHp;

        loadLevel(targetPortal.targetLevel, targetPortal.targetPos);
        return; 
    }

    player.x = finalX; player.y = finalY;
    playerActionsLeft -= moveCost;

    const oldCoord = `${ALPHABET[oldX]}${oldY+1}`;
    if (currentMap.crumble && currentMap.crumble.includes(oldCoord)) {
        currentMap.crumble = currentMap.crumble.filter(c => c !== oldCoord);
        if (!currentMap.pits) currentMap.pits = [];
        if (!currentMap.pits.includes(oldCoord)) {
            currentMap.pits.push(oldCoord);
        }
        log("The floor crumbles into the abyss!");
        if (typeof triggerDeathParticles === "function") triggerDeathParticles(oldX, oldY, "#5d4037"); 
    }

    if (currentMap.pits && currentMap.pits.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
         player.hp -= 5; 
         triggerDamage(player.x, player.y, 5, true);
         log("Fell into the abyss! -5 HP");
         currentLevelScore -= 50;
         updateStats();
    }

    currentLevelScore -= 2; 
    updateStats();

    if (currentMap.levers && currentMap.levers.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
        conveyorDir *= -1;
        log("CLICK! Belt direction reversed.");
    }

    let checkX = finalX; let checkY = finalY;
    if (currentLevelId === 'EX-4-Boss') {
        const invRot = (4 - (bossRotation % 4)) % 4;
        const p = rotatePoint(finalX, finalY, 4, 4, invRot);
        checkX = p.x; checkY = p.y;
    }

    if (currentMap.spikes) {
        spikesActive = !spikesActive;
        const isSpike = currentMap.spikes.includes(`${ALPHABET[checkX]}${checkY+1}`);
        if (isSpike && spikesActive) {
            player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
            log("Stepped on active spike!");
        }
    }

    if (currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
        player.hp -= 1; triggerDamage(player.x, player.y, 1, true); log("Toxic Sludge! -1 HP");
        currentLevelScore -= 2; 
        updateStats();
    }

    if (voidRadius > 0) {
        if (finalX < voidRadius || finalX >= GRID_SIZE - voidRadius || finalY < voidRadius || finalY >= GRID_SIZE - voidRadius) {
            player.hp -= 5; triggerDamage(player.x, player.y, 5, true);
            log("THE VOID CONSUMES YOU! -5 HP");
            currentLevelScore -= 100; 
            updateStats();
        }
    }

    if (currentMap.rivers && currentMap.rivers.includes(`${ALPHABET[finalX]}${finalY+1}`)) {
        setTimeout(() => {
            const slipY = player.y + 1;
            if (slipY < GRID_SIZE && !isWall(player.x, slipY)) { player.y = slipY; drawGrid(); } 
            else { player.hp -= 1; triggerDamage(player.x, player.y, 1, true); drawGrid(); }
            saveGame(); 
        }, 300);
    }

    const itemIdx = items.findIndex(i => i.x === finalX && i.y === finalY && !i.collected);
    if (itemIdx !== -1) {
        const item = items[itemIdx];
        item.collected = true;

        if (currentLevelId.endsWith('D')) {
             const globalLevel = LEVELS[currentLevelId];
             if (globalLevel && globalLevel.items && globalLevel.items[item.id]) {
                 globalLevel.items[item.id].isCollected = true;
             }
        }

        if (item.type === 'potion') { 
            player.hp = Math.min(player.hp + item.value, player.maxHp); 
            log(`Used Potion (+${item.value} HP).`); 
        } 
        else if (item.type === 'weapon') { 
            if (player.damage < 8) {
                player.damage = Math.min(8, player.damage + item.value); 
                log("Got Weapon."); 
            } else {
                log("Weapon found, but Attack Strength is maxed!");
            }
        } 
        else if (item.type === 'relic') {
            if (item.name === 'Vampiric Charm') player.hasCharm = true;
            if (item.name === 'Hydra Scale') player.hasThorns = true;
            if (item.name === 'Glacial Gem') player.hasFrostHit = true; 
            log(`Picked up ${item.name}!`);
        } 
        else if (item.type === 'heart_container') { 
            if (player.maxHp < 30) {
                const increase = Math.min(30, player.maxHp + item.value) - player.maxHp;
                player.maxHp += increase;
                player.hp += increase;
                log(`Consumed ${item.name}! Max HP +${increase}.`); 
            } else {
                log("Max HP is already at limit (30)!");
                player.hp = player.maxHp; 
                log("Fully Healed instead.");
            }
        }
    }

    drawGrid(); saveGame(); consumeAction(); 
}

function processOneEnemyTurn(enemy) {

    // --- MUD MONSTER LOGIC ---
    if (enemy.type === 'mud_monster') {
        const coord = `${ALPHABET[enemy.x]}${enemy.y+1}`;
        if (!LEVELS[currentLevelId].hazards) LEVELS[currentLevelId].hazards = [];
        if (!LEVELS[currentLevelId].hazards.includes(coord)) {
            LEVELS[currentLevelId].hazards.push(coord);
        }

        if (enemy.isBoss) {
            enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
            if (enemy.summonCooldown >= 4) {
                 const openSpots = [
                    {x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, 
                    {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1},
                    {x: enemy.x-1, y: enemy.y-1}, {x: enemy.x+1, y: enemy.y-1}, 
                    {x: enemy.x-1, y: enemy.y+1}, {x: enemy.x+1, y: enemy.y+1}
                 ].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y) && !isBoulder(p.x, p.y) && !enemies.some(e => e.alive && e.x === p.x && e.y === p.y));

                 openSpots.sort(() => Math.random() - 0.5);

                 if (openSpots.length > 0) {
                     const spawnCount = 1;
                     for(let i=0; i<spawnCount; i++) {
                        const spawn = openSpots[i];
                        enemies.push({ 
                            id: enemies.length, 
                            x: spawn.x, y: spawn.y, 
                            hp: 10, maxHp: 10, 
                            alive: true, type: 'melee', 
                            wasHit: false 
                        });
                     }
                     log("The Mud Monster flings sludge! Enemies appear!");
                     enemy.summonCooldown = 0;
                     return true; 
                 }
            }
        }
    }

    // --- TANGLER BOSS LOGIC ---
    if (enemy.isBoss && enemy.type === 'tangler') {
        const coord = `${ALPHABET[enemy.x]}${enemy.y+1}`;
        if (!LEVELS[currentLevelId].thickets) LEVELS[currentLevelId].thickets = [];
        if (!LEVELS[currentLevelId].thickets.includes(coord)) {
            LEVELS[currentLevelId].thickets.push(coord);
        }

        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        
        if (enemy.summonCooldown >= 3) {
            const isSummoning = Math.random() < 0.25;

            if (isSummoning) {
                const openSpots = [
                    {x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, 
                    {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1},
                    {x: enemy.x-1, y: enemy.y-1}, {x: enemy.x+1, y: enemy.y-1}, 
                    {x: enemy.x-1, y: enemy.y+1}, {x: enemy.x+1, y: enemy.y+1}
                ].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y) && !isBoulder(p.x, p.y) && !enemies.some(e => e.alive && e.x === p.x && e.y === p.y));

                openSpots.sort(() => Math.random() - 0.5);

                if (openSpots.length > 0) {
                    const spawn = openSpots[0];
                    enemies.push({ 
                        id: enemies.length, 
                        x: spawn.x, y: spawn.y, 
                        hp: 4, maxHp: 4, 
                        alive: true, type: 'fast', 
                        wasHit: false 
                    });
                    
                    log("The Tangler shakes! A Thorn Sprig drops!");
                    triggerAttackAnim(enemy.x, enemy.y, 'anim-web'); 
                    enemy.summonCooldown = 0;
                    return true; 
                }
            } else {
                const nearby = [
                    {x: player.x+1, y: player.y}, {x: player.x-1, y: player.y}, 
                    {x: player.x, y: player.y+1}, {x: player.x, y: player.y-1},
                    {x: player.x+1, y: player.y+1}, {x: player.x-1, y: player.y-1}
                ].filter(p => 
                    p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && 
                    !isWall(p.x, p.y) && 
                    !LEVELS[currentLevelId].thickets.includes(`${ALPHABET[p.x]}${p.y+1}`) &&
                    !(p.x === player.x && p.y === player.y) 
                );

                if (nearby.length > 0) {
                    nearby.sort(() => Math.random() - 0.5);
                    const count = Math.min(2, nearby.length);
                    
                    for(let i=0; i<count; i++) {
                        const p = nearby[i];
                        LEVELS[currentLevelId].thickets.push(`${ALPHABET[p.x]}${p.y+1}`);
                    }
                    
                    log("Roots burst from the ground around you!");
                    triggerAttackAnim(player.x, player.y, 'anim-web'); 
                    enemy.summonCooldown = 0;
                    return true; 
                }
            }
        }
    }

    if (enemy.stunned) { return false; }
    if (enemy.isHidden) return false; 

    // --- SENTINEL LOGIC ---
    if (enemy.type === 'sentinel') {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.abs(dx) + Math.abs(dy);
        if ((dx === 0 || dy === 0) && dist <= 5 && dist > 1) {
            let blocked = false;
            if (dx === 0) { 
                const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y);
                for (let checkY = start; checkY < end; checkY++) { if (isWall(enemy.x, checkY) || isBoulder(enemy.x, checkY)) blocked = true; }
            } else { 
                const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x);
                for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, enemy.y) || isBoulder(checkX, enemy.y)) blocked = true; }
            }
            if (!blocked) {
                let pullX = 0; let pullY = 0;
                if (dx > 0) pullX = -1; else if (dx < 0) pullX = 1; else if (dy > 0) pullY = -1; else if (dy < 0) pullY = 1;
                const targetX = player.x + pullX; const targetY = player.y + pullY;
                if (!isWall(targetX, targetY) && !isBoulder(targetX, targetY) && !enemies.some(e => e.alive && e.x === targetX && e.y === targetY)) {
                    triggerAttackAnim(player.x, player.y, 'anim-web'); 
                    player.x = targetX; player.y = targetY;
                    log("Sentinel pulls you in!");
                    if (voidRadius > 0 && (player.x < voidRadius || player.x >= GRID_SIZE - voidRadius || player.y < voidRadius || player.y >= GRID_SIZE - voidRadius)) {
                        player.hp -= 5; triggerDamage(player.x, player.y, 5, true); log("Dragged into the Void!! -5 HP");
                    }
                    return true; 
                }
            }
        }
    }

    // --- WELDER LOGIC ---
    if (enemy.type === 'welder') {
        const dist = Math.abs(player.x - enemy.x) + Math.abs(player.y - enemy.y);
        if (dist <= 1) { 
            const adjacent = [ {x: player.x+1, y: player.y}, {x: player.x-1, y: player.y}, {x: player.x, y: player.y+1}, {x: player.x, y: player.y-1} ];
            const valid = adjacent.filter(p => p.x >= 0 && p.x < GRID_SIZE && p.y >=0 && p.y < GRID_SIZE && !isWall(p.x, p.y) && !isBoulder(p.x, p.y) && !(p.x === player.x && p.y === player.y) && !(p.x === enemy.x && p.y === enemy.y) && !enemies.some(e => e.alive && e.x === p.x && e.y === p.y));
            if (valid.length > 0) {
                const target = valid[Math.floor(Math.random() * valid.length)];
                tempWalls.push(target);
                log("Welder builds a wall!");
                return true; 
            }
        }
    }

    // --- HYDRA BOSS LOGIC ---
    if (enemy.isBoss && enemy.type === "hydra") {
        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        if (enemy.summonCooldown >= 4) { 
            const openSpots = [{x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1}].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y));
            if (openSpots.length > 0) {
                const spawn = openSpots[Math.floor(Math.random() * openSpots.length)];
                enemies.push({ id: enemies.length, x: spawn.x, y: spawn.y, hp: 6, maxHp: 6, alive: true, type: 'ranged', wasHit: false });
                log("A new Hydra head erupts from the muck!");
                enemy.summonCooldown = 0; return true; 
            }
        }
        const dx = player.x - enemy.x; const dy = player.y - enemy.y; const dist = Math.abs(dx) + Math.abs(dy);
        if ((dx === 0 || dy === 0) && dist <= 4 && dist > 1) {
            let blocked = false;
            if (dx === 0) { const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y); for (let checkY = start; checkY < end; checkY++) { if (isWall(enemy.x, checkY)) blocked = true; } } 
            else { const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x); for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, enemy.y)) blocked = true; } }
            if (!blocked) { triggerAttackAnim(player.x, player.y, 'anim-web'); player.hp -= 2; triggerDamage(player.x, player.y, 2, true); log("Hydra spits ACID! -2 HP"); return true; }
        }
    }

    // --- ENTROPY BOSS LOGIC ---
    if (enemy.isBoss && enemy.type === "entropy") {
        const pct = enemy.hp / enemy.maxHp;
        let targetRadius = 0;
        if (pct < 0.75) targetRadius = 1; if (pct < 0.50) targetRadius = 2; if (pct < 0.25) targetRadius = 3; 
        if (targetRadius > voidRadius) { voidRadius = targetRadius; log("THE VOID IS COLLAPSING!"); document.getElementById('grid').classList.add('screen-shake'); setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400); return true; }
        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        if (enemy.summonCooldown >= 4) {
             const openSpots = [{x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1}].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y));
             if (openSpots.length > 0) {
                 const spawn = openSpots[Math.floor(Math.random() * openSpots.length)];
                 enemies.push({ id: enemies.length, x: spawn.x, y: spawn.y, hp: 6, maxHp: 6, alive: true, type: 'leech', wasHit: false });
                 log("Entropy manifests a Leech!"); enemy.summonCooldown = 0; return true;
             }
        }
    }

    // --- EARTHSHAKER LOGIC ---
    if (enemy.isBoss && enemy.type === "shaker") {
        enemy.quakeCooldown = (enemy.quakeCooldown || 0) + 1;
        if (enemy.quakeCooldown >= 3) {
            log("EARTHSHAKER slams the ground!"); document.getElementById('grid').classList.add('quake-anim'); setTimeout(() => document.getElementById('grid').classList.remove('quake-anim'), 500);
            player.hp -= 1; triggerDamage(player.x, player.y, 1, true);
            const shifts = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}]; const s = shifts[Math.floor(Math.random()*shifts.length)]; const nx = player.x + s.x; const ny = player.y + s.y;
            if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9 && !isWall(nx,ny) && !isBoulder(nx,ny)) { player.x = nx; player.y = ny; } enemy.quakeCooldown = 0; return true; 
        }
    }

    // --- GEAR GRINDER LOGIC ---
    if (enemy.isBoss && enemy.type === 'gear') {
        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        if (enemy.summonCooldown >= 5) {
            const spawn = {x: 4, y: 8}; 
            if (!isWall(spawn.x, spawn.y) && !enemies.some(e => e.x === spawn.x && e.y === spawn.y)) {
                enemies.push({ id: enemies.length, x: spawn.x, y: spawn.y, hp: 8, maxHp: 8, alive: true, type: 'welder', wasHit: false });
                log("Gear Grinder deploys a Welder!"); enemy.summonCooldown = 0; return true;
            }
        }
    }

    // --- ZEPHYR BOSS LOGIC ---
    if (enemy.isBoss && enemy.type === "zephyr") {
        if (enemy.speedGauge === undefined) enemy.speedGauge = 0;
        enemy.speedGauge += 2;
        if (enemy.speedGauge < 3) {
            log("Zephyr hovers, waiting for an opening...");
            return true; 
        }
        enemy.speedGauge -= 3;
        
        if (enemy.swoopStage === undefined) enemy.swoopStage = 0;
        enemy.internalTurn = (enemy.internalTurn || 0) + 1;
        
        let pushedThisTurn = false; 

        if (enemy.internalTurn % 3 === 0) {
            const windDirs = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
            const gust = windDirs[Math.floor(Math.random() * windDirs.length)];
            const wx = player.x + gust.x;
            const wy = player.y + gust.y;

            if (wx >= 0 && wx < 9 && wy >= 0 && wy < 9 && !isWall(wx, wy) && !isBoulder(wx, wy)) {
                player.x = wx; 
                player.y = wy;
                log("Turbulence throws you off balance!");
                pushedThisTurn = true; 
                const grid = document.getElementById('grid');
                if(grid) {
                    grid.classList.add('screen-shake');
                    setTimeout(() => grid.classList.remove('screen-shake'), 400);
                }
            }
        }

        if (enemy.swoopStage === 0 && Math.random() < 0.15) {
            log("Zephyr screeches! SKY DIVE INCOMING!");
            enemy.swoopStage = 1; 
            return true; 
        }

        if (enemy.swoopStage === 1) {
            if (!LEVELS[currentLevelId].windWarnings) LEVELS[currentLevelId].windWarnings = [];

            let targetType = ''; 
            const distTop = player.y; const distBottom = 8 - player.y;
            const distLeft = player.x; const distRight = 8 - player.x;
            const min = Math.min(distTop, distBottom, distLeft, distRight);
            
            if (min === distLeft) {
                targetType = 'row'; enemy.x = 0; enemy.y = player.y; enemy.dashTarget = { x: 8, y: player.y };
            } else if (min === distRight) {
                targetType = 'row'; enemy.x = 8; enemy.y = player.y; enemy.dashTarget = { x: 0, y: player.y };
            } else if (min === distTop) {
                targetType = 'col'; enemy.x = player.x; enemy.y = 0; enemy.dashTarget = { x: player.x, y: 8 };
            } else {
                targetType = 'col'; enemy.x = player.x; enemy.y = 8; enemy.dashTarget = { x: player.x, y: 0 };
            }

            LEVELS[currentLevelId].windWarnings = []; 
            if (targetType === 'row') {
                for(let i=0; i<9; i++) LEVELS[currentLevelId].windWarnings.push(`${ALPHABET[i]}${enemy.y+1}`);
            } else {
                for(let i=0; i<9; i++) LEVELS[currentLevelId].windWarnings.push(`${ALPHABET[enemy.x]}${i+1}`);
            }
            
            log("Zephyr clings to the wall...");
            triggerAttackAnim(enemy.x, enemy.y, 'anim-web'); 
            enemy.swoopStage = 2; 
            return true; 
        }

        if (enemy.swoopStage === 2) {
            log("ZEPHYR SWOOPS!");
            LEVELS[currentLevelId].windWarnings = []; 

            let hitPlayer = false;
            if (enemy.y === enemy.dashTarget.y && player.y === enemy.y) hitPlayer = true; 
            if (enemy.x === enemy.dashTarget.x && player.x === enemy.x) hitPlayer = true; 

            triggerAttackAnim(enemy.x, enemy.y, 'anim-slash');
            enemy.x = enemy.dashTarget.x;
            enemy.y = enemy.dashTarget.y;
            triggerAttackAnim(enemy.x, enemy.y, 'anim-slash');

            if (hitPlayer) {
                player.hp -= 5; 
                triggerDamage(player.x, player.y, 5, true);
                log("Direct Hit! (-5 HP)");
                document.getElementById('grid').classList.add('screen-shake');
                setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400);
            } else {
                log("Zephyr misses!");
            }

            enemy.swoopStage = 0; 
            return true; 
        }

        if (enemy.swoopStage === 0) {
            const dx = Math.abs(player.x - enemy.x);
            const dy = Math.abs(player.y - enemy.y);
            
            if (dx <= 1 && dy <= 1 && !pushedThisTurn) {
                triggerAttackAnim(player.x, player.y, 'anim-scratch');
                player.hp -= 2; 
                triggerDamage(player.x, player.y, 2, true);
                log("Zephyr slashes you! (-2 HP)");
                return true; 
            }

            const moves = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
            moves.sort((a, b) => {
                const distA = Math.abs(player.x - (enemy.x + a.x)) + Math.abs(player.y - (enemy.y + a.y));
                const distB = Math.abs(player.x - (enemy.x + b.x)) + Math.abs(player.y - (enemy.y + b.y));
                return distA - distB;
            });

            for (let m of moves) {
                const tx = enemy.x + m.x;
                const ty = enemy.y + m.y;
                if (tx >= 0 && tx < 9 && ty >= 0 && ty < 9) {
                    if (!isWall(tx, ty) && !isBoulder(tx, ty) && 
                        !(tx === player.x && ty === player.y) &&
                        !enemies.some(e => e.alive && e.x === tx && e.y === ty)) {
                        
                        enemy.x = tx;
                        enemy.y = ty;
                        break; 
                    }
                }
            }
            return true; 
        }
    }

// --- GREAT DRAGONFLY BOSS LOGIC ---
    if (enemy.isBoss && enemy.type === "dragonfly") {
        
        // Initialize State
        if (enemy.swoopStage === undefined) enemy.swoopStage = 0;

        // ======================================================
        // PRIORITY 1: FINISH SWOOP SEQUENCE (If already started)
        // ======================================================
        
        if (enemy.swoopStage === 1) {
            // --- TARGETING PHASE ---
            // Pick a Row or Column to dive bomb
            let targetType = (Math.random() > 0.5) ? 'row' : 'col';
            
            // Logic: Target the side closest to the player
            if (targetType === 'row') {
                enemy.x = (player.x < 4) ? 8 : 0; // Teleport to far wall
                enemy.y = player.y;               // Align with player Y
                enemy.dashTarget = { x: (enemy.x === 0 ? 8 : 0), y: player.y };
            } else {
                enemy.x = player.x;               // Align with player X
                enemy.y = (player.y < 4) ? 8 : 0; // Teleport to far wall
                enemy.dashTarget = { x: player.x, y: (enemy.y === 0 ? 8 : 0) };
            }

            // Visual Warnings (Yellow Highlights)
            if (!LEVELS[currentLevelId].windWarnings) LEVELS[currentLevelId].windWarnings = [];
            LEVELS[currentLevelId].windWarnings = [];
            
            if (targetType === 'row') {
                for(let i=0; i<9; i++) LEVELS[currentLevelId].windWarnings.push(`${ALPHABET[i]}${enemy.y+1}`);
            } else {
                for(let i=0; i<9; i++) LEVELS[currentLevelId].windWarnings.push(`${ALPHABET[enemy.x]}${i+1}`);
            }
            
            log("The Dragonfly vibrates its wings...!");
            enemy.swoopStage = 2; // Advance to next stage
            return true; // Turn Over
        }

        if (enemy.swoopStage === 2) {
            // --- EXECUTION PHASE ---
            log("THE DRAGONFLY SWOOPS!");
            LEVELS[currentLevelId].windWarnings = []; // Clear warnings

            const startX = enemy.x;
            const startY = enemy.y;
            
            // TELEPORT TO TARGET
            enemy.x = enemy.dashTarget.x;
            enemy.y = enemy.dashTarget.y;

            // Ensure arrays exist
            if (!LEVELS[currentLevelId].hazards) LEVELS[currentLevelId].hazards = [];
            if (!LEVELS[currentLevelId].thickets) LEVELS[currentLevelId].thickets = [];

            // Calculate Path
            let path = [];
            if (startY === enemy.y) { 
                for (let i = Math.min(startX, enemy.x); i <= Math.max(startX, enemy.x); i++) {
                    path.push(`${ALPHABET[i]}${enemy.y+1}`);
                }
            } else { 
                for (let i = Math.min(startY, enemy.y); i <= Math.max(startY, enemy.y); i++) {
                    path.push(`${ALPHABET[enemy.x]}${i+1}`);
                }
            }

            // --- TRAIL GENERATION (40% Empty / 40% Thicket / 20% Hazard) ---
            path.forEach(coord => {
                const roll = Math.random(); 
                if (roll < 0.40) { 
                    // 40%: Empty (Do nothing)
                } 
                else if (roll < 0.80) {
                    // 40%: Thicket (Slow)
                    if (!LEVELS[currentLevelId].thickets.includes(coord) && !LEVELS[currentLevelId].hazards.includes(coord)) {
                        LEVELS[currentLevelId].thickets.push(coord);
                    }
                } 
                else {
                    // 20%: Hazard (Damage)
                    // Remove thicket if it exists there, then add hazard
                    const thicketIdx = LEVELS[currentLevelId].thickets.indexOf(coord);
                    if (thicketIdx > -1) LEVELS[currentLevelId].thickets.splice(thicketIdx, 1);
                    
                    if (!LEVELS[currentLevelId].hazards.includes(coord)) {
                        LEVELS[currentLevelId].hazards.push(coord);
                    }
                }
            });

            // DAMAGE CHECK (Did boss fly through player?)
            if ((startY === enemy.y && player.y === enemy.y) || (startX === enemy.x && player.x === enemy.x)) {
                player.hp -= 4;
                triggerDamage(player.x, player.y, 4, true);
                log("Slammed by the Dragonfly! -4 HP");
                document.getElementById('grid').classList.add('screen-shake');
                setTimeout(() => document.getElementById('grid').classList.remove('screen-shake'), 400);
            }

            enemy.swoopStage = 0; // Reset
            return true; // Turn Over
        }

        // ======================================================
        // PRIORITY 2: MELEE CHECK
        // ======================================================

        const dx = Math.abs(player.x - enemy.x);
        const dy = Math.abs(player.y - enemy.y);
        
        // If player is adjacent (diagonal or cardinal), BITE.
        if (dx <= 1 && dy <= 1) {
            triggerAttackAnim(player.x, player.y, 'anim-scratch');
            player.hp -= 3; 
            triggerDamage(player.x, player.y, 3, true);
            log("The Dragonfly snaps its mandibles! -3 HP");
            return true; // Turn Over
        }

        // ======================================================
        // PRIORITY 3: DECIDE MOVE OR SWOOP (RNG)
        // ======================================================

        const roll = Math.random();

        // 20% Chance: Start Swoop Logic
        if (roll < 0.20) {
            enemy.swoopStage = 1;
            log("The Dragonfly clings to the wall...");
            return true;
        } 
        
        // 80% Chance: CHASE PLAYER (Explicit Movement Code)
        else {
            // 1. Define possible moves
            const moves = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
            
            // 2. Sort moves by which one gets closer to the player
            moves.sort((a, b) => {
                const distA = Math.abs(player.x - (enemy.x + a.x)) + Math.abs(player.y - (enemy.y + a.y));
                const distB = Math.abs(player.x - (enemy.x + b.x)) + Math.abs(player.y - (enemy.y + b.y));
                return distA - distB;
            });

            // 3. Try the best move
            for (let m of moves) {
                const tx = enemy.x + m.x;
                const ty = enemy.y + m.y;

                // Check Bounds
                if (tx >= 0 && tx < 9 && ty >= 0 && ty < 9) {
                    // Check Obstructions (Walls, Boulders, Other Enemies)
                    if (!isWall(tx, ty) && !isBoulder(tx, ty) && 
                        !(tx === player.x && ty === player.y) && // Don't step on player
                        !enemies.some(e => e.alive && e.x === tx && e.y === ty)) {
                        
                        // Valid move found!
                        enemy.x = tx;
                        enemy.y = ty;
                        return true; // Turn Over
                    }
                }
            }
            
            // If we are completely blocked and can't move, just do nothing
            return true;
        }
    }

    if (enemy.isBoss && (enemy.type === "summoner" || enemy.type === "king")) {
        enemy.summonCooldown = (enemy.summonCooldown || 0) + 1;
        let limit = 5; 
        if (enemy.summonCooldown >= limit) { 
            const openSpots = [{x: enemy.x-1, y: enemy.y}, {x: enemy.x+1, y: enemy.y}, {x: enemy.x, y: enemy.y-1}, {x: enemy.x, y: enemy.y+1}].filter(p => p.x >=0 && p.x <9 && p.y >=0 && p.y <9 && !isWall(p.x, p.y) && !isBoulder(p.x, p.y));
            if (openSpots.length > 0) {
                const spawn = openSpots[Math.floor(Math.random() * openSpots.length)];
                let typeToSummon = 'ranged'; if (currentLevelId.startsWith('EX-')) typeToSummon = 'fast'; if (enemy.type === 'king') typeToSummon = 'guard';
                let summonHp = 6; if (typeToSummon === 'fast') summonHp = 4; if (typeToSummon === 'guard') summonHp = 10;
                enemies.push({ id: enemies.length, x: spawn.x, y: spawn.y, hp: summonHp, maxHp: summonHp, alive: true, type: typeToSummon, wasHit: false });
                log(`BOSS summons a ${typeToSummon}!`); enemy.summonCooldown = 0; return true; 
            }
        }
    }

    if (enemy.type === 'golem' || enemy.type === 'guard' || enemy.type === 'yeti' || enemy.type === 'welder') {
        if (!enemy.canMove) { enemy.canMove = true; return false; }
        enemy.canMove = false; 
    }

    const dx = Math.abs(player.x - enemy.x); const dy = Math.abs(player.y - enemy.y); const dist = dx + dy;

    if (enemy.type === 'ranged' || enemy.type === 'mage') {
        const alignedX = (player.x === enemy.x); const alignedY = (player.y === enemy.y);
        if ((alignedX || alignedY) && dist <= 3 && dist > 1) {
            let blocked = false;
            if (alignedX) { const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y); for (let checkY = start; checkY < end; checkY++) { if (isWall(player.x, checkY) || isBoulder(player.x, checkY) || enemies.some(e => e.alive && e.x === player.x && e.y === checkY)) { blocked = true; break; } } } 
            else { const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x); for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, player.y) || isBoulder(checkX, player.y) || enemies.some(e => e.alive && e.x === checkX && e.y === player.y)) { blocked = true; break; } } }
            if (!blocked) { triggerAttackAnim(player.x, player.y, 'anim-web'); player.hp -= 1; triggerDamage(player.x, player.y, 1, true); log(`${enemy.type === 'mage' ? 'Mage' : 'Spider'} shoots! -1 HP`); return true; }
        }
    }

    let canAttack = false;
    if (enemy.isBoss || enemy.type === 'guard' || enemy.type === 'yeti' || enemy.type === 'mimic') { if (dx <= 1 && dy <= 1 && dist > 0) canAttack = true; } 
    else if (enemy.type === 'golem') {
        if (dx <= 1 && dy <= 1 && dist > 0) canAttack = true; 
        else if ((player.x === enemy.x || player.y === enemy.y) && dist <= 3) {
            let blocked = false;
            if (player.x === enemy.x) { const start = Math.min(player.y, enemy.y) + 1; const end = Math.max(player.y, enemy.y); for (let checkY = start; checkY < end; checkY++) { if (isWall(enemy.x, checkY) || isBoulder(enemy.x, checkY)) blocked = true; } } 
            else { const start = Math.min(player.x, enemy.x) + 1; const end = Math.max(player.x, enemy.x); for (let checkX = start; checkX < end; checkX++) { if (isWall(checkX, enemy.y) || isBoulder(checkX, enemy.y)) blocked = true; } }
            if (!blocked) { canAttack = true; log("Golem launches a shockwave!"); if (player.x === enemy.x) { for(let i=Math.min(player.y, enemy.y)+1; i<Math.max(player.y, enemy.y); i++) triggerAttackAnim(enemy.x, i, 'anim-shockwave'); } else { for(let i=Math.min(player.x, enemy.x)+1; i<Math.max(player.x, enemy.x); i++) triggerAttackAnim(i, enemy.y, 'anim-shockwave'); } }
        }
    } else { if (dx === 1 && dy === 1) canAttack = true; }

    if (canAttack) { 
         // --- NEW: REFLEXES (Floor 2 Upgrade) ---
         // Chance to fully dodge the attack
         if (player.dodgeChance && player.dodgeChance > 0) {
             if (Math.random() < player.dodgeChance) {
                 triggerDamage(player.x, player.y, "Miss", false);
                 log("You DODGED the attack!");
                 return true; // Enemy uses their turn but misses
             }
         }

         let dmg = (enemy.isBoss && enemy.hp < 15) ? 4 : 1;
         if (enemy.type === 'golem') dmg = 3; 
         if (enemy.type === 'guard' || enemy.type === 'yeti' || enemy.type === 'mimic') dmg = 3; 
         if (enemy.type === 'leech') dmg = 0; 

         if (enemy.type === 'leech') { triggerAttackAnim(player.x, player.y, 'anim-web'); player.energySapped = true; log("Leech drains your energy!"); } 
         else { triggerAttackAnim(player.x, player.y, 'anim-scratch'); player.hp -= dmg; triggerDamage(player.x, player.y, dmg, true); log(`${enemy.type.toUpperCase()} attacks!`); }
         
         currentLevelScore -= 2; 
         updateStats();

         // Relic Restriction: Thorns only work in World 1-5, EX, etc. NOT in Dungeons ('-nD').
         const isWorld1 = (currentLevelId.startsWith('3-') || currentLevelId.startsWith('2-') || currentLevelId.startsWith('EX') || currentLevelId.startsWith('1-') || currentLevelId.startsWith('4-') || currentLevelId.startsWith('5-')) && !currentLevelId.endsWith('D');

         if (player.hasThorns && isWorld1) { 
             enemy.hp -= 1; 
             triggerDamage(enemy.x, enemy.y, 1, false); 
             if (enemy.hp <= 0) { 
                 enemy.alive = false; 
                 log("Enemy killed by thorns!"); 
                 if (player.hasCharm && isWorld1 && player.hp < player.maxHp) { 
                     player.hp += 1; triggerHeal(player.x, player.y, 1); 
                 } 
             } 
         }
         return true;
    }

    let potentialTargets = [];
    if (enemy.isBoss || enemy.type === 'guard' || enemy.type === 'yeti' || enemy.type === 'mimic') { potentialTargets = [ {x: player.x, y: player.y - 1}, {x: player.x, y: player.y + 1}, {x: player.x - 1, y: player.y}, {x: player.x + 1, y: player.y}, {x: player.x - 1, y: player.y - 1}, {x: player.x + 1, y: player.y - 1}, {x: player.x - 1, y: player.y + 1}, {x: player.x + 1, y: player.y + 1} ]; } 
    else if (enemy.type === 'melee' || enemy.type === 'fast' || enemy.type === 'golem' || enemy.type === 'bat' || enemy.type === 'wraith' || enemy.type === 'leech') { potentialTargets = [ {x: player.x - 1, y: player.y - 1}, {x: player.x + 1, y: player.y - 1}, {x: player.x - 1, y: player.y + 1}, {x: player.x + 1, y: player.y + 1} ]; } 
    else { potentialTargets = [{x: player.x, y: player.y}]; }

    const validTargets = potentialTargets.filter(t => {
        let obstructed = false;
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
    let bestMove = null; let minMoveDist = Math.abs(enemy.x - bestTarget.x) + Math.abs(enemy.y - bestTarget.y);

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
            
            const currentMap = LEVELS[currentLevelId];
            const isHazard = currentMap.hazards && currentMap.hazards.includes(`${ALPHABET[enemy.x]}${enemy.y+1}`);
            const isSpike = currentMap.spikes && currentMap.spikes.includes(`${ALPHABET[enemy.x]}${enemy.y+1}`) && spikesActive;

            // --- TRAP/HAZARD LOGIC ---
            if ((isHazard || isSpike) && enemy.type !== 'wraith' && enemy.type !== 'bat' && enemy.type !== 'mud_monster' && enemy.type !== 'slime') {
                if (!enemy.isBoss) {
                     enemy.hp -= 1; triggerDamage(enemy.x, enemy.y, 1, false);
                     if(enemy.hp <= 0) {
                        enemy.alive = false; log("Enemy died in trap!");
                        
                        // --- NEW: Dungeon Persistence for Traps ---
                        if (currentLevelId.endsWith('D')) {
                            const globalLevel = LEVELS[currentLevelId];
                            if (globalLevel && globalLevel.enemies && globalLevel.enemies[enemy.id]) {
                                globalLevel.enemies[enemy.id].isDead = true;
                            }
                        }
                        // ------------------------------------------

                        const isWorld2 = currentLevelId.startsWith('World-2') || currentLevelId.startsWith('W2');
                        
                        if (player.hasCharm && !isWorld2 && !currentLevelId.endsWith('D') && player.hp < player.maxHp) { 
                            player.hp += 1; 
                            triggerHeal(player.x, player.y, 1); 
                        }
                        
                        return; 
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
    if (player.hasCharm) addItem("Vampiric Charm", "🧿", "Heals +1 HP on Kill <span style='color:#ef4444'>(World 1 Only)</span>");
    if (player.hasThorns) addItem("Hydra Scale", "🐲", "Reflects 1 DMG on hit <span style='color:#ef4444'>(World 1 Only)</span>"); 
    if (player.hasFrostHit) addItem("Glacial Gem", "❄️", "Chance to Freeze on hit <span style='color:#ef4444'>(World 1 Only)</span>"); 

    if (!foundAny) list.innerHTML = '<li class="inv-item" style="justify-content:center; color:#777;">No relics collected yet.</li>';
    document.getElementById('inventory-overlay').style.display = 'block';
}

function closeInventory() { document.getElementById('inventory-overlay').style.display = 'none'; }

const audio = document.getElementById('bgm');
if (audio) {
    audio.volume = 0.4;
    function startMusic() { if (audio.paused) audio.play().catch(e=>console.log(e)); document.removeEventListener('keydown', startMusic); document.removeEventListener('click', startMusic); }
    document.addEventListener('keydown', startMusic);
    document.addEventListener('click', startMusic);
}

function showHighScores() {
    const list = document.getElementById('score-list');
    list.innerHTML = '';
    
    // Get all levels we have scores for
    const playedLevels = Object.keys(highScores);
    
    if (playedLevels.length === 0) {
        list.innerHTML = '<li style="color:#777; padding:10px;">No records yet.</li>';
    } else {
        playedLevels.sort(); // Sort level IDs alphabetically
        playedLevels.forEach(lid => {
            if (!LEVELS[lid]) return; 
            
            const li = document.createElement('li');
            li.className = 'score-entry';
            
            // Clean up name (remove "Sewers - " etc for brevity if you want)
            let name = LEVELS[lid].name;
            
            li.innerHTML = `<span>${name}</span> <span>${highScores[lid]} pts</span>`;
            list.appendChild(li);
        });
    }
    document.getElementById('score-overlay').style.display = 'block';
}

function closeScores() {
    document.getElementById('score-overlay').style.display = 'none';
}

document.addEventListener('mousemove', (e) => {
    const tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.left = (e.pageX + 15) + 'px';
        tooltip.style.top = (e.pageY + 15) + 'px';
    }
});

function triggerDeathParticles(x, y, color = "#ef4444") {
    const grid = document.getElementById('grid');
    const rect = grid.getBoundingClientRect();
    const centerX = rect.left + 4 + (x * 52) + 25;
    const centerY = rect.top + 4 + (y * 52) + 25;

    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.backgroundColor = color;
        
        // Random trajectory
        const tx = (Math.random() - 0.5) * 100 + "px";
        const ty = (Math.random() - 0.5) * 100 + "px";
        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);
        
        p.style.left = centerX + "px";
        p.style.top = centerY + "px";
        p.style.position = 'fixed';
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

function regenerateDungeon() {
    console.log("Starting Full Dungeon Generation...");
    // Generate Floor 1
    generateFloor(1);
    // Generate Floor 2
    generateFloor(2);
    console.log("Dungeon Generation Complete.");
}

function generateFloor(floor) {
    // Standard Enemy Tiers
    const tiers = {
        low: ['melee', 'leech', 'slime', 'ranged'], 
        mid: ['melee', 'leech', 'slime', 'ranged', 'fast', 'guard', 'sentinel', 'wraith', 'welder'], 
        high: ['melee', 'leech', 'slime', 'ranged', 'fast', 'guard', 'sentinel', 'wraith', 'welder', 'golem', 'mage', 'yeti', 'bat'],
        boss: ['mud_monster', 'tangler', 'shaker', 'king', 'summoner', 'hydra', 'gear'] 
    };

    const floorDifficulty = (floor - 1) * 4; 

    // 1. DETECT MAX ROOMS
    let maxRooms = 0;
    for(let k = 1; k <= 50; k++) {
        if (LEVELS[`${floor}-${k}D`]) maxRooms = k;
    }
    if (maxRooms === 0) maxRooms = 16; 

    console.log(`Generating Floor ${floor} with ${maxRooms} rooms.`);

    for (let i = 1; i <= maxRooms; i++) {
        const levelId = `${floor}-${i}D`; 
        
        // If the level doesn't exist, create a shell
        if (!LEVELS[levelId]) {
            LEVELS[levelId] = {
                name: `Floor ${floor} - Room ${i}`,
                portals: [] 
            };
            if (i < maxRooms) LEVELS[levelId].portals.push({ pos: "I5", targetLevel: `${floor}-${i+1}D`, targetPos: "A5", type: "portal", label: ">" });
            if (i > 1) LEVELS[levelId].portals.push({ pos: "A5", targetLevel: `${floor}-${i-1}D`, targetPos: "I5", type: "portal", label: "<" });
        }

        const level = LEVELS[levelId];
        
        // 2. RESET DYNAMIC CONTENT
        level.walls = [];
        level.enemies = [];
        level.items = [];
        level.hazards = [];
        level.rivers = [];    
        level.boulders = [];  
        level.thickets = [];  
        level.spikes = [];
        level.ice = [];

        const dist = (Math.floor((i-1)/4) + (i-1)%4) + floorDifficulty; 
        
        // 3. GENERATE LAYOUT
        const layoutRoll = Math.random();
        
        for (let y = 1; y < 8; y++) {
            for (let x = 1; x < 8; x++) {
                // Keep the exact center start/end points clear
                if (x === 4 && y === 4) continue; 
                if ((x === 0 && y === 4) || (x === 8 && y === 4) || (x === 4 && y === 0) || (x === 4 && y === 8)) continue;

                const coord = `${ALPHABET[x]}${y+1}`;
                
                // --- LAYOUT 1: The River (15%) ---
                if (layoutRoll < 0.15) {
                    if (x === 3 || x === 5) level.rivers.push(coord);
                    else if (x === 4 && y % 2 !== 0) level.walls.push(coord);
                }
                
                // --- LAYOUT 2: The Checkerboard (15%) ---
                else if (layoutRoll < 0.30) {
                    if ((x + y) % 2 === 0) level.walls.push(coord);
                }

                // --- LAYOUT 3: The Donut (15%) ---
                // UPDATED: 5x5 Ring with 3x3 Hole
                else if (layoutRoll < 0.45) {
                    if (x >= 2 && x <= 6 && y >= 2 && y <= 6) {
                        if (!(x >= 3 && x <= 5 && y >= 3 && y <= 5)) {
                            level.walls.push(coord);
                        }
                    }
                }

                // --- LAYOUT 4: The Minefield (15%) ---
                else if (layoutRoll < 0.60) {
                     if (Math.random() < 0.25) level.hazards.push(coord);
                }

                // --- LAYOUT 5: The Trenches (15%) ---
                else if (layoutRoll < 0.75) {
                    if (y % 2 === 0 && x !== 4) level.walls.push(coord);
                }

                // --- LAYOUT 6: Open Arena / Scattered (25%) ---
                else {
                    if (Math.random() < 0.1) level.walls.push(coord);
                    if (Math.random() < 0.05) level.hazards.push(coord);
                    if (Math.random() < 0.05) level.boulders.push(coord);
                }
            }
        }

        // 4. SPAWN ENEMIES
        let enemyCount = 2 + Math.floor(Math.random() * 2) + Math.floor(dist * 0.5);
        
        if (layoutRoll >= 0.75) enemyCount += 1; 
        if (i === maxRooms) enemyCount = Math.max(enemyCount, 4); 

        let attempts = 0;
        while (level.enemies.length < enemyCount && attempts < 50) {
            attempts++;
            const ex = Math.floor(Math.random() * 9);
            const ey = Math.floor(Math.random() * 9);
            const ePos = `${ALPHABET[ex]}${ey+1}`;

            if (level.walls.includes(ePos) || level.hazards.includes(ePos) || level.rivers.includes(ePos) || level.boulders.includes(ePos)) continue;
            if (ex === 4 && ey === 4) continue; 
            if (i === maxRooms && ePos === "E5") continue; 

            let type = 'melee';
            let isRandomBoss = false;

            if (dist > 5 && Math.random() < 0.05) {
                type = tiers.boss[Math.floor(Math.random() * tiers.boss.length)];
                isRandomBoss = true;
                enemyCount = Math.max(1, enemyCount - 2); 
            } else {
                if (dist < 3) type = tiers.low[Math.floor(Math.random() * tiers.low.length)];
                else if (dist < 6) type = tiers.mid[Math.floor(Math.random() * tiers.mid.length)];
                else type = tiers.high[Math.floor(Math.random() * tiers.high.length)];
            }

            level.enemies.push({ pos: ePos, type: type, isBoss: isRandomBoss });
        }

        // 5. FINAL GUARDIAN
        if (i === maxRooms) {
            level.enemies.push({ pos: "E5", isBoss: true, type: "construct", hp: 60 + (floor * 20) });
            level.name = `Floor ${floor} Guardian`;
        }

        // 6. LOOT
        if (Math.random() < (0.1 + (dist * 0.05))) {
             if (!level.walls.includes("A1") && !level.rivers.includes("A1") && !level.boulders.includes("A1") && !level.enemies.some(e=>e.pos === "A1")) {
                 level.items.push({pos: "A1", type: "potion", value: 5});
             }
        }
    }
}

function gainXp(amount) {
    if (!currentLevelId.endsWith('D')) {
        return; 
    }
    
    player.xp += amount;
    if (player.xp >= player.maxXp) {
        player.xp -= player.maxXp;
        player.level++;
        
        // --- ACHIEVEMENT HOOK ---
        if (player.level >= 5 && typeof unlockAchievement === 'function') {
            unlockAchievement('level_5');
        }

        player.maxXp = Math.floor(player.maxXp * 1.5); // Harder to level up each time
        showLevelUpMenu();
    }
    updateStats();
}

function showLevelUpMenu() {
    const overlay = document.getElementById('levelup-overlay');
    const container = document.getElementById('skill-choices');
    container.innerHTML = ''; 

    const upgrades = [];
    
    // Determine Floor
    let floor = '1';
    if (currentLevelId.indexOf('-') > -1) floor = currentLevelId.split('-')[0];

    // --- FLOOR 1 UPGRADES ---
    // Now contains: Stats, Mend, Wall, and CRYSTAL BOMB
    if (floor === '1' || floor === 'W2' || floor === 'W3' || floor === 'EX' || floor === '0') {
        // Stats
        if (player.maxHp < 30) upgrades.push({ id: 'stat_hp', name: "Vitality", icon: "❤️", desc: "Max HP +5 (Cap: 30)" });
        if (player.damage < 8) upgrades.push({ id: 'stat_dmg', name: "Strength", icon: "⚔️", desc: "Damage +1 (Cap: 8)" });
        
        // Skills
        if (!player.skills.includes('heal')) upgrades.push({ id: 'skill_heal', name: "Mend (Press 1)", icon: "🩹", desc: "Heal 3 HP (Cost: 1 AP)" });
        if (!player.skills.includes('wall')) upgrades.push({ id: 'skill_wall', name: "Earth Wall (Press 4)", icon: "🧱", desc: "Spawn walls" });
        
        // MOVED FROM FLOOR 2:
        if (!player.skills.includes('bomb')) {
            upgrades.push({ 
                id: 'skill_bomb', 
                name: "Crystal Bomb (Press 6)", 
                icon: "💣", 
                desc: "Place bomb. Hit to detonate (1 AP)" 
            });
        }
    }
    
    // --- FLOOR 2 UPGRADES ---
    // Now contains: Passives, Hookshot, CLEAVE, and PHASE
    else if (floor === '2') {
        // Passives
        upgrades.push({ id: 'stat_crit', name: "Precision", icon: "🎯", desc: "+15% Crit Chance" });
        upgrades.push({ id: 'stat_dodge', name: "Reflexes", icon: "💨", desc: "+10% Dodge Chance" });
        upgrades.push({ id: 'stat_exec', name: "Executioner", icon: "☠️", desc: "+2 Dmg to low HP" });
        
        // New Active Skills
        if (!player.skills.includes('hook')) {
            upgrades.push({ 
                id: 'skill_hook', 
                name: "Hookshot (Press 5)", 
                icon: "🪝", 
                desc: "Pull enemy OR Pull self (2 AP)" 
            });
        }
        
        // MOVED FROM FLOOR 1:
        if (!player.skills.includes('cleave')) {
            upgrades.push({ 
                id: 'skill_cleave', 
                name: "Cleave (Press 2)", 
                icon: "🪓", 
                desc: "Hit adjacent + Knockback (2 AP)" 
            });
        }
        if (!player.skills.includes('dash')) {
            upgrades.push({ 
                id: 'skill_dash', 
                name: "Phase (Press 3)", 
                icon: "💨", 
                desc: "Teleport 2 tiles" 
            });
        }
    }

    // Fallback if empty
    if (upgrades.length === 0) upgrades.push({ id: 'full_heal', name: "Refresh", icon: "✨", desc: "Fully Heal HP" });

    upgrades.forEach(u => {
        const div = document.createElement('div');
        div.className = 'skill-card';
        div.innerHTML = `<span class="skill-icon">${u.icon}</span><strong>${u.name}</strong><br><small>${u.desc}</small>`;
        div.onclick = () => selectUpgrade(u.id);
        container.appendChild(div);
    });

    overlay.style.display = 'flex';
}

function selectUpgrade(id) {
    // --- STATS (Floor 1) ---
    if (id === 'stat_hp') { 
        if (player.maxHp < 30) {
            player.maxHp = Math.min(30, player.maxHp + 5); 
            player.hp += 5; 
            log("Vitality increased!"); 
        } else {
            log("Max HP is already at the limit (30).");
        }
    }
    else if (id === 'stat_dmg') { 
        if (player.damage < 8) {
            player.damage = Math.min(8, player.damage + 1); 
            log("Strength increased!"); 
        } else {
            log("Attack Strength is already at the limit (8).");
        }
    }
    else if (id === 'full_heal') {
        player.hp = player.maxHp;
        log("HP Fully Restored!");
    }

    // --- PASSIVES (Floor 2) ---
    else if (id === 'stat_crit') {
        player.critChance = (player.critChance || 0) + 0.15;
        log("Critical Hit chance increased!");
    }
    else if (id === 'stat_dodge') {
        player.dodgeChance = (player.dodgeChance || 0) + 0.10;
        log("Dodge chance increased!");
    }
    else if (id === 'stat_exec') {
        player.executioner = (player.executioner || 0) + 2;
        log("Executioner damage increased!");
    }

    // --- SKILLS (Works for both Floor 1 and Floor 2) ---
    else if (id.startsWith('skill_')) {
        const skillName = id.replace('skill_', '');
        player.skills.push(skillName);
        log(`Learned ${skillName.toUpperCase()}!`);
    }

    document.getElementById('levelup-overlay').style.display = 'none';
    updateStats();
    saveGame();
}

function tickCooldowns() {
    const isDungeon = currentLevelId.endsWith('D');
    const hasEnemies = enemies.some(e => e.alive);

    // If in dungeon room with no enemies, pause cooldowns
    if (isDungeon && !hasEnemies) return; 

    if (player.cooldowns.heal > 0) player.cooldowns.heal--;
    if (player.cooldowns.cleave > 0) player.cooldowns.cleave--;
    if (player.cooldowns.dash > 0) player.cooldowns.dash--;
    if (player.cooldowns.wall > 0) player.cooldowns.wall--;
    // New
    if (player.cooldowns.hook > 0) player.cooldowns.hook--;
    if (player.cooldowns.bomb > 0) player.cooldowns.bomb--;
}

function castSkill(name) {
    if (!player.skills) player.skills = []; 
    if (!player.cooldowns) player.cooldowns = { heal:0, cleave:0, dash:0, wall:0, hook:0, bomb:0 };
    if (!player.facing) player.facing = { x: 0, y: 1 }; 

    if (!player.skills.includes(name)) { log("You haven't learned that skill!"); return; }
    if (player.cooldowns[name] > 0) { log("Skill is on cooldown!"); return; }
    if (playerActionsLeft <= 0 && name !== 'dash') { log("Not enough actions!"); return; }

    let actionUsed = false;

    // ... (Keep existing skills: heal, cleave, dash, wall) ...
    if (name === 'heal') {
        player.hp = Math.min(player.hp + 3, player.maxHp);
        triggerHeal(player.x, player.y, 3);
        player.cooldowns.heal = 3; playerActionsLeft -= 1; actionUsed = true;
        log("Used Mend: +3 HP");
    }
    if (name === 'cleave') {
        if (playerActionsLeft < 2) { log("Cleave requires 2 Actions!"); return; }
        log("Used Cleave!");
        const adj = [{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}];
        adj.forEach(offset => {
            const tx = player.x + offset.x; const ty = player.y + offset.y;
            triggerAttackAnim(tx, ty, 'anim-slash');
            const enemy = enemies.find(e => e.x === tx && e.y === ty && e.alive);
            if (enemy) {
                enemy.hp -= player.damage;
                triggerDamage(enemy.x, enemy.y, player.damage, false);
                if (enemy.hp > 0 && !enemy.isBoss) {
                    const kbX = enemy.x + offset.x; const kbY = enemy.y + offset.y;
                    if (kbX >= 0 && kbX < 9 && kbY >= 0 && kbY < 9 && !isWall(kbX, kbY) && !isBoulder(kbX, kbY) && !enemies.some(e => e.alive && e.x === kbX && e.y === kbY)) {
                        enemy.x = kbX; enemy.y = kbY; triggerAttackAnim(kbX, kbY, 'anim-shockwave');
                    }
                }
                if (enemy.hp <= 0) { enemy.alive = false; gainXp(30); }
            }
        });
        player.cooldowns.cleave = 5; playerActionsLeft -= 2; actionUsed = true;
    }
    if (name === 'dash') {
        const dir = player.facing;
        let targetX = player.x + (dir.x * 2); let targetY = player.y + (dir.y * 2);
        if (targetX < 0 || targetX >= 9 || targetY < 0 || targetY >= 9 || isWall(targetX, targetY) || isBoulder(targetX, targetY)) {
            targetX = player.x + dir.x; targetY = player.y + dir.y;
            if (isWall(targetX, targetY) || isBoulder(targetX, targetY)) { log("Path blocked!"); return; }
        }
        triggerAttackAnim(player.x, player.y, 'anim-shockwave');
        player.x = targetX; player.y = targetY;
        triggerAttackAnim(player.x, player.y, 'anim-web');
        log("Phased forward!");
        player.cooldowns.dash = 5; actionUsed = true;
    }
    if (name === 'wall') {
        if (player.summonedWalls && player.summonedWalls.length > 0) {
            tempWalls = tempWalls.filter(w => !player.summonedWalls.some(sw => sw.x === w.x && sw.y === w.y));
            player.summonedWalls = [];
        }
        const dir = player.facing;
        const centerX = player.x + (dir.x * 2); const centerY = player.y + (dir.y * 2);
        const perpX = dir.y; const perpY = dir.x;
        const spots = [ { x: centerX, y: centerY }, { x: centerX + perpX, y: centerY + perpY }, { x: centerX - perpX, y: centerY - perpY } ];
        let spawnedCount = 0;
        spots.forEach(pos => {
            if (pos.x >= 0 && pos.x < 9 && pos.y >= 0 && pos.y < 9) {
                const blocked = isWall(pos.x, pos.y) || enemies.some(e => e.alive && e.x === pos.x && e.y === pos.y) || (player.x === pos.x && player.y === pos.y);
                if (!blocked) {
                    const newWall = { x: pos.x, y: pos.y };
                    tempWalls.push(newWall);
                    if (!player.summonedWalls) player.summonedWalls = [];
                    player.summonedWalls.push(newWall);
                    triggerAttackAnim(pos.x, pos.y, 'anim-slash'); spawnedCount++;
                }
            }
        });
        if (spawnedCount === 0) log("No space to spawn walls!");
        player.cooldowns.wall = 0; playerActionsLeft -= 1; actionUsed = true;
    }

    // --- NEW: HOOKSHOT (Key 5) ---
    if (name === 'hook') {
        if (playerActionsLeft < 2) { log("Hookshot requires 2 Actions!"); return; }
        
        const dir = player.facing;
        let hit = null;
        let hitType = null; // 'wall', 'enemy'
        
        // Raycast 5 tiles forward
        for(let i=1; i<=5; i++) {
            const tx = player.x + (dir.x * i);
            const ty = player.y + (dir.y * i);
            
            if (tx < 0 || tx >= 9 || ty < 0 || ty >= 9) break; // Out of bounds

            const enemy = enemies.find(e => e.alive && e.x === tx && e.y === ty);
            if (enemy) { hit = enemy; hitType = 'enemy'; break; }
            
            if (isWall(tx, ty) || isBoulder(tx, ty)) { hit = {x:tx, y:ty}; hitType = 'wall'; break; }
        }

        if (hitType === 'enemy') {
            // Pull Enemy TO Player
            const pullX = player.x + dir.x;
            const pullY = player.y + dir.y;
            if (!isWall(pullX, pullY) && !enemies.some(e=>e.alive && e.x === pullX && e.y === pullY)) {
                triggerAttackAnim(player.x, player.y, 'anim-web'); // Effect at start
                hit.x = pullX; hit.y = pullY;
                triggerAttackAnim(hit.x, hit.y, 'anim-scratch'); // Effect at end
                log("Get over here!");
                player.cooldowns.hook = 4;
                playerActionsLeft -= 2;
                actionUsed = true;
            } else {
                log("No space to pull enemy!");
            }
        } 
        else if (hitType === 'wall') {
            // Pull Player TO Wall
            const pullX = hit.x - dir.x;
            const pullY = hit.y - dir.y;
            if (!enemies.some(e=>e.alive && e.x === pullX && e.y === pullY)) {
                triggerAttackAnim(player.x, player.y, 'anim-web');
                player.x = pullX; player.y = pullY;
                triggerAttackAnim(player.x, player.y, 'anim-shockwave');
                log("Zip!");
                player.cooldowns.hook = 4;
                playerActionsLeft -= 2;
                actionUsed = true;
            } else {
                log("Destination blocked!");
            }
        } else {
            log("Nothing to hook onto!");
        }
    }

    // --- NEW: CRYSTAL BOMB (Key 6) ---
    if (name === 'bomb') {
        const dir = player.facing;
        const tx = player.x + dir.x;
        const ty = player.y + dir.y;
        
        // Check bounds
        if (tx < 0 || tx >= 9 || ty < 0 || ty >= 9) { log("Cannot place there."); return; }
        
        // Check obstruction
        if (isWall(tx, ty) || isBoulder(tx, ty) || enemies.some(e => e.alive && e.x === tx && e.y === ty) || crystals.some(c => c.x === tx && c.y === ty)) {
            log("Space is occupied!");
            return;
        }
        
        // Place Crystal
        crystals.push({ x: tx, y: ty, ignited: false, id: Date.now() }); // Unique ID based on time
        triggerAttackAnim(tx, ty, 'anim-web');
        log("Crystal Placed! Hit it to Detonate.");
        
        player.cooldowns.bomb = 5;
        playerActionsLeft -= 1;
        actionUsed = true;
    }

    if (actionUsed) {
        updateStats();
        saveGame();
        if (name !== 'dash') consumeAction();
        else drawGrid(); 
    }
}

function resetRPGStats() {
    player.level = 1;
    player.xp = 0;
    player.maxXp = 100;
    
    player.skills = []; 
    // Add new cooldowns here
    player.cooldowns = { heal: 0, cleave: 0, dash: 0, wall: 0, hook: 0, bomb: 0 }; 
    player.summonedWalls = []; 
    
    player.damage = 2;   
    player.maxHp = 15;   
    
    player.critChance = 0;
    player.dodgeChance = 0;
    player.executioner = 0;

    updateStats();
}

function isDungeonFloorClear(floorNum) {
    // Check up to 50 rooms to cover large floors like Floor 2
    for (let i = 1; i <= 50; i++) {
        const checkId = `${floorNum}-${i}D`; // Dynamically check "1-..." or "2-..."
        const room = LEVELS[checkId];
        
        // If the room exists in the game data...
        if (room && room.enemies) {
            // If any enemy in that room is NOT dead, the floor is incomplete
            if (room.enemies.some(e => !e.isDead)) {
                return false;
            }
        }
    }
    return true;
}

function mapLevelLayout(floorNum) {
    const startId = `${floorNum}-1D`;
    if (!LEVELS[startId]) return null;

    const coords = {};      // Map: roomId -> {x, y}
    const grid = {};        // Map: "x,y" -> roomId (For collision checks)
    const queue = [];       
    
    // Start at (0,0)
    coords[startId] = { x: 0, y: 0 };
    grid["0,0"] = startId;
    queue.push(startId);

    let minX = 0, minY = 0;

    while (queue.length > 0) {
        const currentId = queue.shift();
        const currentPos = coords[currentId];
        const levelData = LEVELS[currentId];

        if (!levelData || !levelData.portals) continue;

        levelData.portals.forEach(p => {
            const targetId = p.targetLevel;
            // Only map current floor dungeon rooms
            if (!targetId || !targetId.startsWith(`${floorNum}-`) || !targetId.endsWith('D')) return;
            
            // Skip if already mapped
            if (coords[targetId]) return;

            // Calculate ideal position
            let dx = 0, dy = 0;
            if (p.label === '>') dx = 1;
            else if (p.label === '<') dx = -1;
            else if (p.label === 'v') dy = 1;
            else if (p.label === '^') dy = -1;
            else return;

            let targetX = currentPos.x + dx;
            let targetY = currentPos.y + dy;
            let posKey = `${targetX},${targetY}`;

            // --- COLLISION FIX ---
            // If this spot is taken by a DIFFERENT room, find a nearby empty spot
            if (grid[posKey] && grid[posKey] !== targetId) {
                // Try shifting slightly to find free space
                // (Priority: check orthogonal neighbors of the ideal spot)
                const offsets = [
                    {x:0, y:0}, // Should fail, but logic consistency
                    {x:dx, y:dy}, // Push further out in same direction
                    {x:dy, y:dx}, // Shift side 1
                    {x:-dy, y:-dx} // Shift side 2
                ];
                
                let foundSpot = false;
                for(let o of offsets) {
                    const tryX = targetX + o.x;
                    const tryY = targetY + o.y;
                    const tryKey = `${tryX},${tryY}`;
                    if (!grid[tryKey]) {
                        targetX = tryX;
                        targetY = tryY;
                        foundSpot = true;
                        break;
                    }
                }
            }
            
            // Register new position
            coords[targetId] = { x: targetX, y: targetY };
            grid[`${targetX},${targetY}`] = targetId;
            
            minX = Math.min(minX, targetX);
            minY = Math.min(minY, targetY);
            queue.push(targetId);
        });
    }

    // Normalize coordinates for CSS Grid
    const normalized = {};
    Object.keys(coords).forEach(id => {
        normalized[id] = {
            col: coords[id].x - minX + 1,
            row: coords[id].y - minY + 1
        };
    });

    return normalized;
}

function updateMinimap() {
    const gridEl = document.getElementById('minimap-grid');
    if (!gridEl) return;
    
    // Only show map for Dungeon Levels
    if (!currentLevelId.endsWith('D')) {
        gridEl.innerHTML = '';
        return; 
    }

    gridEl.innerHTML = ''; 

    // 1. Get current floor number
    const currentFloor = currentLevelId.split('-')[0];

    // 2. Calculate the layout
    const layout = mapLevelLayout(currentFloor);
    if (!layout) return;

    // 3. Render the rooms using exact grid coordinates
    Object.keys(layout).forEach(roomId => {
        const pos = layout[roomId];
        const roomData = LEVELS[roomId];
        
        const roomDiv = document.createElement('div');
        roomDiv.className = 'map-room';

        // Apply dynamic grid positioning
        roomDiv.style.gridColumn = pos.col;
        roomDiv.style.gridRow = pos.row;

        if (roomData) {
            const isCleared = roomData.enemies && !roomData.enemies.some(e => !e.isDead);
            if (isCleared) roomDiv.classList.add('cleared');
        }

        if (currentLevelId === roomId) {
            roomDiv.classList.add('current');
        }

        gridEl.appendChild(roomDiv);
    });
}

function toggleMap() {
    // 1. BLOCK: If we are NOT in a dungeon level, stop immediately.
    if (!currentLevelId.endsWith('D')) {
        return; 
    }

    const map = document.getElementById('map-overlay');
    if (!map) return;
    
    if (map.style.display === 'none') {
        map.style.display = 'block';
        updateMinimap(); 
        
        // Reset animation to make it pop every time
        map.style.animation = 'none';
        map.offsetHeight; /* Trigger reflow */
        map.style.animation = 'mapPopIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    } else {
        map.style.display = 'none';
    }
}

function initProfileMenu() {
    const list = document.getElementById('profile-list');
    list.innerHTML = ''; // Clear list

    // Create 3 Save Slots
    for (let i = 1; i <= 3; i++) {
        const slotKey = `rpgSave_${i}`;
        const savedData = localStorage.getItem(slotKey);
        
        const card = document.createElement('div');
        card.className = 'profile-card';
        
        let content = `<h4>Slot ${i}</h4>`;
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                const lvl = data.player ? data.player.level : 1;
                const mapName = LEVELS[data.currentLevelId] ? LEVELS[data.currentLevelId].name : "Unknown";
                content += `<div class="profile-info">Level ${lvl}<br>${mapName}</div>`;
            } catch(e) {
                content += `<div class="profile-empty">Corrupted</div>`;
            }
        } else {
            content += `<div class="profile-empty">Empty<br>(New Game)</div>`;
        }

        card.innerHTML = content;
        
        card.onclick = () => {
            currentSaveSlot = slotKey;
            document.getElementById('profile-overlay').style.display = 'none';
            initGame(); // START THE GAME
        };

        list.appendChild(card);
    }
}

function showAchievements() {
    const overlay = document.getElementById('achievements-overlay');
    const list = document.getElementById('achievements-list');
    
    if (!overlay || !list) return;

    list.innerHTML = ''; // Clear previous

    // Loop through all defined achievements
    Object.keys(ACHIEVEMENTS).forEach(key => {
        const data = ACHIEVEMENTS[key];
        const isUnlocked = unlockedAchievements.includes(key);

        const card = document.createElement('div');
        card.className = `ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        // If locked, maybe hide the description? 
        // For now, we show the name but use "???" for description if you want it secret.
        // Or just show everything so players know what to do.
        const name = data.name; 
        const desc = isUnlocked ? data.desc : "Locked"; 
        const icon = data.icon;

        card.innerHTML = `
            <div class="ach-icon">${icon}</div>
            <div class="ach-info">
                <h4 style="color: ${isUnlocked ? '#fbbf24' : '#888'}">${name}</h4>
                <p>${desc}</p>
            </div>
        `;

        list.appendChild(card);
    });

    overlay.style.display = 'block';
}

function closeAchievements() {
    const overlay = document.getElementById('achievements-overlay');
    if (overlay) overlay.style.display = 'none';
}

// Don't start game immediately. Show menu first.
initProfileMenu();
