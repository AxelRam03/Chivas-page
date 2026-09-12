const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$('#year').textContent=new Date().getFullYear();
$('#menuBtn').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
const modal=$('#tourModal');
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}));
modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
$$('.match-controls button').forEach(btn=>btn.addEventListener('click',()=>{ $$('.match-controls button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;$$('.match-card').forEach(card=>card.style.display=(f==='all'||card.dataset.type===f)?'grid':'none')}));
const stories={match:'El viaje comienza mucho antes de llegar al estadio: carretera, amigos, música, comida y la emoción de ver cómo Guadalajara aparece en el horizonte. PEYE MATCHDAY convierte el partido en una experiencia completa.',gdl:'Guadalajara se disfruta caminando, comiendo, conociendo sus barrios y encontrando esos lugares que hacen que una visita se quede en la memoria.',jalisco:'Un buen viaje también se trata de sentarse a la mesa, probar algo nuevo, cantar, reír y regresar con una historia que contar.'};
$$('[data-story]').forEach(b=>b.addEventListener('click',()=>{showToast(stories[b.dataset.story])}));
function showToast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),5000)}
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));

// Akron fixtures + 3D experience
const match3d=document.querySelector('#match3d .match-3d');
const match3dWrap=document.querySelector('#match3d');
if(match3dWrap && match3d){
  const flip=()=>match3d.classList.toggle('flipped');
  match3dWrap.addEventListener('click',flip);
  match3dWrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}});
}
const kickoff=new Date('2026-09-13T19:07:00-06:00').getTime();
function updateCountdown(){const el=document.querySelector('#countdown');if(!el)return;let d=kickoff-Date.now();if(d<0)d=0;const days=Math.floor(d/86400000);d%=86400000;const hrs=Math.floor(d/3600000);d%=3600000;const min=Math.floor(d/60000);const sec=Math.floor((d%60000)/1000);const vals=[days,hrs,min,sec];el.querySelectorAll('strong').forEach((x,i)=>x.textContent=String(vals[i]).padStart(2,'0'));}
updateCountdown();setInterval(updateCountdown,1000);
const fixtures={
 pumas:['CHIVAS VS PUMAS','Domingo 13 de septiembre · 19:07 · Estadio AKRON'],
 queretaro:['CHIVAS VS QUERÉTARO','Sábado 26 de septiembre · 17:00 · Estadio AKRON'],
 tigres:['CHIVAS VS TIGRES','Sábado 17 de octubre · 17:00 · Estadio AKRON'],
 necaxa:['CHIVAS VS NECAXA','Martes 20 de octubre · 18:07 · Estadio AKRON'],
 atlante:['CHIVAS VS ATLANTE','Sábado 31 de octubre · 19:00 · Estadio AKRON'],
 cruzazul:['CHIVAS VS CRUZ AZUL','Domingo 22 de noviembre · 17:00 · Estadio AKRON']
};
const fixtureModal=document.querySelector('#fixtureModal');
$$('[data-fixture]').forEach(btn=>btn.addEventListener('click',()=>{const data=fixtures[btn.dataset.fixture];if(!data)return;document.querySelector('#fixtureTitle').textContent=data[0];document.querySelector('#fixtureText').textContent=`${data[1]}. Arma tu salida con PEYE TOURS desde CDMX, Estado de México o Querétaro y convierte el partido en una experiencia completa.`;const msg=encodeURIComponent(`Hola PEYE TOURS, me interesa la experiencia ${data[0]} (${data[1]}). Quiero cotizar desde mi ciudad.`);document.querySelector('#fixtureWhatsapp').href=`https://wa.me/525577256481?text=${msg}`;fixtureModal.classList.add('open');fixtureModal.setAttribute('aria-hidden','false')}));
$$('[data-close-fixture]').forEach(b=>b.addEventListener('click',()=>{fixtureModal.classList.remove('open');fixtureModal.setAttribute('aria-hidden','true')}));
fixtureModal?.addEventListener('click',e=>{if(e.target===fixtureModal){fixtureModal.classList.remove('open');fixtureModal.setAttribute('aria-hidden','true')}});
