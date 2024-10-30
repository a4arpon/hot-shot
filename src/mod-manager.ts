import fs from "fs";
import path from "path";
import {generateControllerFile, generateRouterFile, generateServicesFile} from "./mods-contents.ts";

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
    fs.mkdirSync(moduleDirPath, {recursive: true});

    const fileExtensions = projectType === "ts" ? ".ts" : ".js";

    const routerContent = generateRouterFile(moduleName, fileExtensions);
    const controllerContent = generateControllerFile(moduleName, fileExtensions);
    const servicesContent = generateServicesFile(moduleName, fileExtensions);

    fs.writeFileSync(
        path.join(moduleDirPath, `routes${fileExtensions}`),
        routerContent,
    );
    fs.writeFileSync(
        path.join(moduleDirPath, `controller${fileExtensions}`),
        controllerContent,
    );
    fs.writeFileSync(
        path.join(moduleDirPath, `services${fileExtensions}`),
        servicesContent,
    );

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
                path.join(moduleDirPath, `services${fileExtensions}`),
            )
        }`,
    );
}

async function checkProjectType(): Promise<"js" | "ts"> {
    const configPath = path.join(process.cwd(), "hotshot.config.js");
    console.log(configPath);
    if (!fs.existsSync(configPath)) {
        throw new Error("hotshot.config.js not found.");
    }
    const configContent = await import(configPath);
    return configContent.HotshotConf.projectType;
}

async function checkSrcDirectory(): Promise<boolean> {
    return fs.existsSync(path.join(process.cwd(), "src"));
}

async function checkCreateModsDirectory(path: string): Promise<void> {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
        console.log(`Created 'ods' directory at: ${path}`);
    }
}


