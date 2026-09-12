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
