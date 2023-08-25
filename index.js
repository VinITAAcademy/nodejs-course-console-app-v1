import { parseCommand } from "./parse-command.js";

console.log("The Weather CLI App");

const command = parseCommand(process.argv.slice(2));

console.log(command);
