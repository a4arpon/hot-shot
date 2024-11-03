#!/usr/bin/env node
var r=Object.create;var{getPrototypeOf:g,defineProperty:w,getOwnPropertyNames:m}=Object;var a=Object.prototype.hasOwnProperty;var e=($,b,T)=>{T=$!=null?r(g($)):{};let J=b||!$||!$.__esModule?w(T,"default",{value:$,enumerable:!0}):T;for(let G of m($))if(!a.call(J,G))w(J,G,{get:()=>$[G],enumerable:!0});return J};var $$=($,b)=>()=>(b||$((b={exports:{}}).exports,b),b.exports);var h=$$((L$,D)=>{function b$($,b){var T=$;b.slice(0,-1).forEach(function(G){T=T[G]||{}});var J=b[b.length-1];return J in T}function p($){if(typeof $==="number")return!0;if(/^0x[0-9a-f]+$/i.test($))return!0;return/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test($)}function P($,b){return b==="constructor"&&typeof $[b]==="function"||b==="__proto__"}D.exports=function($,b){if(!b)b={};var T={bools:{},strings:{},unknownFn:null};if(typeof b.unknown==="function")T.unknownFn=b.unknown;if(typeof b.boolean==="boolean"&&b.boolean)T.allBools=!0;else[].concat(b.boolean).filter(Boolean).forEach(function(H){T.bools[H]=!0});var J={};function G(H){return J[H].some(function(V){return T.bools[V]})}Object.keys(b.alias||{}).forEach(function(H){J[H]=[].concat(b.alias[H]),J[H].forEach(function(V){J[V]=[H].concat(J[H].filter(function(O){return V!==O}))})}),[].concat(b.string).filter(Boolean).forEach(function(H){if(T.strings[H]=!0,J[H])[].concat(J[H]).forEach(function(V){T.strings[V]=!0})});var L=b.default||{},Q={_:[]};function X(H,V){return T.allBools&&/^--[^=]+$/.test(V)||T.strings[H]||T.bools[H]||J[H]}function Z(H,V,O){var U=H;for(var K=0;K<V.length-1;K++){var C=V[K];if(P(U,C))return;if(U[C]===void 0)U[C]={};if(U[C]===Object.prototype||U[C]===Number.prototype||U[C]===String.prototype)U[C]={};if(U[C]===Array.prototype)U[C]=[];U=U[C]}var M=V[V.length-1];if(P(U,M))return;if(U===Object.prototype||U===Number.prototype||U===String.prototype)U={};if(U===Array.prototype)U=[];if(U[M]===void 0||T.bools[M]||typeof U[M]==="boolean")U[M]=O;else if(Array.isArray(U[M]))U[M].push(O);else U[M]=[U[M],O]}function _(H,V,O){if(O&&T.unknownFn&&!X(H,O)){if(T.unknownFn(O)===!1)return}var U=!T.strings[H]&&p(V)?Number(V):V;Z(Q,H.split("."),U),(J[H]||[]).forEach(function(K){Z(Q,K.split("."),U)})}Object.keys(T.bools).forEach(function(H){_(H,L[H]===void 0?!1:L[H])});var c=[];if($.indexOf("--")!==-1)c=$.slice($.indexOf("--")+1),$=$.slice(0,$.indexOf("--"));for(var B=0;B<$.length;B++){var q=$[B],Y,S;if(/^--.+=/.test(q)){var F=q.match(/^--([^=]+)=([\s\S]*)$/);Y=F[1];var u=F[2];if(T.bools[Y])u=u!=="false";_(Y,u,q)}else if(/^--no-.+/.test(q))Y=q.match(/^--no-(.+)/)[1],_(Y,!1,q);else if(/^--.+/.test(q))if(Y=q.match(/^--(.+)/)[1],S=$[B+1],S!==void 0&&!/^(-|--)[^-]/.test(S)&&!T.bools[Y]&&!T.allBools&&(J[Y]?!G(Y):!0))_(Y,S,q),B+=1;else if(/^(true|false)$/.test(S))_(Y,S==="true",q),B+=1;else _(Y,T.strings[Y]?"":!0,q);else if(/^-[^-]+/.test(q)){var I=q.slice(1,-1).split(""),j=!1;for(var E=0;E<I.length;E++){if(S=q.slice(E+2),S==="-"){_(I[E],S,q);continue}if(/[A-Za-z]/.test(I[E])&&S[0]==="="){_(I[E],S.slice(1),q),j=!0;break}if(/[A-Za-z]/.test(I[E])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(S)){_(I[E],S,q),j=!0;break}if(I[E+1]&&I[E+1].match(/\W/)){_(I[E],q.slice(E+2),q),j=!0;break}else _(I[E],T.strings[I[E]]?"":!0,q)}if(Y=q.slice(-1)[0],!j&&Y!=="-")if($[B+1]&&!/^(-|--)[^-]/.test($[B+1])&&!T.bools[Y]&&(J[Y]?!G(Y):!0))_(Y,$[B+1],q),B+=1;else if($[B+1]&&/^(true|false)$/.test($[B+1]))_(Y,$[B+1]==="true",q),B+=1;else _(Y,T.strings[Y]?"":!0,q)}else{if(!T.unknownFn||T.unknownFn(q)!==!1)Q._.push(T.strings._||!p(q)?q:Number(q));if(b.stopEarly){Q._.push.apply(Q._,$.slice(B+1));break}}}if(Object.keys(L).forEach(function(H){if(!b$(Q,H.split(".")))Z(Q,H.split("."),L[H]),(J[H]||[]).forEach(function(V){Z(Q,V.split("."),L[H])})}),b["--"])Q["--"]=c.slice();else c.forEach(function(H){Q._.push(H)});return Q}});var t=e(h(),1);import W from"node:fs";import R from"node:path";function z($,b=!0){let J=$.split("-").map((G,L)=>L===0?G.toLowerCase():G.charAt(0).toUpperCase()+G.slice(1).toLowerCase()).join("");return b?J.charAt(0).toUpperCase()+J.slice(1):J}function v($,b){let T=z($,!0),J=`${z($,!0)}Controller`,G=z($,!1);return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${J}} from "./controller";

