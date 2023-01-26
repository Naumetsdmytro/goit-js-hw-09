function t(t){return String(t).padStart(2,"0")}const o=setInterval(n,1e3);function n(){const n=Date.now(),e=new Date(2023,0,26,13,6)-n;e<0?clearInterval(o):console.log(function(o){const n=6e4,e=36e5,r=24*e;return{days:t(Math.floor(o/r)),hours:t(Math.floor(o%r/e)),minutes:t(Math.floor(o%r%e/n)),seconds:t(Math.floor(o%r%e%n/1e3))}}(e))}n();
//# sourceMappingURL=02-timer.920a06df.js.map
