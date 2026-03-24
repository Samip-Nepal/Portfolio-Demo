// Portfolio Data
let portfolioData = null;

// SVG Icons
const icons = {
  github: '<svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadPortfolioData();
  setupEventListeners();
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Toggle theme
function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  document.getElementById('themeIcon').textContent = theme === 'light' ? '☀️' : '🌙';
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  document.querySelector('.menu-btn')?.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('active');
    });
  });

  // Modal close
  document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Load portfolio data
async function loadPortfolioData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data');
    portfolioData = await response.json();
    renderPortfolio();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    document.getElementById('heroName').textContent = 'Error loading data';
  }
}

// Render all sections
function renderPortfolio() {
  if (!portfolioData) return;
  renderHero();
  renderAbout();
  renderEducation();
  renderExperience();
  renderCertifications();
  renderProjects();
  renderSocialLinks();
}

// Render Hero
function renderHero() {
  const { about } = portfolioData;
  document.getElementById('heroName').textContent = about.name;
  document.getElementById('heroTitle').textContent = about.title;
  document.getElementById('heroTagline').textContent = about.tagline || '';
  document.getElementById('heroBio').textContent = about.bio;
}

// Render About
function renderAbout() {
  const { about, projects, experience } = portfolioData;

  document.getElementById('aboutBio').textContent = about.bio;
  document.getElementById('aboutLocation').textContent = about.location || 'Not specified';
  document.getElementById('aboutEmail').textContent = about.email || 'Not specified';
  document.getElementById('projectCount').textContent = projects.length;

  // Calculate experience years
  let totalYears = 0;
  const allTech = new Set();

  experience.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    totalYears += (end - start) / (1000 * 60 * 60 * 24 * 365);
    if (exp.technologies) exp.technologies.forEach(t => allTech.add(t));
  });

  projects.forEach(proj => {
    if (proj.technologies) proj.technologies.forEach(t => allTech.add(t));
  });

  document.getElementById('experienceYears').textContent = Math.max(1, Math.round(totalYears));
  document.getElementById('techCount').textContent = allTech.size;
}

// Render Education
function renderEducation() {
  const container = document.getElementById('educationTimeline');
  container.innerHTML = portfolioData.education.map(edu => `
    <div class="timeline-item">
      <div class="timeline-card">
        <div class="timeline-date">${edu.startYear} - ${edu.endYear}</div>
        <h4 class="timeline-title">${edu.degree}</h4>
        <p class="timeline-subtitle">${edu.institution}</p>
        ${edu.description ? `<p class="timeline-desc">${edu.description}</p>` : ''}
      </div>
    </div>
  `).join('');
}

// Render Experience
function renderExperience() {
  const container = document.getElementById('experienceList');
  container.innerHTML = portfolioData.experience.map(exp => {
    const techTags = exp.technologies?.map(t => `<span class="tech-tag">${t}</span>`).join('') || '';

    // Get linked projects
    const linkedProjects = exp.projectIds?.map(pid => {
      const proj = portfolioData.projects.find(p => p.id === pid);
      return proj ? `<a href="#" class="experience-project-link" onclick="openProjectById('${pid}'); return false;">${icons.arrow}${proj.title}</a>` : '';
    }).filter(Boolean).join('') || '';

    return `
      <div class="experience-card" id="exp-${exp.id}">
        <div class="experience-header">
          <div>
            <h4 class="experience-title">${exp.title}</h4>
            <p class="experience-company">${exp.company}</p>
          </div>
          <span class="experience-date">${formatDate(exp.startDate)} - ${exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}</span>
        </div>
        <p class="experience-desc">${exp.description}</p>
        ${techTags ? `<div class="tech-tags">${techTags}</div>` : ''}
        ${linkedProjects ? `
          <div class="experience-projects">
            <div class="experience-projects-title">Related Projects:</div>
            ${linkedProjects}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Render Certifications
function renderCertifications() {
  const container = document.getElementById('certificationsGrid');
  const certifications = portfolioData.certifications || [];

  if (certifications.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No certifications added yet.</p>';
    return;
  }

  container.innerHTML = certifications.map(cert => {
    const issueDate = cert.issueDate ? formatCertDate(cert.issueDate) : '';
    const expiryInfo = cert.expiryDate ? ` - Expires: ${formatCertDate(cert.expiryDate)}` : '';

    return `
      <div class="cert-card">
        <div class="cert-icon">🏆</div>
        <h4 class="cert-name">${cert.name}</h4>
        <p class="cert-issuer">${cert.issuer}</p>
        <p class="cert-date">Issued: ${issueDate}${expiryInfo}</p>
        ${cert.credentialId ? `<p class="cert-id">ID: ${cert.credentialId}</p>` : ''}
        ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" class="cert-link" target="_blank" rel="noopener noreferrer">${icons.link} View Credential</a>` : ''}
      </div>
    `;
  }).join('');
}

// Format certification date
function formatCertDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

// Render Projects
function renderProjects() {
  const container = document.getElementById('projectsGrid');
  container.innerHTML = portfolioData.projects.map((project, index) => {
    const techTags = project.technologies?.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('') || '';

    return `
      <div class="project-card" onclick="openProjectModal(${index})">
        <div class="project-image">💻</div>
        <div class="project-content">
          <div class="project-header">
            <h4 class="project-title">${project.title}</h4>
            ${project.featured ? '<span class="project-featured">Featured</span>' : ''}
          </div>
          <p class="project-desc">${project.shortDescription}</p>
          <div class="tech-tags">${techTags}</div>
          <div class="project-links">
            ${project.liveDemo ? `<a href="${project.liveDemo}" class="project-link" target="_blank" onclick="event.stopPropagation()">${icons.link} Demo</a>` : ''}
            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" onclick="event.stopPropagation()">${icons.github} Code</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Social Links
function renderSocialLinks() {
  const socialHtml = portfolioData.socialLinks.map(link => `
    <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${link.platform}">
      ${icons[link.icon] || icons.link}
    </a>
  `).join('');

  document.getElementById('socialLinks').innerHTML = socialHtml;
  document.getElementById('footerSocials').innerHTML = socialHtml;
}

// Open project modal by index
function openProjectModal(index) {
  const project = portfolioData.projects[index];
  if (!project) return;
  showProjectInModal(project);
}

// Open project modal by ID
function openProjectById(id) {
  const project = portfolioData.projects.find(p => p.id === id);
  if (!project) return;
  showProjectInModal(project);
}

// Show project in modal
function showProjectInModal(project) {
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalDesc').textContent = project.fullDescription;

  // Experience link
  const expLinkContainer = document.getElementById('modalExperienceLink');
  if (project.experienceId) {
    const exp = portfolioData.experience.find(e => e.id === project.experienceId);
    if (exp) {
      expLinkContainer.innerHTML = `Part of: <a href="#exp-${exp.id}" onclick="closeModal()">${exp.title} at ${exp.company}</a>`;
      expLinkContainer.style.display = 'block';
    } else {
      expLinkContainer.style.display = 'none';
    }
  } else {
    expLinkContainer.style.display = 'none';
  }

  // Tech tags
  document.getElementById('modalTech').innerHTML = project.technologies?.map(t => `<span class="tech-tag">${t}</span>`).join('') || '';

  // Links
  document.getElementById('modalLinks').innerHTML = `
    ${project.liveDemo ? `<a href="${project.liveDemo}" class="btn btn-primary" target="_blank">View Demo</a>` : ''}
    ${project.github ? `<a href="${project.github}" class="btn btn-secondary" target="_blank">View Code</a>` : ''}
  `;

  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length >= 2) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}
