(function(){
/* ---------- çiçek çizimleri ---------- */
function lavender(c1,c2){
  let s='<svg viewBox="0 0 60 140" width="W" height="H"><path d="M30 140 Q28 80 30 20" stroke="#6fa77f" stroke-width="3" fill="none"/>';
  s+='<path d="M30 110 Q14 98 10 84 Q24 90 30 104Z" fill="#7fb68f"/>';
  for(let i=0;i<9;i++){const y=22+i*9,dx=(i%2?7:-7),r=6-i*.25;
    s+=`<ellipse cx="${30+dx}" cy="${y}" rx="${r}" ry="${r*1.35}" fill="${i%2?c1:c2}" transform="rotate(${dx>0?25:-25} ${30+dx} ${y})"/>`;}
  s+='<ellipse cx="30" cy="14" rx="5" ry="8" fill="'+c1+'"/></svg>';return s;
}
function peony(c1,c2,c3){
  let s='<svg viewBox="0 0 120 120" width="W" height="H">';
  for(let i=0;i<10;i++){const a=i*36;s+=`<ellipse cx="60" cy="30" rx="24" ry="30" fill="${c1}" transform="rotate(${a} 60 60)"/>`;}
  for(let i=0;i<8;i++){const a=i*45+20;s+=`<ellipse cx="60" cy="40" rx="17" ry="21" fill="${c2}" transform="rotate(${a} 60 60)"/>`;}
  for(let i=0;i<6;i++){const a=i*60+5;s+=`<ellipse cx="60" cy="49" rx="10" ry="13" fill="${c3}" transform="rotate(${a} 60 60)"/>`;}
  s+=`<circle cx="60" cy="60" r="7" fill="${c3}"/></svg>`;return s;
}
function lily(c1,c2){
  let s='<svg viewBox="0 0 120 120" width="W" height="H">';
  for(let i=0;i<6;i++){const a=i*60;
    s+=`<path d="M60 60 C46 40 50 14 60 4 C70 14 74 40 60 60Z" fill="${c1}" transform="rotate(${a} 60 60)"/>`;
    s+=`<path d="M60 56 L60 18" stroke="${c2}" stroke-width="2" stroke-dasharray="2 4" transform="rotate(${a} 60 60)"/>`;}
  for(let i=0;i<6;i++){const a=i*60+30;s+=`<line x1="60" y1="60" x2="60" y2="38" stroke="#9a6b3a" stroke-width="1.5" transform="rotate(${a} 60 60)"/><circle cx="60" cy="37" r="2.8" fill="#b8562b" transform="rotate(${a} 60 60)"/>`;}
  s+=`<circle cx="60" cy="60" r="6" fill="#bfe08a"/></svg>`;return s;
}
const F={
  lav:()=>lavender('#9b7fd1','#b9a1ea'),
  lav2:()=>lavender('#7d62c4','#a58ae0'),
  peo:()=>peony('#f7a9c4','#ec6f9a','#d94f80'),
  peo2:()=>peony('#ffd0de','#ff9ebd','#f2709a'),
  peo3:()=>peony('#fde2c8','#fbb98c','#f08f5a'),
  lil:()=>lily('#ffd56b','#e89a1c'),
  lil2:()=>lily('#ffffff','#f39ab6'),
  lil3:()=>lily('#ff9fb8','#d9406f')
};
function sized(svg,w,h){return svg.replace('width="W"',`width="${w}"`).replace('height="H"',`height="${h}"`);}

const garden=document.getElementById('garden');
const spots=[
  ['peo',-30,-20,130,0],['lav',70,-10,40,-15],['lil',40,60,70,20],
  ['lil2','r-20',-10,110,0],['peo2','r50',60,80,0],['lav2','r30',-8,38,18],
  ['peo3','b-30','l-20',120,0],['lil3','b40','l70',80,0],['lav','b-10','l10',44,-10],
  ['peo2','b-20','r-30',130,0],['lil','b60','r50',72,0],['lav2','b0','r100',40,12]
];
spots.forEach(([k,a,b,size,rot])=>{
  const isLav=k.startsWith('lav');const w=size,h=isLav?size*2.3:size;
  const el=document.createElement('div');el.innerHTML=sized(F[k](),w,h);
  const svg=el.firstChild;
  // a: top/bottom, b: left/right
  const ta=String(a),tb=String(b);
  if(ta.startsWith('b')) svg.style.bottom=parseFloat(ta.slice(1))+'px';
  else if(ta.startsWith('r')){svg.style.right=parseFloat(ta.slice(1))+'px';}
  else svg.style.left=parseFloat(ta)+'px';
  if(ta.startsWith('b')){
    if(tb.startsWith('l')) svg.style.left=parseFloat(tb.slice(1))+'px';
    else svg.style.right=parseFloat(tb.slice(1))+'px';
  } else svg.style.top=parseFloat(tb)+'px';
  svg.style.transform=`rotate(${rot}deg)`;svg.style.opacity=.9;
  garden.appendChild(svg);
});
document.querySelectorAll('[data-flower]').forEach(d=>{
  const k=d.dataset.flower;
  d.innerHTML=k==='lavender'?sized(F.lav(),14,30):k==='peony'?sized(F.peo(),30,30):sized(F.lil(),30,30);
});

/* ---------- yaprak yağmuru ---------- */
const cv=document.getElementById('petals'),ctx=cv.getContext('2d');let P=[],raf=null;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function fit(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
fit();addEventListener('resize',fit);
const cols=['#9b7fd1','#b9a1ea','#ec6f9a','#f7a9c4','#ffd56b','#ffffff','#ff9ebd','#fbb98c'];
function burst(n){
  if(reduce)return;
  for(let i=0;i<n;i++)P.push({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.6,s:6+Math.random()*9,
    vy:1.2+Math.random()*2.2,vx:-1+Math.random()*2,r:Math.random()*6.28,vr:-.06+Math.random()*.12,
    c:cols[(Math.random()*cols.length)|0],w:Math.random()*6.28});
  if(!raf)loop();
}
function loop(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  P.forEach(p=>{p.w+=.04;p.x+=p.vx+Math.sin(p.w)*.8;p.y+=p.vy;p.r+=p.vr;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.globalAlpha=.9;
    ctx.beginPath();ctx.ellipse(0,0,p.s*.55,p.s,0,0,6.28);ctx.fill();ctx.restore();});
  P=P.filter(p=>p.y<innerHeight+30);
  raf=P.length?requestAnimationFrame(loop):null;if(!raf)ctx.clearRect(0,0,innerWidth,innerHeight);
}

/* ---------- sahneler ---------- */
const $=id=>document.getElementById(id);
function show(id){['s1','s2','s3','s4'].forEach(s=>$(s).hidden=s!==id);scrollTo({top:0,behavior:'smooth'});}

function tease(){
  const f=$('frame1');f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake');
  setTimeout(()=>show('s2'),650);
}
$('open1').onclick=tease;$('frame1').onclick=tease;

/* hayır butonu kaçıyor */
const noTexts=['Emin misin?','Bir daha düşün','Lavantalar üzüldü','Şakayıklar solacak','Lilyumlar ağlıyor','Resim seni bekliyor','Son şansın','Peki ya tatlı da varsa?'];
let noCount=0;
function dodge(e){
  if(e)e.preventDefault();
  noCount++;
  const no=$('no'),yes=$('yes'),wrap=$('ynWrap');
  no.textContent=noTexts[Math.min(noCount-1,noTexts.length-1)];
  const ww=wrap.clientWidth,bw=no.offsetWidth;
  const x=(Math.random()-.5)*Math.max(0,ww-bw)*.9, y=(Math.random()-.5)*60;
  no.style.transform=`translate(${x}px,${y}px) scale(${Math.max(.55,1-noCount*.06)})`;
  yes.style.transform=`scale(${Math.min(1.5,1+noCount*.08)})`;
  $('noHint').textContent=noCount>=4?'"Evet" butonu her seferinde biraz daha büyüyor, fark ettin mi?':'';
  if(noCount>=9){no.hidden=true;$('noHint').textContent='"Hayır" butonu utancından kaçtı. Geriye bir seçenek kaldı.';}
}
$('no').addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)dodge();});
$('no').addEventListener('click',dodge);
$('yes').onclick=()=>{burst(90);setTimeout(()=>show('s3'),500);};

