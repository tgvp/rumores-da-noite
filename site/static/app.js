const root=document.documentElement;
try{root.dataset.theme=localStorage.getItem('theme')||'dark';}catch{}
document.getElementById('theme').addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme);}catch{}});
document.querySelectorAll('.share').forEach(b=>b.addEventListener('click',async()=>{const url=new URL(b.dataset.url,location.origin).href;try{await navigator.clipboard.writeText(url);b.textContent='Link copiado';}catch{window.prompt('Copia este link:',url);}}));
document.querySelectorAll('form.delete').forEach(f=>f.addEventListener('submit',e=>{if(!confirm('Eliminar este registo?'))e.preventDefault();}));

const fiction=document.getElementById('fiction-dialog');
function showFiction(){if(fiction&&!fiction.open)fiction.showModal();}
try{if(sessionStorage.getItem('rumores-fiction-v4')!=='accepted')showFiction();}catch{showFiction();}
['show-fiction','footer-fiction'].forEach(id=>document.getElementById(id)?.addEventListener('click',showFiction));
document.getElementById('accept-fiction')?.addEventListener('click',()=>{try{sessionStorage.setItem('rumores-fiction-v4','accepted');}catch{}fiction.close();});
fiction?.addEventListener('cancel',e=>e.preventDefault());
if(document.body.dataset.static==='true'){
 const input=document.querySelector('.search input');
 function filter(){const q=(input?.value||'').toLocaleLowerCase();document.querySelectorAll('article.post').forEach(p=>p.hidden=!p.textContent.toLocaleLowerCase().includes(q));}
 input?.addEventListener('input',filter);document.querySelector('.search')?.addEventListener('submit',e=>{e.preventDefault();filter();});
 const query=new URLSearchParams(location.search).get('q');if(query&&input){input.value=query;filter();}
 if(new URLSearchParams(location.search).get('sort')==='top'){
  const posts=[...document.querySelectorAll('article.post')];posts.sort((a,b)=>Number(b.dataset.score)-Number(a.dataset.score)).forEach(p=>p.parentNode.appendChild(p));
 }
}
