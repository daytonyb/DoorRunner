// achievements.js

const ACHIEVEMENTS = {
    // --- BASIC ---
    'first_kill': { name: "First Blood", desc: "Defeat your first enemy.", icon: "💀" },
    'level_5': { name: "Growing Power", desc: "Reach Player Level 5.", icon: "✨" },
    'boss_slayer': { name: "Giant Slayer", desc: "Defeat any World Boss.", icon: "🏆" },
    'explorer': { name: "Cartographer", desc: "Visit 10 different rooms in one session.", icon: "🗺️" },
    'close_call': { name: "Not Today", desc: "Survive a turn with only 1 HP.", icon: "❤️" },
    'custom_maker': { name: "Architect", desc: "Load a custom level code.", icon: "🛠️" },
    
    // --- COLLECTION ---
    'relic_hunter': { name: "Relic Hunter", desc: "Possess 2 or more Relics.", icon: "💎" },
    'arsenal': { name: "Full Arsenal", desc: "Unlock 5 different skills.", icon: "⚔️" },
    'archmage': { name: "Archmage", desc: "Learn 4 different spells.", icon: "📜" },

    // --- SKILL & COMBAT ---
    'heavy_hitter': { name: "Heavy Hitter", desc: "Deal 10+ damage in a single hit.", icon: "💪" },
    'overkill': { name: "Overkill", desc: "Deal 15+ damage in a single hit.", icon: "👹" },
    'lucky': { name: "Feeling Lucky", desc: "Land a Critical Hit.", icon: "🍀" },
    'ice_cold': { name: "Ice Cold", desc: "Freeze an enemy with the Glacial Gem.", icon: "❄️" },
    'demolitionist': { name: "Demolitionist", desc: "Destroy a boulder.", icon: "💥" },
    'mad_bomber': { name: "Mad Bomber", desc: "Ignite a volatile Crystal.", icon: "💣" },
    'flawless': { name: "Flawless Victory", desc: "Clear a level with 100% Health remaining.", icon: "✨" },
    'clean_sweep': { name: "Clean Sweep", desc: "Defeat all enemies in a level.", icon: "🧹" },
    'exterminator': { name: "Exterminator", desc: "Kill 10 enemies in a single level.", icon: "☠️" },

    // --- PROGRESSION ---
    'tutorial_complete': { name: "Graduate", desc: "Complete the Tutorial.", icon: "🎓" },
    'world_1_5': { name: "Apprentice", desc: "Beat World 1-5.", icon: "🌟" },
    'dungeon_crawler': { name: "Deep Diver", desc: "Reach Dungeon Floor 2 (2-CD).", icon: "🗝️" },
    'veteran': { name: "Veteran", desc: "Reach Player Level 10.", icon: "🎖️" },
    'master_wizard': { name: "Master Wizard", desc: "Reach Player Level 15.", icon: "🧙‍♂️" },
    'legend': { name: "Legend", desc: "Reach Player Level 20.", icon: "👑" },
    'tank': { name: "Tank", desc: "Have 30+ Max HP.", icon: "🛡️" },
    'first_death': { name: "You Died", desc: "Die for the first time.", icon: "💀" },

    // --- NEW ACHIEVEMENTS ---
    'ex_conqueror': { name: "EX Conqueror", desc: "Beat any EX Level Boss.", icon: "⚔️" },
    'untouchable': { name: "Untouchable", desc: "Defeat a boss without taking damage.", icon: "🛡️" },

    // --- SCORING & ENDLESS ---
    'high_roller': { name: "High Roller", desc: "Score 1000 points in a single level.", icon: "💰" },
    'score_king': { name: "Score King", desc: "Amass 5000 points total.", icon: "👑" },
    'abyss_walker': { name: "Abyss Walker", desc: "Reach Depth 5 in Endless Mode.", icon: "🌀" },
    'void_lord': { name: "Void Lord", desc: "Reach Depth 10 in Endless Mode.", icon: "🌌" }
};

let unlockedAchievements = [];
let roomsVisited = new Set();

function unlockAchievement(id) {
    // --- TUTORIAL RESTRICTION ---
    if (typeof currentLevelId !== 'undefined' && String(currentLevelId).startsWith('Tutorial')) {
        if (id !== 'first_death' && id !== 'tutorial_complete') {
            return; 
        }
    }

    if (unlockedAchievements.includes(id)) return;

    unlockedAchievements.push(id);
    showAchievementToast(id);
}

function showAchievementToast(id) {
    const data = ACHIEVEMENTS[id];
    if (!data) return; 

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <div style="font-size: 24px;">${data.icon}</div>
        <div>
            <div style="color: #fbbf24; font-weight: bold; font-size: 14px;">Achievement Unlocked!</div>
            <div style="color: #fff; font-size: 12px;">${data.name}</div>
            <div style="color: #aaa; font-size: 10px;">${data.desc}</div>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function showAchievements() {
    const overlay = document.getElementById('achievements-overlay');
    const list = document.getElementById('achievements-list');
    
    if (!overlay || !list) return;

    list.innerHTML = ''; 

    Object.keys(ACHIEVEMENTS).forEach(key => {
        const data = ACHIEVEMENTS[key];
        const isUnlocked = unlockedAchievements.includes(key);

        const card = document.createElement('div');
        card.className = `ach-card ${isUnlocked ? 'unlocked' : 'locked'}`;

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

function trackDiscovery(levelId) {
    roomsVisited.add(levelId);
    if (roomsVisited.size >= 10) unlockAchievement('explorer');
}