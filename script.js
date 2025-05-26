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
function calculateYearsOfExperience() {
    const startYear = 2006;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    
    const yearsElement = document.getElementById('years-of-experience');
    if (yearsElement) {
        yearsElement.textContent = years;
    }
}

function toggleSkills(category) {
    const button = document.querySelector(`.expand-button[data-category="${category}"]`);
    const skillList = button.parentElement.querySelector('.skill-list');
    
    if (skillList.classList.contains('expanded')) {
        skillList.classList.remove('expanded');
        button.textContent = 'Show more';
    } else {
        skillList.classList.add('expanded');
        button.textContent = 'Show less';
    }
}

// Add event listeners for expand buttons
document.addEventListener('DOMContentLoaded', () => {
    // Calculate and display years of experience
    calculateYearsOfExperience();
    
    // Add click event listener for skills expand button
    const skillsExpandButton = document.querySelector('.skills-expand-button');
    const skillsContainer = document.querySelector('.skills-container');
    
    if (skillsExpandButton && skillsContainer) {
        skillsExpandButton.addEventListener('click', () => {
            const expanded = skillsExpandButton.classList.contains('expanded');
            
            if (expanded) {
                skillsContainer.classList.remove('expanded');
                skillsExpandButton.classList.remove('expanded');
                skillsExpandButton.textContent = 'Show more';
            } else {
                skillsContainer.classList.add('expanded');
                skillsExpandButton.classList.add('expanded');
                skillsExpandButton.textContent = 'Show less';
            }
        });
    }
});
