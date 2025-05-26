// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Email obfuscation
function obfuscateEmail() {
    const emailElement = document.querySelector('.contact-info p:nth-child(1)');
    if (emailElement) {
        const email = 'robert.ngetich@gmail.com';
        
        emailElement.innerHTML = `
            <i class="fas fa-envelope"></i>
            <span class="obfuscated-email">
                <span class="email-display">robert.ngetich[at]gmail[dot]com</span>
            </span>
        `;

        // Add click handler to copy email
        emailElement.addEventListener('click', () => {
            navigator.clipboard.writeText(email);
            emailElement.querySelector('.email-display').textContent = 'Copied!';
            setTimeout(() => {
                emailElement.querySelector('.email-display').textContent = 'robert.ngetich[at]gmail[dot]com';
            }, 1000);
        });
    }
}

// Add styles for email obfuscation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .obfuscated-email {
            position: relative;
            cursor: pointer;
        }
        
        .obfuscated-email::after {
            content: "Click to copy email address";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 5px 10px;
            background-color: #3498db;
            color: white;
            border-radius: 4px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        
        .obfuscated-email:hover::after {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize email obfuscation
    obfuscateEmail();
});
