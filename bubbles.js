document.addEventListener("DOMContentLoaded", () => {
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

    function getSpeedMultiplier(b) {
        if (b.classList.contains("very-big")) return 0.4;
        if (b.classList.contains("big")) return 0.6;
        if (b.classList.contains("normal")) return 0.9;
        if (b.classList.contains("small")) return 1.2;
        return 1;
    }

    function initBubbles() {
        bubbles.forEach(b => {
            const w = b.offsetWidth || 80;
            const h = b.offsetHeight || 80;

            b.x = Math.random() * (area.clientWidth - w);
            b.y = Math.random() * (area.clientHeight - h);

            const speed = getSpeedMultiplier(b);
            b.vx = (Math.random() - 0.5) * 2 * speed;
            b.vy = (Math.random() - 0.5) * 2 * speed;

            b.style.left = b.x + "px";
            b.style.top = b.y + "px";
        });

        loop();
    }

    function loop() {
        bubbles.forEach(b => {
            const w = b.offsetWidth || 80;
            const h = b.offsetHeight || 80;

            b.x += b.vx;
            b.y += b.vy;

            if (b.x <= 0 || b.x + w >= area.clientWidth) b.vx *= -1;
            if (b.y <= 0 || b.y + h >= area.clientHeight) b.vy *= -1;

            const cx = b.x + w / 2;
            const cy = b.y + h / 2;
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.r && dist !== 0) {
                const force = (mouse.r - dist) / mouse.r;
                const speedFactor = getSpeedMultiplier(b);

                b.vx += (dx / dist) * force * speedFactor;
                b.vy += (dy / dist) * force * speedFactor;
            }

            b.style.left = b.x + "px";
            b.style.top = b.y + "px";
        });

        requestAnimationFrame(loop);
    }

    // Wait until all images have sizes
    let loaded = 0;

    bubbles.forEach(b => {
        if (b.complete) {
            loaded++;
        } else {
            b.onload = () => {
                loaded++;
                if (loaded === bubbles.length) initBubbles();
            };
        }
    });

    if (loaded === bubbles.length) {
        initBubbles();
    }
});
