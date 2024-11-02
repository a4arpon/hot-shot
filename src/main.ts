#!/usr/bin/env node

import minimist from "minimist";
import { generateModule, generateService } from "./mod-manager.ts";

const argv = minimist(process.argv.slice(2));

let projectType: string;
if (argv.ts) {
  projectType = "ts";
} else if (argv.js) {
  projectType = "js";
} else if (argv._[0] !== "g" && argv._[0] !== "reload") {
  // If no project type is specified, but the command is not 'g', show error
  console.error(
    "Error: Please specify either --js or --ts for non-'g' commands.",
  );
  process.exit(1);
}

// Check for the command as a positional argument
const command = argv._[0];

switch (command) {
  case "reload":
    console.log(`Reloading with project type`);
    break;

  case "g":
    // Generate command
    const generateCommand = argv._[1];
    const generateOptions = argv._.slice(2);

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

      case "service":
        if (generateOptions.length === 0) {
          console.error(
            "Error: Please specify a service name for 'g service' command.",
          );
          process.exit(1);
        }
        const serviceName = generateOptions[0];

        if (!argv.mod) {
          console.error(
            "Error: Please specify a module name using '--mod' for 'g service' command.",
          );
          process.exit(1);
        }
        await generateService(argv.mod, serviceName);
        break;

      case "middleware":
        if (generateOptions.length === 0) {
          console.error(
            "Error: Please specify a service name for 'g service' command.",
          );
          process.exit(1);
        }
        const middlewareName = generateOptions[0];

        if (!argv.mod) {
          console.error(
            "Error: Please specify a module name using '--mod' for 'g service' command.",
          );
          process.exit(1);
        }
        await generateService(argv.mod, middlewareName);
        break;

      default:
        console.log(
          `Unknown generate command: ${generateCommand}. Usage: hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`,
        );
        break;
    }
    break;

  default:
    console.log(`Unknown command: ${command}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);
    break;
}
