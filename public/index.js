<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WhatsApp Bot Host</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

body {
    font-family: 'Share Tech Mono', monospace;
    margin: 0;
    padding: 0;
    background: black;
    color: #00ff66;
    overflow-x: hidden;
}

canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: rgba(0,0,0,0.9);
    border-bottom: 2px solid #00ff66;
}

header h1 {
    font-size: 1.8rem;
    text-shadow: 0 0 5px #00ff66;
}

button {
    padding: 10px 20px;
    background: transparent;
    color: #00ff66;
    border: 2px solid #00ff66;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Share Tech Mono', monospace;
}

button:hover {
    background: #00ff66;
    color: black;
    box-shadow: 0 0 10px #00ff66, 0 0 20px #00ff66;
}

section {
    padding: 50px;
    text-align: center;
}

h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-shadow: 0 0 5px #00ff66;
}

input {
    padding: 10px;
    border: 2px solid #00ff66;
    background: black;
    color: #00ff66;
    font-family: 'Share Tech Mono', monospace;
}

#output {
    margin-top: 20px;
    border: 1px solid #00ff66;
    padding: 15px;
    display: inline-block;
    text-align: left;
    box-shadow: 0 0 10px #00ff66;
}

/* Console Popup */
.console {
    display: none;
    background: black;
    border: 2px solid #00ff66;
    padding: 20px;
    margin-top: 20px;
    width: 80%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    text-align: left;
    animation: glow 1.5s infinite alternate;
    white-space: pre-wrap;
}

@keyframes glow {
    0% { text-shadow: 0 0 5px #00ff66; }
    50% { text-shadow: 0 0 20px #00ff66; }
    100% { text-shadow: 0 0 5px #00ff66; }
}
</style>
</head>
<body>

<canvas id="matrix"></canvas>

<header>
    <h1>WhatsApp Bot Host</h1>
    <button onclick="toggleTheme()">Toggle Theme</button>
</header>

<section>
    <h2>Create Your WhatsApp Bot Server</h2>
    <button onclick="openConsole()">Create Server</button>
    <div id="console" class="console"></div>
    <div id="output"></div>
</section>

<section>
    <h2>Pay for Server</h2>
    <input type="text" id="serverId" placeholder="Enter Server ID" />
    <button onclick="payServer()">Pay</button>
</section>

<script>
// Theme toggle
function toggleTheme() {
    document.body.classList.toggle("dark");
}

// Hacker console typing effect
function typeConsoleLines(lines, element, callback) {
    let i = 0;
    let currentLine = 0;

    function typeLine(line, cb) {
        let charIndex = 0;
        let interval = setInterval(() => {
            element.innerHTML += line.charAt(charIndex);
            charIndex++;
            if (charIndex === line.length) {
                clearInterval(interval);
                element.innerHTML += "\n";
                cb();
            }
        }, 30);
    }

    function nextLine() {
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], () => {
                currentLine++;
                setTimeout(nextLine, 200);
            });
        } else if (callback) {
            callback();
        }
    }

    nextLine();
}

// Hacker-style console popup
async function openConsole() {
    const consoleElement = document.getElementById("console");
    consoleElement.innerHTML = "";
    consoleElement.style.display = "block";

    const logLines = [
        "[BOOT] Initializing WhatsApp Bot Host...",
        "[BOOT] Connecting to remote server...",
        "[BOOT] Authenticating...",
        "[BOOT] Creating server instance...",
        "[BOOT] Allocating resources...",
        "[BOOT] Finalizing setup..."
    ];

    typeConsoleLines(logLines, consoleElement, async () => {
        const res = await fetch("/api/create-server");
        const data = await res.json();
        consoleElement.innerHTML += `\n[SUCCESS] Server created!\n[INFO] Server ID: ${data.serverId}\n[INFO] Expires: ${new Date(data.expires).toLocaleString()}`;
        document.getElementById("output").innerHTML = `<p>Server ID: ${data.serverId}</p><p>Expires: ${new Date(data.expires).toLocaleString()}</p>`;
    });
}

// Pay server
async function payServer() {
    const serverId = document.getElementById("serverId").value;
    const res = await fetch("/api/pay-server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serverId })
    });
    const data = await res.json();
    alert(data.message);
}

// Matrix Background Animation
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, index * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }
        drops[index]++;
    });
}
setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
</script>
</body>
  </html>
