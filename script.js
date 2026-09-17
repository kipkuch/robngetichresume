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
        const emailElement = document.querySelector('.email-contact');
        if (emailElement) {
            const email = atob('cm9iZXJ0Lm5nZXRpY2hAZ21haWwuY29t');
            const displayEmail = 'robert.ngetich@gmail.com';
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-envelope';
            
            const emailSpan = document.createElement('span');
            emailSpan.className = 'obfuscated-email';

            const emailImage = document.createElement('canvas');
            emailImage.className = 'email-image';
            emailImage.setAttribute('role', 'img');
            emailImage.setAttribute('aria-label', 'Email address, click to copy');
            emailImage.title = 'Click to copy email';

            const context = emailImage.getContext('2d');
            if (!context) {
                throw new Error('Canvas rendering context not available');
            }

            const fontSize = 14;
            const lineHeight = 24;
            const font = `${fontSize}px Poppins, sans-serif`;

            const drawEmailImage = () => {
                context.font = font;
                const width = Math.ceil(context.measureText(displayEmail).width) + 2;
                const scale = Math.max(window.devicePixelRatio || 1, 1);

                emailImage.width = width * scale;
                emailImage.height = lineHeight * scale;
                emailImage.style.width = `${width}px`;
                emailImage.style.height = `${lineHeight}px`;

                context.setTransform(scale, 0, 0, scale, 0, 0);
                context.font = font;
                context.fillStyle = getComputedStyle(emailElement).color;
                context.textBaseline = 'middle';
                context.fillText(displayEmail, 0, lineHeight / 2);
            };

            drawEmailImage();
            if (document.fonts?.ready) {
                document.fonts.ready.then(drawEmailImage);
            }

            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Copy this email';
            
            emailSpan.appendChild(emailImage);
            emailSpan.appendChild(tooltip);
            emailElement.innerHTML = '';
            emailElement.appendChild(icon);
            emailElement.appendChild(emailSpan);

            emailElement.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(-10px)';
            });

            emailElement.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(0)';
            });

            emailElement.addEventListener('click', () => {
                if (!navigator.clipboard?.writeText) {
                    tooltip.textContent = 'Copy unavailable';
                    return;
                }

                navigator.clipboard.writeText(email).then(() => {
                    tooltip.textContent = 'Email copied!';
                    setTimeout(() => {
                        tooltip.textContent = 'Copy this email';
                    }, 2000);
                }).catch(() => {
                    tooltip.textContent = 'Copy unavailable';
                });
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
function calculateYearsOfExperience(startYear) {
    try {
        const years = new Date().getFullYear() - Number(startYear);
        if (!Number.isFinite(years)) {
            throw new Error('Invalid experience start year');
        }
        return years;
    } catch (error) {
        console.error('Error calculating years of experience:', error);
        throw error;
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
        // Set up email obfuscation
        setupEmailObfuscation();

        // Set up skills toggle
        setupSkillsToggle();

        // Load profile data
        loadProfile();

        // Load work experience
        loadWorkExperience();

        // Load projects
        loadProjects();

        // Initialize floating menu
        const floatingMenu = document.querySelector('.floating-menu');
        if (floatingMenu) {
            // Show/hide menu based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    floatingMenu.classList.add('show');
                } else {
                    floatingMenu.classList.remove('show');
                }
            });

            // Add smooth scrolling to navigation links
            document.querySelectorAll('.nav-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                        // Close mobile menu after clicking a link
                        if (window.innerWidth <= 1595) {
                            floatingMenu.classList.remove('expanded');
                        }
                    }
                });
            });

            // Add toggle functionality for mobile menu
            const menuToggle = floatingMenu.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    floatingMenu.classList.toggle('expanded');
                });

                // Close menu when clicking outside on mobile
                document.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1595 && 
                        !floatingMenu.contains(e.target) && 
                        floatingMenu.classList.contains('expanded')) {
                        floatingMenu.classList.remove('expanded');
                    }
                });
            }
        }

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

function createTechStackElement(stackItems, extraClass = '') {
    if (!Array.isArray(stackItems) || stackItems.length === 0) {
        return null;
    }

    const techStack = document.createElement('div');
    techStack.className = 'tech-stack';

    if (extraClass) {
        techStack.classList.add(extraClass);
    }

    const techStackItems = document.createElement('div');
    techStackItems.className = 'tech-stack-items';

    stackItems.forEach(tech => {
        const techItem = document.createElement('div');
        techItem.className = 'tech-item';
        techItem.innerHTML = marked.parse(tech);
        techStackItems.appendChild(techItem);
    });

    techStack.appendChild(techStackItems);
    return techStack;
}

const experienceDateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
});

function formatExperienceDate(date) {
    if (!date) {
        return '';
    }

    const dateString = String(date);
    const match = /^(\d{2})\/(\d{4})$/.exec(dateString);
    if (!match) {
        return dateString;
    }

    const month = Number(match[1]);
    const year = Number(match[2]);
    const parsedDate = new Date(Date.UTC(year, month - 1, 1));
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.getUTCMonth() !== month - 1 || parsedDate.getUTCFullYear() !== year) {
        return dateString;
    }

    return experienceDateFormatter.format(parsedDate);
}

function formatExperienceDuration(item) {
    const startDate = formatExperienceDate(item.startDate);
    const endDate = formatExperienceDate(item.endDate);
    return endDate ? `${startDate} - ${endDate}` : startDate;
}

function getExperienceStartYear(startDate) {
    const match = String(startDate).match(/(\d{4})$/);
    return match ? match[1] : String(startDate);
}

