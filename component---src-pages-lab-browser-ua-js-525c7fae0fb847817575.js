(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"40ji":function(e,i){},Lviq:function(e,i,r){"use strict";r.r(i),r.d(i,"query",(function(){return a}));var s=r("DjBF"),d=r("q1tI"),t=r.n(d),n=r("Wbzz"),o=r("Nhdc");r("BeH2"),r("40ji");i.default=function(e){var i=Object(d.useState)(""),r=Object(s.a)(i,2),a=r[0],m=r[1],f=Object(d.useState)(""),c=Object(s.a)(f,2),b=c[0],l=c[1],u=Object(d.useState)(""),w=Object(s.a)(u,2),h=w[0],x=w[1],O=Object(d.useState)(""),p=Object(s.a)(O,2),g=p[0],B=p[1],k=Object(d.useState)(""),E=Object(s.a)(k,2),C=E[0],v=E[1],S=function(e,i){var r="";(e.indexOf("qqbrowser")>-1&&(r=e.match(/qqbrowser\/\d+(.\d+)+/)[0].substr(10),e.indexOf("mobile")>-1&&(r+="(mobile)"),i="QQ Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("micromessenger")>-1)&&(i="WeiXin "+e.match(/micromessenger\/\d+(.\d+)+/)[0].substr(15)+" / wekit "+e.match(/webkit\/\d+(.\d+)+/)[0].substr(7));e.indexOf("qq/")>-1&&(i="QQ "+e.match(/qq\/\d+(.\d+)+/)[0].substr(3)+" / wekit "+e.match(/webkit\/\d+(.\d+)+/)[0].substr(7));if(e.indexOf("miui")>-1&&(i="XiaoMi MIUI Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("ucbrowser")>-1||e.indexOf(" ubrowser")>-1)if(r=e.match(/browser\/\d+(.\d+)+/)[0].substr(8),e.indexOf("mobile")>-1){r+=" (mobile)";var s=e.match(/u\d\/\d+(.\d+)+/),d="";s&&(d=s[0].substr(1).replace("/"," ")),i="UC Browser "+r+" / U"+d}else if(e.indexOf("chrome")>-1)i="UC Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7);else if(e.indexOf("edge")>-1){i="UC Browser "+r+" / edge "+e.match(/edge\/\d+(.\d+)+/)[0].substr(5)}else if(e.indexOf("msie")>-1){i="UC Browser "+r+" / IE "+e.match(/msie\s\d+/)[0].substr(5)}else e.indexOf("trident")>-1&&(i="UC Browser "+r+" / IE 11");if(e.indexOf("sogou")>-1||e.indexOf(" se ")>-1)if(e.indexOf("mobile")>-1)r=e.match(/browser\/\d+(.\d+)+/)[0].substr(8),i="Sogou Browser "+(r+=" (mobile)")+" / Webkit "+e.match(/webkit\/\d+(.\d+)+/)[0].substr(7);else if(e.indexOf("chrome")>-1)i="Sogou Browser / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7);else if(e.indexOf("edge")>-1){i="Sogou Browser / edge "+e.match(/edge\/\d+(.\d+)+/)[0].substr(5)}else if(e.indexOf("msie")>-1){i="Sogou Browser / IE "+e.match(/msie\s\d+/)[0].substr(5)}else e.indexOf("trident")>-1&&(i="Sogou Browser / IE 11");if(e.indexOf("360 aphone browser")>-1&&(r=e.match(/browser\s\(\d+(.\d+)+\)/)[0].toString().slice(9,-1),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="360 Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("lbbrowser")>-1&&(i="LieBao Browser / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("liebao")>-1&&(r=e.match(/liebaofast\/\d+(.\d+)+/)[0].substr(10),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="LieBao Fast Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("bidu")>-1)if(e.indexOf("chrome")>-1)i="Baidu Browser "+(r=e.match(/browser\/\d+(.\d+)+/)[0].substr(8))+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7);else if(e.indexOf("edge")>-1){i="Baidu Browser "+(r=e.match(/browser\s\d+(.\d+)+/)[0].substr(8))+" / edge "+e.match(/edge\/\d+(.\d+)+/)[0].substr(5)}else if(e.indexOf("msie")>-1){i="Baidu Browser "+(r=e.match(/browser\s\d+(.\d+)+/)[0].substr(8))+" / IE "+e.match(/msie\s\d+/)[0].substr(5)}else e.indexOf("trident")>-1&&(i="Baidu Browser "+(r=e.match(/browser\s\d+(.\d+)+/)[0].substr(8))+" / IE 11");return e.indexOf("baidu")>-1&&(r=e.match(/browser\/\d+(.\d+)+/)[0].substr(8),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Baidu Browser "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("maxthon")>-1&&(r=e.match(/maxthon\/\d+(.\d+)+/)[0].substr(8),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Maxthon "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("mxbrowser")>-1&&(r=e.match(/mxbrowser\/\d+(.\d+)+/)[0].substr(10),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Maxthon "+r+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("dolphin")>-1&&(i="Dolphin Browser "+(r=e.match(/dolphinbrowsercn\/\d+(.\d+)+/)[0].substr(17))+" / Chrome "+e.match(/chrome\/\d+(.\d+)+/)[0].substr(7)),e.indexOf("theworld")>-1&&(r=e.match(/theworld\s\d+/)[0].substr(8),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="The World "+r+" / wekit "+e.match(/webkit\/\d+(.\d+)+/)[0].substr(7)),i};return Object(d.useEffect)((function(){if(window.navigator){var e=window.navigator,i=e.userAgent,r=e.platform;try{m(function(e){var i="Unknown",r="";if(e.indexOf("edge")>-1)i="Microsoft Edge "+(r=e.match(/edge\/\d+(.\d+)+/)[0].substr(5));else if(e.indexOf("edgios")>-1){i="Edge for iOS "+e.match(/edgios\/\d+(.\d+)+/)[0].substr(7)}else if(e.indexOf("msie")>-1)i="IE "+(r=e.match(/msie\s\d+/)[0].substr(5));else if(e.indexOf("trident")>-1)i="IE 11";else if(e.indexOf("firefox")>-1)r=e.match(/firefox\/\d+(.\d+)+/)[0].substr(8),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Firefox "+r;else if(e.indexOf("opera")>-1)r=e.match(/opera\/\d+(.\d+)+/)[0].substr(6),Number(r)>=9.8&&(r=e.match(/version\/\d+(.\d+)+/)[0].substr(8)),e.indexOf("mini")>-1&&(r="mini "+e.match(/mini\/\d+(.\d+)+/)[0].substr(5)),i="Opera "+r;else if(e.indexOf("opr")>-1)r=e.match(/opr\/\d+(.\d+)+/)[0].substr(4),e.indexOf("dev")>-1?r+=" (edition developer)":e.indexOf("beta")>-1&&(r+=" (edition beta)"),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Opera "+r;else if(e.indexOf("chrome")>-1)r=e.match(/chrome\/\d+(.\d+)+/)[0].substr(7),e.indexOf("mobile")>-1&&(r+=" (mobile)"),i="Chrome "+r;else if(e.indexOf("safari")>-1){if(e.indexOf("blackberry")>-1||e.indexOf("bb10")>-1||e.indexOf("playbook")>-1)i="BlackBerry built-in / Webkit "+e.match(/webkit\/\d+(.\d+)+/)[0].substr(7);else i="Safari "+(r=e.match(/safari\/\d+(.\d+)+/)[0].substr(7))}return i=S(e,i)}(i.toLowerCase())),l(function(e,i){var r="Unknown OS",s="Win32"===i||"Windows"===i,d="Mac68K"===i||"MacPPC"===i||"Macintosh"===i||"MacIntel"===i,t="X11"===i&&!s&&!d,n=i.toLowerCase().indexOf("linux")>-1||e.indexOf("linux")>-1,o=e.indexOf("android")>-1,a=e.indexOf("iphone")>-1,m=e.indexOf("ipod")>-1,f=e.indexOf("ipad")>-1,c=a||f||m,b=e.indexOf("windows phone")>-1,l=e.indexOf("xbox")>-1,u=e.indexOf("blackberry")>-1||e.indexOf("bb10")>-1||e.indexOf("playbook")>-1,w=e.indexOf("meego")>-1,h=e.indexOf("symbian")>-1;if(d){r="Mac";var x=e.match(/mac\sos\sx\s[0-9]{1,2}(_[0-9]{1,2})+/);if(x&&x.length)r=r+" "+x[0].replace(/mac\sos\sx\s/,"").replace(/_/g,".");return r}if(t)return r="Unix";if(n&&!o)return r="Linux",e.indexOf("kf")>-1&&(r+="/Amazon Kindle"),r;if(s)return r="Windows",e.indexOf("windows nt 5.0")>-1||e.indexOf("windows 2000")>-1?r="Windows 2000":e.indexOf("windows nt 5.1")>-1||e.indexOf("windows xp")>-1?r="Windows XP":e.indexOf("windows nt 5.2")>-1||e.indexOf("windows 2003")>-1?r="Windows 2003":e.indexOf("windows nt 6.0")>-1||e.indexOf("windows Vista")>-1?r="Windows Vista":e.indexOf("windows nt 6.1")>-1||e.indexOf("windows 7")>-1?r="Windows 7":e.indexOf("windows nt 6.2")>-1||e.indexOf("Windows 8")>-1?r="Windows 8":e.indexOf("windows nt 6.3")>-1||e.indexOf("windows 8.1")>-1?r="Windows 8.1":(e.indexOf("windows nt 6.4")>-1||e.indexOf("windows nt 10.0")>-1||e.indexOf("windows 10")>-1)&&(r="Windows 10"),r;if(o){r="Android";var O=e.match(/android\s[\.\d]+/)[0].substr(8);return O&&(r=r+" "+O),r}if(c){var p="";if(a){var g=e.match(/cpu\siphone\sos\s\d+(_\d+)+/);g[0].length&&(p=g[0].substr(14).replace(/_/g,".")),r="iOS "+p+" / iPhone"}else if(f){var B=e.match(/cpu\sos\s\d+(_\d+)+/);B[0].length&&(p=B[0].substr(6).replace(/_/g,".")),r="iOS "+p+" / iPad"}else if(m){var k=e.match(/cpu\siphone\sos\s\d+(_\d+)+/);k[0].length&&(p=k[0].substr(6).replace(/_/g,".")),r="iOS "+p+" / iPod"}else r="iOS";return r}if(b){var E=e.substr(e.indexOf("windows phone")+14,7);return r="Windows Phone "+/\d+(.\d)+/.exec(E)[0]}return h?r="Symbian S"+e.match(/series\d+/)[0].toString().substr(6):u?(r="BlackBerry",e.indexOf("playbook")>-1?r+=" / PlayBook":e.indexOf("bb10")>-1&&(r+=" / BB10"),r):l?(r="XBox",e.indexOf("xbox one")>-1?r+=" One":r+=" 360",r):w?r="MeeGo":r}(i.toLowerCase(),r)),x(i),B(r)}catch(s){console.error("Caught Error",s)}}else v("Browser info not detected.")}),[]),t.a.createElement(o.a,null,t.a.createElement(o.b,{title:"User Agent | 实验室",keywords:e.data.site.siteMetadata.keywords}),t.a.createElement("div",{className:"mf-content lab-item"},t.a.createElement("article",null,t.a.createElement(n.Link,{to:"/lab",className:"back"},"« Back"),t.a.createElement("h1",null,"UserAgent"),t.a.createElement("p",null,"Browser: ",t.a.createElement("span",{id:"browser"},a||"Detecting ...")),t.a.createElement("p",null,"OS: ",t.a.createElement("span",{id:"os"},b||"Detecting ...")),t.a.createElement("p",null,"UA: ",t.a.createElement("span",{id:"ua"},h||"Detecting ...")),t.a.createElement("p",null,"Platform: ",t.a.createElement("span",{id:"platform"},g||"Detecting ...")),t.a.createElement("p",{id:"error"},C))))};var a="1448345702"}}]);
//# sourceMappingURL=component---src-pages-lab-browser-ua-js-525c7fae0fb847817575.js.map