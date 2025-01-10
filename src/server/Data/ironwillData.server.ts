import ProfileStore from "@rbxts/profile-store";
import { dataTemp, template } from "./temp";

const Players = game.GetService("Players");
const RunService = game.GetService("RunService");

const PlayerStore = ProfileStore.New("TestPlayerStore", dataTemp)
const Profiles: {[key: number]: ProfileStore.Profile<template> | undefined } = {}


function onPlayerAdded(Player: Player) {
    // Start a profile session for this player's data:

    const profile = PlayerStore.StartSessionAsync(`${Player.UserId}`, {
        Cancel: () => {
        return Player.Parent !== Players
    }})

    // Handling new profile session or failure to start it: 

    if (profile !== undefined) {
        profile.AddUserId(Player.UserId)
        profile.Reconcile()



        profile.OnSessionEnd.Connect(() => {
            Profiles[Player.UserId] = undefined
            Player.Kick("Session ended - rejoin.")
        })

        if (Player.Parent === Players) {
            Profiles[Player.UserId] = profile
            print(Profiles[Player.UserId])
            // Debug print
            print(`Profile loaded for ${Player.UserId}`)
        }
        else {
            profile.EndSession()
        }
    }
    else {
        Player.Kick("Profile load fail - Please rejoin")
    }
}

// In case Players have joined the server earlier than this script ran:
for (const Player of Players.GetPlayers()) {
    task.spawn(onPlayerAdded, Player)
}

Players.PlayerAdded.Connect(onPlayerAdded)

Players.PlayerRemoving.Connect((Player) => {
    const profile = Profiles[Player.UserId]

    // print(profile?.Data)

    if (profile !== undefined) {
        profile.EndSession()
    }
})


// Save profile
// Profiles[player.UserId].Save();