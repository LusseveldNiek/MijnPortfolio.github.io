const container = document.querySelector(".skills-physics");
const bubbles = [...document.querySelectorAll(".skill")];

const mouse = { x: 0, y: 0, radius: 120 };

container.addEventListener("mousemove", e => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

bubbles.forEach(b => {
    b.x = Math.random() * (container.clientWidth - b.offsetWidth);
    b.y = Math.random() * (container.clientHeight - b.offsetHeight);
    b.vx = (Math.random() - 0.5) * 1.5;
    b.vy = (Math.random() - 0.5) * 1.5;
});

function animate() {
    bubbles.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        // walls
        if (b.x <= 0 || b.x + b.offsetWidth >= container.clientWidth) b.vx *= -1;
        if (b.y <= 0 || b.y + b.offsetHeight >= container.clientHeight) b.vy *= -1;

        // mouse repel
        const dx = b.x + b.offsetWidth / 2 - mouse.x;
        const dy = b.y + b.offsetHeight / 2 - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
            b.vx += dx / dist;
            b.vy += dy / dist;
        }

        b.style.transform = `translate(${b.x}px, ${b.y}px)`;
    });

    requestAnimationFrame(animate);
}

animate();
