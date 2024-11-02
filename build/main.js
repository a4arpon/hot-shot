#!/usr/bin/env node
var r=Object.create;var{getPrototypeOf:t,defineProperty:p,getOwnPropertyNames:l}=Object;var m=Object.prototype.hasOwnProperty;var y=($,R,H)=>{H=$!=null?r(t($)):{};let L=R||!$||!$.__esModule?p(H,"default",{value:$,enumerable:!0}):H;for(let W of l($))if(!m.call(L,W))p(L,W,{get:()=>$[W],enumerable:!0});return L};var k=($,R)=>()=>(R||$((R={exports:{}}).exports,R),R.exports);var n=k((H$,h)=>{function s($,R){var H=$;R.slice(0,-1).forEach(function(W){H=H[W]||{}});var L=R[R.length-1];return L in H}function u($){if(typeof $==="number")return!0;if(/^0x[0-9a-f]+$/i.test($))return!0;return/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test($)}function j($,R){return R==="constructor"&&typeof $[R]==="function"||R==="__proto__"}h.exports=function($,R){if(!R)R={};var H={bools:{},strings:{},unknownFn:null};if(typeof R.unknown==="function")H.unknownFn=R.unknown;if(typeof R.boolean==="boolean"&&R.boolean)H.allBools=!0;else[].concat(R.boolean).filter(Boolean).forEach(function(U){H.bools[U]=!0});var L={};function W(U){return L[U].some(function(J){return H.bools[J]})}Object.keys(R.alias||{}).forEach(function(U){L[U]=[].concat(R.alias[U]),L[U].forEach(function(J){L[J]=[U].concat(L[U].filter(function(w){return J!==w}))})}),[].concat(R.string).filter(Boolean).forEach(function(U){if(H.strings[U]=!0,L[U])[].concat(L[U]).forEach(function(J){H.strings[J]=!0})});var C=R.default||{},S={_:[]};function F(U,J){return H.allBools&&/^--[^=]+$/.test(J)||H.strings[U]||H.bools[U]||L[U]}function T(U,J,w){var q=U;for(var A=0;A<J.length-1;A++){var I=J[A];if(j(q,I))return;if(q[I]===void 0)q[I]={};if(q[I]===Object.prototype||q[I]===Number.prototype||q[I]===String.prototype)q[I]={};if(q[I]===Array.prototype)q[I]=[];q=q[I]}var O=J[J.length-1];if(j(q,O))return;if(q===Object.prototype||q===Number.prototype||q===String.prototype)q={};if(q===Array.prototype)q=[];if(q[O]===void 0||H.bools[O]||typeof q[O]==="boolean")q[O]=w;else if(Array.isArray(q[O]))q[O].push(w);else q[O]=[q[O],w]}function Q(U,J,w){if(w&&H.unknownFn&&!F(U,w)){if(H.unknownFn(w)===!1)return}var q=!H.strings[U]&&u(J)?Number(J):J;T(S,U.split("."),q),(L[U]||[]).forEach(function(A){T(S,A.split("."),q)})}Object.keys(H.bools).forEach(function(U){Q(U,C[U]===void 0?!1:C[U])});var b=[];if($.indexOf("--")!==-1)b=$.slice($.indexOf("--")+1),$=$.slice(0,$.indexOf("--"));for(var X=0;X<$.length;X++){var _=$[X],z,G;if(/^--.+=/.test(_)){var P=_.match(/^--([^=]+)=([\s\S]*)$/);z=P[1];var K=P[2];if(H.bools[z])K=K!=="false";Q(z,K,_)}else if(/^--no-.+/.test(_))z=_.match(/^--no-(.+)/)[1],Q(z,!1,_);else if(/^--.+/.test(_))if(z=_.match(/^--(.+)/)[1],G=$[X+1],G!==void 0&&!/^(-|--)[^-]/.test(G)&&!H.bools[z]&&!H.allBools&&(L[z]?!W(z):!0))Q(z,G,_),X+=1;else if(/^(true|false)$/.test(G))Q(z,G==="true",_),X+=1;else Q(z,H.strings[z]?"":!0,_);else if(/^-[^-]+/.test(_)){var M=_.slice(1,-1).split(""),c=!1;for(var Y=0;Y<M.length;Y++){if(G=_.slice(Y+2),G==="-"){Q(M[Y],G,_);continue}if(/[A-Za-z]/.test(M[Y])&&G[0]==="="){Q(M[Y],G.slice(1),_),c=!0;break}if(/[A-Za-z]/.test(M[Y])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(G)){Q(M[Y],G,_),c=!0;break}if(M[Y+1]&&M[Y+1].match(/\W/)){Q(M[Y],_.slice(Y+2),_),c=!0;break}else Q(M[Y],H.strings[M[Y]]?"":!0,_)}if(z=_.slice(-1)[0],!c&&z!=="-")if($[X+1]&&!/^(-|--)[^-]/.test($[X+1])&&!H.bools[z]&&(L[z]?!W(z):!0))Q(z,$[X+1],_),X+=1;else if($[X+1]&&/^(true|false)$/.test($[X+1]))Q(z,$[X+1]==="true",_),X+=1;else Q(z,H.strings[z]?"":!0,_)}else{if(!H.unknownFn||H.unknownFn(_)!==!1)S._.push(H.strings._||!u(_)?_:Number(_));if(R.stopEarly){S._.push.apply(S._,$.slice(X+1));break}}}if(Object.keys(C).forEach(function(U){if(!s(S,U.split(".")))T(S,U.split("."),C[U]),(L[U]||[]).forEach(function(J){T(S,J.split("."),C[U])})}),R["--"])S["--"]=b.slice();else b.forEach(function(U){S._.push(U)});return S}});var i=y(n(),1);import B from"fs";import V from"path";function Z($,R=!0){let L=$.split("-").map((W,C)=>C===0?W.toLowerCase():W.charAt(0).toUpperCase()+W.slice(1).toLowerCase()).join("");return R?L.charAt(0).toUpperCase()+L.slice(1):L}function v($,R){let H=Z($,!0),L=Z($,!0)+"Controller",W=Z($,!1);return`
import type {Hono} from "hono";
import {router, routerContainer} from "@a4arpon/hotshot";
import {${L}} from "./controller";

export class ${H}Router {
    public readonly routes: Hono

    constructor() {
        this.routes = routerContainer({
            routers: [this.defaultRoutes()],
            basePath: '/${$.toLowerCase()}',
        })
    }

    defaultRoutes() {

        const ${Z($,!1)}Controller = new ${L}()

        return router({
            basePath: '/',
            routes: [{
                path: '/',
                method: "GET",
                controller: ${Z($,!1)}Controller.${W}
            }]
        })
    }
}
`}function N($,R){let H=Z($,!0)+"Controller",L=Z($,!1),W=Z($,!0)+"Services",C=Z($,!1);return`
import type {Context} from "hono";
import {${W}} from "./${$}.services";

export class ${H} {
    private readonly ${Z($,!1)}Services: ${W}

    constructor() {
        this.${Z($,!1)}Services = new ${W}()
    }

    ${L} = async (ctx: Context) => {
        return this.${Z($,!1)}Services.${C}()
    }
}
`}function D($){let R=Z($,!0)+"Services",H=Z($,!1);return`
import {response} from "@a4arpon/hotshot";

export class ${R} {
    async ${H}() {
        return response("Hi from ${$}!");
    }
}
`}async function f($){console.log("**Step 1: Checking Project Type...**");let R=await g();if(console.log(`Project Type: ${R}`),console.log("**Step 2: Checking for 'src' Directory...**"),!await a())console.error("Error: 'src' directory not found."),process.exit(1);console.log("Found 'src' directory."),console.log("**Step 3: Checking/Creating 'mods' Directory...**");let L=V.join(process.cwd(),"src","mods");await e(L),console.log("'mods' directory is available.");let W=`${$}-mod`,C=V.join(L,W);B.mkdirSync(C,{recursive:!0});let S=R==="ts"?".ts":".js",F=v($,S),T=N($,S),Q=D($);B.writeFileSync(V.join(C,`routes${S}`),F),B.writeFileSync(V.join(C,`controller${S}`),T),B.writeFileSync(V.join(C,`${$}.services${S}`),Q),await $$($,C),console.log(`Created: ${V.relative(process.cwd(),V.join(C,`routes${S}`))}`),console.log(`Created: ${V.relative(process.cwd(),V.join(C,`controller${S}`))}`),console.log(`Created: ${V.relative(process.cwd(),V.join(C,`${$}.services${S}`))}`)}async function g(){let $=V.join(process.cwd(),"hotshot.config.json");if(console.log($),!B.existsSync($))throw new Error("hotshot.config.json not found.");let R=await B.promises.readFile($,"utf8");return JSON.parse(R).projectType}async function a(){return B.existsSync(V.join(process.cwd(),"src"))}async function e($){if(!B.existsSync($))B.mkdirSync($,{recursive:!0}),console.log(`Created 'mods' directory at: ${$}`)}async function $$($,R){let H=V.join(process.cwd(),"hotshot.config.json"),L=await B.promises.readFile(H,"utf8"),W=JSON.parse(L),C={type:"router",name:$,path:`.${R.replace(process.cwd(),"")}`,contains:["router","controller","services"],services:[`${$}.services`]};if(!W.contains)W.contains={mods:[]};if(!W.contains.mods)W.contains.mods=[];W.contains.mods.push(C);let S=JSON.stringify(W,null,2);B.writeFileSync(H,S)}async function x($,R){console.log(`Module Name: ${$}`),console.log(`Service Name: ${R}`);let H=V.join(process.cwd(),"hotshot.config.json"),L=await B.promises.readFile(H,"utf8"),W=JSON.parse(L),C=W.contains.mods.find((b)=>b.name===$);if(!C){console.error(`Error: Module '${$}' not found in config.`);return}if(C.services.includes(`${R}.services`)){console.error(`Error: Service '${R}' already exists in module '${$}'.`);return}let S=D(R),F=`${R}.services${W.projectType==="ts"?".ts":".js"}`,T=V.join(C.path,F);B.writeFileSync(T,S),console.log(`Created new service file: ${T}`),C.services.push(F.replace(`.${W.projectType}`,""));let Q=JSON.stringify(W,null,2);B.writeFileSync(H,Q),console.log("Updated config file with new service.")}var E=i.default(process.argv.slice(2)),d;if(E.ts)d="ts";else if(E.js)d="js";else if(E._[0]!=="g"&&E._[0]!=="reload")console.error("Error: Please specify either --js or --ts for non-'g' commands."),process.exit(1);var o=E._[0];switch(o){case"reload":console.log("Reloading with project type");break;case"g":let $=E._[1],R=E._.slice(2);switch($){case"mod":if(R.length===0)console.error("Error: Please specify a module name for 'g mod' command."),process.exit(1);let H=R[0];console.log(`Module name for generation: ${H}`),await f(H);break;case"service":if(R.length===0)console.error("Error: Please specify a service name for 'g service' command."),process.exit(1);let L=R[0];if(!E.mod)console.error("Error: Please specify a module name using '--mod' for 'g service' command."),process.exit(1);await x(E.mod,L);break;case"middleware":if(R.length===0)console.error("Error: Please specify a service name for 'g service' command."),process.exit(1);let W=R[0];if(!E.mod)console.error("Error: Please specify a module name using '--mod' for 'g service' command."),process.exit(1);await x(E.mod,W);break;default:console.log(`Unknown generate command: ${$}. Usage: hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);break}break;default:console.log(`Unknown command: ${o}. Usage: 
            hotshot reload --js or --ts
            hotshot g mod <module_name> | hotshot g service <service_name> --mod=<module_name>`);break}
