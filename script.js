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

        // Load projects
        loadProjects();

        // Initialize floating button
        const floatingButton = document.getElementById('floating-button');
        if (floatingButton) {
            console.log('Floating button initialized');
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    floatingButton.classList.add('show');
                } else {
                    floatingButton.classList.remove('show');
                }
            });

            // Add click handler for scroll-to-top
            floatingButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        } else {
            console.error('Floating button not found');
        }

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
            yearSpan.textContent = item.duration.split(' - ')[0]; // Extract the start year
            
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
            duration.textContent = item.duration;
            
            const summary = document.createElement('p');
            summary.className = 'work-experience-summary';
            summary.textContent = item.summary;
            
            const responsibilities = document.createElement('div');
            responsibilities.className = 'responsibilities';

            
            
            // Process each responsibility item
            item.responsibilities.forEach(responsibility => {
                const responsibilityItem = document.createElement('div');
                responsibilityItem.className = 'responsibility-item';
                
                // Parse markdown and create inner HTML
                const markdownContent = marked.parse(responsibility);
                //console.log('Parsed markdown:', markdownContent);
                responsibilityItem.innerHTML = markdownContent;
                
                responsibilities.appendChild(responsibilityItem);
            });

            // Create tech stack section
            const techStack = document.createElement('div');
            techStack.className = 'tech-stack';

            // Add tech stack items
            const techStackItems = document.createElement('div');
            techStackItems.className = 'tech-stack-items';

            item.techStack.forEach(tech => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                
                // Parse markdown and create inner HTML
                const markdownContent = marked.parse(tech);
                //console.log('Parsed markdown:', markdownContent);
                techItem.innerHTML = markdownContent;
                
                techStackItems.appendChild(techItem);
            });

            techStack.appendChild(techStackItems);

            // Create successes section
            const successes = document.createElement('div');
            successes.className = 'successes';

            // Add successes items
            const successesItems = document.createElement('div');
            successesItems.className = 'successes-items';

            item.successes.forEach(success => {
                const successItem = document.createElement('div');
                successItem.className = 'success-item';
                
                // Parse markdown and create inner HTML
                const markdownContent = marked.parse(success);
                //console.log('Parsed markdown:', markdownContent);
                successItem.innerHTML = markdownContent;
                
                successesItems.appendChild(successItem);
            });

            successes.appendChild(successesItems);
            
            // Append all elements to the content
            timelineContent.appendChild(h3);
            timelineContent.appendChild(company);
            timelineContent.appendChild(duration);
            timelineContent.appendChild(techStack);
            timelineContent.appendChild(summary);
            timelineContent.appendChild(responsibilities);

            // Add a subtle separator before successes
            const separator = document.createElement('div');
            separator.className = 'section-separator';
            timelineContent.appendChild(separator);

            timelineContent.appendChild(successes);
            
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

async function loadProjects() {
    try {
        // Test if the file exists
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const projects = await response.json();
        console.log('Projects data loaded:', projects);
        
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) {
            throw new Error('Projects container not found');
        }

        projects.forEach((item) => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            
            const h3 = document.createElement('h3');
            h3.textContent = item.title;

            const techStack = document.createElement('div');
            techStack.className = 'tech-stack';

            const techStackItems = document.createElement('div');
            techStackItems.className = 'tech-stack-items';

            item.techStack.forEach(tech => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.textContent = tech;
                techStackItems.appendChild(techItem);
            });

            techStack.appendChild(techStackItems);
            
            const projectDescription = document.createElement('div');
            projectDescription.className = 'project-description';

            // Parse markdown and create inner HTML for project description
            const markdownContent = marked.parse(item.description);
            //console.log('Parsed markdown:', markdownContent);
            projectDescription.innerHTML = markdownContent;

            projectItem.appendChild(h3);
            projectItem.appendChild(techStack);
            projectItem.appendChild(projectDescription);
            projectsContainer.appendChild(projectItem);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        // Add a fallback message to the page
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `<p style="color: red;">Error loading project data. Please check the console for details.</p>`;
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

    // Initialize floating button
    const floatingButton = document.getElementById('floating-button');
    if (floatingButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                floatingButton.classList.add('show');
            } else {
                floatingButton.classList.remove('show');
            }
        });
    }
});
