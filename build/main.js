#!/usr/bin/env node
var l=Object.create;var{getPrototypeOf:o,defineProperty:x,getOwnPropertyNames:s}=Object;var r=Object.prototype.hasOwnProperty;var g=($,H,L)=>{L=$!=null?l(o($)):{};let q=H||!$||!$.__esModule?x(L,"default",{value:$,enumerable:!0}):L;for(let U of s($))if(!r.call(q,U))x(q,U,{get:()=>$[U],enumerable:!0});return q};var m=($,H)=>()=>(H||$((H={exports:{}}).exports,H),H.exports);var p=m((q$,h)=>{function t($,H){var L=$;H.slice(0,-1).forEach(function(U){L=L[U]||{}});var q=H[H.length-1];return q in L}function j($){if(typeof $==="number")return!0;if(/^0x[0-9a-f]+$/i.test($))return!0;return/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test($)}function v($,H){return H==="constructor"&&typeof $[H]==="function"||H==="__proto__"}h.exports=function($,H){if(!H)H={};var L={bools:{},strings:{},unknownFn:null};if(typeof H.unknown==="function")L.unknownFn=H.unknown;if(typeof H.boolean==="boolean"&&H.boolean)L.allBools=!0;else[].concat(H.boolean).filter(Boolean).forEach(function(T){L.bools[T]=!0});var q={};function U(T){return q[T].some(function(Q){return L.bools[Q]})}Object.keys(H.alias||{}).forEach(function(T){q[T]=[].concat(H.alias[T]),q[T].forEach(function(Q){q[Q]=[T].concat(q[T].filter(function(M){return Q!==M}))})}),[].concat(H.string).filter(Boolean).forEach(function(T){if(L.strings[T]=!0,q[T])[].concat(q[T]).forEach(function(Q){L.strings[Q]=!0})});var _=H.default||{},G={_:[]};function O(T,Q){return L.allBools&&/^--[^=]+$/.test(Q)||L.strings[T]||L.bools[T]||q[T]}function E(T,Q,M){var z=T;for(var K=0;K<Q.length-1;K++){var I=Q[K];if(v(z,I))return;if(z[I]===void 0)z[I]={};if(z[I]===Object.prototype||z[I]===Number.prototype||z[I]===String.prototype)z[I]={};if(z[I]===Array.prototype)z[I]=[];z=z[I]}var b=Q[Q.length-1];if(v(z,b))return;if(z===Object.prototype||z===Number.prototype||z===String.prototype)z={};if(z===Array.prototype)z=[];if(z[b]===void 0||L.bools[b]||typeof z[b]==="boolean")z[b]=M;else if(Array.isArray(z[b]))z[b].push(M);else z[b]=[z[b],M]}function X(T,Q,M){if(M&&L.unknownFn&&!O(T,M)){if(L.unknownFn(M)===!1)return}var z=!L.strings[T]&&j(Q)?Number(Q):Q;E(G,T.split("."),z),(q[T]||[]).forEach(function(K){E(G,K.split("."),z)})}Object.keys(L.bools).forEach(function(T){X(T,_[T]===void 0?!1:_[T])});var w=[];if($.indexOf("--")!==-1)w=$.slice($.indexOf("--")+1),$=$.slice(0,$.indexOf("--"));for(var B=0;B<$.length;B++){var Y=$[B],J,S;if(/^--.+=/.test(Y)){var P=Y.match(/^--([^=]+)=([\s\S]*)$/);J=P[1];var D=P[2];if(L.bools[J])D=D!=="false";X(J,D,Y)}else if(/^--no-.+/.test(Y))J=Y.match(/^--no-(.+)/)[1],X(J,!1,Y);else if(/^--.+/.test(Y))if(J=Y.match(/^--(.+)/)[1],S=$[B+1],S!==void 0&&!/^(-|--)[^-]/.test(S)&&!L.bools[J]&&!L.allBools&&(q[J]?!U(J):!0))X(J,S,Y),B+=1;else if(/^(true|false)$/.test(S))X(J,S==="true",Y),B+=1;else X(J,L.strings[J]?"":!0,Y);else if(/^-[^-]+/.test(Y)){var C=Y.slice(1,-1).split(""),c=!1;for(var R=0;R<C.length;R++){if(S=Y.slice(R+2),S==="-"){X(C[R],S,Y);continue}if(/[A-Za-z]/.test(C[R])&&S[0]==="="){X(C[R],S.slice(1),Y),c=!0;break}if(/[A-Za-z]/.test(C[R])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(S)){X(C[R],S,Y),c=!0;break}if(C[R+1]&&C[R+1].match(/\W/)){X(C[R],Y.slice(R+2),Y),c=!0;break}else X(C[R],L.strings[C[R]]?"":!0,Y)}if(J=Y.slice(-1)[0],!c&&J!=="-")if($[B+1]&&!/^(-|--)[^-]/.test($[B+1])&&!L.bools[J]&&(q[J]?!U(J):!0))X(J,$[B+1],Y),B+=1;else if($[B+1]&&/^(true|false)$/.test($[B+1]))X(J,$[B+1]==="true",Y),B+=1;else X(J,L.strings[J]?"":!0,Y)}else{if(!L.unknownFn||L.unknownFn(Y)!==!1)G._.push(L.strings._||!j(Y)?Y:Number(Y));if(H.stopEarly){G._.push.apply(G._,$.slice(B+1));break}}}if(Object.keys(_).forEach(function(T){if(!t(G,T.split(".")))E(G,T.split("."),_[T]),(q[T]||[]).forEach(function(Q){E(G,Q.split("."),_[T])})}),H["--"])G["--"]=w.slice();else w.forEach(function(T){G._.push(T)});return G}});var k=g(p(),1);import W from"node:fs";import V from"node:path";function Z($,H=!0){let q=$.split("-").map((U,_)=>_===0?U.toLowerCase():U.charAt(0).toUpperCase()+U.slice(1).toLowerCase()).join("");return H?q.charAt(0).toUpperCase()+q.slice(1):q}function u($,H){let L=Z($,!0),q=`${Z($,!0)}Controller`,U=Z($,!1);return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${q}} from "./controller";

