
const layout = document.createElement("div");
layout.className = "layout";
const sidebar = document.createElement("div");
sidebar.className = "sidebar";

sidebar.innerHTML = `
<h2>History</h2>
<div id="historyList"></div>
`;

const main = document.createElement("div");
main.className = "main";

main.innerHTML = `
<a href="index.html" class="back">← Back to Home</a>

<h1>Blind Mode</h1>
<p class="subtitle">
Upload an image to generate a description and listen to it using audio controls.
</p>

<div class="upload-box">
<p>Upload or Drag Image</p>
<input type="file" id="imageUpload" accept="image/*">
<br>
<img id="preview">
<br>
<button id="generateBtn">Generate Description</button>
</div>

<p id="description"></p>

<div class="controls">
<button id="playBtn">Play</button>
<button id="pauseBtn">Pause</button>
<button id="resumeBtn">Resume</button>
<button id="rewindBtn">Back 10s</button>
</div>

<div class="features">
<h2>Features</h2>

<div class="card-container">

<div class="card">
<h3>🖼 Image Upload</h3>
<p>Select or drag an image to generate description instantly.</p>
</div>

<div class="card">
<h3>🔊 Audio Output</h3>
<p>Automatically converts description into speech.</p>
</div>

<div class="card">
<h3>⏯ Playback Control</h3>
<p>Pause, resume, or replay audio easily.</p>
</div>

<div class="card">
<h3>📜 History</h3>
<p>View previously generated descriptions in sidebar.</p>
</div>

</div>
</div>

<section class="shortcuts-section">
<h2>Keyboard Shortcuts</h2>

<div class="shortcuts-table">

<div class="row header">
<span>Key</span>
<span>Function</span>
</div>

<div class="row"><span class="key-badge">U</span><span>Upload image</span></div>
<div class="row"><span class="key-badge">Enter</span><span>Confirm</span></div>
<div class="row"><span class="key-badge">R</span><span>Replay</span></div>
<div class="row"><span class="key-badge">P</span><span>Pause/Resume</span></div>
<div class="row"><span class="key-badge">S</span><span>Slow speech</span></div>
<div class="row"><span class="key-badge">F</span><span>Fast speech</span></div>
<div class="row"><span class="key-badge">D</span><span>Download audio</span></div>
<div class="row"><span class="key-badge">H</span><span>Help</span></div>
<div class="row"><span class="key-badge">Q</span><span>Exit</span></div>

</div>
</section>
`;

layout.appendChild(sidebar);
layout.appendChild(main);
document.body.appendChild(layout);

// Preview 
document.getElementById("imageUpload").addEventListener("change", function () {
    let file = this.files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let preview = document.getElementById("preview");
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Description
document.getElementById("generateBtn").addEventListener("click", generateDescription);

async function generateDescription() {

    let file = document.getElementById("imageUpload").files[0];

    if (!file) {
        alert("Please select image");
        return;
    }

    let formData = new FormData();
    formData.append("image", file);

    let res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData
    });

    let data = await res.json();
    let text = data.description;

    document.getElementById("description").innerText = text;

    addHistory(text);
    speak(text);
}

// Speech
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Control
document.getElementById("playBtn").onclick = () => {
    speak(document.getElementById("description").innerText);
};

document.getElementById("pauseBtn").onclick = () => {
    window.speechSynthesis.pause();
};

document.getElementById("resumeBtn").onclick = () => {
    window.speechSynthesis.resume();
};

document.getElementById("rewindBtn").onclick = () => {
    window.speechSynthesis.cancel();
    speak(document.getElementById("description").innerText);
};

// Hist
function addHistory(text) {
    let history = document.getElementById("historyList");

    let item = document.createElement("div");
    item.className = "history-item";
    item.innerText = text;

    history.prepend(item);
}

//Shortcuts
document.addEventListener("keydown", function (e) {
    let key = e.key.toLowerCase();
    switch (key) {
        case "u":
            document.getElementById("imageUpload").click();
            break;
        case "r":
            speak(document.getElementById("description").innerText);
            break;

        case "p":
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            } else {
                window.speechSynthesis.pause();
            }
            break;

        case "s":
            
            alert("Slow speech not supported in browser");
            break;

        case "f":
            alert("Fast speech not supported in browser");
            break;

        case "h":
            alert("Use U=Upload, P=Pause, R=Replay");
            break;

        case "q":
            window.location.href = "index.html";
            break;
    }
});
