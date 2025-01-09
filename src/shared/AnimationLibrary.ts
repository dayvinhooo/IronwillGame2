type AnimationPack = Record<string, Animation | Animation[] | [Animation, number][]>; // If the value type is the latter, the animations in the table are picked at random.//

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
    ["Swim"]: newAnimation(180426354),

	//Basic Combat Animations//
	["Block"]: newAnimation(16704025701),
	["Blocked"]: newAnimation(17259026087), //Used when blocking a punch
	["BlockBreak"]: newAnimation(16704136308),

	//Dodging Animations//
	["SpotDodge"]: [
		[newAnimation(16661765223), 1], //Spot Dodge 1//
		[newAnimation(17847866674), 1], //Spot Dodge 2//
		[newAnimation(17847939690), 1], //Spot Dodge 3//
	],
	["ForwardDodge"]: newAnimation(16661781705),
	["BackwardDodge"]: newAnimation(16661766673),
	["LeftwardDodge"]: newAnimation(16661771130),
	["RightwardDodge"]: newAnimation(16661783062),
};

AnimationPacks["Crouch"] = {
	["Idle"]: newAnimation(16661714976),
	["Walk"]: newAnimation(16661715916),
};

AnimationPacks["Emotes"] = {
	//Roblox Default//
	["Wave"]: newAnimation(128777973),
	["Point"]: newAnimation(128853357),

	["Dance1"]: [newAnimation(182435998), newAnimation(182491037), newAnimation(182491065)],
	["Dance2"]: [newAnimation(182436842), newAnimation(182491248), newAnimation(182491277)],
	["Dance3"]: [newAnimation(182436935), newAnimation(182491368), newAnimation(182491423)],

	["Laugh"]: newAnimation(129423131),
	["Cheer"]: newAnimation(129423030),

	//Custom Emotes//
	["Hakari"]: newAnimation(17228139677),
	["SitDown"]: newAnimation(17228366839),
	["ToleTole"]: newAnimation(17267447673),
};

export = { Animations, AnimationPacks };