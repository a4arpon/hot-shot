#!/usr/bin/env node
import{access as p,mkdir as b,writeFile as m}from"node:fs/promises";import{constants as u}from"node:fs";import{join as $}from"node:path";async function C(t){let r=process.cwd(),o=$(r,"src");try{await p(o,u.F_OK)}catch{throw new Error('Error: "src" folder does not exist.')}let n=$(o,"lib"),s=$(o,"libs"),e;try{await p(n,u.F_OK),e=n}catch{try{await p(s,u.F_OK),e=s}catch{await b(s,{recursive:!0}),console.log("Created ./src/libs folder"),e=s}}let l=$(e,`hot-shot.${t==="ts"?"ts":"js"}`);try{await p(l,u.F_OK),console.log("Required file already exists.")}catch{await m(l,"// hot-shot file"),console.log(`Created hot-shot.${t==="ts"?"ts":"js"} in ${e}`)}}import{parseArgs as R}from"node:util";import a from"fs";import i from"path";function c(t,r=!0){let n=t.split("-").map((s,e)=>e===0?s.toLowerCase():s.charAt(0).toUpperCase()+s.slice(1).toLowerCase()).join("");return r?n.charAt(0).toUpperCase()+n.slice(1):n}function y(t,r){let o=c(t,!0),n=c(t,!0)+"Controller",s=c(t,!1);return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${n}} from "./controller${r}";

export class ${o}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${t.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${c(t,!1)}Controller = new ${n}()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: ${c(t,!1)}Controller.${s}
            }]
        })
    }
}
`}function w(t,r){let o=c(t,!0)+"Controller",n=c(t,!1),s=c(t,!0)+"Services",e=c(t,!1);return`
import type {Context} from "hono";
import {${s}} from "./services${r}";

export class ${o} {
    private readonly ${c(t,!1)}Services: ${s}

    constructor() {
        this.${c(t,!1)}Services = new ${s}()
    }

    ${n} = async (ctx: Context) => {
        return this.${c(t,!1)}Services.${e}()
    }
}
`}function x(t){let r=c(t,!0)+"Services",o=c(t,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${r} {
    async ${o}() {
        return response("Hi from ${t}!");
    }
}
`}import*as g from"node:vm";async function d(t){console.log("**Step 1: Checking Project Type...**");let r=await D();if(console.log(`Project Type: ${r}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await k())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let n=i.join(process.cwd(),"src","mods");await E(n),console.log("'mods' directory is available.");let s=`${t}-mod`,e=i.join(n,s);a.mkdirSync(e,{recursive:!0});let l=r==="ts"?".ts":".js",S=y(t,l),j=w(t,l),P=x(t);a.writeFileSync(i.join(e,`routes${l}`),S),a.writeFileSync(i.join(e,`controller${l}`),j),a.writeFileSync(i.join(e,`services${l}`),P),console.log(`Created: ${i.relative(process.cwd(),i.join(e,`routes${l}`))}`),console.log(`Created: ${i.relative(process.cwd(),i.join(e,`controller${l}`))}`),console.log(`Created: ${i.relative(process.cwd(),i.join(e,`services${l}`))}`)}async function D(){let t=i.join(process.cwd(),"hotshot.config.js");if(console.log(t),!a.existsSync(t))throw new Error("hotshot.config.js not found.");let r=await a.promises.readFile(t,"utf8"),o={module:{exports:{}}};return g.createContext(o),g.runInContext(r,o),o.module.exports.HotshotConf.projectType}async function k(){return a.existsSync(i.join(process.cwd(),"src"))}async function E(t){if(!a.existsSync(t))a.mkdirSync(t,{recursive:!0}),console.log(`Created 'ods' directory at: ${t}`)}var{values:v,positionals:h}=R({args:process.argv.slice(2),options:{js:{type:"boolean"},ts:{type:"boolean"}},allowPositionals:!0}),f;if(v.ts)f="ts";else if(v.js)f="js";else if(h[0]!=="g"&&h[0]!=="reload")console.error("Error: Please specify either --js or --ts for non-'g' commands."),process.exit(1);var F=h[0];switch(F){case"reload":if(!f)console.error("Error: Please specify either --js or --ts for 'eload' command."),process.exit(1);console.log(`Reloading with project type: ${f}...`),C(f).then(()=>console.log("Reload complete.")).catch((o)=>{console.error("Error during reload:",o)});break;case"g":let t=h[1],r=h.slice(2);switch(t){case"mod":if(r.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let o=r[0];console.log(`Module name for generation: ${o}`),await d(o);break;default:console.log(`Unknown generate command: ${t}. Usage: hotshot g mod <module_name>`);break}break;default:console.log(`Unknown command: ${F}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name>`);break}
