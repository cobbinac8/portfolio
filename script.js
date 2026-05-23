/* ============================================================
   Christiana Cobbina — PORTFOLIO JAVASCRIPT
   script.js

   This file handles:
   1. Navbar shadow on scroll
   2. Mobile hamburger menu toggle
   3. Smooth active link highlighting
   4. Fade-in animation for cards on scroll
   5. Contact form submission message
   6. Footer year update
============================================================ */


/* ============================================================
   1. NAVBAR — ADD SHADOW WHEN USER SCROLLS DOWN
   We listen for the "scroll" event and add/remove a CSS class.
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  // If the user has scrolled more than 50px, add the 'scrolled' class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================================
   2. MOBILE HAMBURGER MENU TOGGLE
   Clicking the ☰ button shows/hides the nav links on mobile.
============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
  // Toggle the 'open' class — our CSS shows the menu when .open is present
  navLinks.classList.toggle('open');

  // Change the icon: ☰ (open) or ✕ (close) so the user knows what to expect
  if (navLinks.classList.contains('open')) {
    navToggle.innerHTML = '&#10005;'; // ✕
  } else {
    navToggle.innerHTML = '&#9776;'; // ☰
  }
});

/* Close the mobile menu when the user clicks any nav link */
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.innerHTML = '&#9776;'; // Reset to ☰
  });
});


/* ============================================================
   3. ACTIVE NAV LINK HIGHLIGHTING
   As the user scrolls, the matching nav link gets highlighted.
============================================================ */

// Collect all sections that have an id
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  // Get current scroll position, adding a small offset for early detection
  const scrollPosition = window.scrollY + 120;

  sections.forEach(function (section) {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    // Check if we're currently inside this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove 'active' class from ALL links first
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.style.color = ''; // Reset to CSS default
      });

      // Highlight the matching link
      const activeLink = navLinks.querySelector('a[href="#' + sectionId + '"]');
      if (activeLink) {
        activeLink.style.color = 'var(--color-primary)';
      }
    }
  });
});


/* ============================================================
   4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Elements with the class "fade-in" start invisible.
   When they enter the viewport, we add "visible" to make them appear.
============================================================ */

// Get all elements that should fade in
const fadeElements = document.querySelectorAll('.fade-in');

// IntersectionObserver watches elements and fires when they enter the screen
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Element is visible — add the 'visible' class to trigger the CSS animation
        entry.target.classList.add('visible');
        // Stop watching it once it's visible (no need to re-animate)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // Trigger when 15% of the element is visible
  }
);

// Tell the observer to watch each fade-in element
fadeElements.forEach(function (el) {
  observer.observe(el);
});


/* ============================================================
   5. CONTACT FORM
   No JavaScript needed here — the form posts directly to
   FormSpree via the action attribute in the HTML.
   FormSpree handles sending the email and showing a thank-you page.
============================================================ */


/* ============================================================
   6. FOOTER — UPDATE COPYRIGHT YEAR AUTOMATICALLY
   This ensures the year is always current without manual editing.
============================================================ */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ============================================================
   7. SMOOTH REVEAL FOR SKILL CARDS (STAGGERED)
   Each skill card fades in with a slight delay after the previous one.
============================================================ */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Add a delay based on the card's position so they appear one by one
        setTimeout(function () {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 60); // 60ms delay between each card

        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Set initial hidden state and watch each card
skillCards.forEach(function (card) {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  skillObserver.observe(card);
});


