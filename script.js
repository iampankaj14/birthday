document.getElementById('surpriseButton').addEventListener('click', function () {
    const canvas = document.getElementById('balloons');
    const ctx = canvas.getContext('2d');
    const balloons = [];
    const confetti = [];

    // Resize canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create balloons
    for (let i = 0; i < 20; i++) {
        balloons.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            radius: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 100%, 75%)`,
            speed: Math.random() * 2 + 1,
            drift: Math.random() * 2 - 1, // Horizontal drift
        });
    }

    // Create confetti
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: Math.random() * 5 + 2,
            height: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            speed: Math.random() * 3 + 1,
            angle: Math.random() * Math.PI * 2,
        });
    }

    // Animate balloons, confetti, and fireworks
    function drawFireworks(x, y, colors) {
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(
                x + Math.cos(angle) * speed * 20,
                y + Math.sin(angle) * speed * 20,
                Math.random() * 3 + 1,
                0,
                Math.PI * 2
            );
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fill();
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw balloons
        balloons.forEach(balloon => {
            ctx.beginPath();
            ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
            ctx.fillStyle = balloon.color;
            ctx.fill();

            // Move balloons
            balloon.y -= balloon.speed;
            balloon.x += balloon.drift;

            // Reset balloon if it goes off screen
            if (balloon.y + balloon.radius < 0) {
                balloon.y = canvas.height + balloon.radius;
                balloon.x = Math.random() * canvas.width;
            }
        });

        // Draw confetti
        confetti.forEach(paper => {
            ctx.save();
            ctx.translate(paper.x, paper.y);
            ctx.rotate(paper.angle);
            ctx.fillStyle = paper.color;
            ctx.fillRect(-paper.width / 2, -paper.height / 2, paper.width, paper.height);
            ctx.restore();

            // Move confetti
            paper.y += paper.speed;
            paper.angle += 0.1;

            // Reset confetti if it goes off screen
            if (paper.y > canvas.height) {
                paper.y = -paper.height;
                paper.x = Math.random() * canvas.width;
            }
        });

        drawFireworks(canvas.width / 2, canvas.height / 2, ["#ff0000", "#ffff00", "#00ff00", "#00ffff"]);
        requestAnimationFrame(draw);
    }

    draw();

    // Start typing effect
    typeMessage("Hope you have a fantastic day ahead!", "typingEffect", 100);

    // Start countdown
    startCountdown(5, "timeLeft");
});

// Typing Effect
function typeMessage(message, elementId, delay = 100) {
    const element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < message.length) {
            element.textContent += message[index];
            index++;
            setTimeout(type, delay);
        }
    }

    type();
}

// Countdown Timer
function startCountdown(duration, displayId) {
    let timer = duration;
    const display = document.getElementById(displayId);

    const interval = setInterval(() => {
        display.textContent = `Countdown: ${timer} seconds`;
        timer--;

        if (timer < 0) {
            clearInterval(interval);
            display.textContent = "🎉 Happy Birthday! 🎉";
        }
    }, 1000);
}

// Balloon Pop Interaction
const canvas = document.getElementById('balloons');
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balloons.forEach((balloon, index) => {
        const distance = Math.sqrt((mouseX - balloon.x) ** 2 + (mouseY - balloon.y) ** 2);
        if (distance < balloon.radius) {
            balloons.splice(index, 1); // Remove popped balloon
        }
    });
});
