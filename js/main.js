// Space-themed Portfolio JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize typing effect
    initTypewriter();
    
    // Handle navigation
    initNavigation();
    
    // Detect scroll for header styles
    handleScroll();
});

// Typing effect in hero section
function initTypewriter() {
    const typingElement = document.querySelector('.typing');
    const words = ['Quant Researcher', 'Machine Learning Engineer', 'Prompt Engineer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 150;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 75; // Delete faster than typing
        } else {
            // Add a character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 150;
        }
        
        // If word is complete, start deleting after delay
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 1500; // Pause at end of word
        } 
        // If deletion is complete, move to next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // Pause before starting new word
        }
        
        setTimeout(type, typeDelay);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}

// Navigation and mobile menu
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    }
}

// Add some space-themed particles to the background
function createStarParticles() {
    const starContainer = document.querySelector('.stars');
    const particleCount = 100;
    
    if (!starContainer) return;
    
    for (let i = 0; i < particleCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random opacity and animation delay
        star.style.opacity = Math.random();
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        starContainer.appendChild(star);
    }
}

// Particle Collision Simulator inspired by LHC
class ParticleCollider {
    constructor(container) {
        this.container = container;
        this.colliderElement = null;
        this.particles = [];
        this.decayParticles = [];
        this.particleCount = 20;
        this.decayCount = 0;
        this.collisionThreshold = 15;
        this.animationFrame = null;
        this.collisionHappened = false;
        this.gravitationalWaves = [];
        this.lastWaveTime = 0;
        this.warpActive = false;
        this.particleTypes = [
            { type: 'proton', color: '#6c63ff', size: 6 },
            { type: 'electron', color: '#00d9ff', size: 4 },
            { type: 'photon', color: '#ffcc00', size: 3 },
            { type: 'hadron', color: '#ff00c8', size: 5 }
        ];
    }

    init() {
        // Create the collider container
        this.colliderElement = document.createElement('div');
        this.colliderElement.className = 'particle-collider';
        this.container.appendChild(this.colliderElement);

        // Create particle tracks
        const track1 = document.createElement('div');
        track1.className = 'collider-track track-1';
        this.colliderElement.appendChild(track1);

        const track2 = document.createElement('div');
        track2.className = 'collider-track track-2';
        this.colliderElement.appendChild(track2);

        // Create the warp drive
        this.createWarpDrive();

        // Create initial particles
        this.createInitialParticles();
        
        // Start the animation
        this.animate();
    }

    createWarpDrive() {
        // Create warp drive container
        const warpDrive = document.createElement('div');
        warpDrive.className = 'warp-drive';
        this.colliderElement.appendChild(warpDrive);

        // Create rotating disk
        const warpDisk = document.createElement('div');
        warpDisk.className = 'warp-disk';
        warpDrive.appendChild(warpDisk);

        // Create rings
        for (let i = 1; i <= 3; i++) {
            const ring = document.createElement('div');
            ring.className = `warp-ring warp-ring-${i}`;
            warpDrive.appendChild(ring);
        }

        // Create space distortion effect
        const spaceDistortion = document.createElement('div');
        spaceDistortion.className = 'space-distortion';
        warpDrive.appendChild(spaceDistortion);

        // Store reference to warp drive
        this.warpDrive = warpDrive;

        // Add click event to toggle warp effect
        warpDrive.addEventListener('click', () => {
            this.toggleWarpEffect();
        });
    }

    toggleWarpEffect() {
        this.warpActive = !this.warpActive;
        
        if (this.warpActive) {
            this.warpDrive.style.boxShadow = '0 0 50px rgba(0, 217, 255, 0.7)';
            // Create gravitational wave immediately
            this.createGravitationalWave();
            // Make gravitational waves more frequent
            this.lastWaveTime = 0;
        } else {
            this.warpDrive.style.boxShadow = '';
        }
    }

    createGravitationalWave() {
        const wave = document.createElement('div');
        wave.className = 'gravitational-wave';
        this.colliderElement.appendChild(wave);
        
        this.gravitationalWaves.push({
            element: wave,
            createdAt: Date.now()
        });
    }

    createInitialParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const clockwise = i % 2 === 0;
            const trackClass = clockwise ? 'track-1' : 'track-2';
            const particleType = this.particleTypes[Math.floor(Math.random() * 2)]; // Only proton and electron initially
            
