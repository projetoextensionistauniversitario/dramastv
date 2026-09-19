const shows=[
 {id:1,title:"A Dívida do Meu Pai",cat:"Drama",desc:"Uma jovem descobre que o passado da família esconde uma dívida que pode mudar seu destino.",episodes:8,badge:"NOVO"},
 {id:2,title:"Entre Dois Mundos",cat:"Romance",desc:"Um encontro inesperado coloca duas vidas em caminhos completamente diferentes.",episodes:6,badge:"POPULAR"},
 {id:3,title:"O Segredo da Mansão",cat:"Mistério",desc:"Uma casa antiga, uma família poderosa e um segredo que ninguém quer revelar.",episodes:10,badge:""},
 {id:4,title:"Amor em Silêncio",cat:"Romance",desc:"Quando sentimentos guardados por anos finalmente vêm à tona.",episodes:7,badge:""},
 {id:5,title:"A Nova Aluna",cat:"Novelinhas",desc:"Uma chegada inesperada transforma a rotina de uma escola.",episodes:5,badge:"NOVO"},
 {id:6,title:"Sombras do Passado",cat:"Mistério",desc:"Uma pista esquecida faz uma história antiga voltar à vida.",episodes:9,badge:""},
 {id:7,title:"Destino Cruzado",cat:"Drama",desc:"Duas famílias, escolhas difíceis e um encontro que ninguém esperava.",episodes:8,badge:""},
 {id:8,title:"Depois do Adeus",cat:"Novelinhas",desc:"Uma nova fase começa quando tudo parecia ter chegado ao fim.",episodes:6,badge:""}
];
let fav=JSON.parse(localStorage.getItem("dramastv_fav")||"[]");
let activeCat="Todos";

function render(){
 const q=document.querySelector("#search").value.toLowerCase().trim();
 const list=shows.filter(s=>(activeCat==="Todos"||s.cat===activeCat)&&(`${s.title} ${s.desc}`.toLowerCase().includes(q)));
 document.querySelector("#catalog").innerHTML=list.map(card).join("")||'<div class="empty">Nenhuma história encontrada.</div>';
 renderFav();
}
function card(s){
 const liked=fav.includes(s.id);
 return `<article class="card" onclick="openDetail(${s.id})">
   <div class="poster"><small>${s.cat}</small>${s.title}<button class="heart" onclick="toggleFav(event,${s.id})">${liked?"♥":"♡"}</button></div>
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
  <div class="detail-poster">${s.title}</div>
  <h2>${s.title}</h2><p>${s.desc}</p>
  <p class="muted">${s.episodes} episódios disponíveis no catálogo demonstrativo.</p>
  <div class="episodes">${Array.from({length:s.episodes},(_,i)=>`<div class="episode"><span><b>Episódio ${i+1}</b><br><small>Conteúdo demonstrativo</small></span><button onclick="alert('O reprodutor será conectado quando o armazenamento de vídeos estiver configurado.')">▶ Assistir</button></div>`).join("")}</div>`;
 document.querySelector("#detailModal").classList.add("open");
}
document.querySelector("#search").addEventListener("input",render);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCat=b.dataset.cat;render()}));
document.querySelector("#loginBtn").onclick=()=>document.querySelector("#loginModal").classList.add("open");
document.querySelector("#profileBtn").onclick=()=>document.querySelector("#loginModal").classList.add("open");
document.querySelector("#demoLogin").onclick=()=>{alert("Login demonstrativo. Na versão online real, vamos conectar autenticação e banco de dados.");document.querySelector("#loginModal").classList.remove("open")};
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=()=>x.closest(".modal").classList.remove("open"));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
render();