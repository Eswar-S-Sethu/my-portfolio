// Smooth scrolling for navigation links
// Smooth scrolling for navigation links (excluding download CV button)
document.querySelectorAll('a[href^="#"]:not(#downloadCV)').forEach(anchor => {
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

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar stays visible - removed auto-hide on scroll

// Intersection Observer for scroll animations
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

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .blog-card, .testimonial-card, .faq-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Download CV functionality
const downloadCVBtn = document.getElementById('downloadCV');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Replace 'Eswar_CV.pdf' with the actual path to your CV file
        const cvPath = 'Eswar_CV.pdf';
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Eswar_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // You can also open a URL to your CV hosted online:
        // window.open('https://your-website.com/cv.pdf', '_blank');
        
    });
}

// Project card click handling
document.querySelectorAll('.project-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        if (url && url !== '#') {
            window.open(url, '_blank');
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add custom cursor effect (optional enhancement)
const addCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #ef4444;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Uncomment to enable custom cursor
// if (window.innerWidth > 1024) {
//     addCustomCursor();
// }

// Console message for developers
console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #ef4444;');
console.log('%cLike what you see? Let\'s build something together!', 'font-size: 14px; color: #3b82f6;');
console.log('%cVisit: eswarsethu.dev', 'font-size: 12px; color: #a1a1a1;');


const STATUS_API_URL = 'https://status-api.eswarssethu.workers.dev/status';

// Function to calculate time ago
function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}

async function loadStatus() {
    try {
        const response = await fetch(STATUS_API_URL);
        const data = await response.json();

        const statusTextElement = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');
        const statusTimestamp = document.querySelector('.status-timestamp');
        const statusTextMobile = document.querySelector('.status-text-mobile');
        const statusDotMobile = document.querySelector('.status-dot-mobile');
        const statusTimestampMobile = document.querySelector('.status-timestamp-mobile');

        if (statusTextElement && data.text) statusTextElement.textContent = data.text;
        if (statusTextMobile && data.text) statusTextMobile.textContent = data.text;

        if (statusDot && data.color) {
            statusDot.style.background = data.color;
            statusDot.style.boxShadow = `0 0 10px ${data.color}80`;
        }
        if (statusDotMobile && data.color) {
            statusDotMobile.style.background = data.color;
            statusDotMobile.style.boxShadow = `0 0 10px ${data.color}80`;
        }

        if (statusTimestamp && data.timestamp) {
            const timeAgo = getTimeAgo(data.timestamp);
            statusTimestamp.textContent = `Updated ${timeAgo}`;
        }
        if (statusTimestampMobile && data.timestamp) {
            const timeAgo = getTimeAgo(data.timestamp);
            statusTimestampMobile.textContent = `Updated ${timeAgo}`;
        }

        console.log('✅ Status loaded:', data.text);
    } catch (error) {
        console.log('ℹ️ Using default status');
    }
}

// Form handling with Formspree
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Get the submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Get form action URL
            const formAction = contactForm.getAttribute('action');
            
            console.log('Submitting to:', formAction); // Debug log
            
            if (!formAction || formAction.includes('YOUR_FORM_ID')) {
                alert('⚠️ Please set up your Formspree Form ID in index.html first!\n\nSee FORMSPREE_SETUP.md for instructions.');
                throw new Error('Formspree not configured');
            }
            
            // Submit to Formspree
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response status:', response.status); // Debug log
            
            if (response.ok) {
                // Success message
                submitBtn.textContent = 'Message Sent! ✓';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                contactForm.reset();
                
                console.log('✅ Form submitted successfully!');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                const data = await response.json();
                console.error('Formspree error:', data);
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            // Error message
            console.error('❌ Form submission error:', error);
            submitBtn.textContent = 'Error. Try Again';
            submitBtn.disabled = false;
            submitBtn.style.background = '#ef4444';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
} else {
    console.error('❌ Contact form not found!');
}

// Load status immediately on page load
loadStatus();

// Refresh status every 30 seconds to catch real-time updates
setInterval(loadStatus, 30000);