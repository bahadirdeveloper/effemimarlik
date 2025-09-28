'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navMenu && navToggle) {
        const toggleMenu = () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        };

        navToggle.addEventListener('click', toggleMenu);

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!navMenu.classList.contains('active')) {
                    return;
                }

                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const targetSelector = anchor.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        anchor.addEventListener('click', event => {
            const target = document.querySelector(targetSelector);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const slides = Array.from(document.querySelectorAll('.hero__slide'));
    if (slides.length > 0) {
        let currentSlide = slides.findIndex(slide => slide.classList.contains('active'));
        if (currentSlide === -1) {
            currentSlide = 0;
            slides[0].classList.add('active');
        }

        const totalSlides = slides.length;
        const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let autoSlideTimer;

        const showSlide = index => {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (index + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const nextBtn = document.getElementById('next-slide');
        const prevBtn = document.getElementById('prev-slide');

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        const stopAutoSlide = () => {
            if (autoSlideTimer) {
                window.clearInterval(autoSlideTimer);
                autoSlideTimer = undefined;
            }
        };

        const startAutoSlide = () => {
            if (prefersReducedMotionQuery.matches) {
                stopAutoSlide();
                return;
            }

            stopAutoSlide();
            autoSlideTimer = window.setInterval(nextSlide, 5000);
        };

        startAutoSlide();

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoSlide);
            heroSection.addEventListener('mouseleave', startAutoSlide);
        }

        prefersReducedMotionQuery.addEventListener('change', event => {
            if (event.matches) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });
    }

    let galleryModal;
    let modalImage;
    let modalCloseButton;
    let lastFocusedElement;

    const closeModal = () => {
        if (!galleryModal) {
            return;
        }

        galleryModal.style.display = 'none';
        galleryModal.setAttribute('aria-hidden', 'true');
        modalCloseButton?.blur();
        lastFocusedElement?.focus();
    };

    const ensureModal = () => {
        if (galleryModal) {
            return galleryModal;
        }

        galleryModal = document.createElement('div');
        galleryModal.className = 'modal';
        galleryModal.setAttribute('role', 'dialog');
        galleryModal.setAttribute('aria-modal', 'true');
        galleryModal.setAttribute('aria-hidden', 'true');

        galleryModal.innerHTML = `
            <button type="button" class="modal-close" aria-label="Görseli kapat">&times;</button>
            <div class="modal-content">
                <img src="" alt="" loading="lazy" decoding="async">
            </div>
        `;

        modalImage = galleryModal.querySelector('img');
        modalCloseButton = galleryModal.querySelector('.modal-close');

        modalCloseButton.addEventListener('click', closeModal);

        galleryModal.addEventListener('click', event => {
            if (event.target === galleryModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && galleryModal?.style.display === 'block') {
                closeModal();
            }
        });

        document.body.appendChild(galleryModal);
        return galleryModal;
    };

    const openGalleryModal = image => {
        ensureModal();
        if (!modalImage) {
            return;
        }

        lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        modalImage.src = image.src;
        modalImage.alt = image.alt || 'Proje görseli';
        galleryModal.style.display = 'block';
        galleryModal.setAttribute('aria-hidden', 'false');
        modalCloseButton?.focus();
    };

    document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof HTMLImageElement)) {
            return;
        }

        const galleryItem = target.closest('.gallery-item');
        const projectGallery = target.closest('.project-gallery');

        if ((galleryItem || projectGallery) && !target.closest('.project-card')) {
            event.preventDefault();
            openGalleryModal(target);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        const target = event.target;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target.classList.contains('gallery-item') && !target.closest('.project-card')) {
            const image = target.querySelector('img');
            if (image) {
                event.preventDefault();
                openGalleryModal(image);
            }
        }
    });

    const animatedElements = document.querySelectorAll('.feature, .project-card, .team-member, .gallery-item');
    if (animatedElements.length > 0) {
        if ('IntersectionObserver' in window) {
            const intersectionObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        intersectionObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                intersectionObserver.observe(element);
            });
        } else {
            animatedElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
            });
        }
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = String(formData.get('name') ?? '').trim();
            const email = String(formData.get('email') ?? '').trim();
            const message = String(formData.get('message') ?? '').trim();

            if (!name || !email || !message) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Lütfen geçerli bir e-posta adresi girin.');
                return;
            }

            alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
            contactForm.reset();
        });
    }

    document.querySelectorAll('video').forEach(video => {
        video.removeAttribute('autoplay');
        video.preload = 'metadata';
        video.controls = true;
        video.addEventListener('loadeddata', () => video.pause(), { once: true });
    });

    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.type = 'button';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Sayfanın en üstüne çık');
        backToTopBtn.textContent = '↑';
        document.body.appendChild(backToTopBtn);

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const toggleBackToTop = () => {
            const shouldShow = window.scrollY > 300;
            backToTopBtn.classList.toggle('back-to-top--visible', shouldShow);
        };

        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();
    }
});
