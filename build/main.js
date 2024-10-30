#!/usr/bin/env node
import{access as u,mkdir as m,writeFile as P}from"node:fs/promises";import{constants as g}from"node:fs";import{join as p}from"node:path";async function y(o){let e=process.cwd(),r=p(e,"src");try{await u(r,g.F_OK)}catch{throw new Error('Error: "src" folder does not exist.')}let n=p(r,"lib"),s=p(r,"libs"),t;try{await u(n,g.F_OK),t=n}catch{try{await u(s,g.F_OK),t=s}catch{await m(s,{recursive:!0}),console.log("Created ./src/libs folder"),t=s}}let i=p(t,`hot-shot.${o==="ts"?"ts":"js"}`);try{await u(i,g.F_OK),console.log("Required file already exists.")}catch{await P(i,"// hot-shot file"),console.log(`Created hot-shot.${o==="ts"?"ts":"js"} in ${t}`)}}import{parseArgs as D}from"node:util";import l from"fs";import c from"path";function a(o,e=!0){let n=o.split("-").map((s,t)=>t===0?s.toLowerCase():s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()).join("");return e?n.charAt(0).toUpperCase()+n.slice(1):n}function C(o,e){let r=`${a(o)}Router`;return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {CONTROLLER} from "./controller${e}";

export class ${r} {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${o.toLowerCase()}',
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
`}function w(o,e){let r=a(o,!0),n=a(o,!1),s=a(o,!0)+"Services",t=a(o,!1);return`
import type {Context} from "hono";
import {${s}} from "./services${e}";

export class ${r} {
    private readonly services: ${s}

    constructor() {
        this.services = new ${s}()
    }

    ${n} = async (ctx: Context) => {
        return this.services.${t}()
    }
}
`}function d(o,e){let r=a(o,!0)+"Services",n=a(o,!1)+"Message";return`
import {response} from "@a4arpon/hotshot";

export class ${r} {
    async ${n}() {
        return response("Hi from ${o}!");
    }
}
`}async function $(o){console.log("**Step 1: Checking Project Type...**");let e=await E();if(console.log(`Project Type: ${e}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await b())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let n=c.join(process.cwd(),"src","mods");await R(n),console.log("'mods' directory is available.");let s=`${o}-mod`,t=c.join(n,s);l.mkdirSync(t,{recursive:!0});let i=e==="ts"?".ts":".js",j=C(o,i),F=w(o,i),S=d(o,i);l.writeFileSync(c.join(t,`routes${i}`),j),l.writeFileSync(c.join(t,`controller${i}`),F),l.writeFileSync(c.join(t,`services${i}`),S),console.log(`Created: ${c.relative(process.cwd(),c.join(t,`routes${i}`))}`),console.log(`Created: ${c.relative(process.cwd(),c.join(t,`controller${i}`))}`),console.log(`Created: ${c.relative(process.cwd(),c.join(t,`services${i}`))}`)}async function E(){let o=c.join(process.cwd(),"hotshot.config.js");if(console.log(o),!l.existsSync(o))throw new Error("hotshot.config.js not found.");return(await import(o)).HotshotConf.projectType}async function b(){return l.existsSync(c.join(process.cwd(),"src"))}async function R(o){if(!l.existsSync(o))l.mkdirSync(o,{recursive:!0}),console.log(`Created 'ods' directory at: ${o}`)}var{values:x,positionals:f}=D({args:process.argv.slice(2),options:{js:{type:"boolean"},ts:{type:"boolean"}},allowPositionals:!0}),h;if(x.ts)h="ts";else if(x.js)h="js";else if(f[0]!=="g"&&f[0]!=="reload")console.error("Error: Please specify either --js or --ts for non-'g' commands."),process.exit(1);var v=f[0];switch(v){case"reload":if(!h)console.error("Error: Please specify either --js or --ts for 'eload' command."),process.exit(1);console.log(`Reloading with project type: ${h}...`),y(h).then(()=>console.log("Reload complete.")).catch((r)=>{console.error("Error during reload:",r)});break;case"g":let o=f[1],e=f.slice(2);switch(o){case"mod":if(e.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let r=e[0];console.log(`Module name for generation: ${r}`),await $(r);break;default:console.log(`Unknown generate command: ${o}. Usage: hotshot g mod <module_name>`);break}break;default:console.log(`Unknown command: ${v}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name>`);break}
