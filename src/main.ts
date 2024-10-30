#!/usr/bin/env node

// Import necessary functions and utilities
import { folderChecker } from "./reload.ts";
import { parseArgs } from "node:util";
import { generateModule } from "./mod-manager.ts";

// Command parsing with positional argument support
const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    js: { type: "boolean" },
    ts: { type: "boolean" },
  },
  allowPositionals: true,
});

// Determine the project type based on `--js` or `--ts`
let projectType: string;
if (values.ts) {
  projectType = "ts";
} else if (values.js) {
  projectType = "js";
} else if (positionals[0] !== "g" && positionals[0] !== "reload") {
  // If no project type is specified, but the command is not 'g', show error
  console.error(
    "Error: Please specify either --js or --ts for non-'g' commands.",
  );
  process.exit(1);
}

// Check for the command as a positional argument
const command = positionals[0];

switch (command) {
  case "reload":
    // @ts-ignore
    if (!projectType) {
      console.error(
        "Error: Please specify either --js or --ts for 'eload' command.",
      );
      process.exit(1);
    }
    console.log(`Reloading with project type: ${projectType}...`);
    folderChecker(projectType)
      .then(() => console.log("Reload complete."))
      .catch((err) => {
        console.error("Error during reload:", err);
      });
    break;

  case "g":
    // Generate command
    const generateCommand = positionals[1];
    const generateOptions = positionals.slice(2);

    switch (generateCommand) {
      case "mod":
        // Generate Module
        if (generateOptions.length === 0) {
          console.error(
            "Error: Please specify a module name for 'g mod' command.",
          );
          process.exit(1);
        }
        const moduleName = generateOptions[0];
        console.log(`Module name for generation: ${moduleName}`);
        await generateModule(moduleName);
        break;

      default:
        console.log(
          `Unknown generate command: ${generateCommand}. Usage: hotshot g mod <module_name>`,
        );
        break;
    }
    break;

  default:
    console.log(`Unknown command: ${command}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name>`);
    break;
}
