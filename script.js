// ===== Loader =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    const navHeight = navbar.offsetHeight;
    
    // Find the section that's currently most visible
    let currentSection = '';
    let maxVisibility = 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        const sectionId = section.getAttribute('id');
        
        // Calculate how much of the section is visible
        const visibleTop = Math.max(scrollY, sectionTop);
        const visibleBottom = Math.min(scrollY + window.innerHeight, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = visibleHeight / sectionHeight;
        
        // If this section is more visible than the current one, or if we're past its bottom
        if (visibility > maxVisibility || (scrollY >= sectionTop && scrollY < sectionBottom)) {
            if (scrollY >= sectionTop - 100) {
                currentSection = sectionId;
                maxVisibility = Math.max(maxVisibility, visibility);
            }
        }
    });
    
    // If we're at the bottom of the page, activate the last section
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            currentSection = lastSection.getAttribute('id');
        }
    }
    
    // Update active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);
// Also activate on page load
activateNavLink();

// ===== Experience Tabs =====
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


// ===== Typing Effect for Hero (Optional Enhancement) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Project Card Hover Effects =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-image');
    const projectInfo = card.querySelector('.project-info');
    
    card.addEventListener('mouseenter', () => {
        if (projectImage) {
            projectImage.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (projectImage) {
            projectImage.style.transform = 'scale(1)';
        }
    });
});

// ===== Skill Items Animation =====
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 50);
});

// ===== Form Validation (if contact form is added later) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Mobile Image Click Behavior =====
function isMobile() {
    return window.innerWidth <= 768;
}

function resetAllImages() {
    const wrappers = document.querySelectorAll('.image-wrapper, .project-image, .project-image-small');
    wrappers.forEach(wrapper => wrapper.classList.remove('active'));
}

// Handle image clicks on mobile
function setupMobileImageBehavior() {
    if (!isMobile()) return;

    const wrappers = document.querySelectorAll('.image-wrapper, .project-image, .project-image-small');
    const images = document.querySelectorAll('.about-photo, .project-img, .project-img-small');
    
    // Handle clicks on images
    images.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active from all wrappers
            resetAllImages();
            
            // Find the wrapper and add active class
            const wrapper = this.closest('.image-wrapper, .project-image, .project-image-small');
            if (wrapper) {
                wrapper.classList.add('active');
            }
        });
    });

    // Handle clicks on wrappers (in case user clicks the wrapper itself)
    wrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active from all wrappers
            resetAllImages();
            
            // Add active to clicked wrapper
            this.classList.add('active');
        });
    });

    // Reset images immediately when touching outside (for scrolling)
    // Use capture phase to catch all touches before they bubble
    document.addEventListener('touchstart', function(e) {
        const target = e.target;
        const isImage = target.classList.contains('about-photo') || 
                       target.classList.contains('project-img') || 
                       target.classList.contains('project-img-small');
        const isWrapper = target.classList.contains('image-wrapper') || 
                         target.classList.contains('project-image') || 
                         target.classList.contains('project-image-small');
        const isInsideImage = target.closest('.about-photo, .project-img, .project-img-small');
        const isInsideWrapper = target.closest('.image-wrapper, .project-image, .project-image-small');
        
        // Only reset if NOT touching an image or wrapper (or anything inside them)
        if (!isImage && !isWrapper && !isInsideImage && !isInsideWrapper) {
            resetAllImages();
        }
    }, { passive: true, capture: true });

    // Reset images when touchmove starts (scrolling begins)
    document.addEventListener('touchmove', function(e) {
        const target = e.target;
        const isImage = target.closest('.about-photo, .project-img, .project-img-small');
        const isWrapper = target.closest('.image-wrapper, .project-image, .project-image-small');
        
        // If scrolling and not on an image/wrapper, reset immediately
        if (!isImage && !isWrapper) {
            resetAllImages();
        }
    }, { passive: true });

    // Reset images when clicking outside
    document.addEventListener('click', function(e) {
        const target = e.target;
        const isImage = target.closest('.about-photo, .project-img, .project-img-small');
        const isWrapper = target.closest('.image-wrapper, .project-image, .project-image-small');
        
        if (!isImage && !isWrapper) {
            resetAllImages();
        }
    });

    // Reset images on scroll (immediate reset)
    window.addEventListener('scroll', function() {
        resetAllImages();
    }, { passive: true });
}

// Initialize on load and resize
setupMobileImageBehavior();
window.addEventListener('resize', setupMobileImageBehavior);

// ===== Console Message =====
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #64ffda; font-size: 16px; font-weight: bold;');

