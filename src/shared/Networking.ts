import { Networking } from "@flamework/networking";
/* 
Notes:
Events & functions must have the same name (sender and receiver)
*/
interface ClientToServerEvents {
	// Here you just put the function and its parameters and what it returns
	event(param1: string): void;
}

interface ServerToClientEvents {
	eventTest(param1: string): void;
}

// Remote functions
// interface ClientToServerFunctions {
// 	/* Client to server remote functions callbacks*/
// }
// interface ServerToClientFunctions {
// 	/* Server to client remote functions callbacks*/
// }

// Returns an object containing a `server` and `client` field.
export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();

// It is recommended that you create these in separate server/client files,
// which will avoid exposing server configuration (including type guards) to the client.
export const ServerEvents = GlobalEvents.createServer({
	/* server config */
});
export const ClientEvents = GlobalEvents.createClient({
	/* client config */
});