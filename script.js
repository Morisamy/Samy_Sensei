document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    // Check if slider elements exist before proceeding
    if (!slider || !prevBtn || !nextBtn) {
        console.warn("Slider elements not found. Skipping slider initialization.");
        return; 
    }

    // Determine the scroll step
    // We need to wait for images to load or ensure CSS has rendered
    // to get accurate width. Using a timeout for robustness.
    setTimeout(() => {
        const projectCard = document.querySelector('.project');
        if (!projectCard) {
            console.warn("No project cards found in the slider. Cannot calculate scroll step.");
            return;
        }
        
        // Get the computed style to accurately include margin/gap
        const style = getComputedStyle(projectCard);
        // Note: CSS 'gap' is tricky to get dynamically via JS.
        // It's safer to define a variable in JS that matches the CSS gap.
        const gap = 25; // This MUST match the 'gap' value in your CSS for .project-slider
        const scrollStep = projectCard.offsetWidth + gap;

        nextBtn.addEventListener('click', () => {
            slider.scrollLeft += scrollStep;
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollLeft -= scrollStep;
        });
    }, 100); // Small delay to ensure all assets/styles are loaded

    // Scroll-Driven Animations (Storytelling Scroll Effect)
    // This creates smooth, animated transitions as you scroll
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Track which elements have been animated to prevent overlapping
    const animatedElements = new Set();
    
    // Improved intersection observer options with better threshold
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Trigger when element is 10% from viewport
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    // Smooth animation function using requestAnimationFrame
    const animateElement = (element, finalOpacity = 1, finalTransform = 'translateY(0)') => {
        if (animatedElements.has(element)) return;
        animatedElements.add(element);
        
        requestAnimationFrame(() => {
            element.style.opacity = finalOpacity;
            element.style.transform = finalTransform;
        });
    };

    // Section animation observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
                setTimeout(() => {
                    animateElement(entry.target, '1', 'translateY(0)');
                }, index * 50); // Stagger animations
            }
        });
    }, observerOptions);

    // Initialize sections with proper transitions
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // First section (about) should be visible immediately
        if (index === 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
            sectionObserver.observe(section);
        }
    });

    // Parallax effect for header (throttled for performance)
    const header = document.querySelector('header');
    let ticking = false;
    if (header) {
        const updateHeader = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            header.style.transform = `translateY(${rate}px)`;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Expertise boxes observer
    const expertiseBoxes = document.querySelectorAll('.expertise-box');
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
                setTimeout(() => {
                    animateElement(entry.target, '1', 'translateY(0)');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    expertiseBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)`;
        boxObserver.observe(box);
    });

    // Module list items observer
    const moduleItems = document.querySelectorAll('.module-list li');
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
                setTimeout(() => {
                    animateElement(entry.target, '1', 'translateX(0)');
                }, index * 80);
            }
        });
    }, observerOptions);
    
    moduleItems.forEach((item) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        itemObserver.observe(item);
    });

    // Project cards - static (no parallax effect)
    // Keeping cards static to avoid unwanted movement
});