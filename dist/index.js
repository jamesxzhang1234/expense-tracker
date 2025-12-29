#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs/promises';
const program = new Command();
const source = `src/expenses.json`;
program.name('expense-tracker').description('CLI Expense Tracker').version('1.0.0');
program.command('add').option('-d, --description <name>').option('-a, --amount <amount>').action(async (options) => {
    const newID = JSON.parse(await readFile(source)).length + 1;
    if (!options.description || !options.amount) {
        console.error("Please enter a name with -d <name> followed with an amount -a <number>\nExample: add -d Burger -a 20");
        return;
    }
    const newArray = [...JSON.parse(await readFile(source)), { name: options.description, amount: options.amount, id: newID }];
    await writeFile(source, newArray);
    console.log(`Expense added successfully (ID : ${newID})`);
});
program.command('delete').option('--id <number>').action(async (options) => {
    const currentList = JSON.parse(await readFile(source));
    const deletedIndex = parseInt(options.id) - 1;
    const [deletedElement] = currentList.splice(deletedIndex, 1);
    if (!deletedElement) {
        console.log("Error in deleting!");
        return;
    }
    await writeFile(source, currentList);
    console.log(`Deleted ${deletedElement.name} with ID ${deletedElement.id}`);
});
program.command('update').option(`--id <number>`).option(`-d, --description <name>`).option(`-a , --amount <amount>`).action((options) => {
});
program.parse();
async function readFile(src) {
    return (await fs.readFile(`${src}`, `utf8`));
}
async function writeFile(src, arr) {
    await fs.writeFile(`${src}`, JSON.stringify(arr, null, 2));
}
//# sourceMappingURL=index.js.map