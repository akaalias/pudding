if(!self.define){let e,i={};const n=(n,d)=>(n=new URL(n+".js",d).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(d,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let u={};const l=e=>n(e,s),o={module:{uri:s},exports:u,require:l};i[s]=Promise.all(d.map((e=>o[e]||l(e)))).then((e=>(r(...e),u)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pudding/css/app.8c2f42af.css",revision:null},{url:"/pudding/css/chunk-vendors.fb9a43e3.css",revision:null},{url:"/pudding/css/landingpage.35b65c4b.css",revision:null},{url:"/pudding/img/Dai.png",revision:"a58f4d3f8184ab9a7f97db99a81593b1"},{url:"/pudding/img/Hedron.png",revision:"bc7bb56e53a43b27748b5f503a79d8de"},{url:"/pudding/img/Tether USD.png",revision:"4474cf59d3639f17af51e74f0ca3c62e"},{url:"/pudding/img/USD Coin.png",revision:"6e855f6e6c210c3206ab47764ff7178f"},{url:"/pudding/img/WBTC.png",revision:"ed327b67fa23ff3cb083893f22b2aa8d"},{url:"/pudding/img/WETH.png",revision:"4bfdd249a3d3fe6bbb5d197d103b01e9"},{url:"/pudding/img/demo.png",revision:"a56e1c118d3429140a60add38700e08b"},{url:"/pudding/img/hairball.png",revision:"ff3cee5ec7538f49a801ef41c051b5d7"},{url:"/pudding/img/hairline-cracks.png",revision:"40ad2a8f33f473f100072e5d1092fe8b"},{url:"/pudding/index.html",revision:"ded25c986d45e58af0461171a334eca9"},{url:"/pudding/js/about.e3c75e21.js",revision:null},{url:"/pudding/js/app.b2850fa1.js",revision:null},{url:"/pudding/js/chunk-vendors.79b3b2e6.js",revision:null},{url:"/pudding/js/landingpage.dd637298.js",revision:null},{url:"/pudding/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/pudding/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
