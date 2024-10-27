import {access, mkdir, writeFile} from "node:fs/promises";
import {constants} from "node:fs";
import {join} from "node:path";

export async function folderChecker(projectType: string): Promise<void> {
    const __dirname = process.cwd();
    const srcFolderPath = join(__dirname, "src");

    try {
        await access(srcFolderPath, constants.F_OK);
    } catch {
        throw new Error('Error: "src" folder does not exist.');
    }

    const libPath = join(srcFolderPath, "lib");
    const libsPath = join(srcFolderPath, "libs");
    let selectedLibPath: string;

    try {
        await access(libPath, constants.F_OK);
        selectedLibPath = libPath;
    } catch {
        try {
            await access(libsPath, constants.F_OK);
            selectedLibPath = libsPath;
        } catch {
            await mkdir(libsPath, {recursive: true});
            console.log("Created ./src/libs folder");
            selectedLibPath = libsPath;
        }
    }

    const hotShotFilePath = join(
        selectedLibPath,
        `hot-shot.${projectType === "ts" ? "ts" : "js"}`
    );

    try {
        await access(hotShotFilePath, constants.F_OK);
        console.log("Required file already exists.");
    } catch {
        await writeFile(hotShotFilePath, "// hot-shot file");
        console.log(`Created hot-shot.${projectType === "ts" ? "ts" : "js"} in ${selectedLibPath}`);
    }
}
