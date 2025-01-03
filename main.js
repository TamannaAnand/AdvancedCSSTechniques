// Author: Tamanna Anand
// Title: Acme Creatives
// Date: 2024-11-27
//https://www.linkedin.com/learning/learning-html-canvas

const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window size
//https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

// Function to create a particle object
function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5
    };
}

// Function to update a particle's position
function updateParticle(particle) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Reverse direction if particle hits canvas edges
    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
}

// Function to draw a particle on the canvas
function drawParticle(particle) {
    ctx.fillStyle = 'rgba(78, 56, 131, 0.5)';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
}

// Initialize the particles array
function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }
}

// Animation loop to update and redraw particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    particles.forEach(particle => {
        updateParticle(particle);  // Update particle position
        drawParticle(particle);    // Draw particle on the canvas
    });

    requestAnimationFrame(animate);  // Schedule the next frame
}

// Initialize and start the animation
initParticles();
animate();

// Adjust canvas and particles on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;  // Clear existing particles
    initParticles();        // Reinitialize particles
});
