if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let d={};const f=e=>n(e,c),s={module:{uri:c},exports:d,require:f};i[c]=Promise.all(r.map((e=>s[e]||f(e)))).then((e=>(a(...e),d)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pudding"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/about.6a44c0e1.css",revision:null},{url:"/css/app.c3b84cd7.css",revision:null},{url:"/css/chunk-vendors.55c88bf0.css",revision:null},{url:"/css/landingpage.6bbb4676.css",revision:null},{url:"/img/ApeCoin.png",revision:"794c635370ef5acb24a1b7daabdfa3e5"},{url:"/img/Binance USD.png",revision:"5ba648dd38f60a49e997fef39ca7f81d"},{url:"/img/BitTorrent.png",revision:"addf8f5dd19d4f46a546fbced5aa83b4"},{url:"/img/Chain.png",revision:"dc0101e8605c8d1ea61d7d8c05e5b00e"},{url:"/img/Chainlink.png",revision:"00f1ce43de5e7db95812c5e992460a0b"},{url:"/img/CompoundUSD.png",revision:"94d62ea0ef4c282365d436b706d2f390"},{url:"/img/Convex.png",revision:"ed971b9049d6fca49184dbe55733049d"},{url:"/img/Curve DAO Token.png",revision:"b492e0503943fdc23f5fdd0a4b3a232a"},{url:"/img/Dai.png",revision:"a58f4d3f8184ab9a7f97db99a81593b1"},{url:"/img/FantomToken.png",revision:"5c440bb92ce35234bb69a91b4d3ac37e"},{url:"/img/Frax.png",revision:"5b19ef0e58d45a12a605f7d7cb229f87"},{url:"/img/Gala.png",revision:"c9e1f70cf58c0f8ab17f44494ba94c18"},{url:"/img/GeminiDollar.png",revision:"f6351ff6d63eb9f04750679616b4d993"},{url:"/img/HEX.png",revision:"955a55f62cf14a4b5a091c5885636622"},{url:"/img/Hedron.png",revision:"01967b3696e2ff50c00122b6c30524eb"},{url:"/img/HuobiToken.png",revision:"a0bdbbdc5b727d8c57cf9a1e24c1b9c1"},{url:"/img/KucoinToken.png",revision:"dea63402b7596b05cfbbfd5543b12107"},{url:"/img/Lido.png",revision:"1f06a91916e4023afa4b84e97248bf13"},{url:"/img/MATIC.png",revision:"67c80aca0bc3df038877e0433f29a68c"},{url:"/img/Maker.png",revision:"977f88ad8137b57410682b124bec4de9"},{url:"/img/Near.png",revision:"0df96a697b6a7d34dee4a98d5f19a56e"},{url:"/img/PaxDollar.png",revision:"92d179c23a4a5c489aba7a13a93cd036"},{url:"/img/PaxosGold.png",revision:"9ac455546e17e5f1faa5c3a5f062514d"},{url:"/img/Quant.png",revision:"2561970792968d6bc731cc3c355d46f3"},{url:"/img/SAND.png",revision:"afa5d1e25fd0b751e11b3f79e90b0575"},{url:"/img/Shiba Inu.png",revision:"cf871758a31b552eb78d551a577a79f5"},{url:"/img/Tether USD.png",revision:"4474cf59d3639f17af51e74f0ca3c62e"},{url:"/img/Tron.png",revision:"444734c8849217e60e46bbe3041dbdd2"},{url:"/img/TrueUSD.png",revision:"c7d82c36a64f53b0ca2460692fd3a8c9"},{url:"/img/USD Coin.png",revision:"6e855f6e6c210c3206ab47764ff7178f"},{url:"/img/USDC-14MM.png",revision:"b67e028304514432999709baa25f6b28"},{url:"/img/USDD.png",revision:"81c2a84354f3ee0a7e8c1c625b7c9951"},{url:"/img/Uniswap.png",revision:"7f37b53f31c7acb66cf172566d9fd0d8"},{url:"/img/VeChain.png",revision:"c90264e0e4d1ecca5103ab987689b1b6"},{url:"/img/WBTC.png",revision:"ed327b67fa23ff3cb083893f22b2aa8d"},{url:"/img/WETH.png",revision:"4bfdd249a3d3fe6bbb5d197d103b01e9"},{url:"/img/Wrapped Bitcoin.png",revision:"36726d1222e46f2ec73cec9384d1ed56"},{url:"/img/chiliZ.png",revision:"1e13e5623a8d4fc5f5fdcefae56d7155"},{url:"/img/demo.png",revision:"b1fb6fea84d893193310760b5a548c3b"},{url:"/img/hairball.png",revision:"ff3cee5ec7538f49a801ef41c051b5d7"},{url:"/img/hairline-cracks.png",revision:"40ad2a8f33f473f100072e5d1092fe8b"},{url:"/img/missing-token.png",revision:"beddce4d9f72552f6b44dbbb82307943"},{url:"/index.html",revision:"d1eeb6bd61c120b6288e96e527716ba2"},{url:"/js/about.c04aed5a.js",revision:null},{url:"/js/app.73902334.js",revision:null},{url:"/js/chunk-vendors.2198f635.js",revision:null},{url:"/js/landingpage.a62500e3.js",revision:null},{url:"/manifest.json",revision:"3ade3227883816d21542bc0a4e2a174a"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
