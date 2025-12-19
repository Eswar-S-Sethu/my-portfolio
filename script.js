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

// Form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with your actual form handling)
    setTimeout(() => {
        // Success message
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // In production, replace the setTimeout above with actual form submission:
        /*
        fetch('YOUR_FORM_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = '#10b981';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        })
        .catch(error => {
            submitBtn.textContent = 'Error. Try Again';
            submitBtn.disabled = false;
            console.error('Error:', error);
        });
        */
    }, 1500);
});

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
// Status Viewer Updater
// Change your status by updating the text below
function updateStatus(statusText, color = '#10b981') {
    const statusTextElement = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');
    
    if (statusTextElement) {
        statusTextElement.textContent = statusText;
    }
    
    if (statusDot) {
        statusDot.style.background = color;
        statusDot.style.boxShadow = `0 0 10px ${color}80`;
    }
}

// Example status options - you can change this anytime:
// updateStatus('Working on a personal project', '#10b981');  // Green
// updateStatus('Working on freelance project', '#3b82f6');   // Blue
// updateStatus('Free to work', '#10b981');                   // Green
// updateStatus('Doing nothing', '#6b7280');                  // Gray
// updateStatus('Reading', '#8b5cf6');                        // Purple
// updateStatus('Working part time', '#f59e0b');              // Orange
// updateStatus('Driving', '#ef4444');                        // Red
// updateStatus('On vacation', '#ec4899');                    // Pink

// To change your status, uncomment one of the lines above or add your own!
