import fs from "fs";
import path from "path";
import {
  generateControllerFile,
  generateRouterFile,
  generateServicesFile,
} from "./mods-contents.ts";
import * as vm from "node:vm";

interface HotShotConf {
  projectName: string;
  projectType: "js" | "ts";
}

export async function generateModule(moduleName: string) {
  console.log(`**Step 1: Checking Project Type...**`);
  const projectType = await checkProjectType();
  console.log(`Project Type: ${projectType}`);

  console.log(`**Step 2: Checking for 'src' Directory...**`);
  const srcDirExists = await checkSrcDirectory();
  if (!srcDirExists) {
    console.error("Error: 'src' directory not found.");
    process.exit(1);
  }
  console.log("Found 'src' directory.");

  console.log(`**Step 3: Checking/Creating 'mods' Directory...**`);
  const modsDirPath = path.join(process.cwd(), "src", "mods");
  await checkCreateModsDirectory(modsDirPath);
  console.log("'mods' directory is available.");

  // Generate Module Files
  const moduleDirName = `${moduleName}-mod`;
  const moduleDirPath = path.join(modsDirPath, moduleDirName);
  fs.mkdirSync(moduleDirPath, { recursive: true });

  const fileExtensions = projectType === "ts" ? ".ts" : ".js";

  const routerContent = generateRouterFile(moduleName, fileExtensions);
  const controllerContent = generateControllerFile(moduleName, fileExtensions);
  const servicesContent = generateServicesFile(moduleName);

  fs.writeFileSync(
    path.join(moduleDirPath, `routes${fileExtensions}`),
    routerContent,
  );
  fs.writeFileSync(
    path.join(moduleDirPath, `controller${fileExtensions}`),
    controllerContent,
  );
  fs.writeFileSync(
    path.join(moduleDirPath, `${moduleName}.services${fileExtensions}`),
    servicesContent,
  );

  await updateModRegistry(moduleName, moduleDirPath);

  console.log(
    `Created: ${
      path.relative(
        process.cwd(),
        path.join(moduleDirPath, `routes${fileExtensions}`),
      )
    }`,
  );
  console.log(
    `Created: ${
      path.relative(
        process.cwd(),
        path.join(moduleDirPath, `controller${fileExtensions}`),
      )
    }`,
  );
  console.log(
    `Created: ${
      path.relative(
        process.cwd(),
        path.join(moduleDirPath, `${moduleName}.services${fileExtensions}`),
      )
    }`,
  );
}

async function checkProjectType(): Promise<"js" | "ts"> {
  const configPath = path.join(process.cwd(), "hotshot.config.json");
  console.log(configPath);
  if (!fs.existsSync(configPath)) {
    throw new Error("hotshot.config.json not found.");
  }

  // Read the config file using fs.promises.readFile and JSON.parse
  const configFileContent = await fs.promises.readFile(configPath, "utf8");
  const config = JSON.parse(configFileContent);

  // Note: The key in your provided config is actually "projectType" at the root level
  // If you meant to have a "HotshotConf" object, please adjust the key accordingly
  return config.projectType;
}

async function checkSrcDirectory(): Promise<boolean> {
  return fs.existsSync(path.join(process.cwd(), "src"));
}

async function checkCreateModsDirectory(path: string): Promise<void> {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
    console.log(`Created 'mods' directory at: ${path}`);
  }
}

async function updateModRegistry(moduleName: string, moduleDirPath: string) {
  const configPath = path.join(process.cwd(), "hotshot.config.json");
  const configFileContent = await fs.promises.readFile(configPath, "utf8");
  const config = JSON.parse(configFileContent);

  const newModEntry = {
    type: "router",
    name: moduleName,
    path: `.${moduleDirPath.replace(process.cwd(), "")}`,
    contains: ["router", "controller", "services"],
    services: [`${moduleName}.services`],
  };

  if (!config.contains) {
    config.contains = { mods: [] };
  }

  if (!config.contains.mods) {
    config.contains.mods = [];
  }

  config.contains.mods.push(newModEntry);

  const updatedConfigContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(configPath, updatedConfigContent);
}

export async function generateService(modName: string, serviceName: string) {
  console.log(`Module Name: ${modName}`);
  console.log(`Service Name: ${serviceName}`);
}
