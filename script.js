// Confetti animation
class Confetti {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 10 + 5;
        this.rotation = Math.random() * 360;
        this.speed = Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.element = document.createElement('div');
        this.element.style.cssText = `
            position: absolute;
            width: ${this.w}px;
            height: ${this.h}px;
            background-color: ${this.color};
            transform: rotate(${this.rotation}deg);
            left: ${this.x}px;
            top: ${this.y}px;
            pointer-events: none;
            z-index: 1;
        `;
        document.getElementById('confetti-container').appendChild(this.element);
    }

    update() {
        this.y += this.speed;
        this.rotation += 5;
        this.element.style.top = `${this.y}px`;
        this.element.style.transform = `rotate(${this.rotation}deg)`;

        if (this.y > window.innerHeight) {
            this.element.remove();
        }
    }
}

// Create confetti particles
const confettiParticles = [];
setInterval(() => {
    confettiParticles.push(new Confetti());
}, 100);

// Update confetti animation
function updateConfetti() {
    confettiParticles.forEach((particle, index) => {
        particle.update();
        if (particle.y > window.innerHeight) {
            confettiParticles.splice(index, 1);
        }
    });
    requestAnimationFrame(updateConfetti);
}

updateConfetti();

// Add 3D effect to the cake
document.addEventListener('mousemove', (e) => {
    const cake = document.querySelector('.cake');
    const rect = cake.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cake.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset cake position when mouse leaves
document.querySelector('.cake').addEventListener('mouseleave', () => {
    document.querySelector('.cake').style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
}); 
