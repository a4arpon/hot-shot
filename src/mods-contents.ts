export function nameFixer(
  moduleName: string,
  isClassName: boolean = true,
): string {
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

export function generateRouterFile(
  moduleName: string,
  _fileExtension: string,
): string {
  const routerClassName = nameFixer(moduleName, true);
  const controllerClassName = nameFixer(moduleName, true) + "Controller";
  const controllerMethodName = nameFixer(moduleName, false);

  return `
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${controllerClassName}} from "./controller";

export class ${routerClassName}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${moduleName.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${
    nameFixer(moduleName, false)
  }Controller = new ${controllerClassName}()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: ${
    nameFixer(moduleName, false)
  }Controller.${controllerMethodName}
            }]
        })
    }
}
`;
}

export function generateControllerFile(
  moduleName: string,
  _fileExtension: string,
): string {
  const controllerClassName = nameFixer(moduleName, true) + "Controller";
  const controllerFileName = nameFixer(moduleName, false);
  const serviceName = nameFixer(moduleName, true) + "Services";
  const serviceMethodName = nameFixer(moduleName, false);

  return `
import type {Context} from "hono";
import {${serviceName}} from "./${moduleName}.services";

export class ${controllerClassName} {
    private readonly ${nameFixer(moduleName, false)}Services: ${serviceName}

    constructor() {
        this.${nameFixer(moduleName, false)}Services = new ${serviceName}()
    }

    ${controllerFileName} = async (ctx: Context) => {
        return this.${
    nameFixer(moduleName, false)
  }Services.${serviceMethodName}()
    }
}
`;
}

export function generateServicesFile(
  moduleName: string,
): string {
  const servicesClassName = nameFixer(moduleName, true) + "Services";
  const serviceMethodName = nameFixer(moduleName, false);

  return `
import {response} from "@a4arpon/hotshot";

export class ${servicesClassName} {
    async ${serviceMethodName}() {
        return response("Hi from ${moduleName}!");
    }
}
`;
}

export function generateMiddlewareContent(
  middlewareName: string,
  type: string,
) {
  return `
    import { middleWareExceptionResponse, response } from "@a4arpon/hotshot"
    
    
    const exceptionRoutes = ["exception-route"]
    
    export const ${
    nameFixer(middlewareName + type, true)
  } = async (ctx: Context, next: () => Promise<void>) => {
    try {
    /*
    | ----------------------------------------------------------------------
    | Exception Routes
    | ----------------------------------------------------------------------
    */
    if (exceptionRoutes.includes(ctx.req.path.split("/").at(-1) ?? "")) {
      await next()
    }

      await next()
    } catch (e) {
      return middleWareExceptionResponse(ctx, e)
    }
  })
  `;
}
