if(!self.define){let i,e={};const n=(n,d)=>(n=new URL(n+".js",d).href,e[n]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=e,document.head.appendChild(i)}else i=n,importScripts(n),e()})).then((()=>{let i=e[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(d,r)=>{const s=i||("document"in self?document.currentScript.src:"")||location.href;if(e[s])return;let u={};const g=i=>n(i,s),a={module:{uri:s},exports:u,require:g};e[s]=Promise.all(d.map((i=>a[i]||g(i)))).then((i=>(r(...i),u)))}}define(["./workbox-79ffe3e0"],(function(i){"use strict";i.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/pudding/css/about.6a44c0e1.css",revision:null},{url:"/pudding/css/app.c3b84cd7.css",revision:null},{url:"/pudding/css/chunk-vendors.e0ba7260.css",revision:null},{url:"/pudding/css/landingpage.a5e9f1f3.css",revision:null},{url:"/pudding/img/Chainlink.png",revision:"00f1ce43de5e7db95812c5e992460a0b"},{url:"/pudding/img/Curve DAO Token.png",revision:"b492e0503943fdc23f5fdd0a4b3a232a"},{url:"/pudding/img/Dai.png",revision:"a58f4d3f8184ab9a7f97db99a81593b1"},{url:"/pudding/img/Hedron.png",revision:"bc7bb56e53a43b27748b5f503a79d8de"},{url:"/pudding/img/Shiba Inu.png",revision:"cf871758a31b552eb78d551a577a79f5"},{url:"/pudding/img/Tether USD.png",revision:"4474cf59d3639f17af51e74f0ca3c62e"},{url:"/pudding/img/USD Coin.png",revision:"6e855f6e6c210c3206ab47764ff7178f"},{url:"/pudding/img/USDC-14MM.png",revision:"b67e028304514432999709baa25f6b28"},{url:"/pudding/img/WBTC.png",revision:"ed327b67fa23ff3cb083893f22b2aa8d"},{url:"/pudding/img/WETH.png",revision:"4bfdd249a3d3fe6bbb5d197d103b01e9"},{url:"/pudding/img/Wrapped Bitcoin.png",revision:"36726d1222e46f2ec73cec9384d1ed56"},{url:"/pudding/img/demo.png",revision:"b1fb6fea84d893193310760b5a548c3b"},{url:"/pudding/img/explore-address.png",revision:"1bce47b2e8053e7103f8536498ab98a4"},{url:"/pudding/img/hairball.png",revision:"ff3cee5ec7538f49a801ef41c051b5d7"},{url:"/pudding/img/hairline-cracks.png",revision:"40ad2a8f33f473f100072e5d1092fe8b"},{url:"/pudding/img/missing-token.png",revision:"beddce4d9f72552f6b44dbbb82307943"},{url:"/pudding/index.html",revision:"2af047fdd8d0d3b697f43da712bca25b"},{url:"/pudding/js/about.ed4d165c.js",revision:null},{url:"/pudding/js/app.cfe31d5c.js",revision:null},{url:"/pudding/js/chunk-vendors.b38a8fc2.js",revision:null},{url:"/pudding/js/landingpage.0776ba6c.js",revision:null},{url:"/pudding/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/pudding/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
