import {parseArgs} from "node:util";

console.log("The Weather CLI App");

function parseCommand(args) {
  const options = {
    city: {
      type: "string",
      short: "c",
    },
    lat: {
      type: "string",
    },
    long: {
      type: "string",
    },
  };

  const {values, positionals} = parseArgs({
    args,
    options,
    allowPositionals: true,
  });

  return {
    command: positionals[0],
    options: values,
  }
}

const command = parseCommand(process.argv.slice(2));

console.log(command);