export class ${T}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${$.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${z($,!1)}Controller = new ${J}()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: ${z($,!1)}Controller.${G}
            }]
        })
    }
}
`}function n($,b){let T=`${z($,!0)}Controller`,J=z($,!1),G=`${z($,!0)}Services`,L=z($,!1);return`
import type {Context} from "hono";
import {${G}} from "./${$}.services";

export class ${T} {
    private readonly ${z($,!1)}Services: ${G}

    constructor() {
        this.${z($,!1)}Services = new ${G}()
    }

    ${J} = async (ctx: Context) => {
        return this.${z($,!1)}Services.${L}()
    }
}
`}function x($){let b=`${z($,!0)}Services`,T=z($,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${b} {
    async ${T}() {
        return response("Hi from ${$}!");
    }
}
`}function f($){let b=`${z($,!0)}Guard`;return`
import { type UseGuard, HTTPStatus } from "@a4arpon/hotshot";
import type {Context, Next} from "hono";

export class ${b} implements UseGuard {
  async use(ctx: Context, next: Next) {
    if (ctx.req.path === "/${$.toLowerCase()}-guard") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${b} Activated On", ctx.req.path);
    await next();
  }
}`}function N($){let b=`${z($,!0)}Queue`;return`
import { type Job, Worker } from "bullmq"
import { ${z($,!1)}Queue, redis } from "#libs/conn"

export class ${b}Worker {
  public readonly worker: Worker

  constructor() {
    this.worker = new Worker(
      mailQueue.name,
      async (job: Job) => this.processing(job),
      {
        autorun: false,
        connection: redis,
      },
    )

    this.worker.on("ready", this.ready)
    this.worker.on("failed", (job, err) => this.failed(err, job))
    this.worker.on("completed", (job) => this.completed(job))
  }

  private failed(err: Error, job?: Job) {
    if (job) {
      console.error(${$}Queue.name, "Job Failed :", job.id, err)
    } else {
      console.error(mailQueue.name, "Job Not Found :", err)
    }
  }

  private ready = () => {
    console.log(${$}Queue.name, "Ready...")
  }

  private completed(job: Job) {
    console.log(${$}Queue.name, "Job Completed :", job.id)
  }

  /*
   * ---------------------------------------------------------------------
   * Queue Processing Function
   *
   * This function is called by the queue worker when a job is processed.
   * The job is passed as a parameter.
   * Write your processing logic here.
   * ---------------------------------------------------------------------
   */

  private async processing(job: Job) {
    console.log(job.data)
  }
}
`}function s($){return`
  import { cacheNameGen, cacheResponse } from "#libs/ioredis-json"

export class ${`${z($,!0)}CacheDriver`} {
  public readonly cachePartition = "${z($,!1)}-cache"

  async create<T>(key: string, payload: T) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async get(key: string) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async update<T>(key: string, payload: T) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }

  async delete(key: string) {
    return cacheResponse(
      cacheNameGen(this.cachePartition, key),
      null,
      false,
    )
  }
}
`}async function o($){console.log("**Step 1: Checking Project Type...**");let b=await T$();if(console.log(`Project Type: ${b}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await J$())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let J=R.join(process.cwd(),"src","mods");await Q$(J),console.log("'mods' directory is available.");let G=`${$}-mod`,L=R.join(J,G);W.mkdirSync(L,{recursive:!0});let Q=b==="ts"?".ts":".js",X=v($,Q),Z=n($,Q),_=x($);W.writeFileSync(R.join(L,`routes${Q}`),X),W.writeFileSync(R.join(L,`controller${Q}`),Z),W.writeFileSync(R.join(L,`${$}.services${Q}`),_),await G$($,L),console.log(`Created: ${R.relative(process.cwd(),R.join(L,`routes${Q}`))}`),console.log(`Created: ${R.relative(process.cwd(),R.join(L,`controller${Q}`))}`),console.log(`Created: ${R.relative(process.cwd(),R.join(L,`${$}.services${Q}`))}`)}async function T$(){let $=R.join(process.cwd(),"hotshot.config.json");if(console.log($),!W.existsSync($))throw new Error("hotshot.config.json not found.");let b=await W.promises.readFile($,"utf8");return JSON.parse(b).projectType}async function J$(){return W.existsSync(R.join(process.cwd(),"src"))}async function Q$($){if(!W.existsSync($))W.mkdirSync($,{recursive:!0}),console.log(`Created 'mods' directory at: ${$}`)}async function G$($,b){let T=R.join(process.cwd(),"hotshot.config.json"),J=await W.promises.readFile(T,"utf8"),G=JSON.parse(J),L={type:"router",name:$,path:`.${b.replace(process.cwd(),"")}`,contains:["router","controller","services"],services:[`${$}.services`]};if(!G.contains)G.contains={mods:[]};if(!G.contains.mods)G.contains.mods=[];G.contains.mods.push(L);let Q=JSON.stringify(G,null,2);W.writeFileSync(T,Q)}async function l($,b){console.log(`Module Name: ${$}`),console.log(`Service Name: ${b}`);let T=R.join(process.cwd(),"hotshot.config.json"),J=await W.promises.readFile(T,"utf8"),G=JSON.parse(J),L=G.contains?.mods?.find((c)=>c.name===$);if(!L){console.error(`Error: Module '${$}' not found in config.`);return}if(L.services.includes(`${b}.services`)){console.error(`Error: Service '${b}' already exists in module '${$}'.`);return}let Q=x(b),X=`${b}.services${G.projectType==="ts"?".ts":".js"}`,Z=R.join(L.path,X);W.writeFileSync(Z,Q),console.log(`Created new service file: ${Z}`),L.services.push(X.replace(`.${G.projectType}`,""));let _=JSON.stringify(G,null,2);W.writeFileSync(T,_),console.log("Updated config file with new service.")}async function y($){console.log(`UseGuard Name: ${$}`);let b=R.join(process.cwd(),"hotshot.config.json"),T=await W.promises.readFile(b,"utf8"),J=JSON.parse(T),G=f($),L=`${$}.guard${J.projectType==="ts"?".ts":".js"}`,Q=R.join("./src","use-guards"),X=R.join(Q,L);if(!W.existsSync(Q))W.mkdirSync(Q,{recursive:!0}),console.log(`Created directory: ${Q}`);if(J.contains?.useGuards?.find((_)=>_.name===$)){console.error(`Error: UseGuard '${$}' already exists in config.`);return}if(W.writeFileSync(X,G),console.log(`Created new useGuard file: ${X}`),!J.contains.useGuards)J.contains.useGuards=[];J.contains.useGuards.push({name:$,path:`./src/use-guards/${L.replace(`.${J.projectType}`,"")}`});let Z=JSON.stringify(J,null,2);W.writeFileSync(b,Z),console.log("Updated config file with new middleware.")}async function d($){console.log(`Worker Name: ${$}`);let b=R.join(process.cwd(),"hotshot.config.json"),T=await W.promises.readFile(b,"utf8"),J=JSON.parse(T),G=N($),L=`${$}.worker${J.projectType==="ts"?".ts":".js"}`,Q=R.join("./src","queues"),X=R.join(Q,L);if(!W.existsSync(Q))W.mkdirSync(Q,{recursive:!0}),console.log(`Created directory: ${Q}`);if(J.contains?.queues?.find((_)=>_.name===$)){console.error(`Error: Worker '${$}' already exists in config.`);return}if(W.writeFileSync(X,G),console.log(`Created new worker file: ${X}`),!J.contains.queues)J.contains.queues=[];J.contains.queues.push({core:"Redis",engine:"BullMQ",name:$,path:`./src/queues/${L.replace(`.${J.projectType}`,"")}`});let Z=JSON.stringify(J,null,2);W.writeFileSync(b,Z),console.log("Updated config file with new worker.")}async function i($){console.log(`Cache Driver Name: ${$}`);let b=R.join(process.cwd(),"hotshot.config.json"),T=await W.promises.readFile(b,"utf8"),J=JSON.parse(T),G=s($),L=`${$}.cache${J.projectType==="ts"?".ts":".js"}`,Q=R.join("./src","cache-drivers"),X=R.join(Q,L);if(!W.existsSync(Q))W.mkdirSync(Q,{recursive:!0}),console.log(`Created directory: ${Q}`);if(J.contains?.cacheDrivers?.find((_)=>_.name===$)){console.error(`Error: Cache Driver '${$}' already exists in config.`);return}if(W.writeFileSync(X,G),console.log(`Created new cache driver file: ${X}`),!J.contains.cacheDrivers)J.contains.cacheDrivers=[];J.contains.cacheDrivers.push({core:"Redis",name:$,path:`./src/cache-drivers/${L.replace(`.${J.projectType}`,"")}`});let Z=JSON.stringify(J,null,2);W.writeFileSync(b,Z),console.log("Updated config file with new cache driver.")}var A=t.default(process.argv.slice(2)),k=A._[0];switch(k){case"reload":console.log("Reloading with project type");break;case"g":{let $=A._[1],b=A._.slice(2);switch($){case"mod":{if(b.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let T=b[0];console.log(`Module name for generation: ${T}`),await o(T);break}case"service":{if(b.length===0)console.error("Error: Please specify a service name for 'g service' command."),process.exit(1);let T=b[0];if(!A.mod)console.error("Error: Please specify a module name using '--mod' for 'g service' command."),process.exit(1);await l(A.mod,T);break}case"guard":{if(b.length===0)console.error("Error: Please specify a guard name for 'g guard' command."),process.exit(1);let T=b[0];await y(T);break}case"queue":{if(b.length===0)console.error("Error: Please specify a queue name for 'g queue' command."),process.exit(1);let T=b[0];await d(T);break}case"cache":{if(b.length===0)console.error("Error: Please specify a cache driver name for 'g cache' command."),process.exit(1);let T=b[0];await i(T);break}default:console.log(`Unknown generate command: ${$}. Usage: 
          hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name> | hotshot g guard <guard_name> | hotshot g queue <queue_name> | hotshot g cache <cache_driver_name>`);break}break}default:console.log(`Unknown command: ${k}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);break}
