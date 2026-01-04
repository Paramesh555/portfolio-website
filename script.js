/**
 * Portfolio Website - JavaScript
 * Handles navigation, command palette, animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    // initCommandPalette();
    initScrollAnimations();
    initSmoothScroll();
    initBackToTop();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Scroll behavior for nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.transform = 'rotate(-45deg) translate(0, 0)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.transform = '';
        });
    });
}

/**
 * Command Palette functionality
 */
// function initCommandPalette() {
//     const cmdPalette = document.getElementById('cmdPalette');
//     const cmdInput = document.getElementById('cmdInput');
//     const cmdResults = document.getElementById('cmdResults');
//     const cmdItems = document.querySelectorAll('.cmd-item');
//     let currentIndex = -1;
    
//     // Open command palette with Cmd+K or Ctrl+K
//     document.addEventListener('keydown', (e) => {
//         if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
//             e.preventDefault();
//             openCommandPalette();
//         }
        
//         if (cmdPalette.classList.contains('active')) {
//             handleCommandPaletteKeys(e);
//         }
//     });
    
//     // Close on backdrop click
//     const backdrop = cmdPalette.querySelector('.cmd-backdrop');
//     backdrop.addEventListener('click', closeCommandPalette);
    
//     // Handle input filtering
//     cmdInput.addEventListener('input', (e) => {
//         const query = e.target.value.toLowerCase();
//         filterCommands(query);
//     });
    
//     // Handle command item clicks
//     cmdItems.forEach(item => {
//         item.addEventListener('click', () => {
//             executeCommand(item);
//         });
//     });
    
//     function openCommandPalette() {
//         cmdPalette.classList.add('active');
//         cmdInput.value = '';
//         cmdInput.focus();
//         currentIndex = -1;
//         filterCommands('');
//         document.body.style.overflow = 'hidden';
//     }
    
//     function closeCommandPalette() {
//         cmdPalette.classList.remove('active');
//         document.body.style.overflow = '';
//     }
    
//     function handleCommandPaletteKeys(e) {
//         const visibleItems = [...cmdItems].filter(item => 
//             item.style.display !== 'none'
//         );
        
//         switch (e.key) {
//             case 'Escape':
//                 closeCommandPalette();
//                 break;
//             case 'ArrowDown':
//                 e.preventDefault();
//                 currentIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
//                 updateActiveItem(visibleItems);
//                 break;
//             case 'ArrowUp':
//                 e.preventDefault();
//                 currentIndex = Math.max(currentIndex - 1, 0);
//                 updateActiveItem(visibleItems);
//                 break;
//             case 'Enter':
//                 e.preventDefault();
//                 if (currentIndex >= 0 && visibleItems[currentIndex]) {
//                     executeCommand(visibleItems[currentIndex]);
//                 }
//                 break;
//             // Quick shortcuts
//             case 'h':
//                 if (!cmdInput.value) {
//                     navigateTo('#intro');
//                     closeCommandPalette();
//                 }
//                 break;
//             case 'p':
//                 if (!cmdInput.value) {
//                     navigateTo('#projects');
//                     closeCommandPalette();
//                 }
//                 break;
//             case 'b':
//                 if (!cmdInput.value) {
//                     navigateTo('#blogs');
//                     closeCommandPalette();
//                 }
//                 break;
//         }
//     }
    
//     function filterCommands(query) {
//         cmdItems.forEach(item => {
//             const text = item.querySelector('span').textContent.toLowerCase();
//             if (text.includes(query)) {
//                 item.style.display = '';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
        
//         // Show/hide groups based on visible items
//         document.querySelectorAll('.cmd-group').forEach(group => {
//             const hasVisibleItems = [...group.querySelectorAll('.cmd-item')]
//                 .some(item => item.style.display !== 'none');
//             group.style.display = hasVisibleItems ? '' : 'none';
//         });
        
//         currentIndex = -1;
//     }
    
//     function updateActiveItem(visibleItems) {
//         cmdItems.forEach(item => item.classList.remove('active'));
//         if (visibleItems[currentIndex]) {
//             visibleItems[currentIndex].classList.add('active');
//             visibleItems[currentIndex].scrollIntoView({ block: 'nearest' });
//         }
//     }
    
//     function executeCommand(item) {
//         const action = item.dataset.action;
//         const target = item.dataset.target;
        
//         switch (action) {
//             case 'navigate':
//                 navigateTo(target);
//                 break;
//             case 'link':
//                 window.open(target, '_blank');
//                 break;
//             case 'email':
//                 window.location.href = 'mailto:hello@paramesh.dev';
//                 break;
//         }
        
//         closeCommandPalette();
//     }
    
//     function navigateTo(target) {
//         const element = document.querySelector(target);
//         if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//         }
//     }
// }

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    // Add reveal class to elements that should animate
    const animatedElements = document.querySelectorAll(
        '.project-card, .blog-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}


/**
 * Typing effect for hero (optional enhancement)
 */
function initTypingEffect() {
    const text = "building things for the web";
    const element = document.querySelector('.typing-text');
    
    if (!element) return;
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

/**
 * Easter egg: Konami code
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