            const particle = {
                element: document.createElement('div'),
                position: Math.random() * 360,
                speed: 0.5 + Math.random() * 1.5,
                clockwise: clockwise,
                size: particleType.size,
                type: particleType.type,
                color: particleType.color,
                decay: false,
                opacity: 1,
                trackRadius: clockwise ? 120 : 80,
                x: 0,
                y: 0,
                affected: false
            };

            particle.element.className = `particle ${trackClass} ${particleType.type}`;
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            particle.element.style.backgroundColor = particle.color;
            
            this.colliderElement.appendChild(particle.element);
            this.particles.push(particle);
        }
    }

    createDecayParticle(x, y, color) {
        const decayParticle = {
            element: document.createElement('div'),
            x: x,
            y: y,
            directionX: (Math.random() - 0.5) * 4,
            directionY: (Math.random() - 0.5) * 4,
            size: 2 + Math.random() * 2,
            opacity: 1,
            color: color
        };

        decayParticle.element.className = 'decay-particle';
        decayParticle.element.style.width = `${decayParticle.size}px`;
        decayParticle.element.style.height = `${decayParticle.size}px`;
        decayParticle.element.style.backgroundColor = decayParticle.color;
        decayParticle.element.style.left = `${x}px`;
        decayParticle.element.style.top = `${y}px`;
        
        this.colliderElement.appendChild(decayParticle.element);
        this.decayParticles.push(decayParticle);
        this.decayCount++;
    }

    animate() {
        // Move particles
        this.moveParticles();
        
        // Check for collisions
        this.checkCollisions();
        
        // Animate decay particles
        this.animateDecayParticles();
        
        // Handle gravitational waves
        this.handleGravitationalWaves();
        
        // Continue animation
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    handleGravitationalWaves() {
        const now = Date.now();
        
        // Create new waves periodically when warp is active
        if (this.warpActive && now - this.lastWaveTime > 3000) {
            this.createGravitationalWave();
            this.lastWaveTime = now;
        }
        
        // Handle existing waves
        this.gravitationalWaves.forEach((wave, index) => {
            const age = now - wave.createdAt;
            
            // Remove old waves
            if (age > 8000) {
                this.colliderElement.removeChild(wave.element);
                this.gravitationalWaves.splice(index, 1);
            }
        });
    }

    moveParticles() {
        const centerX = 120;  // Center X position
        const centerY = 120;  // Center Y position
        
        this.particles.forEach(particle => {
            if (particle.decay) {
                particle.opacity -= 0.02;
                if (particle.opacity <= 0) {
                    this.colliderElement.removeChild(particle.element);
                    this.particles = this.particles.filter(p => p !== particle);
                } else {
                    particle.element.style.opacity = particle.opacity;
                }
                return;
            }

            // Calculate distance to center (warp drive)
            const dx = particle.x - centerX;
            const dy = particle.y - centerY;
            const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
            
            // If warp is active and particle is close to center, affect its movement
            if (this.warpActive && distanceToCenter < 60) {
                particle.affected = true;
                
                // Apply "gravitational" effect - accelerate particles near warp drive
                const acceleration = 0.05 * (1 - distanceToCenter / 60);
                particle.speed += acceleration;
                
                // Add slight glow effect to affected particles
                particle.element.style.boxShadow = `0 0 10px ${particle.color}`;
                
                // Add slight radial pull towards center
                if (distanceToCenter > 40) {
                    // Calculate angle to center
                    const angle = Math.atan2(dy, dx);
                    
                    // Create a slight deviation in position towards center
                    particle.position += (particle.clockwise ? 1 : -1) * Math.sin(angle) * 0.1;
                }
            } else if (particle.affected && !this.warpActive) {
                // Reset particle if warp is deactivated
                particle.affected = false;
                particle.speed = Math.max(0.5, particle.speed * 0.95);
                particle.element.style.boxShadow = '';
            }

            // Update position on track
            particle.position += particle.clockwise ? particle.speed : -particle.speed;
            if (particle.position >= 360) particle.position -= 360;
            if (particle.position < 0) particle.position += 360;
            
            // Convert polar to cartesian coordinates
            const radian = (particle.position * Math.PI) / 180;
            particle.x = Math.cos(radian) * particle.trackRadius + centerX;
            particle.y = Math.sin(radian) * particle.trackRadius + centerY;
            
            particle.element.style.left = `${particle.x - particle.size / 2}px`;
            particle.element.style.top = `${particle.y - particle.size / 2}px`;
        });
    }

    checkCollisions() {
        // Check collisions between particles
        for (let i = 0; i < this.particles.length; i++) {
            const particle1 = this.particles[i];
            if (particle1.decay) continue;
            
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle2 = this.particles[j];
                if (particle2.decay) continue;
                
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Adjust collision threshold based on warp activity
                const threshold = this.warpActive ? this.collisionThreshold * 1.5 : this.collisionThreshold;
                
                if (distance < threshold) {
                    // Collision happened!
                    this.handleCollision(particle1, particle2);
                    break; // Process one collision at a time
                }
            }
        }
    }

    handleCollision(particle1, particle2) {
        // Mark particles for decay
        particle1.decay = true;
        particle2.decay = true;
        
        this.collisionHappened = true;
        
        // Create decay particles at collision point
        const collisionX = (particle1.x + particle2.x) / 2;
        const collisionY = (particle1.y + particle2.y) / 2;
        
        // Adjust decay particle count based on warp status
        const decayParticleCount = this.warpActive 
            ? 12 + Math.floor(Math.random() * 10) 
            : 8 + Math.floor(Math.random() * 8);
        
        // Create "explosion" of particles
        for (let i = 0; i < decayParticleCount; i++) {
            const particleType = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
            this.createDecayParticle(collisionX, collisionY, particleType.color);
        }
        
        // Create new particles in the tracks to keep the simulation going
        setTimeout(() => {
            if (this.particles.length < this.particleCount - 4) {
                const particlesToAdd = this.warpActive ? 3 : 2;
                
                for (let i = 0; i < particlesToAdd; i++) {
                    const clockwise = i % 2 === 0;
                    const trackClass = clockwise ? 'track-1' : 'track-2';
                    
                    // When warp is active, create more exotic particles
                    const particleIndex = this.warpActive 
                        ? Math.floor(Math.random() * this.particleTypes.length)
                        : Math.floor(Math.random() * 2);
                    
                    const particleType = this.particleTypes[particleIndex];
                    
                    const newParticle = {
                        element: document.createElement('div'),
                        position: Math.random() * 360,
                        speed: 0.5 + Math.random() * 1.5,
                        clockwise: clockwise,
                        size: particleType.size,
                        type: particleType.type,
                        color: particleType.color,
                        decay: false,
                        opacity: 1,
                        trackRadius: clockwise ? 120 : 80,
                        x: 0,
                        y: 0,
                        affected: false
                    };

                    newParticle.element.className = `particle ${trackClass} ${particleType.type}`;
                    newParticle.element.style.width = `${newParticle.size}px`;
                    newParticle.element.style.height = `${newParticle.size}px`;
                    newParticle.element.style.backgroundColor = newParticle.color;
                    
                    this.colliderElement.appendChild(newParticle.element);
                    this.particles.push(newParticle);
                }
            }
        }, 1000);
    }

    animateDecayParticles() {
        this.decayParticles.forEach(particle => {
            // Adjust particle speed if warp is active
            const speedMultiplier = this.warpActive ? 1.5 : 1;
            
            particle.x += particle.directionX * speedMultiplier;
            particle.y += particle.directionY * speedMultiplier;
            particle.opacity -= 0.01;
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            particle.element.style.opacity = particle.opacity;
            
            // Remove particles that have faded out or gone too far
            if (particle.opacity <= 0 || 
                particle.x < -50 || 
                particle.x > 300 || 
                particle.y < -50 || 
                particle.y > 300) {
                this.colliderElement.removeChild(particle.element);
                this.decayParticles = this.decayParticles.filter(p => p !== particle);
                this.decayCount--;
            }
        });
    }
}

// Initialize everything when the window loads
window.addEventListener('load', function() {
    createStarParticles();
    
    // Create particle collider in the hero section
    const hero = document.querySelector('.hero .container');
    if (hero) {
        const collider = new ParticleCollider(hero);
        collider.init();
    }
}); 