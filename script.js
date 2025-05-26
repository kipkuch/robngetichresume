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
        const obfuscatedEmail = email
            .split('')
            .map(char => char.charCodeAt(0).toString(16))
            .join(' ');
        
        emailElement.innerHTML = `
            <i class="fas fa-envelope"></i>
            <span class="obfuscated-email">
                <span class="email-display">robert.ngetich[@]gmail[.]com</span>
                <span class="email-obfuscate">${obfuscatedEmail}</span>
            </span>
        `;

        // Add click handler to copy email
        emailElement.addEventListener('click', () => {
            navigator.clipboard.writeText(email);
            emailElement.querySelector('.email-display').textContent = 'Copied!';
            setTimeout(() => {
                emailElement.querySelector('.email-display').textContent = 'robert.ngetich';
            }, 2000);
        });
    }
}

// Add styles for email obfuscation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .obfuscated-email .email-obfuscate {
            display: none;
        }
        .obfuscated-email:hover .email-obfuscate {
            display: inline;
            color: #3498db;
        }
        .obfuscated-email:hover .email-display {
            display: none;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize email obfuscation
    obfuscateEmail();
});
