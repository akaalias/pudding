if(!self.define){let e,n={};const s=(s,i)=>(s=new URL(s+".js",i).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let u={};const l=e=>s(e,r),o={module:{uri:r},exports:u,require:l};n[r]=Promise.all(i.map((e=>o[e]||l(e)))).then((e=>(d(...e),u)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pudding/css/app.cc1f1f3e.css",revision:null},{url:"/pudding/css/chunk-vendors.db1f2f56.css",revision:null},{url:"/pudding/css/landingpage.3e55753c.css",revision:null},{url:"/pudding/index.html",revision:"c590319011d1b3eecd8682e1f4abffaf"},{url:"/pudding/js/about.e3c75e21.js",revision:null},{url:"/pudding/js/app.cf28538d.js",revision:null},{url:"/pudding/js/chunk-vendors.4d8b03f1.js",revision:null},{url:"/pudding/js/landingpage.0b7b3458.js",revision:null},{url:"/pudding/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/pudding/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
