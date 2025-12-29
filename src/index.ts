#!/usr/bin/env node

import {Command} from 'commander';
import fs from 'fs/promises';

interface Item {

    name : string,
    amount : number,
    id : number,

}

const program = new Command();
const source = `src/expenses.json`;

program.name('expense-tracker').description('CLI Expense Tracker').version('1.0.0');

program.command('add').option('-d, --description <name>').option('-a, --amount <amount>').action(async (options) => {

    if (!options.description || !options.amount) {
        console.error(`Please enter a name with -d <name> followed with an amount -a <number>\nExample: "tracker add -d Burger -a 20"`);
        process.exit(1);
    }
    const newID : number = JSON.parse(await readFile(source)).length + 1;
    const newArray : Item[] = [...JSON.parse(await readFile(source)),{name : options.description, amount:options.amount, id: newID}];
    await writeFile<Item>(source,newArray);
    console.log(`Expense added successfully (ID : ${newID})`);
    
});

program.command('delete').option('--id <number>').action(async (options) => {

    const currentList : Item[] = JSON.parse(await readFile(source));
    const deletedIndex : number = parseInt(options.id) - 1

    const [deletedElement] = currentList.splice(deletedIndex,1);

    if (!deletedElement) {
        console.log("Error in deleting! Did you enter a valid ID?");
        process.exit(1);
    }

    await writeFile<Item>(source,currentList);
    console.log(`Deleted ${deletedElement.name} with ID ${deletedElement.id}`);

})

program.command('update').option(`--id <number>`).option(`-d, --description <name>`).option(`-a , --amount <amount>`).action(async (options) => {


    const currentList : Item[] = JSON.parse(await readFile(source));
    const updateIndex : number = options.id-1;

    if (!currentList[updateIndex]) {
        console.error("Please enter a valid index");
        process.exit(1);
    }

    if (!options.description && !options.amount) {

        console.error(`Please enter a description/amount update (at least one field required)\nExample: tracker update --id 1 -d Burger1 -a 10`)
        process.exit(1);

    }

    options.description ? currentList[updateIndex].name = options.description : null;
    options.amount ? currentList[updateIndex].amount = options.amount : null; 
    
    await writeFile(source,currentList);
    
    console.log(`Updated ID ${options.id} to: ${currentList[updateIndex].name} with expenses of ${currentList[updateIndex].amount}`);


})

program.parse();

async function readFile(src : string) : Promise<string> {

    return (await fs.readFile(`${src}`,`utf8`));

}

async function writeFile<T>(src : string, arr : T[]) : Promise<void> {

    await fs.writeFile(`${src}`, JSON.stringify(arr,null,2));

}

