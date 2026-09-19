const shows=[
 {id:1,title:"A VÍPERA DONNA",cat:"Drama",desc:"A Justiça da Madrasta na Máfia.",episodes:8,badge:"EM ALTA",cover:"assets/capa-vipera-donna.jpeg"},
 {id:2,title:"ENTRE CHAMAS E ESCAMAS",cat:"Romance",desc:"Uma história de fantasia, romance e drama em meio a mistérios.",episodes:6,badge:"NOVIDADE",cover:"assets/capa-entre-chamas-e-escamas.jpeg"}
];

let fav=JSON.parse(localStorage.getItem("dramastv_fav")||"[]");
let activeCat="Todos";

function render(){
 const q=document.querySelector("#search").value.toLowerCase().trim();
 const list=shows.filter(s=>
   (activeCat==="Todos"||s.cat===activeCat) &&
   (`${s.title} ${s.desc}`.toLowerCase().includes(q))
 );
 document.querySelector("#catalog").innerHTML=list.map(card).join("")||
   '<div class="empty">Nenhuma história encontrada.</div>';
 renderFav();
}

function card(s){
 const liked=fav.includes(s.id);
 return `<article class="card" onclick="openDetail(${s.id})">
   <div class="poster poster-image" style="background-image:url('${s.cover}')">
     <small>${s.badge||s.cat}</small>
     <button class="heart" onclick="toggleFav(event,${s.id})">${liked?"♥":"♡"}</button>
   </div>
   <div class="card-body"><h3>${s.title}</h3><p>${s.desc}</p></div>
 </article>`;
}

function renderFav(){
 const list=shows.filter(s=>fav.includes(s.id));
 document.querySelector("#favoritesGrid").innerHTML=list.map(card).join("");
 document.querySelector("#emptyFav").style.display=list.length?"none":"block";
}

function toggleFav(e,id){
 e.stopPropagation();
 fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];
 localStorage.setItem("dramastv_fav",JSON.stringify(fav));
 render();
}

function openDetail(id){
 const s=shows.find(x=>x.id===id);
 document.querySelector("#detail").innerHTML=`
  <div class="detail-poster poster-image" style="background-image:url('${s.cover}')">
    <small class="detail-badge">${s.badge||s.cat}</small>
  </div>
  <h2>${s.title}</h2>
  <p>${s.desc}</p>
  <p class="muted">${s.episodes} episódios disponíveis no catálogo demonstrativo.</p>
  <div class="episodes">
    ${Array.from({length:s.episodes},(_,i)=>`
      <div class="episode">
        <span><b>Episódio ${i+1}</b><br><small>Conteúdo demonstrativo</small></span>
        <button onclick="alert('O reprodutor será conectado quando o armazenamento de vídeos estiver configurado.')">▶ Assistir</button>
      </div>`).join("")}
  </div>`;
 document.querySelector("#detailModal").classList.add("open");
}

document.querySelector("#search").addEventListener("input",render);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");
 activeCat=b.dataset.cat;
 render();
}));
document.querySelector("#loginBtn").onclick=()=>document.querySelector("#loginModal").classList.add("open");
document.querySelector("#profileBtn").onclick=()=>document.querySelector("#loginModal").classList.add("open");
document.querySelector("#demoLogin").onclick=()=>{
 alert("Login demonstrativo. A autenticação real será conectada em uma próxima etapa.");
 document.querySelector("#loginModal").classList.remove("open");
};
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>x.closest(".modal").classList.remove("open"));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{
 if(e.target===m)m.classList.remove("open");
}));
render();
