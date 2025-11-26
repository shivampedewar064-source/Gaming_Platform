const GPUtils = (() => {
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const ready = (cb) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", cb, { once: true });
    } else {
      cb();
    }
  };

  const setText = (selectorOrElements, text) => {
    const elements =
      typeof selectorOrElements === "string" ? qsa(selectorOrElements) : selectorOrElements;
    elements.forEach((node) => {
      if (node) node.textContent = text;
    });
  };

  const setHidden = (elements, hidden) => {
    const nodes = typeof elements === "string" ? qsa(elements) : elements;
    nodes.forEach((node) => {
      if (node) node.hidden = hidden;
    });
  };

  const flash = (node, message, variant = "info") => {
    if (!node) return;
    node.textContent = message;
    node.dataset.variant = variant;
    node.hidden = false;
    setTimeout(() => {
      node.hidden = true;
    }, 4500);
  };

  ready(() => {
    const yearNode = qs("[data-current-year]");
    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }
  });

  return { qs, qsa, ready, setText, setHidden, flash };
})();

