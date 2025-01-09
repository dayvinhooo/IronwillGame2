import Object from "@rbxts/object-utils";
import { Players, ServerStorage, Workspace } from "@rbxts/services";

// Constants
const entityRespawnTime = 3;

// Folders
let EntityFolder: Folder;
let GameCharFolder: Folder;

// Maps
const GameCharacters: Map<string, Instance> = new Map();
const EntityDescriptions: Map<Player, HumanoidDescription> = new Map();

// Objects
let entityConnections: { [key: string]: RBXScriptConnection } = {};

// Getting the player
let entityPlayer: Player;

function entityManagerAwake(): void {
	EntityFolder = Workspace.FindFirstChild("Characters") as Folder;
	GameCharFolder = ServerStorage.FindFirstChild("GameChars") as Folder;
	entityManagerStart();
}

function GetCharacter(charName: string): Instance | undefined {
	if (GameCharacters.has(charName)) {
		return GameCharacters.get(charName);
	} else {
		warn("character not found");
		return undefined;
	}
}

function onEntityDeath(): void {
	// Disconnecting every linked connection to the entity
	for (const connection of Object.values(entityConnections)) {
		if (typeIs(connection, "RBXScriptConnection")) {
			connection.Disconnect();
		}
	}
	// Clear all connections
	entityConnections = {};
    
	// Normally you would send a signal to the client and wait until they click the respawn button
	task.wait(entityRespawnTime);
	LoadEntity(entityPlayer);
}

function HookEntityConnections(): void {
	const Char = entityPlayer.Character as Model;
	const currentHumanoid = Char.FindFirstChild("Humanoid") as Humanoid;
	entityConnections.onDeath = currentHumanoid.Died.Connect(() => {
		warn("entity died");
		onEntityDeath();
	});
}

function LoadEntity(Player: Player): void {
	// Getting the player humanoid description for accessory
	const PlayerDescription = Players.GetHumanoidDescriptionFromUserId(Player.UserId);

	// Cloning the default character (for dev stage only)
	const requestedCharacter = (GetCharacter("DefaultCharacter") as Model).Clone();

	if (!requestedCharacter) return;

	// Getting the cloned character's humanoid description
	const requestedCharacterHum = requestedCharacter.FindFirstChild("Humanoid") as Humanoid;
	const newDescription = requestedCharacterHum.FindFirstChild("HumanoidDescription") as HumanoidDescription;
	const Components = PlayerDescription.GetChildren();

	// Cloning the accessories to then put on the character
	for (const component of Components) {
		if (component.IsA("AccessoryDescription")) {
			const accessory = component.Clone();
			accessory.Parent = newDescription;
		}
	}

	// Loading the character with the right accessories
	Player.LoadCharacterWithHumanoidDescription(newDescription);
	// Run character function when the player's character loads
	OnCharacterLoad(Player, newDescription);
}

function OnCharacterLoad(Player: Player, receivedDescription: HumanoidDescription): void {
	// Hooking the connections for the character
	HookEntityConnections();
	// Linking the receivedDescription in a map to the player instance
	EntityDescriptions.set(Player, receivedDescription);
}

function LoadGameCharactersMap(): void {
	const charactersArray = GameCharFolder.GetChildren();
	// Getting the characters in the server storage folder to store in the map
	for (const character of charactersArray) {
		GameCharacters.set(character.Name, character);
	}
}

function ConnectSignals(): void {
	// PLAYER ADDED
	Players.PlayerAdded.Connect((Player: Player) => {
		warn("player is coming");
		if (Player.IsDescendantOf(Players) && Player !== undefined) {
			// Setting the player variable
			entityPlayer = Player;
			// Load the player's character
			LoadEntity(Player);
		}

		Player.CharacterAppearanceLoaded.Connect((Character: Model) => {
			// Check if the added character is ai or not...
			const possiblePlayer = Players.GetPlayerFromCharacter(Character);
			const isPlayer = possiblePlayer?.IsA("Player") ?? false;

			if (isPlayer) {
				print("real player");
			} else {
				print("got ai");
			}

			// Parent the character to the characters folder to create a state for the character
			Player.Character!.Parent = EntityFolder;
			// Character.Destroying.Connect(() => {
			//     print("was");
			// });
		});
	});

	Players.PlayerRemoving.Connect((Player: Player) => {
		// ...
	});
}

function entityManagerStart(): void {
	LoadGameCharactersMap();
	ConnectSignals();
}

export { entityManagerAwake };