/* seçenekler */
const sel={day:null,time:null,food:null};
function single(container,key,items,render){
  const box=$(container);box.innerHTML='';
  items.forEach(it=>{
    const b=document.createElement('button');b.type='button';b.className='chip';b.setAttribute('aria-pressed','false');
    b.innerHTML=render(it);
    b.onclick=()=>{box.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');sel[key]=it.label;$('planHint').textContent='';};
    box.appendChild(b);
  });
}
const today=new Date();const dayItems=[];
for(let i=1;i<=14;i++){const d=new Date(today);d.setDate(today.getDate()+i);
  dayItems.push({d,label:d.toLocaleDateString('tr-TR',{day:'numeric',month:'long',weekday:'long'})});}
single('days','day',dayItems,it=>`<span class="sub">${it.d.toLocaleDateString('tr-TR',{weekday:'short'})}</span><b>${it.d.getDate()}</b><span class="sub">${it.d.toLocaleDateString('tr-TR',{month:'short'})}</span>`);
single('times','time',[
  {label:'Öğle, 13:00',sub:'güneşli bir öğle yemeği'},
  {label:'Gün batımı, 18:30',sub:'gökyüzü pembeyken'},
  {label:'Akşam, 20:00',sub:'mum ışığında'},
  {label:'Sabah, 10:00',sub:'uzun bir kahvaltı'}
],it=>`${it.label}<span class="sub">${it.sub}</span>`);
single('foods','food',[
  {label:'Sushi',sub:'çubuklarla savaş'},
  {label:'İtalyan',sub:'makarna ve pizza'},
  {label:'Ev usulü mantı',sub:'yoğurtlu, sarımsaklı'},
  {label:'Burger',sub:'bol patatesli'},
  {label:'Serpme kahvaltı',sub:'çay demleniyor'},
  {label:'Kahve & tatlı',sub:'cheesecake paylaşırız'},
  {label:'Sen seç',sub:'sürprize açığım'}
],it=>`${it.label}<span class="sub">${it.sub}</span>`);

let summary='';
$('confirm').onclick=()=>{
  const miss=[];if(!sel.day)miss.push('günü');if(!sel.time)miss.push('saati');if(!sel.food)miss.push('yemeği');
  if(miss.length){$('planHint').textContent='Bir de '+miss.join(', ')+' seçer misin?';return;}
  const note=$('note').value.trim();
  $('tDay').textContent=sel.day;$('tTime').textContent=sel.time;$('tFood').textContent=sel.food;
  $('tNoteRow').hidden=!note;$('tNote').textContent=note;
  summary=`Randevumuz var 🌸\nGün: ${sel.day}\nSaat: ${sel.time}\nMenü: ${sel.food}`+(note?`\nNot: ${note}`:'')+`\nResmimi de getirmeyi unutma!`;
  $('wa').href='https://wa.me/?text='+encodeURIComponent(summary);
  show('s4');
  setTimeout(()=>{$('frame4').classList.add('open');burst(160);},400);
};
$('copy').onclick=()=>{
  const ok=()=>{$('copyMsg').textContent='Kopyalandı. Şimdi bana yapıştırıp gönderebilirsin.';};
  try{navigator.clipboard.writeText(summary).then(ok,()=>{$('copyMsg').textContent=summary;});}
  catch(e){$('copyMsg').textContent=summary;}
};
$('again').onclick=()=>{$('frame4').classList.remove('open');show('s3');};
})();
