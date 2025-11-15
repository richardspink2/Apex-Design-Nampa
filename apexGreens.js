// Smooth scroll for buttons and nav CTAs
const scrollButtons = document.querySelectorAll("[data-scroll]");
scrollButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    const el = document.querySelector(target);
    if (!el) return;
    const navHeight = document.querySelector(".top-nav")?.offsetHeight || 0;
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - navHeight - 12;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

// Section reveal on scroll
const sections = document.querySelectorAll("section");
const projects = document.querySelectorAll(".project");

function handleReveal() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add("visible");
  });

  projects.forEach((proj) => {
    const top = proj.getBoundingClientRect().top;
    if (top < trigger) proj.classList.add("visible");
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

// Service filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    serviceCards.forEach((card) => {
      const type = card.getAttribute("data-type");
      const show = filter === "all" || filter === type;
      card.style.opacity = show ? "1" : "0";
      card.style.transform = show ? "translateY(0)" : "translateY(10px)";
      card.style.pointerEvents = show ? "auto" : "none";
    });
  });
});

// Simple quote form handling (front-end only)
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

if (quoteForm && formMessage) {
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = quoteForm.name.value.trim();
    const email = quoteForm.email.value.trim();
    const propertyType = quoteForm.propertyType.value;
    const frequency = quoteForm.frequency.value;
    const details = quoteForm.details.value.trim();

    if (!name || !email || !propertyType || !frequency || !details) {
      formMessage.textContent =
        "Please fill out all fields so we can give you an accurate quote.";
      formMessage.className = "form-message error";
      return;
    }

    formMessage.textContent =
      "Thanks — your quote request has been noted. This demo doesn’t send email, but this is where your backend would pick it up.";
    formMessage.className = "form-message success";

    quoteForm.reset();
  });
}
