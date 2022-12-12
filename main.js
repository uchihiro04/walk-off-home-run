#! /usr/bin/env node

const Command = require("./lib/command.js");
const argv = require("minimist")(process.argv.slice(2));
// コマンドのオプションに関するオブジェクトである変数argvから、不必要なプロパティを削除
delete argv._;
new Command(argv).runGame();
