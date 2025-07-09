// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero__slide');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Hero controls
const nextBtn = document.getElementById('next-slide');
const prevBtn = document.getElementById('prev-slide');

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Auto-slide functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start auto-slide on page load
if (slides.length > 0) {
    startAutoSlide();
    
    // Pause auto-slide on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Modal
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <div class="modal-content">
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

// Initialize gallery modal
let modal = null;

function openModal(imageSrc, imageAlt) {
    if (!modal) {
        modal = createModal();
    }
    const modalImg = modal.querySelector('img');
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    modal.style.display = 'block';
}

// Add click event to gallery images
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.project-gallery img, .gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src, this.alt);
        });
    });
});

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Lütfen geçerli bir e-posta adresi girin.');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
        this.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature, .project-card, .team-member, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    if (modal && modal.style.display === 'block') {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Video manual control - no autoplay
const videos = document.querySelectorAll('video');

// Remove autoplay and ensure videos don't start automatically
videos.forEach(video => {
    video.autoplay = false;
    video.muted = false;
    video.controls = true;
    video.preload = 'metadata';
    
    // Ensure video is paused on load
    video.addEventListener('loadedmetadata', () => {
        video.pause();
    });
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can go here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);
