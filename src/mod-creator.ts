import fs from "node:fs"
import path from "node:path"
import {
  generateCacheDriverContent,
  generateControllerFile,
  generateMiddlewareFile,
  generateRouterFile,
  generateServicesFile,
  generateWorkerFile,
  nameFixer,
} from "./mods-contents.ts"

export interface HotShotConf {
  projectName: string
  projectType: "js" | "ts"
  contains: {
    mods: Array<{
      type: "router" | "controller" | "services"
      name: string
      path: string
      contains: Array<"router" | "controller" | "services">
      services: Array<string>
    }>
  }
}

/*
 * -------------------------------------------------------------------
 * Generate a new module in the 'mods' directory.
 * -------------------------------------------------------------------
 */

export async function generateModule(moduleName: string) {
  console.log("**Step 1: Checking Project Type...**")
  const projectType = await checkProjectType()
  console.log(`Project Type: ${projectType}`)

  console.log(`**Step 2: Checking for 'src' Directory...**`)
  const srcDirExists = await checkSrcDirectory()
  if (!srcDirExists) {
    console.error("Error: 'src' directory not found.")
    process.exit(1)
  }
  console.log("Found 'src' directory.")

  console.log(`**Step 3: Checking/Creating 'mods' Directory...**`)
  const modsDirPath = path.join(process.cwd(), "src", "mods")
  await checkCreateModsDirectory(modsDirPath)
  console.log("'mods' directory is available.")

  // Generate Module Files
  const moduleDirName = `${moduleName}-mod`
  const moduleDirPath = path.join(modsDirPath, moduleDirName)
  fs.mkdirSync(moduleDirPath, { recursive: true })

  const fileExtensions = projectType === "ts" ? ".ts" : ".js"

  const routerContent = generateRouterFile(moduleName, fileExtensions)
  const controllerContent = generateControllerFile(moduleName, fileExtensions)
  const servicesContent = generateServicesFile(moduleName)

  fs.writeFileSync(
    path.join(moduleDirPath, `routes${fileExtensions}`),
    routerContent,
  )
  fs.writeFileSync(
    path.join(moduleDirPath, `controller${fileExtensions}`),
    controllerContent,
  )
  fs.writeFileSync(
    path.join(moduleDirPath, `${moduleName}.services${fileExtensions}`),
    servicesContent,
  )

  await updateModRegistry(moduleName, moduleDirPath)
  // await updateRouterRegistry(moduleName)

  console.log(
    `Created: ${path.relative(
      process.cwd(),
      path.join(moduleDirPath, `routes${fileExtensions}`),
    )}`,
  )
  console.log(
    `Created: ${path.relative(
      process.cwd(),
      path.join(moduleDirPath, `controller${fileExtensions}`),
    )}`,
  )
  console.log(
    `Created: ${path.relative(
      process.cwd(),
      path.join(moduleDirPath, `${moduleName}.services${fileExtensions}`),
    )}`,
  )
}

/*
 * -------------------------------------------------------------------
 * Check the project type (js or ts) in the hotshot.config.json file.
 * -------------------------------------------------------------------
 */

async function checkProjectType(): Promise<"js" | "ts"> {
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  console.log(configPath)
  if (!fs.existsSync(configPath)) {
    throw new Error("hotshot.config.json not found.")
  }

  // Read the config file using fs.promises.readFile and JSON.parse
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  // Note: The key in your provided config is actually "projectType" at the root level
  // If you meant to have a "HotshotConf" object, please adjust the key accordingly
  return config.projectType
}

/*
 * -------------------------------------------------------------------
 * Check if the 'src' directory exists.
 * -------------------------------------------------------------------
 */

async function checkSrcDirectory(): Promise<boolean> {
  return fs.existsSync(path.join(process.cwd(), "src"))
}

/*
 * -------------------------------------------------------------------
 * Check if the 'mods' directory exists, and create it if it doesn't.
 * -------------------------------------------------------------------
 */

async function checkCreateModsDirectory(path: string): Promise<void> {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
    console.log(`Created 'mods' directory at: ${path}`)
  }
}

/*
 * -------------------------------------------------------------------
 * Update Mod Registry
 *
 * This function updates the mod registry in the hotshot.config.json file.
 * It adds a new entry to the 'contains.mods' array, which includes the
 * module name, path, contains, and services.
 * -------------------------------------------------------------------
 */

async function updateModRegistry(moduleName: string, moduleDirPath: string) {
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  const newModEntry = {
    type: "router",
    name: moduleName,
    path: `.${moduleDirPath.replace(process.cwd(), "")}`,
    contains: ["router", "controller", "services"],
    services: [`${moduleName}.services`],
  }

  if (!config.contains) {
    config.contains = { mods: [] }
  }

  if (!config.contains.mods) {
    config.contains.mods = []
  }

  config.contains.mods.push(newModEntry)

  const updatedConfigContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(configPath, updatedConfigContent)
}

