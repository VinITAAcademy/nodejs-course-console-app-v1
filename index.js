import {parseArgs} from "node:util";

console.log("The Weather CLI App");

const result = parseArgs({
  args: process.argv.slice(2),
  options: {
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
  },
  allowPositionals: true,
})

console.log(result)
