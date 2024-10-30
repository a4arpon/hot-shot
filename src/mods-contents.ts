export function nameFixer(moduleName: string, isClassName: boolean = true): string {
    const words = moduleName.split("-");
    const fixedName = words.map((word, index) =>
        index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join("");

    return isClassName
        ? fixedName.charAt(0).toUpperCase() + fixedName.slice(1)
        : fixedName;
}

export function generateRouterFile(moduleName: string, fileExtension: string): string {
    const routerClassName = `${nameFixer(moduleName)}Router`;
    return `
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {CONTROLLER} from "./controller${fileExtension}";

export class ${routerClassName} {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${moduleName.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const controllerInstance = new CONTROLLER()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: controllerInstance.CONTROLLER_METHOD
            }]
        })
    }
}
`;
}

export function generateControllerFile(
    moduleName: string,
    fileExtension: string,
): string {
    const controllerClassName = nameFixer(moduleName, true);
    const controllerFileName = nameFixer(moduleName, false);
    const serviceName = nameFixer(moduleName, true) + "Services";
    const serviceMethodName = nameFixer(moduleName, false);

    return `
import type {Context} from "hono";
import {${serviceName}} from "./services${fileExtension}";

export class ${controllerClassName} {
    private readonly services: ${serviceName}

    constructor() {
        this.services = new ${serviceName}()
    }

    ${controllerFileName} = async (ctx: Context) => {
        return this.services.${serviceMethodName}()
    }
}
`;
}

export function generateServicesFile(
    moduleName: string,
    fileExtension: string,
): string {
    const servicesClassName = nameFixer(moduleName, true) + "Services";
    const serviceMethodName = nameFixer(moduleName, false) + "Message";

    return `
import {response} from "@a4arpon/hotshot";

export class ${servicesClassName} {
    async ${serviceMethodName}() {
        return response("Hi from ${moduleName}!");
    }
}
`;
}