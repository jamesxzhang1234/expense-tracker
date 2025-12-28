#!/usr/bin/env node
export{};
import { Print } from "./Print";

type validCommand = 
| "add"
| "list"
| "delete"
| "list"
| "summary"

const VALID_COMMAND : readonly validCommand[] = [
    "add",
    "list",
    "delete",
    "list",
    "summary"
] ;

const input = process.argv.slice(2);
const [command] : validCommand[] = input.filter((e) : e is validCommand => VALID_COMMAND.includes(e as validCommand));



Print(command);