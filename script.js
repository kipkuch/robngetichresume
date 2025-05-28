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
function setupEmailObfuscation() {
    try {
        const emailElement = document.querySelector('.contact-info p:nth-child(1)');
        if (emailElement) {
            const email = 'robert.ngetich@gmail.com';
            
            // Create new elements
            const icon = document.createElement('i');
            icon.className = 'fas fa-envelope';
            
            const emailSpan = document.createElement('span');
            emailSpan.className = 'obfuscated-email';
            
            const displaySpan = document.createElement('span');
            displaySpan.className = 'email-display';
            displaySpan.textContent = 'robert.ngetich[at]gmail[dot]com';
            
            // Create tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Copy this email';
            
            // Add tooltip to emailSpan
            emailSpan.appendChild(displaySpan);
            emailSpan.appendChild(tooltip);
            emailElement.innerHTML = '';
            emailElement.appendChild(icon);
            emailElement.appendChild(emailSpan);

            // Add hover and click handlers
            emailElement.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(-10px)';
            });

            emailElement.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(0)';
            });

            emailElement.addEventListener('click', () => {
                navigator.clipboard.writeText(email);
                tooltip.textContent = 'Email copied!';
                
                setTimeout(() => {
                    tooltip.textContent = 'Copy this email';
                }, 2000);
            });
        } else {
            console.error('Email element not found');
        }
    } catch (error) {
        console.error('Error setting up email obfuscation:', error);
    }
}

// Scroll-triggered animations for timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px",
    root: null
});

document.querySelectorAll('.timeline-content').forEach((item) => {
    // Remove the show class if it exists (in case of reload)
    item.classList.remove('show');
    timelineObserver.observe(item);
});

// Add styles for email obfuscation
function calculateYearsOfExperience() {
    try {
        const startYear = 2006;
        const currentYear = new Date().getFullYear();
        const years = currentYear - startYear;
        
        const yearsElement = document.getElementById('years-of-experience');
        if (yearsElement) {
            yearsElement.textContent = years;
            console.log(`Years of experience calculated: ${years}`);
        } else {
            console.error('Years element not found');
        }
    } catch (error) {
        console.error('Error calculating years of experience:', error);
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

// Main initialization function
function initializePage() {
    try {
        // Calculate years of experience
        const startYear = 2006;
        const currentYear = new Date().getFullYear();
        const years = currentYear - startYear;
        
        const yearsElement = document.getElementById('years-of-experience');
        if (yearsElement) {
            yearsElement.textContent = years;
            console.log(`Years of experience calculated: ${years}`);
        } else {
            console.error('Years element not found');
        }

        // Set up email obfuscation
        setupEmailObfuscation();

        // Set up skills toggle
        setupSkillsToggle();

        // Load work experience
        loadWorkExperience();

        console.log('Page initialized successfully');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Run initialization immediately
initializePage();

async function loadWorkExperience() {
    try {
        // Test if the file exists
        const response = await fetch('data/work-experience.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const workExperience = await response.json();
        console.log('Work experience data loaded:', workExperience);
        
        const timelineContainer = document.getElementById('timeline-container');
        if (!timelineContainer) {
            throw new Error('Timeline container not found');
        }
        
        workExperience.forEach((item, index) => {
            const timelineYear = document.createElement('div');
            timelineYear.className = 'timeline-year';
            
            const yearSpan = document.createElement('span');
            yearSpan.textContent = item.fromTo.split(' - ')[0]; // Extract the start year
            
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            
            const timelineMarker = document.createElement('div');
            timelineMarker.className = 'timeline-marker';
            
            const timelineContent = document.createElement('div');
            timelineContent.className = 'timeline-content';
            
            // Create DOM elements first
            const h3 = document.createElement('h3');
            h3.textContent = item.jobTitle;
            
            const company = document.createElement('p');
            company.className = 'company';
            company.textContent = item.organization;
            
            const duration = document.createElement('p');
            duration.className = 'duration';
            duration.textContent = item.fromTo;
            
            const summary = document.createElement('p');
            summary.textContent = item.summary;
            
            const responsibilities = document.createElement('div');
            responsibilities.className = 'responsibilities';
            
            // Process each detail item
            item.details.forEach(detail => {
                const responsibilityItem = document.createElement('div');
                responsibilityItem.className = 'responsibility-item';
                
                // Parse markdown and create inner HTML
                const markdownContent = marked.parse(detail);
                console.log('Parsed markdown:', markdownContent);
                responsibilityItem.innerHTML = markdownContent;
                
                responsibilities.appendChild(responsibilityItem);
            });
            
            // Append all elements to the content
            timelineContent.appendChild(h3);
            timelineContent.appendChild(company);
            timelineContent.appendChild(duration);
            timelineContent.appendChild(summary);
            timelineContent.appendChild(responsibilities);
            
            timelineItem.appendChild(timelineMarker);
            timelineItem.appendChild(timelineContent);
            timelineYear.appendChild(yearSpan);
            timelineYear.appendChild(timelineItem);
            timelineContainer.appendChild(timelineYear);
        });
        
        // Initialize Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all timeline content elements
        const timelineContents = document.querySelectorAll('.timeline-content');
        console.log('Found timeline contents:', timelineContents.length);
        timelineContents.forEach((element) => {
            observer.observe(element);
        });
    } catch (error) {
        console.error('Error loading work experience:', error);
        // Add a fallback message to the page
        const timelineContainer = document.getElementById('timeline-container');
        if (timelineContainer) {
            timelineContainer.innerHTML = `<p style="color: red;">Error loading work experience data. Please check the console for details.</p>`;
        }
    }
}

function setupSkillsToggle() {
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
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .obfuscated-email {
            position: relative;
            cursor: pointer;
        }
        
        .obfuscated-email::after {
            content: "Click to copy my email address";
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
