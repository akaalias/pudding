if(!self.define){let i,n={};const e=(e,d)=>(e=new URL(e+".js",d).href,n[e]||new Promise((n=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=n,document.head.appendChild(i)}else i=e,importScripts(e),n()})).then((()=>{let i=n[e];if(!i)throw new Error(`Module ${e} didn’t register its module`);return i})));self.define=(d,r)=>{const u=i||("document"in self?document.currentScript.src:"")||location.href;if(n[u])return;let g={};const s=i=>e(i,u),a={module:{uri:u},exports:g,require:s};n[u]=Promise.all(d.map((i=>a[i]||s(i)))).then((i=>(r(...i),g)))}}define(["./workbox-79ffe3e0"],(function(i){"use strict";i.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/pudding/css/about.6a44c0e1.css",revision:null},{url:"/pudding/css/app.c3b84cd7.css",revision:null},{url:"/pudding/css/chunk-vendors.8fe71327.css",revision:null},{url:"/pudding/css/landingpage.deab38f2.css",revision:null},{url:"/pudding/img/ApeCoin.png",revision:"794c635370ef5acb24a1b7daabdfa3e5"},{url:"/pudding/img/Binance USD.png",revision:"5ba648dd38f60a49e997fef39ca7f81d"},{url:"/pudding/img/Chainlink.png",revision:"00f1ce43de5e7db95812c5e992460a0b"},{url:"/pudding/img/Convex.png",revision:"ed971b9049d6fca49184dbe55733049d"},{url:"/pudding/img/Curve DAO Token.png",revision:"b492e0503943fdc23f5fdd0a4b3a232a"},{url:"/pudding/img/Dai.png",revision:"a58f4d3f8184ab9a7f97db99a81593b1"},{url:"/pudding/img/Gala.png",revision:"c9e1f70cf58c0f8ab17f44494ba94c18"},{url:"/pudding/img/HEX.png",revision:"955a55f62cf14a4b5a091c5885636622"},{url:"/pudding/img/Hedron.png",revision:"01967b3696e2ff50c00122b6c30524eb"},{url:"/pudding/img/MATIC.png",revision:"67c80aca0bc3df038877e0433f29a68c"},{url:"/pudding/img/Quant.png",revision:"2561970792968d6bc731cc3c355d46f3"},{url:"/pudding/img/SAND.png",revision:"afa5d1e25fd0b751e11b3f79e90b0575"},{url:"/pudding/img/Shiba Inu.png",revision:"cf871758a31b552eb78d551a577a79f5"},{url:"/pudding/img/Tether USD.png",revision:"4474cf59d3639f17af51e74f0ca3c62e"},{url:"/pudding/img/USD Coin.png",revision:"6e855f6e6c210c3206ab47764ff7178f"},{url:"/pudding/img/USDC-14MM.png",revision:"b67e028304514432999709baa25f6b28"},{url:"/pudding/img/Uniswap.png",revision:"7f37b53f31c7acb66cf172566d9fd0d8"},{url:"/pudding/img/WBTC.png",revision:"ed327b67fa23ff3cb083893f22b2aa8d"},{url:"/pudding/img/WETH.png",revision:"4bfdd249a3d3fe6bbb5d197d103b01e9"},{url:"/pudding/img/Wrapped Bitcoin.png",revision:"36726d1222e46f2ec73cec9384d1ed56"},{url:"/pudding/img/demo.png",revision:"b1fb6fea84d893193310760b5a548c3b"},{url:"/pudding/img/explore-address.png",revision:"1bce47b2e8053e7103f8536498ab98a4"},{url:"/pudding/img/hairball.png",revision:"ff3cee5ec7538f49a801ef41c051b5d7"},{url:"/pudding/img/hairline-cracks.png",revision:"40ad2a8f33f473f100072e5d1092fe8b"},{url:"/pudding/img/missing-token.png",revision:"beddce4d9f72552f6b44dbbb82307943"},{url:"/pudding/index.html",revision:"fe1d30f30b6becb393879b616a7786dc"},{url:"/pudding/js/about.c04aed5a.js",revision:null},{url:"/pudding/js/app.6da1b5fe.js",revision:null},{url:"/pudding/js/chunk-vendors.8393b6ec.js",revision:null},{url:"/pudding/js/landingpage.7c6d4307.js",revision:null},{url:"/pudding/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/pudding/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