/*
 * -------------------------------------------------------------------
 * Generate a new service in the specified module.
 *
 * It will create a new file with the specified service name in the
 * specified module directory. The file will contain a class with a
 * method named after the service name.
 * -------------------------------------------------------------------
 */

export async function generateService(modName: string, serviceName: string) {
  console.log(`Module Name: ${modName}`)
  console.log(`Service Name: ${serviceName}`)

  // Load config file
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  // Find the module directory path
  const mod = config.contains?.mods?.find(
    (m: { name: string }) => m.name === modName,
  )
  if (!mod) {
    console.error(`Error: Module '${modName}' not found in config.`)
    return
  }

  // Check for duplicate service name
  if (mod.services.includes(`${serviceName}.services`)) {
    console.error(
      `Error: Service '${serviceName}' already exists in module '${modName}'.`,
    )
    return
  }

  // Generate new service file
  const serviceFileContent = generateServicesFile(serviceName)
  const serviceFileName = `${serviceName}.services${
    config.projectType === "ts" ? ".ts" : ".js"
  }`
  const serviceFilePath = path.join(mod.path, serviceFileName)

  // Write the new service file
  fs.writeFileSync(serviceFilePath, serviceFileContent)
  console.log(`Created new service file: ${serviceFilePath}`)

  // Update the config file with the new service
  mod.services.push(serviceFileName.replace(`.${config.projectType}`, ""))
  const updatedConfigContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(configPath, updatedConfigContent)
  console.log("Updated config file with new service.")
}

/*
 * -------------------------------------------------------------------
 * Middleware Generator
 *
 * This function generates a new middleware in the specified module.
 *
 * It will create a new file with the specified middleware name in the
 * specified module directory. The file will contain a class with a
 * method named after the middleware name.
 * -------------------------------------------------------------------
 */

export async function generateMiddleware(middlewareName: string) {
  console.log(`UseGuard Name: ${middlewareName}`)

  // Load config file
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  // Generate Middleware Contents
  const middlewareContent = generateMiddlewareFile(middlewareName)

  // Create middleware file path
  const middlewareFileName = `${middlewareName}.guard${
    config.projectType === "ts" ? ".ts" : ".js"
  }`
  const middlewareDirPath = path.join("./src", "use-guards")
  const middlewareFilePath = path.join(middlewareDirPath, middlewareFileName)

  // Create middlewares directory if it doesn't exist
  if (!fs.existsSync(middlewareDirPath)) {
    fs.mkdirSync(middlewareDirPath, { recursive: true })
    console.log(`Created directory: ${middlewareDirPath}`)
  }

  // Check for duplicate middleware name
  if (
    config.contains?.useGuards?.find(
      (m: { name: string }) => m.name === middlewareName,
    )
  ) {
    console.error(
      `Error: UseGuard '${middlewareName}' already exists in config.`,
    )
    return
  }

  // Write the new middleware file
  fs.writeFileSync(middlewareFilePath, middlewareContent)
  console.log(`Created new useGuard file: ${middlewareFilePath}`)

  // Update the config file with the new middleware
  if (!config.contains.useGuards) {
    config.contains.useGuards = []
  }

  config.contains.useGuards.push({
    name: middlewareName,
    path: `./src/use-guards/${middlewareFileName.replace(
      `.${config.projectType}`,
      "",
    )}`,
  })
  const updatedConfigContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(configPath, updatedConfigContent)
  console.log("Updated config file with new middleware.")
}

export async function queueWorkerGenerator(workerName: string) {
  console.log(`Worker Name: ${workerName}`)

  // Load config file
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  // Generate Worker Contents
  const workerContent = generateWorkerFile(workerName)

  // Create worker file path
  const workerFileName = `${workerName}.worker${
    config.projectType === "ts" ? ".ts" : ".js"
  }`

  const workerDirPath = path.join("./src", "queues")
  const workerFilePath = path.join(workerDirPath, workerFileName)

  // Create workers directory if it doesn't exist
  if (!fs.existsSync(workerDirPath)) {
    fs.mkdirSync(workerDirPath, { recursive: true })
    console.log(`Created directory: ${workerDirPath}`)
  }

  // Check for duplicate worker name
  if (
    config.contains?.queues?.find(
      (m: { name: string }) => m.name === workerName,
    )
  ) {
    console.error(`Error: Worker '${workerName}' already exists in config.`)
    return
  }

  // Write the new worker file
  fs.writeFileSync(workerFilePath, workerContent)
  console.log(`Created new worker file: ${workerFilePath}`)

  // Update the config file with the new worker
  if (!config.contains.queues) {
    config.contains.queues = []
  }
  config.contains.queues.push({
    core: "Redis",
    engine: "BullMQ",
    name: workerName,
    path: `./src/queues/${workerFileName.replace(`.${config.projectType}`, "")}`,
  })
  const updatedConfigContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(configPath, updatedConfigContent)
  console.log("Updated config file with new worker.")
}

