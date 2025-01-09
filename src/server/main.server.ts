import { entityManagerAwake } from "server/Services/entityManager";
import { stateManagerAwake } from "server/Services/stateManager";

// Disable and clean up the script
const myScript = script as Script;
myScript.Disabled = true;
task.defer(coroutine.running());
coroutine.yield();
script.Destroy();


// Initialize managers
entityManagerAwake();
stateManagerAwake();