#!/usr/bin/env node
import{access as p,mkdir as b,writeFile as m}from"node:fs/promises";import{constants as u}from"node:fs";import{join as g}from"node:path";async function $(t){let s=process.cwd(),o=g(s,"src");try{await p(o,u.F_OK)}catch{throw new Error('Error: "src" folder does not exist.')}let n=g(o,"lib"),e=g(o,"libs"),r;try{await p(n,u.F_OK),r=n}catch{try{await p(e,u.F_OK),r=e}catch{await b(e,{recursive:!0}),console.log("Created ./src/libs folder"),r=e}}let l=g(r,`hot-shot.${t==="ts"?"ts":"js"}`);try{await p(l,u.F_OK),console.log("Required file already exists.")}catch{await m(l,"// hot-shot file"),console.log(`Created hot-shot.${t==="ts"?"ts":"js"} in ${r}`)}}import{parseArgs as _}from"node:util";import a from"fs";import i from"path";function c(t,s=!0){let n=t.split("-").map((e,r)=>r===0?e.toLowerCase():e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join("");return s?n.charAt(0).toUpperCase()+n.slice(1):n}function y(t,s){let o=c(t,!0),n=c(t,!0)+"Controller",e=c(t,!1);return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${n}} from "./controller";

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
                controller: ${c(t,!1)}Controller.${e}
            }]
        })
    }
}
`}function w(t,s){let o=c(t,!0)+"Controller",n=c(t,!1),e=c(t,!0)+"Services",r=c(t,!1);return`
import type {Context} from "hono";
import {${e}} from "./services";

export class ${o} {
    private readonly ${c(t,!1)}Services: ${e}

    constructor() {
        this.${c(t,!1)}Services = new ${e}()
    }

    ${n} = async (ctx: Context) => {
        return this.${c(t,!1)}Services.${r}()
    }
}
`}function x(t){let s=c(t,!0)+"Services",o=c(t,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${s} {
    async ${o}() {
        return response("Hi from ${t}!");
    }
}
`}import*as C from"node:vm";async function d(t){console.log("**Step 1: Checking Project Type...**");let s=await E();if(console.log(`Project Type: ${s}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await D())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let n=i.join(process.cwd(),"src","mods");await k(n),console.log("'mods' directory is available.");let e=`${t}-mod`,r=i.join(n,e);a.mkdirSync(r,{recursive:!0});let l=s==="ts"?".ts":".js",S=y(t,l),j=w(t,l),P=x(t);a.writeFileSync(i.join(r,`routes${l}`),S),a.writeFileSync(i.join(r,`controller${l}`),j),a.writeFileSync(i.join(r,`services${l}`),P),console.log(`Created: ${i.relative(process.cwd(),i.join(r,`routes${l}`))}`),console.log(`Created: ${i.relative(process.cwd(),i.join(r,`controller${l}`))}`),console.log(`Created: ${i.relative(process.cwd(),i.join(r,`services${l}`))}`)}async function E(){let t=i.join(process.cwd(),"hotshot.config.js");if(console.log(t),!a.existsSync(t))throw new Error("hotshot.config.js not found.");let s=await a.promises.readFile(t,"utf8"),o={module:{exports:{}}};return C.createContext(o),C.runInContext(s,o),o.module.exports.HotshotConf.projectType}async function D(){return a.existsSync(i.join(process.cwd(),"src"))}async function k(t){if(!a.existsSync(t))a.mkdirSync(t,{recursive:!0}),console.log(`Created 'ods' directory at: ${t}`)}var{values:v,positionals:h}=_({args:process.argv.slice(2),options:{js:{type:"boolean"},ts:{type:"boolean"}},allowPositionals:!0}),f;if(v.ts)f="ts";else if(v.js)f="js";else if(h[0]!=="g"&&h[0]!=="reload")console.error("Error: Please specify either --js or --ts for non-'g' commands."),process.exit(1);var F=h[0];switch(F){case"reload":if(!f)console.error("Error: Please specify either --js or --ts for 'eload' command."),process.exit(1);console.log(`Reloading with project type: ${f}...`),$(f).then(()=>console.log("Reload complete.")).catch((o)=>{console.error("Error during reload:",o)});break;case"g":let t=h[1],s=h.slice(2);switch(t){case"mod":if(s.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let o=s[0];console.log(`Module name for generation: ${o}`),await d(o);break;default:console.log(`Unknown generate command: ${t}. Usage: hotshot g mod <module_name>`);break}break;default:console.log(`Unknown command: ${F}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name>`);break}
