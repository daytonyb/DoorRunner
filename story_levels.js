// --- STORY MODE LEVELS ---
// This file is separate from rpg.js but uses the exact same format.

const STORY_CAMPAIGN = {
    // A separate Hub for Story Mode
    'Story-Select': {
        name: "Chapter 1 - The Quest Begins",
        walls: [], 
        portals: [
            { pos: "E1", targetLevel: '11', targetPos: "A1", type: "portal", label: "?" },
            { pos: "E9", targetLevel: '0', targetPos: "E6", type: "door" } // Back to Main Menu
        ],
        fullHeal: true,
        enemies: [], 
        items: []
    },

    // First Story Level
    '11': { 
        name: "Section 1: Basic Enemies", 
        walls: ["C3","G3","C7","G7","E2","B5","H5","E8"], 
        hazards: ["A9","I1","G1","I3","A7","C9","A5","E9","E1","I5"],
        speaker: "Mysterious Voice",
        text: [
            "Welcome, hero. The world has fallen into disarray.",
            "It's up to you to restore balance and peace.",
            "Lets see how you fare against some basic enemies..."
        ],
        enemies: [
            {pos: "E5"}, {pos: "D5"}, {pos: "F5"}, {pos: "E4"}, {pos: "E6"}
        ],
        portals: [ 
            { pos: "I9", targetLevel: '12', targetPos: "A1", type: "door" } 
        ] 
    },
    '12': { 
        name: "Section 2: Ranged Attackers", 
        walls: ["B2", "H2", "B8", "H8","E3","C5","G5","E7"], 
        hazards: ["E5","D4","E4","F4","D5","F5","D6","E6","F6"],
                speaker: "Mysterious Voice",
        text: [
            "So I assume you're dedicated to this quest?",
            "Be warned, the levels will only get harder from here, with more dangerous obstacles blocking your path.",
            "As you may already know, some enemies can attack from multiple squares away... I would be careful around them."
        ],
        enemies: [
            { pos: "B5", type: "ranged" },{ pos: "H5", type: "ranged" },{pos: "E2", type: "ranged" },{pos: "E8", type: "ranged" }
        ],
        portals: [ 
            { pos: "E9", targetLevel: '13', targetPos: "A1", type: "door" } 
        ] 
    },
    '13': { 
        name: "Section 3: Faster Enemies", 
        walls: ["E3","C5","G5","E7","E2","B5","H5","E8"], 
        hazards: ["E5","A9","I1","G1","I3","A7","C9","A5","E9","E1","I5"],
        speaker: "Mysterious Voice",
        text: [
            "Well done adventurer... but your quest is still far from over.",
            "I've heard rumors of a new enemy... one that can match your speed.",
            "Watch out, as these foes are quick and can almost always get a hit in..."
        ],
        enemies: [
            { pos: "B5", type: "fast" },{ pos: "H5", type: "fast" },{pos: "E2", type: "fast" },{pos: "E8", type: "fast" }
        ],
        items: [
            { pos: "H8", type: "potion", value: 5 }
        ],
        portals: [ 
            { pos: "I9", targetLevel: '14', targetPos: "E9", type: "door" } 
        ] 
    },
    '14': { 
        name: "Boss Level: The Gang", 
        walls: ["A1","B1","A2","H1","I1","I2","A8","A9","B9","H9","I8","I9"], 
        hazards: ["C1","D1","E1","F1","G1","I3","I4","I5","I6","I7","A3","A4","A5","A6","A7"],
                speaker: "Mysterious Voice",
        text: [
            "Prepare yourself for a bigger test...",
            "No longer will you face one type of enemy at a time.",
            "This is but a taste of what is to come..."
        ],
        enemies: [
            { pos: "E5", isBoss: true }, { pos: "D5", type: "ranged" }, { pos: "F5", type: "ranged" }, {pos: "E4"}, {pos: "E6"}
        ],
        portals: [ 
            { pos: "E9", targetLevel: 'Story-Select', targetPos: "E6", type: "door" } 
        ] 
    }
};