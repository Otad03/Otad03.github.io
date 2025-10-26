// Wait for config to load
document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
  initializeTheme();
  initializeNavigation();
  initializeContactForm();
});

function initializePortfolio() {
  if (typeof portfolioConfig === 'undefined') {
    console.error('Config file not loaded!');
    return;
  }

  // Populate Hero Section
  document.getElementById('heroName').textContent = portfolioConfig.name;
  document.getElementById('heroTitle').textContent = portfolioConfig.title;
  document.getElementById('heroDescription').textContent = portfolioConfig.bio;
  document.getElementById('navLogo').textContent = portfolioConfig.name;
  
  // Profile Image
  const heroImageContainer = document.getElementById('heroImageContainer');
  if (portfolioConfig.profileImage) {
    heroImageContainer.innerHTML = `<img src="${portfolioConfig.profileImage}" alt="${portfolioConfig.name}" class="profile-img">`;
  } else {
    const initials = portfolioConfig.name.split(' ').map(n => n[0]).join('');
    heroImageContainer.innerHTML = `<div class="placeholder-img">${initials}</div>`;
  }
  
  // Social Links
  const socialLinksContainer = document.getElementById('socialLinks');
  const socialIcons = {
    github: '👨‍💻',
    linkedin: '💼',
    twitter: '🐦',
    email: '📧',
    instagram: '📷',
    facebook: '📘',
    youtube: '🎥'
  };
  
  Object.entries(portfolioConfig.social).forEach(([platform, url]) => {
    const icon = socialIcons[platform] || '🔗';
    socialLinksContainer.innerHTML += `<a href="${url}" target="_blank" title="${platform}">${icon}</a>`;
  });
  
  // About Section
  document.getElementById('aboutTitle').textContent = portfolioConfig.about.title;
  document.getElementById('aboutDescription').textContent = portfolioConfig.about.description;
  if (portfolioConfig.about.additionalInfo) {
    document.getElementById('aboutExtra').innerHTML = `<p>${portfolioConfig.about.additionalInfo}</p>`;
  }
  
  // Credentials
  const credentialsList = document.getElementById('credentialsList');
  portfolioConfig.credentials.forEach(cred => {
    credentialsList.innerHTML += `
      <li>
        <strong>${cred.title}</strong><br>
        ${cred.institution} | ${cred.year}
      </li>
    `;
  });
  
  // Skills
  const skillsGrid = document.getElementById('skillsGrid');
  portfolioConfig.skills.forEach(skillSet => {
    const skillTags = skillSet.items.map(item => `<span class="skill-tag">${item}</span>`).join('');
    skillsGrid.innerHTML += `
      <div class="skill-card">
        <h3>${skillSet.category}</h3>
        <div class="skill-items">
          ${skillTags}
        </div>
      </div>
    `;
  });
  
  // Projects
  const projectsGrid = document.getElementById('projectsGrid');
  portfolioConfig.projects.forEach((project, index) => {
    const imageHTML = project.image 
      ? `<img src="${project.image}" alt="${project.title}" class="project-img">`
      : `<div class="project-placeholder">💻</div>`;
    
    const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    projectsGrid.innerHTML += `
      <div class="project-card">
        ${imageHTML}
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">${techTags}</div>
          <div class="project-links">
            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank">Live Demo →</a>` : ''}
            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank">GitHub →</a>` : ''}
          </div>
        </div>
      </div>
    `;
  });
  
  // Certificates
  const certificatesGrid = document.getElementById('certificatesGrid');
  portfolioConfig.certificates.forEach(cert => {
    const imageHTML = cert.image 
      ? `<img src="${cert.image}" alt="${cert.title}" class="certificate-img">`
      : `<div class="certificate-placeholder">🏆</div>`;
    
    certificatesGrid.innerHTML += `
      <div class="certificate-card" onclick="window.open('${cert.credentialLink}', '_blank')">
        ${imageHTML}
        <div class="certificate-content">
          <h3>${cert.title}</h3>
          <p>${cert.issuer}</p>
          <p class="certificate-date">${cert.date}</p>
        </div>
      </div>
    `;
  });
  
  // Contact Info
  const contactInfo = document.getElementById('contactInfo');
  contactInfo.innerHTML = `
    <h3>Contact Information</h3>
    <div class="contact-item">
      <div class="contact-item-icon">📧</div>
      <div class="contact-item-text">
        <strong>Email</strong><br>
        <a href="mailto:${portfolioConfig.contact.email}">${portfolioConfig.contact.email}</a>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon">📱</div>
<div class="contact-item-text">
        <strong>Phone</strong><br>
        <a href="tel:${portfolioConfig.contact.phone}">${portfolioConfig.contact.phone}</a>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-item-icon">📍</div>
      <div class="contact-item-text">
        <strong>Location</strong><br>
        ${portfolioConfig.contact.location}
      </div>
    </div>
  `;
  
  // Footer
  document.getElementById('footerText').textContent = `© ${new Date().getFullYear()} ${portfolioConfig.name}. All rights reserved.`;
}

// Theme Toggle
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.textContent = '☰';
    });
  });
  
  // Smooth scroll with offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Here you can add your email service integration
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form
    form.reset();
    
    // Optional: Send to email service like EmailJS, Formspree, etc.
    // Example with EmailJS:
    // emailjs.send("service_id", "template_id", {
    //   from_name: name,
    //   from_email: email,
    //   message: message
    // });
  });
}

// Animations on scroll (optional enhancement)
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
  });
}

// Initialize animations after content loads
setTimeout(observeElements, 500);
