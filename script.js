/* =====================================
   AIN FAYYADHAH - PORTFOLIO JAVASCRIPT
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Copy email address
  const copyButton = document.getElementById("copyEmail");
  const message = document.getElementById("message");
  const email = "ainfayyadh2@gmail.com";

  if (copyButton && message) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        message.textContent = "Email address copied successfully!";
      } catch (error) {
        // Fallback for browsers that block clipboard access
        const input = document.createElement("textarea");
        input.value = email;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();

        const copied = document.execCommand("copy");
        input.remove();

        message.textContent = copied
          ? "Email address copied successfully!"
          : "Please copy this email manually: " + email;
      }

      setTimeout(() => {
        message.textContent = "";
      }, 3500);
    });
  }

  // Smooth scrolling for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Update the URL fragment without jumping
        history.replaceState(null, "", targetId);
      }
    });
  });

  // Reveal sections as they enter the viewport
  const sections = document.querySelectorAll(".section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    sections.forEach((section) => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }

  // Highlight the active navigation link
  const navLinks = document.querySelectorAll('.navbar nav a');
  const observedSections = document.querySelectorAll(
    "#about, #projects, #skills, #experience, #contact"
  );

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === "#" + entry.target.id;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    observedSections.forEach((section) => {
      navObserver.observe(section);
    });
  }

  // Add a year automatically to the footer if desired
  const footerText = document.querySelector("footer p");

  if (footerText) {
    footerText.textContent =
      "© " + new Date().getFullYear() +
      " Ain Fayyadhah · Software Engineer Portfolio";
  }

  // Log successful initialization in the browser console
  console.log("Ain Fayyadhah portfolio loaded successfully.");
});