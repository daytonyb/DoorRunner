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
    },

    'Story2-Select': {
        name: "Chapter 2 - The Journey Continues",
        walls: ["D1","F1","E2"], 
        portals: [
            { pos: "E1", targetLevel: '21', targetPos: "A1", type: "portal", label: "?" },
            { pos: "E9", targetLevel: '0', targetPos: "E6", type: "door" },
            { pos: "A5", targetLevel: 'Story-Select', targetPos: "E5", type: "portal", label: "<" } // Back to Chapter 1 Hub
        ],
        fullHeal: true,
        enemies: [], 
        items: []
    },

        '21': { 
        name: "Section 1: More Obstacles", 
        walls: ["C3","G3","C7","G7","E2","B5","H5","E8"], 
        hazards: [],
        speaker: "Mysterious Voice",
        text: [
            "You have shown your strength...",
            "I have decided to help guide you on your quest.",
            "Lets see how you fare against some more difficult enemies..."
        ],
        enemies: [
            {pos: "E5", type: "golem"}, {pos: "D5", type: "mage"}, {pos: "F5", type: "mage"}, {pos: "E4"}, {pos: "E6", type: "ranged"}
        ],
        portals: [ 
            { pos: "I9", targetLevel: '22', targetPos: "A1", type: "door" } 
        ] 
    },
    '22': { 
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
            { pos: "E9", targetLevel: '23', targetPos: "A1", type: "door" } 
        ] 
    },
    '23': { 
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
            { pos: "I9", targetLevel: '24', targetPos: "E9", type: "door" } 
        ] 
    },
    '24': { 
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
            { pos: "E9", targetLevel: 'Story2-Select', targetPos: "E6", type: "door" } 
        ] 
    },








        '0D': { 
        name: "Dungeon Floor Selection", 
        walls: [], 
        hazards: [],
        enemies: [
        ],
        portals: [ 
            { pos: "E9", targetLevel: '0', targetPos: "E6", type: "door" } ,
            { pos: "A1", targetLevel: '1-1D', targetPos: "A1", type: "portal", label: "1"},
        ] 
    },
    
    '1-CD':{
        name: "Floor 1 Complete",
        speaker: "Dungeon Master",
                walls: [], 
        hazards: [],
        text: [
            "Congratulations, hero!",
            "This is just the beginning of your adventure!",
            "You have two choices in front of you... be boring and go back to the main menu...",
            "Or... continue down this epic path to fame and venture deeper into the dungeon!",
            "Good luck making a choice... this is only the beginning of your pain and suffering..."
        ],
        portals: [
            { pos: "A1", targetLevel: '0D', targetPos: "E6", type: "portal", label: "D" },
            { pos: "I1", targetLevel: '2-1D', targetPos: "A1", type: "portal", label: "2" }
        ],
    },
    '1-1D': { 
        name: "Room 1", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-5D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-2D', targetPos: "A5", type: "portal", label: ">"},
        ]
    },
        '1-2D': { 
        name: "Room 2", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-6D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-3D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '1-1D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-3D': { 
        name: "Room 3", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-7D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-4D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '1-2D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-4D': { 
        name: "Room 4", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-8D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "A5", targetLevel: '1-3D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-5D': { 
        name: "Room 5", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-9D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-6D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-1D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '1-6D': { 
        name: "Room 6", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-10D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-7D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-2D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-5D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-7D': { 
        name: "Room 7", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-11D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-8D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-3D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-6D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-8D': { 
        name: "Room 8", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-12D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '1-4D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-7D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-9D': { 
        name: "Room 9", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-13D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-10D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-5D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '1-10D': { 
        name: "Room 10", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-14D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-11D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-6D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-9D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-11D': { 
        name: "Room 11", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-15D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '1-12D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-7D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-10D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-12D': { 
        name: "Room 12", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '1-16D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '1-8D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-11D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-13D': { 
        name: "Room 13", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '1-14D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-9D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '1-14D': { 
        name: "Room 14", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '1-15D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-10D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-13D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-15D': { 
        name: "Room 15", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '1-16D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '1-11D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-14D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '1-16D': { 
        name: "Room 16", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E1", targetLevel: '1-12D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '1-15D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "I9", targetLevel: '1-CD', targetPos: "E6", type: "door", label: "C"}
        ]
    },

        '2-CD':{
        name: "Floor 2 Complete",
        speaker: "Dungeon Master",
                walls: [], 
        hazards: [],
        text: [
            "Congratulations, hero!",
            "You have completed the first dungeon!",
            "Unfortunately, the second dungeon is not yet in the game, but it will be coming in the future!",
            "Congratulations on making it this far, and have fun adventuring!",
        ],
        portals: [
            { pos: "E1", targetLevel: '0D', targetPos: "E6", type: "door", label: "D" },
        ],
    },
    '2-1D': { 
        name: "Room 1", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-5D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-2D', targetPos: "A5", type: "portal", label: ">"},
        ]
    },
        '2-2D': { 
        name: "Room 2", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-6D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-3D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '2-1D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-3D': { 
        name: "Room 3", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-7D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-4D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '2-2D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "E1", targetLevel: '2-17D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-4D': { 
        name: "Room 4", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-8D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "A5", targetLevel: '2-3D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-5D': { 
        name: "Room 5", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-9D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-6D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-1D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-6D': { 
        name: "Room 6", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-10D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-7D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-2D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-5D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-7D': { 
        name: "Room 7", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-11D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-8D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-3D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-6D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-8D': { 
        name: "Room 8", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-12D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '2-4D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-7D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "I5", targetLevel: '2-19D', targetPos: "A5", type: "portal", label: ">"},

        ]
    },
        '2-9D': { 
        name: "Room 9", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-13D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-10D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-5D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-18D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-10D': { 
        name: "Room 10", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-14D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-11D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-6D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-9D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-11D': { 
        name: "Room 11", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-15D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-12D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-7D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-10D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-12D': { 
        name: "Room 12", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-16D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '2-8D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-11D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "I5", targetLevel: '2-20D', targetPos: "A5", type: "portal", label: ">"},
        ]
    },
        '2-13D': { 
        name: "Room 13", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-14D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-9D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-14D': { 
        name: "Room 14", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-15D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-10D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-13D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "E9", targetLevel: '2-22D', targetPos: "E1", type: "portal", label: "v" },
        ]
    },
        '2-15D': { 
        name: "Room 15", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-16D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-11D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-14D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "E9", targetLevel: '2-23D', targetPos: "E1", type: "portal", label: "v" } ,
        ]
    },
        '2-16D': { 
        name: "Room 16", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E1", targetLevel: '2-12D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-15D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "E9", targetLevel: '2-24D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-21D', targetPos: "A5", type: "portal", label: ">"},
        ]
    },
        '2-17D': { 
        name: "Room 17", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-3D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '2-27D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-18D': { 
        name: "Room 18", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-9D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '2-26D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-19D': { 
        name: "Room 19", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-20D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "A5", targetLevel: '2-8D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-20D': { 
        name: "Room 20", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-21D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-26D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-19D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-12D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-21D': { 
        name: "Room 21", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-25D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '2-20D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-16D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-22D': { 
        name: "Room 22", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-23D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-14D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-23D': { 
        name: "Room 23", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-27D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-24D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-15D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-22D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-24D': { 
        name: "Room 24", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-25D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-16D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-23D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-25D': { 
        name: "Room 25", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-29D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "I5", targetLevel: '2-28D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-21D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-24D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-26D': { 
        name: "Room 26", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-18D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "A5", targetLevel: '2-20D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-27D': { 
        name: "Room 27", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-17D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "E1", targetLevel: '2-23D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-28D': { 
        name: "Room 28", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E9", targetLevel: '2-30D', targetPos: "E1", type: "portal", label: "v" } ,
            { pos: "A5", targetLevel: '2-25D', targetPos: "I5", type: "portal", label: "<"},
        ]
    },
        '2-29D': { 
        name: "Room 29", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "I5", targetLevel: '2-30D', targetPos: "A5", type: "portal", label: ">"},
            { pos: "E1", targetLevel: '2-25D', targetPos: "E9", type: "portal", label: "^"},
        ]
    },
        '2-30D': { 
        name: "Room 30", 
        walls: [],
        hazards: [],
        enemies: [],
        portals: [
            { pos: "E1", targetLevel: '2-28D', targetPos: "E9", type: "portal", label: "^"},
            { pos: "A5", targetLevel: '2-29D', targetPos: "I5", type: "portal", label: "<"},
            { pos: "I9", targetLevel: '2-CD', targetPos: "E6", type: "door", label: "C"}
        ]
    },
}