export async function generateCacheDriver(cacheDriverName: string) {
  console.log(`Cache Driver Name: ${cacheDriverName}`)

  // Load config file
  const configPath = path.join(process.cwd(), "hotshot.config.json")
  const configFileContent = await fs.promises.readFile(configPath, "utf8")
  const config = JSON.parse(configFileContent)

  // Generate Cache Driver Contents
  const cacheDriverContent = generateCacheDriverContent(cacheDriverName)

  // Create cache driver file path
  const cacheDriverFileName = `${cacheDriverName}.cache${
    config.projectType === "ts" ? ".ts" : ".js"
  }`

  const cacheDriverDirPath = path.join("./src", "cache-drivers")
  const cacheDriverFilePath = path.join(cacheDriverDirPath, cacheDriverFileName)

  // Create cache drivers directory if it doesn't exist
  if (!fs.existsSync(cacheDriverDirPath)) {
    fs.mkdirSync(cacheDriverDirPath, { recursive: true })
    console.log(`Created directory: ${cacheDriverDirPath}`)
  }

  // Check for duplicate cache driver name
  if (
    config.contains?.cacheDrivers?.find(
      (m: { name: string }) => m.name === cacheDriverName,
    )
  ) {
    console.error(
      `Error: Cache Driver '${cacheDriverName}' already exists in config.`,
    )
    return
  }

  // Write the new cache driver file
  fs.writeFileSync(cacheDriverFilePath, cacheDriverContent)
  console.log(`Created new cache driver file: ${cacheDriverFilePath}`)

  // Update the config file with the new cache driver
  if (!config.contains.cacheDrivers) {
    config.contains.cacheDrivers = []
  }

  config.contains.cacheDrivers.push({
    core: "Redis",
    name: cacheDriverName,
    path: `./src/cache-drivers/${cacheDriverFileName.replace(
      `.${config.projectType}`,
      "",
    )}`,
  })
  const updatedConfigContent = JSON.stringify(config, null, 2)
  fs.writeFileSync(configPath, updatedConfigContent)
  console.log("Updated config file with new cache driver.")
}

/*
 * -------------------------------------------------------------------
 * Update Router Registry
 *
 * This function updates the router registry in the mod-manager.ts file.
 * It adds a new import statement and appends the router to the applicationRoutes array.
 * -------------------------------------------------------------------
 */

export async function updateRouterRegistry(moduleName: string) {
  const modManagerPath = path.join(process.cwd(), "src", "mod-manager.ts")

  fs.readFile(modManagerPath, "utf8", async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const modManagerContent = data as string
    let importStatements = modManagerContent.match(
      /import\s+{\s+\w+\s+}\s+from\s+["#mods\/\w+-mod\/routes"]/g,
    )
    const applicationRoutesArray = modManagerContent.match(
      /applicationRoutes\s*=\s*routerFactory\((.*?)\)/s,
    )

    if (!applicationRoutesArray) {
      throw new Error("Error: Unable to parse mod-manager.ts file.")
    }

    const newImportStatement = `import { ${nameFixer(moduleName)}Router } from "#mods/${moduleName}-mod/routes";`

    if (!importStatements) {
      importStatements = [newImportStatement]
      const updatedModManagerContent = `import { routerFactory } from "@a4arpon/hotshot";\n${newImportStatement}\n\nexport const applicationRoutes = routerFactory([${nameFixer(moduleName)}Router])`
      fs.writeFile(modManagerPath, updatedModManagerContent, (err) => {
        if (err) {
          console.error(err)
        }
      })
      return
    }

    const updatedImportStatements = [
      ...importStatements,
      newImportStatement,
    ].join("\n")

    const routerNames = applicationRoutesArray[1]
      .trim()
      .replace(/[()\s]/g, "")
      .split(",")

    const updatedRouterNames =
      routerNames.length === 0
        ? `${nameFixer(moduleName)}Router`
        : routerNames[0].includes("[")
          ? routerNames[0].replace("]", `, ${nameFixer(moduleName)}Router]`)
          : `[${routerNames.join(", ")}, ${nameFixer(moduleName)}Router]`

    const updatedApplicationRoutesArray = `applicationRoutes = routerFactory(${updatedRouterNames})`

    const updatedModManagerContent = modManagerContent
      .replace(importStatements.join("\n"), updatedImportStatements)
      .replace(applicationRoutesArray[0], updatedApplicationRoutesArray)

    fs.writeFile(modManagerPath, updatedModManagerContent, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
}
