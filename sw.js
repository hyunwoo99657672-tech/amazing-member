// 어메이징석계 회원 운동 — 앱 설치용 서비스 워커 (저장은 하지 않고 항상 최신 화면을 받아요)
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.mode==='navigate')e.respondWith(fetch(e.request))});
