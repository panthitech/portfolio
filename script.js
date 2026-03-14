document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // 3. Highlight active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset so it highlights a bit earlier
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });

    // 4. Fade-in Animation on Scroll using Intersection Observer
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 5. Contact Form Mock Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic UI feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                formStatus.textContent = "Thank you! Your message has been sent successfully.";
                formStatus.className = "success";
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.className = "";
                }, 5000);

            }, 1500);
        });
    }

    // 6. Typewriter Effect
    const typewriterTexts = [
        "Android App Developer",
        "Graphics Designer",
        "UI/UX Designer",
        "Bug/Error Solver",
    ];

    let currentTextIndex = 0;
    let charIndex = 0;

    const typewriterElement = document.getElementById("typewriter");

    if (typewriterElement) {
        function typeEffect() {
            // Get the current text
            const currentText = typewriterTexts[currentTextIndex];

            // Update the text content with the next character
            typewriterElement.textContent = currentText.slice(0, charIndex);

            // Increment the character index
            charIndex++;

            // If the full text has been typed, pause and then switch to the next text
            if (charIndex > currentText.length) {
                setTimeout(() => {
                    charIndex = 0; // Reset character index
                    currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length; // Move to next text
                }, 2000); // Pause before switching
            } else {
                // Continue typing every 100ms
                setTimeout(typeEffect, 100);
            }
        }

        // Start the typewriter effect
        typeEffect();
    }

});
