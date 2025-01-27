type RandomAnimation = [Animation, number][]; //Instance, Weight
type Emote = [(Animation | RandomAnimation), boolean, number?]; //Instance, Looped, Weight
type AnimationPack = Record<string, Animation | RandomAnimation | Emote>; // If the value type is the latter, the animations in the table are picked at random.//

interface AnimationLibraryPreface {
	Animations: Record<string, Animation>;
	AnimationPacks: Record<string, AnimationPack>;
}

function newAnimation(id: number): Animation {
	const Animation = new Instance("Animation");
	Animation.AnimationId = `rbxassetid://${id}`;

	return Animation;
}

const Animations: Record<string, Animation> = {}; //Standalone animations//
const AnimationPacks: Record<string, AnimationPack> = {}; //Animations grouped by category//

AnimationPacks["Default"] = {
	//Default Player Animation Package//
	["Idle"]: newAnimation(104630105893678),
	["Walk"]: newAnimation(12716799697),
	["Run"]: newAnimation(16689352605),
	["Jump"]: newAnimation(16661800061),
	["Fall"]: newAnimation(180436148), //Default Roblox Animation//
	["FallImpact"]: newAnimation(16704151376),
	["Climb"]: newAnimation(16661799074),
	["Sit"]: newAnimation(178130996), //Default Roblox Animation//
    ["Swim"]: newAnimation(180426354), //Default Roblox Animation//

	//Basic Combat Animations//
	["Block"]: newAnimation(16704025701),
	["Blocked"]: newAnimation(17259026087), //Used when blocking a punch
	["BlockBreak"]: newAnimation(16704136308),

	//Dodging Animations//
	["SpotDodge"]: [
		[newAnimation(16661765223), 10], //Spot Dodge 1//
		[newAnimation(17847866674), 10], //Spot Dodge 2//
		[newAnimation(17847939690), 10], //Spot Dodge 3//
	],
	["ForwardDodge"]: newAnimation(16661781705),
	["BackwardDodge"]: newAnimation(16661766673),
	["LeftwardDodge"]: newAnimation(16661771130),
	["RightwardDodge"]: newAnimation(16661783062),
};

AnimationPacks["Classic"] = {
		//Roblox Default Animations//
		["Idle"]: [
			[newAnimation(180435571), 9], //Default Roblox Animation//
			[newAnimation(180435792), 1], //Default Roblox Animation//
		], 
		["Walk"]: newAnimation(180426354), //Default Roblox Animation//
		["Jump"]: newAnimation(125750702), //Default Roblox Animation//
		["Fall"]: newAnimation(180436148), //Default Roblox Animation//
		["Climb"]: newAnimation(180436334), //Default Roblox Animation//
		["Sit"]: newAnimation(178130996), //Default Roblox Animation//
}

AnimationPacks["Crouch"] = {
	["Idle"]: newAnimation(16661714976),
	["Walk"]: newAnimation(16661715916),
};

AnimationPacks["Emotes"] = {
	//Roblox Default//
	["wave"]: [newAnimation(128777973), false], //Default Roblox Animation//
	["point"]: [newAnimation(128853357), false], //Default Roblox Animation//

	["dance1"]: [[
		[newAnimation(182435998), 10], //Default Roblox Animation//
		[newAnimation(182491037), 10], //Default Roblox Animation//
		[newAnimation(182491065), 10], //Default Roblox Animation//
	], true], 
	["dance2"]: [[
		[newAnimation(182436842), 10], //Default Roblox Animation//
		[newAnimation(182491248), 10], //Default Roblox Animation//
		[newAnimation(182491277), 10], //Default Roblox Animation//
	], true],
	["dance3"]: [[
		[newAnimation(182436935), 10], //Default Roblox Animation//
		[newAnimation(182491368), 10], //Default Roblox Animation//
		[newAnimation(182491423), 10], //Default Roblox Animation//
	], true],

	["laugh"]: [newAnimation(129423131), false], //Default Roblox Animation//
	["cheer"]: [newAnimation(129423030), false], //Default Roblox Animation//

	//Custom Emotes//
	["hakari"]: [newAnimation(17228139677), true],
	["sitDown"]: [newAnimation(17228366839), true],
	["toletole"]: [newAnimation(17267447673), true],
};

export = { Animations, AnimationPacks };