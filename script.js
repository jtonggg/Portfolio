const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("menu-overlay");
const hamburgerIcon = document.getElementById("hamburger-icon");

function toggleMenu() {
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Toggle icon class
  if (hamburger.classList.contains("active")) {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-times");
  } else {
    hamburgerIcon.classList.remove("fa-times");
    hamburgerIcon.classList.add("fa-bars");
  }
}

hamburger.addEventListener("click", toggleMenu);

// Adjust nav link hrefs dynamically if not on index.html
const currentPage = window.location.pathname;
const prefix = currentPage.includes("index.html") || currentPage.endsWith("/") ? "" : "index.html";

document.querySelectorAll(".nav-links a, .footer-nav a,.logo a").forEach(link => {
  const href = link.getAttribute("href");
  if (href.startsWith("#")) {
    link.setAttribute("href", `${prefix}${href}`);
  }
});

// navbar hide on scroll after 4 seconds delay
let lastScrollTop = 0;
let hideTimeout;
const navbar = document.querySelector(".navbar");
let isHidden = false;

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Clear the previous 4-second hide timeout
  clearTimeout(hideTimeout);

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    if (isHidden) {
      navbar.style.transition = "transform 0.2s ease-out";
      navbar.style.transform = "translateY(0)";
      isHidden = false;
    }

    // Set a new timeout to hide after 4 seconds 
    hideTimeout = setTimeout(() => {
      navbar.style.transition = "transform 0.4s ease-in-out";
      navbar.style.transform = "translateY(-100%)";
      isHidden = true;
    }, 3000);
  } else {
    // Scrolling up
    navbar.style.transition = "transform 0.2s ease-out";
    navbar.style.transform = "translateY(0)";
    isHidden = false;
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


// Detect clicks outside the nav to close it
document.addEventListener("click", function (event) {
  const isClickInsideNav = navLinks.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains("active")) {
    toggleMenu();
  }
});

// Follower effect
  const follower = document.querySelector('.follower');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      
      followerX += (mouseX - followerX) * 0.3;
      followerY += (mouseY - followerY) * 0.3;

      follower.style.transform = `translate(${followerX - 10}px, ${followerY - 10}px)`;

      requestAnimationFrame(animate);
    }

    animate();

let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-content');

function showSlide(newIndex, direction = 'next') {
  if (newIndex === currentIndex) return;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[newIndex];

  currentSlide.style.transform = `translateX(${direction === 'next' ? '-20px' : '20px'})`;
  currentSlide.style.opacity = '0';
  currentSlide.classList.remove('active');

 
  nextSlide.style.transform = `translateX(${direction === 'next' ? '20px' : '-20px'})`;
  nextSlide.style.opacity = '0';
  nextSlide.classList.add('active');

  
  setTimeout(() => {
    nextSlide.style.transform = 'translateX(0)';
    nextSlide.style.opacity = '1';
  }, 50);

  currentIndex = newIndex;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex, 'next');
}

function prevSlide() {
  const newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex, 'prev');
}

// Auto-slide every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);

// Show the first slide initially
showSlide(0);

// Form validation and email sending via EmailJS
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'imail.sunway.edu'];
  const emailParts = email.split('@');

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return false;
  }

  if (
    emailParts.length !== 2 ||
    !allowedDomains.includes(emailParts[1].toLowerCase())
  ) {
    alert('Please enter a valid email ending with @gmail.com or @yahoo.com etc.');
    return false;
  }

  const form = document.querySelector('.contact-form');
  const submitBtn = form.querySelector('.submit-btn');

  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  emailjs.sendForm(
    'service_1r7w2ah',   
    'template_tp4bq5z',  
    form
  ).then(() => {
    alert('Message sent successfully! I\'ll get back to you soon.');
    form.reset();
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
  }).catch((error) => {
    console.error('EmailJS error:', error);
    alert('Oops! Something went wrong. Please try again later.');
    submitBtn.textContent = 'Submit';
    submitBtn.disabled = false;
  });

  return false;
}




// =====================
// Star Button — Enhanced
// =====================
const starButton = document.getElementById('star-button');
const starPopup = document.getElementById('star-popup');
let starCount = 0;

// Spawn burst particles from click position
function spawnParticles(cx, cy) {
  const total = 10;
  for (let i = 0; i < total; i++) {
    const p = document.createElement('span');
    p.classList.add('star-particle');
    p.textContent = '⭐';

    const angle = (i / total) * 360;
    const dist = 55 + Math.random() * 55;
    p.style.left = cx + 'px';
    p.style.top  = cy + 'px';
    p.style.setProperty('--dx', Math.cos(angle * Math.PI / 180) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle * Math.PI / 180) * dist + 'px');
    p.style.animationDelay = (Math.random() * 0.08) + 's';

    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

// Slide-in toast instead of alert
function showToast(msg, emoji = '🌟') {
  const toast = document.createElement('div');
  toast.classList.add('star-toast');
  toast.innerHTML = `<span class="toast-emoji">${emoji}</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Full-screen colour flash
function milestoneFlash(color) {
  const flash = document.createElement('div');
  flash.classList.add('milestone-flash');
  flash.style.background = color;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 700);
}

// Update button glow level based on count
function updateStarLevel() {
  starButton.classList.remove('star-lvl-1','star-lvl-2','star-lvl-3','star-lvl-4');
  if      (starCount >= 200) starButton.classList.add('star-lvl-4');
  else if (starCount >= 100) starButton.classList.add('star-lvl-3');
  else if (starCount >=  50) starButton.classList.add('star-lvl-2');
  else if (starCount >=  10) starButton.classList.add('star-lvl-1');
}

starButton.addEventListener('click', (e) => {
  starCount++;

  // Floating +N popup
  starPopup.textContent = `+${starCount}`;
  starPopup.classList.remove('show');
  void starPopup.offsetWidth;
  starPopup.classList.add('show');

  // Particle burst from button centre
  const r = starButton.getBoundingClientRect();
  spawnParticles(r.left + r.width / 2, r.top + r.height / 2);

  // Button bounce
  starButton.classList.remove('star-bounce');
  void starButton.offsetWidth;
  starButton.classList.add('star-bounce');

  // Progressive glow
  updateStarLevel();

  // Milestone reactions — no more boring alerts!
  if (starCount === 10) {
    milestoneFlash('rgba(255,215,0,0.15)');
    showToast("You found the secret star! 🤫", "🥇");
  } else if (starCount === 50) {
    milestoneFlash('rgba(187,134,252,0.2)');
    showToast("50 stars... are you okay?? 😂", "💜");
  } else if (starCount === 100) {
    milestoneFlash('rgba(255,0,128,0.2)');
    showToast("100 STARS. Absolute respect. 🫡", "🏆");
  } else if (starCount === 200) {
    milestoneFlash('rgba(0,255,200,0.2)');
    showToast("My developer said this would NEVER happen 😭", "🌈");
  }
});


// Competition cards — tap to expand (mobile) / accordion behaviour
document.querySelectorAll('.competition-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't toggle if the user clicked a link inside the card
    if (e.target.closest('.competition-link')) return;

    const isActive = card.classList.contains('active');

    // Close all cards first (accordion — only one open at a time)
    document.querySelectorAll('.competition-card').forEach(c => c.classList.remove('active'));

    // If this card wasn't already open, open it
    if (!isActive) {
      card.classList.add('active');
    }
  });
});
