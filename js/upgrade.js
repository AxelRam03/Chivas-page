const welcome=document.getElementById('chivahermanoIntro');
const replacePhone=()=>{document.querySelectorAll('a[href*="wa.me"]').forEach(a=>a.href=a.href.replaceAll('525577256481','525573538114'));document.querySelectorAll('footer span').forEach(s=>{if(s.textContent.includes('55 7725 6481'))s.textContent='55 7353 8114'});const c=document.getElementById('modalCta');if(c)c.href=c.href.replaceAll('525577256481','525573538114')};
replacePhone();
window.addEventListener('load',()=>setTimeout(()=>{welcome?.classList.add('show');setTimeout(()=>welcome?.classList.add('done'),2300)},650));
new MutationObserver(replacePhone).observe(document.body,{subtree:true,attributes:true,attributeFilter:['href']});
