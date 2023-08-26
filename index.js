import { parseCommand } from "./parse-command.js";

console.log("The Weather CLI App");

try {
  const command = parseCommand(process.argv.slice(2));
  console.log(command);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
