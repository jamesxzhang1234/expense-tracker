#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Print_1 = require("./Print");
const VALID_COMMAND = [
    "add",
    "list",
    "delete",
    "list",
    "summary"
];
const input = process.argv.slice(2);
const [command] = input.filter((e) => VALID_COMMAND.includes(e));
(0, Print_1.Print)(command);
//# sourceMappingURL=index.js.map