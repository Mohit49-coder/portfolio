// Initialize EmailJS with your public key
emailjs.init("PnvtLuqoxAFh1SH5K");

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
window.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && navMenu.classList.contains("active")) {
    mobileMenuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Fake contact form submit (no backend yet)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  statusEl.textContent = "Sending...";

  // EmailJS for contact form
  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    to_email: "mohitkhanzode49@gmail.com"
  };

  emailjs.send(
    "service_blm0rqv",
    "template_ufmdf5d",
    templateParams
  ).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      statusEl.textContent = "Thanks! Your message has been sent.";
      form.reset();
    },
    (err) => {
      console.log("FAILED...", err);
      statusEl.textContent = "Sorry, something went wrong.";
    }
  );
});

// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

function setTheme(mode) {
  if (mode === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "🌙";
  } else {
    body.classList.remove("light");
    toggleBtn.textContent = "☀️";
  }
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

toggleBtn.addEventListener("click", () => {
  const mode = body.classList.contains("light") ? "dark" : "light";
  setTheme(mode);
});