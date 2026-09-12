import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),650));

// 3D AKRON-inspired procedural scene: no external 3D assets required.
const canvas=document.getElementById('scene');
const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x08090b,.035);
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,100);camera.position.set(0,2.8,11);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
scene.add(new THREE.AmbientLight(0xffffff,.65));const key=new THREE.DirectionalLight(0xffe5d0,2.5);key.position.set(-4,7,5);scene.add(key);const red=new THREE.PointLight(0xc8102e,18,18);red.position.set(3,3,2);scene.add(red);
const stadium=new THREE.Group();scene.add(stadium);
const dark=new THREE.MeshStandardMaterial({color:0x15171b,roughness:.55,metalness:.25});
const redMat=new THREE.MeshStandardMaterial({color:0xc8102e,roughness:.38,metalness:.2});
const whiteMat=new THREE.MeshStandardMaterial({color:0xe7e4dd,roughness:.6});
function ring(radius,tube,y,mat){const m=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,96),mat);m.rotation.x=Math.PI/2;m.position.y=y;stadium.add(m);return m}
ring(4.2,.65,0,dark);ring(3.55,.12,.52,redMat);ring(3.05,.09,.66,whiteMat);ring(2.65,.06,.78,redMat);
const pitch=new THREE.Mesh(new THREE.CylinderGeometry(2.55,2.55,.12,64),new THREE.MeshStandardMaterial({color:0x19351f,roughness:1}));pitch.position.y=.05;stadium.add(pitch);
for(let i=0;i<36;i++){const a=i/36*Math.PI*2;const x=Math.cos(a)*4.5,z=Math.sin(a)*4.5;const post=new THREE.Mesh(new THREE.BoxGeometry(.12,1.5,.12),redMat);post.position.set(x,.8,z);stadium.add(post)}
for(let i=0;i<22;i++){const a=i/22*Math.PI*2;const light=new THREE.Mesh(new THREE.SphereGeometry(.045,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));light.position.set(Math.cos(a)*3.8,1.05,Math.sin(a)*3.8);stadium.add(light)}
// floating agave blades
const agaves=new THREE.Group();scene.add(agaves);function addAgave(x,z,s){const g=new THREE.Group();for(let i=0;i<9;i++){const blade=new THREE.Mesh(new THREE.ConeGeometry(.12,.95,5),new THREE.MeshStandardMaterial({color:0x3b6a35,roughness:1}));blade.position.y=.45;blade.rotation.z=(i-4)*.22;blade.rotation.y=i*.7;g.add(blade)}g.position.set(x,-.15,z);g.scale.setScalar(s);agaves.add(g)}addAgave(-5,-1,1.5);addAgave(5,-2,1.2);addAgave(-4,-5,1.1);addAgave(4,-5,1.35);
const particles=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:0xffffff,size:.025,transparent:true,opacity:.5}));const pos=[];for(let i=0;i<700;i++){pos.push((Math.random()-.5)*18,Math.random()*8-1,(Math.random()-.5)*15)}particles.geometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));scene.add(particles);
let targetX=0,targetY=0;window.addEventListener('pointermove',e=>{targetX=(e.clientX/innerWidth-.5)*.8;targetY=(e.clientY/innerHeight-.5)*.35});
function animate(t){requestAnimationFrame(animate);const time=t*.00025;stadium.rotation.y=time*.35;agaves.rotation.y=-time*.15;particles.rotation.y=time*.05;camera.position.x+=(targetX-camera.position.x)*.035;camera.position.y+=(2.8-targetY-camera.position.y)*.035;camera.lookAt(0,.35,0);renderer.render(scene,camera)}animate(0);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

const matches=[
 {round:'J8 · LOCAL',date:'13 SEP 2026 · 19:07',home:'CHIVAS',away:'PUMAS',venue:'ESTADIO AKRON',featured:true,desc:'La próxima noche en el Akron. Vive el partido y conviértelo en un viaje completo a Guadalajara.'},
 {round:'J10 · LOCAL',date:'26 SEP 2026 · 17:00',home:'CHIVAS',away:'QUERÉTARO',venue:'ESTADIO AKRON',desc:'Una tarde de fútbol, ciudad y experiencia PEYE.'},
 {round:'J12 · LOCAL',date:'17 OCT 2026 · 17:00',home:'CHIVAS',away:'TIGRES',venue:'ESTADIO AKRON',desc:'Una de las noches grandes del torneo para vivirla desde Guadalajara.'}
];
const cards=document.getElementById('matchCards');matches.forEach((m,i)=>{const el=document.createElement('article');el.className='match-card'+(m.featured?' featured':'');el.innerHTML=`<div class="card-glow"></div><span class="round">${m.round}</span><div class="date">${m.date}</div><div class="teams"><span class="team">${m.home}</span><b class="vs">VS</b><span class="team">${m.away}</span></div><div class="venue"><span>${m.venue}</span><span>PEYE ↗</span></div>`;el.addEventListener('click',()=>openMatch(m));cards.appendChild(el)});
const modal=document.getElementById('modal'),modalTitle=document.getElementById('modalTitle'),modalMeta=document.getElementById('modalMeta'),modalDesc=document.getElementById('modalDesc'),modalKicker=document.getElementById('modalKicker'),modalCta=document.getElementById('modalCta');
function openMatch(m){modalKicker.textContent=`PEYE MATCHDAY · ${m.venue}`;modalTitle.innerHTML=`${m.home}<br><span style="color:var(--red)">VS ${m.away}</span>`;modalMeta.textContent=`${m.date}  ·  ${m.venue}`;modalDesc.textContent=m.desc;modalCta.href=`https://wa.me/525577256481?text=${encodeURIComponent('Hola PEYE TOURS, quiero ir al '+m.home+' vs '+m.away+' del '+m.date+'.')}`;modal.classList.add('open');document.body.style.overflow='hidden'}
document.getElementById('modalClose').onclick=()=>{modal.classList.remove('open');document.body.style.overflow=''};modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('open');document.body.style.overflow=''}});document.querySelector('[data-match="toluca"]').onclick=()=>openMatch({round:'PEYE EXPERIENCE',date:'18 JUL 2026 · 19:00',home:'CHIVAS',away:'TOLUCA',venue:'ESTADIO AKRON',desc:'La experiencia PEYE de Chivas vs Toluca: boleto, desayuno en Zapopan, comida/cena de cortesía, Tour Estadio & Museo, Paraíso Azul y Cantaritos El Güero.'});
const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const tequila=document.getElementById('tequilaScene'),bottle=tequila.querySelector('.bottle');tequila.addEventListener('pointermove',e=>{const r=tequila.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;bottle.style.transform=`translate(-50%,-50%) rotateY(${x*28}deg) rotateX(${-y*12}deg)`});tequila.addEventListener('pointerleave',()=>bottle.style.transform='translate(-50%,-50%) rotateY(-12deg)');
const menu=document.getElementById('menu');menu.addEventListener('click',()=>document.querySelector('.navlinks').classList.toggle('mobile-open'));