export class ${L}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${$.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${Z($,!1)}Controller = new ${q}()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: ${Z($,!1)}Controller.${U}
            }]
        })
    }
}
`}function f($,H){let L=`${Z($,!0)}Controller`,q=Z($,!1),U=`${Z($,!0)}Services`,_=Z($,!1);return`
import type {Context} from "hono";
import {${U}} from "./${$}.services";

export class ${L} {
    private readonly ${Z($,!1)}Services: ${U}

    constructor() {
        this.${Z($,!1)}Services = new ${U}()
    }

    ${q} = async (ctx: Context) => {
        return this.${Z($,!1)}Services.${_}()
    }
}
`}function F($){let H=`${Z($,!0)}Services`,L=Z($,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${H} {
    async ${L}() {
        return response("Hi from ${$}!");
    }
}
`}function N($){let H=`${Z($,!0)}Middleware`;return`
import { type UseGuard, HTTPStatus } from "@a4arpon/hotshot";

export class ${H} implements UseGuard {
  async use(ctx: Context, next: Next) {
    if (ctx.req.path === "/${$.toLowerCase()}-middleware") {
      throw new HTTPException(HTTPStatus.BadRequest, {
        message: "You're hitting on a dummy route",
      });
    }

    console.log("${H} Activated On", ctx.req.path);
    await next();
  }
}`}async function n($){console.log("**Step 1: Checking Project Type...**");let H=await a();if(console.log(`Project Type: ${H}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await e())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let q=V.join(process.cwd(),"src","mods");await $$(q),console.log("'mods' directory is available.");let U=`${$}-mod`,_=V.join(q,U);W.mkdirSync(_,{recursive:!0});let G=H==="ts"?".ts":".js",O=u($,G),E=f($,G),X=F($);W.writeFileSync(V.join(_,`routes${G}`),O),W.writeFileSync(V.join(_,`controller${G}`),E),W.writeFileSync(V.join(_,`${$}.services${G}`),X),await H$($,_),console.log(`Created: ${V.relative(process.cwd(),V.join(_,`routes${G}`))}`),console.log(`Created: ${V.relative(process.cwd(),V.join(_,`controller${G}`))}`),console.log(`Created: ${V.relative(process.cwd(),V.join(_,`${$}.services${G}`))}`)}async function a(){let $=V.join(process.cwd(),"hotshot.config.json");if(console.log($),!W.existsSync($))throw new Error("hotshot.config.json not found.");let H=await W.promises.readFile($,"utf8");return JSON.parse(H).projectType}async function e(){return W.existsSync(V.join(process.cwd(),"src"))}async function $$($){if(!W.existsSync($))W.mkdirSync($,{recursive:!0}),console.log(`Created 'mods' directory at: ${$}`)}async function H$($,H){let L=V.join(process.cwd(),"hotshot.config.json"),q=await W.promises.readFile(L,"utf8"),U=JSON.parse(q),_={type:"router",name:$,path:`.${H.replace(process.cwd(),"")}`,contains:["router","controller","services"],services:[`${$}.services`]};if(!U.contains)U.contains={mods:[]};if(!U.contains.mods)U.contains.mods=[];U.contains.mods.push(_);let G=JSON.stringify(U,null,2);W.writeFileSync(L,G)}async function d($,H){console.log(`Module Name: ${$}`),console.log(`Service Name: ${H}`);let L=V.join(process.cwd(),"hotshot.config.json"),q=await W.promises.readFile(L,"utf8"),U=JSON.parse(q),_=U.contains.mods.find((w)=>w.name===$);if(!_){console.error(`Error: Module '${$}' not found in config.`);return}if(_.services.includes(`${H}.services`)){console.error(`Error: Service '${H}' already exists in module '${$}'.`);return}let G=F(H),O=`${H}.services${U.projectType==="ts"?".ts":".js"}`,E=V.join(_.path,O);W.writeFileSync(E,G),console.log(`Created new service file: ${E}`),_.services.push(O.replace(`.${U.projectType}`,""));let X=JSON.stringify(U,null,2);W.writeFileSync(L,X),console.log("Updated config file with new service.")}async function y($){console.log(`Middleware Name: ${$}`);let H=V.join(process.cwd(),"hotshot.config.json"),L=await W.promises.readFile(H,"utf8"),q=JSON.parse(L),U=N($),_=`${$}.middleware${q.projectType==="ts"?".ts":".js"}`,G=V.join("./src","middlewares"),O=V.join(G,_);if(!W.existsSync(G))W.mkdirSync(G,{recursive:!0}),console.log(`Created directory: ${G}`);if(W.writeFileSync(O,U),console.log(`Created new middleware file: ${O}`),!q.contains.middlewares)q.contains.middlewares=[];q.contains.middlewares.push({name:$,path:`./src/middlewares/${_.replace(`.${q.projectType}`,"")}
    )}`});let E=JSON.stringify(q,null,2);W.writeFileSync(H,E),console.log("Updated config file with new middleware.")}var A=k.default(process.argv.slice(2)),i=A._[0];switch(i){case"reload":console.log("Reloading with project type");break;case"g":{let $=A._[1],H=A._.slice(2);switch($){case"mod":{if(H.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let L=H[0];console.log(`Module name for generation: ${L}`),await n(L);break}case"service":{if(H.length===0)console.error("Error: Please specify a service name for 'g service' command."),process.exit(1);let L=H[0];if(!A.mod)console.error("Error: Please specify a module name using '--mod' for 'g service' command."),process.exit(1);await d(A.mod,L);break}case"guard":{if(H.length===0)console.error("Error: Please specify a guard name for 'g guard' command."),process.exit(1);let L=H[0];await y(L);break}default:console.log(`Unknown generate command: ${$}. Usage: hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name> | hotshot g middleware <middleware_name> --mod=<module_name>`);break}break}default:console.log(`Unknown command: ${i}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);break}
