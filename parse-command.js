import { parseArgs } from "node:util";

export function parseCommand(args) {
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

  const { values, positionals } = parseArgs({
    args,
    options,
    allowPositionals: true,
  });

  return {
    command: positionals[0],
    options: values,
  };
}
