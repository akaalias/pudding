if(!self.define){let i,e={};const n=(n,d)=>(n=new URL(n+".js",d).href,e[n]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=e,document.head.appendChild(i)}else i=n,importScripts(n),e()})).then((()=>{let i=e[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(d,r)=>{const u=i||("document"in self?document.currentScript.src:"")||location.href;if(e[u])return;let s={};const a=i=>n(i,u),f={module:{uri:u},exports:s,require:a};e[u]=Promise.all(d.map((i=>f[i]||a(i)))).then((i=>(r(...i),s)))}}define(["./workbox-79ffe3e0"],(function(i){"use strict";i.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/pudding/css/app.8c2f42af.css",revision:null},{url:"/pudding/css/chunk-vendors.fb9a43e3.css",revision:null},{url:"/pudding/css/landingpage.bb781ae6.css",revision:null},{url:"/pudding/img/Chainlink.png",revision:"00f1ce43de5e7db95812c5e992460a0b"},{url:"/pudding/img/Curve DAO Token.png",revision:"b492e0503943fdc23f5fdd0a4b3a232a"},{url:"/pudding/img/Dai.png",revision:"a58f4d3f8184ab9a7f97db99a81593b1"},{url:"/pudding/img/Hedron.png",revision:"bc7bb56e53a43b27748b5f503a79d8de"},{url:"/pudding/img/Shiba Inu.png",revision:"cf871758a31b552eb78d551a577a79f5"},{url:"/pudding/img/Tether USD.png",revision:"4474cf59d3639f17af51e74f0ca3c62e"},{url:"/pudding/img/USD Coin.png",revision:"6e855f6e6c210c3206ab47764ff7178f"},{url:"/pudding/img/WBTC.png",revision:"ed327b67fa23ff3cb083893f22b2aa8d"},{url:"/pudding/img/WETH.png",revision:"4bfdd249a3d3fe6bbb5d197d103b01e9"},{url:"/pudding/img/Wrapped Bitcoin.png",revision:"36726d1222e46f2ec73cec9384d1ed56"},{url:"/pudding/img/demo.png",revision:"b1fb6fea84d893193310760b5a548c3b"},{url:"/pudding/img/hairball.png",revision:"ff3cee5ec7538f49a801ef41c051b5d7"},{url:"/pudding/img/hairline-cracks.png",revision:"40ad2a8f33f473f100072e5d1092fe8b"},{url:"/pudding/index.html",revision:"5bb811f9ec2321a21a57c054b61ed2c6"},{url:"/pudding/js/about.e3c75e21.js",revision:null},{url:"/pudding/js/app.ab5d9202.js",revision:null},{url:"/pudding/js/chunk-vendors.e1a5a78f.js",revision:null},{url:"/pudding/js/landingpage.5fb2b3b5.js",revision:null},{url:"/pudding/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/pudding/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
