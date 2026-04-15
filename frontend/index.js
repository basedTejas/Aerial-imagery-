// Create main container
const container = document.createElement("div");
container.className = "container";

// Title
const title = document.createElement("h1");
title.innerText = "Aerial Imagery";

// Subtitle
const subtitle = document.createElement("p");
subtitle.className = "subtitle";
subtitle.innerText = "Choose your preferred mode to continue";

// Card container
const cardContainer = document.createElement("div");
cardContainer.className = "card-container";

// ---------- NORMAL CARD ----------
const normalCard = document.createElement("div");
normalCard.className = "card";

normalCard.innerHTML = `
    <div class="icon">👁️</div>
    <h2>Normal</h2>
    <p>Standard interface with full visual features</p>
    <a href="normal.html">
        <button>Enter Normal Mode</button>
    </a>
`;

// ---------- BLIND CARD ----------
const blindCard = document.createElement("div");
blindCard.className = "card";

blindCard.innerHTML = `
    <div class="icon">🧑‍🦯</div>
    <h2>Blind</h2>
    <p>Accessibility-optimized interface with audio support</p>
    <a href="blind.html">
        <button>Enter Blind Mode</button>
    </a>
`;

// Append cards
cardContainer.appendChild(normalCard);
cardContainer.appendChild(blindCard);

// Append everything
container.appendChild(title);
container.appendChild(subtitle);
container.appendChild(cardContainer);

document.body.appendChild(container);

// ---------- STYLES ----------
const style = document.createElement("style");
style.innerHTML = `
body{
    margin:0;
    background:#000;
    color:#fff;
    font-family: "Segoe UI", sans-serif;
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
}

.container{
    text-align:center;
}

h1{
    font-size:48px;
    margin-bottom:10px;
}

.subtitle{
    color:#aaa;
    margin-bottom:40px;
}

.card-container{
    display:flex;
    gap:40px;
    justify-content:center;
}

.card{
    background:#111;
    padding:30px;
    width:250px;
    border-radius:15px;
    box-shadow:0 0 20px rgba(255,255,255,0.05);
    transition:0.3s;
}

.card:hover{
    transform:translateY(-5px);
    box-shadow:0 0 30px rgba(255,255,255,0.1);
}

.icon{
    font-size:40px;
    margin-bottom:15px;
}

.card h2{
    margin:10px 0;
}

.card p{
    color:#bbb;
    font-size:14px;
    margin-bottom:20px;
}

button{
    padding:12px 20px;
    border:none;
    border-radius:8px;
    background:#fff;
    color:#000;
    cursor:pointer;
    font-weight:600;
}

button:hover{
    background:#ddd;
}

a{
    text-decoration:none;
}
`;

document.head.appendChild(style);