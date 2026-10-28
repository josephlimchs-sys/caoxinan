const IMG = {
 "32_1": {
  "src": "assets/img/art-music.jpg",
  "thumb": "assets/img/thumbs/art-music.jpg",
  "w": 1045,
  "h": 1355
 },
 "32_2": {
  "src": "assets/img/braces.jpg",
  "thumb": "assets/img/thumbs/braces.jpg",
  "w": 1050,
  "h": 1325
 },
 "32_3": {
  "src": "assets/img/rest-in-peace.jpg",
  "thumb": "assets/img/thumbs/rest-in-peace.jpg",
  "w": 1350,
  "h": 1080
 },
 "32_4": {
  "src": "assets/img/world-war-2.jpg",
  "thumb": "assets/img/thumbs/world-war-2.jpg",
  "w": 1370,
  "h": 1045
 },
 "32_5": {
  "src": "assets/img/deep-end.jpg",
  "thumb": "assets/img/thumbs/deep-end.jpg",
  "w": 1110,
  "h": 1450
 },
 "32_6": {
  "src": "assets/img/pink-cap.jpg",
  "thumb": "assets/img/thumbs/pink-cap.jpg",
  "w": 1050,
  "h": 1345
 },
 "32_7": {
  "src": "assets/img/head-rush.jpg",
  "thumb": "assets/img/thumbs/head-rush.jpg",
  "w": 1060,
  "h": 1340
 },
 "32_8": {
  "src": "assets/img/lollipop.jpg",
  "thumb": "assets/img/thumbs/lollipop.jpg",
  "w": 1080,
  "h": 1450
 },
 "32": {
  "src": "assets/img/got-banana.jpg",
  "thumb": "assets/img/thumbs/got-banana.jpg",
  "w": 1440,
  "h": 1000
 },
 "33": {
  "src": "assets/img/red-church.jpg",
  "thumb": "assets/img/thumbs/red-church.jpg",
  "w": 1395,
  "h": 1025
 }
};
const WORKS = [
  {k:"32_5", t:"Deep End",      d:"12.04.2026", y:"2026", c:"Portraits",   a:"Four faces floating in deep blue water"},
  {k:"32_2", t:"Braces",        d:"28.11.2025", y:"2025", c:"Portraits",   a:"A boy in a cap and glasses laughing, braces showing, on a sandy field"},
  {k:"32_8", t:"Lollipop",      d:"18.04.2025", y:"2025", c:"Scenes",      a:"Three friends, one with a green lollipop, against a rainbow wall"},
  {k:"32_6", t:"Pink Cap",      d:"13.08.2024", y:"2024", c:"Scenes",      a:"Two men, one in a pink cap and graphic tee, in a busy room"},
  {k:"32_7", t:"Head Rush",     d:"12.06.2024", y:"2024", c:"Mark-making", a:"A figure in a green shirt whose head bursts into red and grey brushstrokes"},
  {k:"32_4", t:"World War 2!",  d:"02.09.2023", y:"2023", c:"Mark-making", a:"White and yellow scribbled soldiers and planes on a black ground"},
  {k:"32_1", t:"Art Music",     d:"24.10.2017", y:"2017", c:"Mark-making", a:"Guitars and a grinning face on green, with ART and MUSIC painted in"},
  {k:"32",   t:"Got Banana",    d:"Undated",    y:"Undated", c:"Portraits", a:"A boy in a patterned denim jacket and red sneakers sitting by a red bus"},
  {k:"32_3", t:"Rest in Peace", d:"Undated",    y:"Undated", c:"Scenes",    a:"Two people eating noodles at laptops under a screen reading REST IN PEACE"},
  {k:"33",   t:"Red Church",    d:"Undated",    y:"Undated", c:"Scenes",    a:"A terracotta church and buildings beside tall green trees"}
];
const CATS = ["All","Portraits","Scenes","Mark-making"];
const ABOUT = {
  "Portraits":"Close-up faces of friends and family, usually caught mid-expression: laughing, staring, or floating in water.",
  "Scenes":"Small moments with more than one person in them: eating, waiting, hanging out, plus a few buildings and streets.",
  "Mark-making":"Fast, loose paintings built from scribbles, splatters and painted words, where the energy matters more than the likeness."
};
const $ = s=>document.querySelector(s);
const byKey = k=>WORKS.find(w=>w.k===k);
let visible = WORKS.slice(), idx = 0, lastFocus = null, current = "All";

$("#heroImg").src = IMG["32"].src;
$("#aboutImg").src = IMG["32_2"].src;

