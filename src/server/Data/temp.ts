// Data interfaces

interface GuildData {
    GuildName: string;
    GuildID: number;
}

interface XP_Threshold {
    Min: number;
    Max: number;
}

interface ProgressionData {
    Level: number;
    XP: number;
    XP_Threshold: XP_Threshold;
    Achievements: string[];
    ActiveQuests: string[]
    QuestsCompleted: string[];
}

interface Currency {
    Gold: number;
    Gems: number;
}

interface Inventory {
    Items: string[] | object;
    Currency: Currency;
}

interface Stats {
    Health: number;
    MaxHealth: number;
    Mana: number;
    MaxMana: number;
    Stamina: number;
    MaxStamina: number;
    Strength: number;
    Agility: number;
    Dexterity: number;
    Intelligence: number;
    Insanity: number;
    Charisma: number;
    Sanity: number;
    Awareness: number;
}

interface CharacterData {
    Character: Model | undefined;
    Stats: Map<string, number>
    InCombat: boolean
    IsKnocked: boolean
    Lives: number
    Race: string
    Age: number
    Location: string;
    CharacterCF: object;
    BattleOutcomes: {[key: string]: string};
    UniqueAbilities: string[]
    CatalystAbilities: string[]
}

interface CurrentSessionData {
    TimePlayed: number;
    LastCF: object;
}

interface PlayerProfile {
    AccountAge: number
    OwnedPasses: string[]
    BanHistory: object
    TotalTimePlayed: number;
    // LastLogin: string;
    GuildData: GuildData;
    
}

export interface template {
    PlayerProfile: PlayerProfile;
    ProgressionData: ProgressionData;
    Inventory: Inventory;
    CharacterData: CharacterData;
    CurrentSessionData: CurrentSessionData;
}

export interface mockTemplate {
    PlayerProfile: PlayerProfile;
    ProgressionData: ProgressionData;
    Inventory: Inventory;
    CharacterData: CharacterData;
    CurrentSessionData: CurrentSessionData;  
}
/* 
NOTE: ALL THE NUMBER VALUES ARE PLACE HOLDER FOR NOW AS THEY ARE NOT IMPORTANT FOR CURRENT STAGE OF DEVELOPMENT
*/
const baseStats = new Map<string, number>(
    [
        ["Strength", 0],
        ["Agility", 0],
        ["Dexterity", 0],
        ["Intelligence", 0],
        ["Insanity", 0],
        ["Charisma", 0],
        ["Sanity", 0],
        ["Awareness", 0],
    ]
)

// Data template for the new player
export const dataTemp: template = {
    PlayerProfile: {
        ["AccountAge"]: 0,
        ["TotalTimePlayed"]: 0,
        // ["LastLogin"]:  ,
        ["OwnedPasses"]: [], 
        ["BanHistory"]: {},
        ["GuildData"]: {
            ["GuildName"]: "Undefined",
            ["GuildID"]: 0
        },
    }, 

    ProgressionData: {
        ["Level"]: 1,
        ["XP"]: 0,
        ["XP_Threshold"]: { // this is unofficial
            Min: 0,
            Max: 10
        },
        ["Achievements"]: [],
        ["QuestsCompleted"]: [],
        ["ActiveQuests"]: [] // []
    },

    Inventory: {
        ["Items"]: {}, 
        ["Currency"]: {
            Gold: 100,
            Gems: 25
        }
    },

    CharacterData: {
		["Character"]: undefined,
        ["InCombat"]: false,
        ["IsKnocked"]: false,
        ["Lives"]:  2,
        ["Age"]: 17,
        ["Race"]: "", 
        ["Stats"]: baseStats,
		["Location"]: "Undefined",
		["CharacterCF"]: {x: 0, y: 0, z: 0}, 

        ["UniqueAbilities"]: [], // []
        ["CatalystAbilities"]: [], // []
        ["BattleOutcomes"]: {} 
	},
    CurrentSessionData: {
        ["TimePlayed"]: 0,
        ["LastCF"]: {x: 0, y: 0, z: 0}
    }

}

export const mockDataTemp: mockTemplate = {
    PlayerProfile: {
        ["AccountAge"]: 0,
        ["TotalTimePlayed"]: 0,
        // ["LastLogin"]:  ,
        ["OwnedPasses"]: [], 
        ["BanHistory"]: {},
        ["GuildData"]: {
            ["GuildName"]: "Undefined",
            ["GuildID"]: 0
        },
    }, 

    ProgressionData: {
        ["Level"]: 30,
        ["XP"]: 0,
        ["XP_Threshold"]: { // this is unofficial
            Min: 99,
            Max: 99999
        },
        ["Achievements"]: [],
        ["QuestsCompleted"]: [],
        ["ActiveQuests"]: [] // []
    },

    Inventory: {
        ["Items"]: {}, 
        ["Currency"]: {
            Gold: 999999999,
            Gems: 999999999
        }
    },

    CharacterData: {
		["Character"]: undefined,
        ["InCombat"]: false,
        ["IsKnocked"]: false,
        ["Lives"]:  2,
        ["Age"]: 17,
        ["Race"]: "", 
        ["Stats"]: baseStats,
		["Location"]: "Undefined",
		["CharacterCF"]: new CFrame(), 

        ["UniqueAbilities"]: [], // []
        ["CatalystAbilities"]: [], // []
        ["BattleOutcomes"]: {} 
	},
    CurrentSessionData: {
        ["TimePlayed"]: 0,
        ["LastCF"]: {x: 0, y: 0, z: 0}
    }

}

// To add later
// --[[]
// 	Settings = {
// 		AudioPreferences = {},
// 		VideoPreferences = {},
// 		Controls = {},
// 	}, 
// ]]


