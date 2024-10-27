#!/usr/bin/env node

// Import necessary functions and utilities
import {folderChecker} from "./reload.ts";
import {parseArgs} from "node:util";

// Command parsing with positional argument support
const {values, positionals} = parseArgs({
    args: process.argv.slice(2),
    options: {
        js: {type: "boolean"},
        ts: {type: "boolean"}
    },
    allowPositionals: true
});

// Check for the `reload` command as a positional argument
const command = positionals[0];

// Determine the project type based on `--js` or `--ts`
let projectType: string;
if (values.ts) {
    projectType = "ts";
} else if (values.js) {
    projectType = "js";
} else {
    console.error("Error: Please specify either --js or --ts.");
    process.exit(1);
}

if (command === "reload") {
    console.log(`Reloading with project type: ${projectType}...`);
    folderChecker(projectType)
        .then(() => console.log("Reload complete."))
        .catch((err) => {
            console.error("Error during reload:", err);
        });
} else {
    console.log("Unknown command. Usage: hotshot reload --js or --ts");
}
