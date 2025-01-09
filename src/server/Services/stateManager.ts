// State Manager
// This should only run on the server

import Object from "@rbxts/object-utils";
import { Players, Workspace } from "@rbxts/services";

// Defaults
const defaultValue = 100;
const defaultMax = 100;

// Connection interface
interface Connections {
	trackHealth?: RBXScriptConnection;
	onDeath?: RBXScriptConnection;
}

class State {
	private _stateChar: Model;
	private _statePlayer: Player | undefined;
	private _stateHumanoid: Humanoid;

	private maxHealth: number = defaultMax;
	private health: number = defaultValue;
	private stunDuration: number = 0;
	// private maxMana: number;
	// private mana: number;

    private inCombat: boolean = false;
	private isStunned: boolean = false;
	private isKnocked: boolean = false;
	private hasiFrame: boolean = false;
	private hasRagdoll: boolean = false;

    private m1ComboCD: boolean = false;
	private feintCD: boolean = false;
	private parryCD: boolean = false;
	private blockCD: boolean = false;
	private criticalCD: boolean = false;
	private rollCD: boolean = false;
    private isBlocking: boolean = false;
	private isParrying: boolean = false;

	//private charPos: Vector3 = new Vector3();

	private moveSet = new Map<string, boolean>();
	private Connections: { [key: string]: RBXScriptConnection | RBXScriptSignal | undefined } = {};

    constructor(receivedCharacter: Model) {
		// Setting the character & player
		this._stateChar = receivedCharacter;
		this._statePlayer = Players.GetPlayerFromCharacter(this._stateChar);

        this._stateHumanoid = receivedCharacter.FindFirstChildOfClass("Humanoid") as Humanoid;

		// Link this state instance to the player
		if (this._statePlayer?.IsA("Player")) {
			stateTable.set(this._statePlayer.UserId, this)
			print(`created state for ${this._statePlayer.UserId}`);
		} else {
			// Link this state instance to the AI
			stateTable.set(this._stateChar, this)
            print(`created state for ${this._stateChar}`);
		}
		this.Init();
	}
    public Init(): void {
		// For now set the health and mana with default variable but usually we should get it from the player's data
		this.maxHealth = defaultMax;
		this.health = this.maxHealth;

		// Setting the position
		const Root = this._stateChar.FindFirstChild("HumanoidRootPart") as BasePart;

       // this.charPos = Root.CFrame.Position;
        this.RunConnections();
	}

    public TrackHealth(): void {
		this.Connections.trackHealth = this._stateHumanoid.HealthChanged.Connect((health) => {
			if (health >= this.maxHealth) {
				warn("sus");
			}
			this.health = math.round(math.floor(health));
			this._stateHumanoid.Health = this.health;
			this._stateHumanoid.MaxHealth = this.maxHealth;

            //if (roundedHealth <= 0) {
			// Knocked logic.
			//}
		});

		this.Connections.onDeath = this._stateHumanoid.Died.Connect(() => {

			print("death");
			this.Destroy();
		});
    }

    public Destroy(): void {
		// Disconnect connections here

		if (this._statePlayer) {
            print(stateTable)
            }
        }

        public RunConnections(): void {
            this.TrackHealth();
            print(this.Connections);
        }
    
}

// State map
const stateTable = new Map<number | Model, State>();

// Folder
const CharFolder = Workspace.FindFirstChild("Characters") as Folder;

function stateManagerAwake(): void {
	stateManagerStart();
}

function stateManagerStart(): void {
	let Player: Player | undefined;

	CharFolder.ChildAdded.Connect((child) => {
		Player = Players.GetPlayerFromCharacter(child as Model);

		// Determine if the child added to the folder is an ai or a player
		if (Player?.IsA("Player")) {
			warn("got plr");
			if (!stateTable.has(Player.UserId)) {
				new State(child as Model);
			}
		} else {
			warn("got ai");
			if (!stateTable.has(child as Model)) {
				new State(child as Model);
			}
		}
	});

	CharFolder.ChildRemoved.Connect((child) => {
		// Checking if the player has a state linked to their character
		if (Player !== undefined && Player.IsDescendantOf(Players)) {
			if ((stateTable.has(Player.UserId) !== undefined)  || (stateTable.has(child as Model) !== undefined)) {
				print("removed", child);
			}
		}
	});
}

export { stateManagerAwake };