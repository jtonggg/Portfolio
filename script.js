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

// Adjust nav link hrefs dynamically if not on portfolio.html
const currentPage = window.location.pathname;
const prefix = currentPage.includes("portfolio.html") ? "" : "portfolio.html";

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



  // interactive star button
const starButton = document.getElementById('star-button');
const starPopup = document.getElementById('star-popup');
let starCount = 0;

starButton.addEventListener('click', () => {
  starCount++;
  starPopup.textContent = `+${starCount}`;

  // Trigger the CSS animation
  starPopup.classList.remove('show'); 
  void starPopup.offsetWidth; 
  starPopup.classList.add('show');

  // Show messages at certain milestones
if (starCount === 10) {
  alert("Keep going... or don't. I'm just a button.");
} else if (starCount === 50) {
  alert("Halfway to madness. Or greatness. Hard to tell.");
} else if (starCount === 100) {
  alert("100 stars. You deserve a trophy... or a therapist. 🏆😅");
} else if (starCount === 200) {
  alert("🌟 My developer said this would never happen.");
}
});
  

