import { Players } from "@rbxts/services";
import AnimationLibrary from "./AnimationLibrary";
import Object from "@rbxts/object-utils";

interface AnimationModulePreface {
	SyncPlayer(AnimationTable: object, methods: Record<string, Callback>): LuaTuple<[object, object]>; //Gives the script access to the players current animate script instance//
	ApplyAnimationPack(packName: string): void; //Changes, adds, or removes various animations for player movement and actions//
	GetAnimation(): void; //Searches for an animation within the library//
	LoadAnimation(): void; //Loads an animation onto an animator and returns the animation track if successful//
	PlayAnimation(): void; //Plays an animation on an animator and returns the animation track if successful//
}

const AnimationModule: AnimationModulePreface = {} as AnimationModulePreface;
let animTable: object | undefined = {};
let methodsTable: Record<string, Callback> | undefined = {};

AnimationModule.SyncPlayer = function (animationTable: object, methods: Record<string, Callback>) {
	if (typeIs(animationTable, "table") === true) animTable = animationTable;
	else animTable = undefined;

	if (typeIs(methods, "table") === true) methodsTable = methods;
	else methodsTable = undefined;

	return $tuple(AnimationLibrary.AnimationPacks.Default, AnimationLibrary.AnimationPacks.Emotes);
};

AnimationModule.ApplyAnimationPack = function(this: object, packName: string){
	if (AnimationLibrary.AnimationPacks[packName] === undefined) return;
	if (methodsTable === undefined) return;
	if (!(Object.keys(methodsTable).includes("configureAnimationSet") && Object.keys(methodsTable).includes("stopAllAnimations"))) return;

	const pack = AnimationLibrary.AnimationPacks[packName];
	for (const i of Object.keys(pack)) methodsTable.configureAnimationSet(i, pack[i]);
	methodsTable.stopAllAnimations(true);
}

AnimationModule.GetAnimation = function () {
	return;
};

AnimationModule.LoadAnimation = function () {
	return;
};

AnimationModule.PlayAnimation = function () {
	return;
};

export = AnimationModule;