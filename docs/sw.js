if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const a=e=>i(e,t),o={module:{uri:t},exports:l,require:a};s[t]=Promise.all(n.map((e=>o[e]||a(e)))).then((e=>(r(...e),l)))}}define(["./workbox-455a0d7a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/app.3d3f3540.js",revision:null},{url:"assets/app.aa5dc7cb.css",revision:null},{url:"assets/index.241f6d6a.css",revision:null},{url:"assets/index.51f6022d.js",revision:null},{url:"assets/timetable-generator.e3ff5676.js",revision:null},{url:"assets/vendor.f9324d30.js",revision:null},{url:"assets/virtual_pwa-register.a3d85283.js",revision:null},{url:"index.html",revision:"1a2b9ec57bd38ce63a36b260a02a5b8a"},{url:"favicon.svg",revision:"fd480326ce2f9db2043fceedae54cb67"},{url:"robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"},{url:"safari-pinned-tab.svg",revision:"5eaf74d1c43d30e0af743b68a3f48504"},{url:"gif/thinking.gif",revision:"7ed3d127961c330e8e1e159531a38726"},{url:"manifest.webmanifest",revision:"2cd2b1401e2abad94655349c706cd52a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
