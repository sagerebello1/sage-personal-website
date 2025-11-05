let animationTriggered = false;

const lineContainer = document.getElementById('lineContainer');
const fishingLine = document.getElementById('fishingLine');
const hook = document.querySelector('.hook');
const fish = document.querySelector('.fish');
const navLinks = document.getElementById('navLinks');
const instruction = document.getElementById('instruction');
const landingPage = document.getElementById('landingPage');

// Wait for line to finish drawing before allowing click
setTimeout(() => {
    lineContainer.style.cursor = 'pointer';
}, 2000);

lineContainer.addEventListener('click', function() {
    if (animationTriggered) return;
    animationTriggered = true;

    // Hide instruction immediately
    instruction.style.opacity = '0';
    instruction.style.display = 'none';

    // Show hook and fish
    setTimeout(() => {
        hook.classList.add('show');
        fish.classList.add('show');
    }, 100);

    // Animate everything out to the right together
    setTimeout(() => {
        lineContainer.classList.add('animate-out');
    }, 800);

    // Show navigation links as fish passes over them (fades in)
    setTimeout(() => {
        navLinks.classList.add('show');
    }, 1800);
});

// Navigation logic
const pages = {
    about: document.getElementById('aboutPage'),
    works: document.getElementById('worksPage'),
    resume: document.getElementById('resumePage')
};

// Handle navigation clicks
document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageName = this.getAttribute('data-page');
        
        // Hide landing page
        landingPage.style.display = 'none';
        
        // Show selected page
        Object.values(pages).forEach(page => page.classList.remove('active'));
        pages[pageName].classList.add('active');
    });
});

// Handle back to home clicks
document.querySelectorAll('[data-back="home"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide all pages
        Object.values(pages).forEach(page => page.classList.remove('active'));
        
        // Show landing page
        landingPage.style.display = 'flex';
        
        // If animation was triggered, hide the line/hook/fish permanently
        if (animationTriggered) {
            lineContainer.style.display = 'none';
            instruction.style.display = 'none';
        }
    });
});