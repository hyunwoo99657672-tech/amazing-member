// 어메이징석계 회원 운동 — 앱 설치용 서비스 워커
// 항상 최신 화면을 먼저 받고, 인터넷이 안 될 때만 마지막으로 받은 화면을 보여줘요.
const SHELL='amazing-shell-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode!=='navigate')return;
  const u=new URL(e.request.url);let key=u.pathname;if(key.endsWith('/'))key+='index.html';
  e.respondWith(fetch(e.request).then(r=>{
    if(r&&r.ok){const cp=r.clone();caches.open(SHELL).then(c=>c.put(key,cp)).catch(()=>{})}
    return r;
  }).catch(()=>caches.open(SHELL).then(c=>c.match(key)).then(r=>r||Response.error())));
});
