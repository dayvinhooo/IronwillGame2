import { Players } from "@rbxts/services";
import AnimationLibrary from "./AnimationLibrary";


interface AnimationModulePreface {
	SyncPlayer(MethodTable: object): LuaTuple<[object, object]>; //Gives the script access to the players current animate script instance//
	GetAnimation(): void; //Searches for an animation within the library//
	LoadAnimation(): void; //Loads an animation onto an animator and returns the animation track if successful//
	PlayAnimation(): void; //Plays an animation on an animator and returns the animation track if successful//
}

const AnimationModule: AnimationModulePreface = {} as AnimationModulePreface;
let AnimateScript: undefined | unknown;

AnimationModule.SyncPlayer = function (MethodTable: object | undefined) {
	if (typeIs(MethodTable, "table") === true) AnimateScript = MethodTable;
	else MethodTable = undefined;

	return $tuple(AnimationLibrary.AnimationPacks.Default, AnimationLibrary.AnimationPacks.Emotes);
};

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