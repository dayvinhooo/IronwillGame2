import ProfileStore from "@rbxts/profile-store";
import { dataTemp, mockDataTemp, mockTemplate, template } from "./temp";

// Services 
const Players = game.GetService("Players");
const RunService = game.GetService("RunService");

// Booleans to check
let shouldMock = false;

const PlayerStore = ProfileStore.New("test_v0.02", dataTemp) // This create a regular data template for the player 
const MockPlayerStore = ProfileStore.New("test_v0.02", mockDataTemp)
const Profiles: {[key: number]: ProfileStore.Profile<template> | undefined } = {} // For each player in game, this object store thier data linked with their user id and data as value 
const MockProfiles: {[key: number]: ProfileStore.Profile<mockTemplate> | undefined} = {}

// Check if were playing on studio or not 

if (RunService.IsStudio()) {
   shouldMock = true;
}

// Runs once a player joins
function onPlayerAdded(Player: Player) { // This function loads data once the player joins the game
    // Start a profile session for this player's data:

    if (shouldMock) {
        // Loading up fake data that goes away after the studio session
        const mockProfile = MockPlayerStore.Mock.StartSessionAsync(`${Player.UserId}`, {
            Cancel: () => {
                return Player.Parent !== Players
            }
        })
        // this is for the new player (if they never joined the game, then we run this)
        if (mockProfile !== undefined) {
            mockProfile.AddUserId(Player.UserId)
            mockProfile.Reconcile()
    
            mockProfile.OnSessionEnd.Connect(() => {
                MockProfiles[Player.UserId] = undefined
                Player.Kick("Session ended - rejoin.")
            })
    
            if (Player.Parent === Players) {
                MockProfiles[Player.UserId] = mockProfile
               print(`Mock profile loaded for ${Player.UserId}`)
            }
            else {
                mockProfile.EndSession()
            }
        }
        else {
            Player.Kick("Profile load fail - Please rejoin")
        }
    }

    // Load the data the normal way 
    else {
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
                
                // print(Profiles[Player.UserId])
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
}

// In case Players have joined the server earlier than this script ran:
for (const Player of Players.GetPlayers()) {
    task.spawn(onPlayerAdded, Player)
}

Players.PlayerAdded.Connect(onPlayerAdded)

// Saves data once the player leaves 
Players.PlayerRemoving.Connect((Player) => {
    const profile = Profiles[Player.UserId]

    // print(profile?.Data)

    if (profile !== undefined) {
        profile.EndSession()
    }
})


// Save profile
// Profiles[player.UserId].Save();