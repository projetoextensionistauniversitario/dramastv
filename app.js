const defaults=[
{title:"Mulher Má: A Madrasta Justa do Crime",cat:"Novelinhas",eps:12,img:"https://dummyimage.com/420x600/220022/ffffff&text=Mulher+Má"},
{title:"A Dívida do Meu Pai",cat:"Novelinhas",eps:20,img:"https://dummyimage.com/420x600/220022/ffffff&text=A+Dívida+do+Meu+Pai"},
{title:"A Vípèra Donna: A Justiça da Máfia",cat:"Novelas",eps:10,img:"https://dummyimage.com/420x600/220022/ffffff&text=Vípèra+Donna"},
{title:"Sol da Minha Vida",cat:"Doramas",eps:16,img:"https://dummyimage.com/420x600/220022/ffffff&text=Sol+da+Minha+Vida"}];
let cat="Todos";
function items(){return JSON.parse(localStorage.getItem("dtv_items")||"null")||defaults}
function render(){const q=(document.getElementById("search").value||"").toLowerCase();document.getElementById("catalog").innerHTML=items().filter(x=>(cat==="Todos"||x.cat===cat)&&x.title.toLowerCase().includes(q)).map(x=>`<article class="card" onclick="watch('${x.title.replaceAll("'","\\'")}')"><img src="${x.img}"><h3>${x.title}</h3><small>${x.eps} episódios</small></article>`).join("")}
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chips button").forEach(x=>x.classList.remove("active"));b.classList.add("active");cat=b.dataset.cat;render()});
function modal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function watch(t){modal(`<h2>${t}</h2><p>A página real terá capa, sinopse, episódios e player de vídeo.</p><div style="background:#050505;height:180px;border-radius:12px;display:grid;place-items:center;color:#ff2b9f;font-size:40px">▶</div><br><button class="primary" onclick="closeModal()">Assistir</button>`)}
document.getElementById("loginBtn").onclick=()=>modal(`<h2>Entrar</h2><input id="email" placeholder="E-mail" style="width:100%;padding:12px;margin:8px 0;background:#080808;color:white;border:1px solid #444"><input type="password" placeholder="Senha" style="width:100%;padding:12px;margin:8px 0;background:#080808;color:white;border:1px solid #444"><button class="primary" onclick="login()">Entrar</button>`);
function login(){document.getElementById("profile").textContent="Conta conectada. O backend será responsável pela autenticação real.";closeModal()}
function checkout(plan){modal(`<h2>Plano ${plan}</h2><p>Checkout preparado para integração com um gateway de pagamento e Pix.</p><button class="primary" onclick="closeModal()">Continuar</button>`)}
render();