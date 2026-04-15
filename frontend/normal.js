let audio = new Audio()

// Preview Image
document.addEventListener("DOMContentLoaded", () => {

    const imageUpload = document.getElementById("imageUpload")

    imageUpload.addEventListener("change", function () {

        let file = this.files[0]

        if (file) {
            let reader = new FileReader()

            reader.onload = function (e) {
                let preview = document.getElementById("preview")
                preview.src = e.target.result
                preview.style.display = "block"
            }

            reader.readAsDataURL(file)
        }

    })

})


// Generate Description
async function generateDescription() {

    let file = document.getElementById("imageUpload").files[0]

    if (!file) {
        alert("Please select image")
        return
    }

    let formData = new FormData()
    formData.append("image", file)

    try {
        let res = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        })

        let data = await res.json()

        let text = data.description

        document.getElementById("description").innerText = text

        addHistory(text)

        generateAudio(text)

    } catch (err) {
        console.error(err)
        alert("Error generating description")
    }
}


// Text-to-Speech
function generateAudio(text) {

    let speech = new SpeechSynthesisUtterance(text)
    speech.lang = "en-US"

    window.speechSynthesis.speak(speech)
}


// Controls
function playAudio() {
    let text = document.getElementById("description").innerText
    if (text) generateAudio(text)
}

function pauseAudio() {
    window.speechSynthesis.pause()
}

function resumeAudio() {
    window.speechSynthesis.resume()
}

function rewindAudio() {
    window.speechSynthesis.cancel()
    generateAudio(document.getElementById("description").innerText)
}


// History
function addHistory(text) {

    let history = document.getElementById("historyList")

    let item = document.createElement("div")
    item.className = "history-item"
    item.innerText = text

    history.prepend(item)
}