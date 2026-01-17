const area = document.getElementById("bubble-area");
const bubbles = [...document.querySelectorAll(".bubble")];

const mouse = { x: -9999, y: -9999, r: 120 };

area.addEventListener("mousemove", e => {
    const rect = area.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

area.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
});

bubbles.forEach(b => {
    b.x = Math.random() * (area.clientWidth - b.offsetWidth);
    b.y = Math.random() * (area.clientHeight - b.offsetHeight);
    b.vx = (Math.random() - 0.5) * 1.2;
    b.vy = (Math.random() - 0.5) * 1.2;
    b.style.left = b.x + "px";
    b.style.top = b.y + "px";
});

function loop() {
    bubbles.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0 || b.x + b.offsetWidth >= area.clientWidth) b.vx *= -1;
        if (b.y <= 0 || b.y + b.offsetHeight >= area.clientHeight) b.vy *= -1;

        const cx = b.x + b.offsetWidth / 2;
        const cy = b.y + b.offsetHeight / 2;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.r) {
            const force = (mouse.r - dist) / mouse.r;
            b.vx += (dx / dist) * force;
            b.vy += (dy / dist) * force;
        }

        b.style.left = b.x + "px";
        b.style.top = b.y + "px";
    });

    requestAnimationFrame(loop);
}

loop();
