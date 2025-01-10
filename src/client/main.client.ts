import { ContextActionService, ReplicatedStorage } from "@rbxts/services";
import AnimationModule from "shared/AnimationModule";

print(AnimationModule, "WORKINGGGASDSADKLFLJSADKFJDSA");

let toggle = false;

ContextActionService.BindAction("Switch", (name: string, inputState: Enum.UserInputState)=>{
    if (inputState !== Enum.UserInputState.Begin) return;

    if (toggle) AnimationModule.ApplyAnimationPack("Default");
    else AnimationModule.ApplyAnimationPack("Classic");

    toggle = !toggle;
}, false, Enum.KeyCode.Q)