function createEngagementsSection(engagements) {
    if (!Array.isArray(engagements) || engagements.length === 0) {
        return null;
    }

    const engagementsSection = document.createElement('div');
    engagementsSection.className = 'engagements';

    const title = document.createElement('h4');
    title.className = 'engagements-title';
    title.textContent = 'Client Engagements';
    engagementsSection.appendChild(title);

    engagements.forEach(engagement => {
        const engagementCard = document.createElement('div');
        engagementCard.className = 'engagement-card';

        const badge = document.createElement('span');
        badge.className = 'engagement-badge';
        badge.textContent = 'Client Engagement';

        const roleTitle = document.createElement('h5');
        roleTitle.className = 'engagement-role';
        roleTitle.textContent = `${engagement.role} - ${engagement.client}`;

        const meta = document.createElement('p');
        meta.className = 'engagement-meta';
        meta.textContent = `${engagement.project} | ${formatExperienceDuration(engagement)}`;

        const summary = document.createElement('p');
        summary.className = 'engagement-summary';
        summary.textContent = engagement.summary;

        const engagementSuccesses = document.createElement('div');
        engagementSuccesses.className = 'engagement-successes';

        if (Array.isArray(engagement.successes)) {
            engagement.successes.forEach(success => {
                const successItem = document.createElement('div');
                successItem.className = 'engagement-success-item';
                successItem.innerHTML = marked.parse(success);
                engagementSuccesses.appendChild(successItem);
            });
        }

        const engagementTechStack = createTechStackElement(engagement.techStack, 'engagement-tech-stack');

        engagementCard.appendChild(badge);
        engagementCard.appendChild(roleTitle);
        engagementCard.appendChild(meta);
        engagementCard.appendChild(summary);

        if (engagementTechStack) {
            engagementCard.appendChild(engagementTechStack);
        }

        engagementCard.appendChild(engagementSuccesses);
        engagementsSection.appendChild(engagementCard);
    });

    return engagementsSection;
}

function renderAbout(about) {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent) {
        throw new Error('About content container not found');
    }

    const years = calculateYearsOfExperience(about.startYear);
    const content = about.content.replace(/\{\{yearsOfExperience\}\}/g, String(years));
    aboutContent.innerHTML = marked.parse(content);
}

function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) {
        throw new Error('Skills grid not found');
    }

    skillsGrid.replaceChildren();
    skills.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';

        const heading = document.createElement('h3');
        heading.textContent = category.name;

        const list = document.createElement('ul');
        category.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        categoryElement.appendChild(heading);
        categoryElement.appendChild(list);
        skillsGrid.appendChild(categoryElement);
    });
}

function renderLanguages(languages) {
    const languagesGrid = document.getElementById('languages-grid');
    if (!languagesGrid) {
        throw new Error('Languages grid not found');
    }

    languagesGrid.replaceChildren();
    languages.forEach(language => {
        const languageItem = document.createElement('div');
        languageItem.className = 'language-item';

        const heading = document.createElement('h3');
        heading.textContent = language.name;

        const languageLevel = document.createElement('div');
        languageLevel.className = 'language-level';

        const levelBar = document.createElement('div');
        levelBar.className = 'level-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        const progressValue = Math.min(100, Math.max(0, Number(language.progress)));
        progress.style.width = `${progressValue}%`;
        levelBar.appendChild(progress);

        const levelText = document.createElement('span');
        levelText.className = 'level-text';
        levelText.textContent = language.level;

        languageLevel.appendChild(levelBar);
        languageLevel.appendChild(levelText);
        languageItem.appendChild(heading);
        languageItem.appendChild(languageLevel);
        languagesGrid.appendChild(languageItem);
    });
}

function renderEducation(education) {
    const educationGrid = document.getElementById('education-grid');
    if (!educationGrid) {
        throw new Error('Education grid not found');
    }

    educationGrid.replaceChildren();
    education.forEach(item => {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';

        const degree = document.createElement('h3');
        degree.textContent = item.degree;

        const institution = document.createElement('p');
        institution.className = 'institution';
        institution.textContent = item.institution;

        const duration = document.createElement('p');
        duration.className = 'duration';
        duration.textContent = item.duration;

        educationItem.appendChild(degree);
        educationItem.appendChild(institution);
        educationItem.appendChild(duration);
        educationGrid.appendChild(educationItem);
    });
}

function showProfileError() {
    const containers = ['about-content', 'skills-grid', 'languages-grid', 'education-grid'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.textContent = 'Error loading profile data. Please check the console for details.';
        }
    });
}

async function loadProfile() {
    try {
        const response = await fetch('data/profile.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const profile = await response.json();
        renderAbout(profile.about);
        renderSkills(profile.skills);
        renderLanguages(profile.languages);
        renderEducation(profile.education);
        console.log('Profile data loaded:', profile);
    } catch (error) {
        console.error('Error loading profile:', error);
        showProfileError();
    }
}

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
            yearSpan.textContent = getExperienceStartYear(item.startDate);
            
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
            duration.textContent = formatExperienceDuration(item);
            
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

            const techStack = createTechStackElement(item.techStack);

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

            const engagementsSection = createEngagementsSection(item.engagements);
            
            // Append all elements to the content
            timelineContent.appendChild(h3);
            timelineContent.appendChild(company);
            timelineContent.appendChild(duration);

            if (techStack) {
                timelineContent.appendChild(techStack);
            }

            timelineContent.appendChild(summary);
            timelineContent.appendChild(responsibilities);

            if (item.successes.length > 0 || engagementsSection) {
                const separator = document.createElement('div');
                separator.className = 'section-separator';
                timelineContent.appendChild(separator);
            }

            if (item.successes.length > 0) {
                timelineContent.appendChild(successes);
            }

            if (engagementsSection) {
                timelineContent.appendChild(engagementsSection);
            }
            
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
