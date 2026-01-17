const container = document.getElementById("bubbleContainer");

const logos = [
    { name: "CsharpLogo.png", size: 120 },
    { name: "UnityLogo.png", size: 120 },
    { name: "GithubLogo.png", size: 120 },

    { name: "KritaLogo.png", size: 90 },
    { name: "BlenderLogo.png", size: 90 },
    { name: "NetLogo.png", size: 90 },

    { name: "TrelloLogo.png", size: 70 },
    { name: "FlauiLogo.png", size: 70 },
    { name: "ReqnrollLogo.png", size: 70 },
    { name: "JavascriptLogo.png", size: 70 },
    { name: "N8nLogo.png", size: 70 },

    { name: "DevexpressLogo.png", size: 50 },
    { name: "DevopsLogo.png", size: 50 },
    { name: "HtmlLogo.png", size: 50 },
    { name: "UnrealengineLogo.png", size: 50 }
];

const bubbles = [];

logos.forEach(logo => {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.width = bubble.style.height = `${logo.size}px`;

    const img = document.createElement("img");
    img.src = logo.name;

    bubble.appendChild(img);
    container.appendChild(bubble);

    const bubbleData = {
        el: bubble,
        x: Math.random() * (container.clientWidth - logo.size),
        y: Math.random() * (container.clientHeight - logo.size),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: logo.size
    };

    bubbles.push(bubbleData);
});

function animate() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    bubbles.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0 || b.x + b.size >= width) b.vx *= -1;
        if (b.y <= 0 || b.y + b.size >= height) b.vy *= -1;

        b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();
