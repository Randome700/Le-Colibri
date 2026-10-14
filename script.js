/* Données de la carte : modifier ici prix et plats. p = prix en DT (null = non précisé), n = précision */
const MENU=[
{id:"entrees",t:"Nos Entrées",items:[["Brick au Thon",5],["Brick aux Chevrettes",6],["Salade mechouia",8],["Salade Tunisienne",8],["Salade César",20],["Salade Fruit de mer",24],["Omelette Thon",17,"Frite · Salade · Riz"],["Omelette Chevrette",19,"Frite · Salade · Riz"]]},
{id:"poissons",t:"Poissons / Fruits de mer",items:[["Plat Daurade Grillée",25],["Plat Loup Grillé",27],["Poissons du Jour",null,"Selon disponibilité"],["Plat Calamar",38,"Grillé / Sauté / Panée"],["Plat Seiche",38,"Grillé / Sauté / Panée"],["Plat Crevette",38,"Grillé / Sauté"],["Corbeille Fruit de mer Le Colibri",120],["Mixte Fruit de Mer",70]]},
{id:"viandes",t:"Viandes",items:[["Grillade Mixte",45],["Plat Kabab",25],["Plat Merguez",22],["Plat Côtelettes d'agneau",40],["Plat Foie",35],["Filet",45,"Grillé / Sauce Champignons / Sauce Poivre / Demi-Glace"],["Faux Filet",40,"Grillé / Sauce Champignons / Sauce Poivre / Demi-Glace"],["Plat Le Colibri",60,"Filet ou Faux Filet + Crevette + Moules"]]},
{id:"volailles",t:"Volailles",items:[["1/4 Poulet Grillé",18],["Escalope Grillée",22],["Escalope Panée",25],["Escalope Sauce Champignon",28],["Escalope Sauce Poivre",27],["Escalope à la Thaïlandaise",26],["Cordon bleu",27],["Brochette d'Escalope",20]]},
{id:"pates",t:"Pâtes",sub:"Spaghetti, penne, tagliatelle",items:[["Lasagne Viande",24],["Spaghetti Bolognaise",25],["Spaghetti Escalope",20],["Spaghetti Carbonara",26],["Spaghetti Puttanesca",24],["Spaghetti Fruit de mer",38],["Spaghetti Crevette",38],["Tagliatelle Pesto Escalope",28],["Tagliatelle Pesto Fruit de mer",40],["Ravioli Bolognaise",35],["Ravioli 4 Fromage",35],["Pennes aux crevettes sauce rosée",40]]},
{id:"riz",t:"Riz & Paella",items:[["Riz Fruit de mer",38],["Paella 2 personnes",70,"Sur commande"]]},
{id:"ojja",t:"Nos Ojja",items:[["Ojja merguez",20],["Ojja escalope",18],["Ojja Royale",23],["Ojja Fruits de mer",29]]},
{id:"kolla",t:"El Kolla",kolla:true,items:[["Kolla Fruit de mer",100],["Kolla Le COLIBRI",100]]},
{id:"desserts",t:"Desserts et Boissons",items:[["Eau",2],["Soda",2.5],["Eau Gazéifiée",2.5],["Citronnade à la menthe",4.5],["Jus de fraise",5],["Salade de fruits de saison",8]]}
];
const $=s=>document.querySelector(s),tabs=$("#tabs"),panel=$("#panel");
const fmt=p=>p.toFixed(3).replace(".",".");
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
function itemHTML(i){const[n,p,nt]=i;return `<li class="item"><div><span class="nm">${esc(n)}</span>${nt?`<span class="nt">${esc(nt)}</span>`:""}</div><span class="dots" aria-hidden="true"></span>${p===null?`<span class="pr none">Prix non précisé</span>`:`<span class="pr">${fmt(p)}<small>DT</small></span>`}</li>`}
function render(id,focus){
 const idx=MENU.findIndex(c=>c.id===id),c=MENU[idx];
 [...tabs.children].forEach(b=>{const on=b.dataset.id===id;b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;if(on&&focus){b.focus();b.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})}});
 panel.setAttribute("aria-labelledby","tab-"+id);
 const n=String(idx+1).padStart(2,"0");
 let body;
 if(c.kolla){body=`<div class="kolla"><div class="ar" lang="ar" dir="rtl">القلّة</div><div class="notice" role="note"><b>4 h</b><span>Réservation obligatoire au moins quatre heures à l'avance. Appelez le +216 58 121 352.</span></div><ul class="items">${c.items.map(itemHTML).join("")}</ul></div>`}
 else body=`<ul class="items">${c.items.map(itemHTML).join("")}</ul>`;
 panel.innerHTML=`<div class="panel-grid"><div class="panel-title"><span class="n">${n} / ${String(MENU.length).padStart(2,"0")}</span><h3>${esc(c.t)}</h3>${c.sub?`<p>${esc(c.sub)}</p>`:""}</div><div>${body}</div></div>`;
 panel.classList.remove("panel");void panel.offsetWidth;panel.classList.add("panel");
}
MENU.forEach(c=>{const b=document.createElement("button");b.className="tab";b.role="tab";b.id="tab-"+c.id;b.dataset.id=c.id;b.textContent=c.t;b.setAttribute("aria-controls","panel");b.onclick=()=>{render(c.id);b.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})};tabs.appendChild(b)});
tabs.addEventListener("keydown",e=>{const bs=[...tabs.children],i=bs.findIndex(b=>b.getAttribute("aria-selected")==="true");let j=null;
 if(e.key==="ArrowRight")j=(i+1)%bs.length;else if(e.key==="ArrowLeft")j=(i-1+bs.length)%bs.length;else if(e.key==="Home")j=0;else if(e.key==="End")j=bs.length-1;
 if(j!==null){e.preventDefault();render(bs[j].dataset.id,true)}});
render(MENU[0].id);

/* navigation */
const hdr=$("#top"),burger=$(".burger"),nav=$("#nav");
const onScroll=()=>hdr.classList.toggle("solid",scrollY>40||nav.classList.contains("open"));
addEventListener("scroll",onScroll,{passive:true});onScroll();
function setNav(o){nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Fermer le menu de navigation":"Ouvrir le menu de navigation");document.body.style.overflow=o?"hidden":"";onScroll()}
burger.onclick=()=>setNav(!nav.classList.contains("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setNav(false)));
addEventListener("keydown",e=>{if(e.key==="Escape")setNav(false)});
matchMedia("(min-width:901px)").addEventListener("change",()=>setNav(false));

/* révélations */
const rv=document.querySelectorAll(".rv");
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});rv.forEach(r=>io.observe(r))}else rv.forEach(r=>r.classList.add("in"));
$("#yr").textContent=new Date().getFullYear();
