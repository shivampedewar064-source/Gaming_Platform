GPUtils.ready(() => {
  const nav = GPUtils.qs("#siteNav");
  const navToggle = GPUtils.qs("#navToggle");
  const scrollTriggers = GPUtils.qsa("[data-scroll-target]");

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      nav.classList.toggle("is-open");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const id = trigger.getAttribute("data-scroll-target");
      const target = GPUtils.qs(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