/* Filters + grid */
try { const s = localStorage.getItem("cx2-filter"); if (CATS.includes(s)) current = s; } catch(e){}
CATS.forEach(c=>{
  const n = c==="All" ? WORKS.length : WORKS.filter(w=>w.c===c).length;
  const b = document.createElement("button"); b.type="button"; b.id="f-"+c.toLowerCase().replace(/\W/g,"");
  b.innerHTML = c+"<sup>"+n+"</sup>"; b.dataset.c=c; b.onclick=()=>setFilter(c);
  $("#filters").appendChild(b);
});
WORKS.forEach((w,i)=>{
  const im = IMG[w.k], b = document.createElement("button");
  b.className="card"; b.type="button"; b.dataset.k=w.k; b.setAttribute("aria-label","Open "+w.t);
  b.innerHTML = `<div class="mount"><img src="${im.thumb}" width="${im.w}" height="${im.h}" alt="${w.a}" loading="lazy" decoding="async"><span class="pill open">View ↗</span></div>
    <div class="row"><span class="t">${w.t}</span><span class="lbl">${w.c}</span></div>`;
  b.onclick=()=>openBox(visible.indexOf(w), visible);
  $("#grid").appendChild(b);
});
function setFilter(c){
  current = c; try { localStorage.setItem("cx2-filter", c); } catch(e){}
  $("#filters").querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.c===c));
  visible = WORKS.filter(w=>c==="All"||w.c===c);
  $("#grid").querySelectorAll(".card").forEach(p=>{ p.hidden = !visible.includes(byKey(p.dataset.k)); });
}
setFilter(current);

/* Themes accordion */
CATS.slice(1).forEach((c,i)=>{
  const set = WORKS.filter(w=>w.c===c);
  const d = document.createElement("details"); if(i===0) d.open = true;
  d.innerHTML = `<summary><span class="lbl">0${i+1}</span><span class="nm">${c}</span><span class="lbl ct">${set.length} paintings</span><span class="pm" aria-hidden="true">+</span></summary>
    <div class="body"><p>${ABOUT[c]}</p><div class="thumbs">${set.map((w,j)=>`<button type="button" data-j="${j}" aria-label="Open ${w.t}"><img src="${IMG[w.k].thumb}" alt="" loading="lazy"></button>`).join("")}</div></div>`;
  d.querySelectorAll(".thumbs button").forEach(b=>b.onclick=()=>openBox(+b.dataset.j, set));
  $("#acc").appendChild(d);
});

/* Band */
["32_3","32_4","32_8"].forEach(k=>{
  const w = byKey(k), b = document.createElement("button");
  b.type="button"; b.setAttribute("aria-label","Open "+w.t);
  b.innerHTML = `<img src="${IMG[k].thumb}" alt="${w.a}" loading="lazy">`;
  b.onclick=()=>openBox(WORKS.indexOf(w), WORKS);
  $("#band").appendChild(b);
});
document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openBox(WORKS.indexOf(byKey(b.dataset.open)), WORKS));

/* Lightbox */
const lb=$("#lb"), lbImg=$("#lbImg"), thumbs=$("#lbThumbs");
let set = WORKS;
function openBox(i, list){
  set = list; lastFocus = document.activeElement; thumbs.innerHTML="";
  set.forEach((w,j)=>{
    const t=document.createElement("button"); t.type="button"; t.setAttribute("aria-label","Show "+w.t);
    t.innerHTML=`<img src="${IMG[w.k].thumb}" alt="" loading="lazy">`; t.onclick=()=>show(j); thumbs.appendChild(t);
  });
  lb.classList.add("open"); lb.setAttribute("aria-hidden","false"); document.body.classList.add("locked");
  show(i, true); $("#lbClose").focus();
}
function closeBox(){
  lb.classList.remove("open"); lb.setAttribute("aria-hidden","true"); document.body.classList.remove("locked");
  if (lastFocus) lastFocus.focus();
}
function show(i, instant){
  idx = (i + set.length) % set.length;
  const w = set[idx];
  const apply = ()=>{
    lbImg.src = IMG[w.k].src; lbImg.alt = w.a;
    $("#lbTitle").textContent = w.t;
    $("#lbMeta").textContent = [w.d, w.c, "Paint on canvas"].join(" · ");
    $("#lbCount").innerHTML = `<b>${String(idx+1).padStart(2,"0")}</b> / ${String(set.length).padStart(2,"0")}`;
    lbImg.classList.remove("swap");
  };
  thumbs.querySelectorAll("button").forEach((t,j)=>{
    t.setAttribute("aria-current", j===idx);
    if (j===idx) t.scrollIntoView({block:"nearest",inline:"center",behavior:instant?"auto":"smooth"});
  });
  if (instant) return apply();
  lbImg.classList.add("swap"); setTimeout(apply, 180);
}
$("#lbPrev").onclick=()=>show(idx-1);
$("#lbNext").onclick=()=>show(idx+1);
$("#lbClose").onclick=closeBox;
$("#lbStage").addEventListener("click",e=>{ if(e.target.id==="lbStage") closeBox(); });
document.addEventListener("keydown",e=>{
  if(!lb.classList.contains("open")) return;
  if(e.key==="Escape") closeBox();
  else if(e.key==="ArrowLeft") show(idx-1);
  else if(e.key==="ArrowRight") show(idx+1);
  else if(e.key==="Tab"){
    const f=[...lb.querySelectorAll("button")].filter(b=>b.offsetParent);
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  }
});
let sx=null, sy=null;
$("#lbStage").addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});
$("#lbStage").addEventListener("touchend",e=>{
  if(sx===null) return;
  const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) show(idx+(dx<0?1:-1));
  sx=null;
});

