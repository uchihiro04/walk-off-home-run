#! /usr/bin/env node

const Command = require("./lib/command.js");
const argv = require("minimist")(process.argv.slice(2));

new Command(argv).runGame();
