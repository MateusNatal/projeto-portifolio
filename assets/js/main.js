/**
 * Navegação, filtros do portfólio, revelação ao rolar e botão "voltar ao topo".
 * JavaScript nativo, sem bibliotecas adicionais. Respeita prefers-reduced-motion.
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopQuery = window.matchMedia("(min-width: 1200px)");
  const body = document.body;
  const main = document.getElementById("main");

  /* ---------- Hero: especialidades em digitação (Typed.js) ---------- */
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const items = (typedEl.getAttribute("data-typed-items") || "")
      .split(",")
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);

    if (reduceMotion.matches || !window.Typed || !items.length) {
      // Sem animação: mostra apenas a primeira especialidade, sem alternância
      typedEl.textContent = items[0] || typedEl.textContent;
    } else {
      typedEl.textContent = "";
      new window.Typed(typedEl, {
        strings: items,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
      });
    }
  }

  /* ---------- Menu lateral (gaveta em telas menores) ---------- */
  const sidebar = document.getElementById("header");
  const toggle = document.querySelector(".nav-toggle");
  const backdrop = document.querySelector(".nav-backdrop");

  function isNavOpen() {
    return body.classList.contains("nav-open");
  }

  function setNav(open) {
    body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      toggle.querySelector("i").className = open ? "bi bi-x-lg" : "bi bi-list";
    }
    // Enquanto a gaveta estiver aberta, o conteúdo principal fica fora do alcance do foco
    if (main) main.inert = open;

    if (open && sidebar) {
      const firstLink = sidebar.querySelector(".nav-link");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!isNavOpen());
      if (!isNavOpen()) toggle.focus({ preventScroll: true });
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setNav(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isNavOpen()) {
      setNav(false);
      if (toggle) toggle.focus({ preventScroll: true });
    }
  });

  // Ao escolher uma seção na gaveta, ela fecha
  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a") && isNavOpen()) setNav(false);
    });
  }

  desktopQuery.addEventListener("change", function (e) {
    if (e.matches && isNavOpen()) setNav(false);
  });

  /* ---------- Seção atual no menu ---------- */
  const pairs = [];
  document.querySelectorAll('#navbar a[href^="#"]').forEach(function (link) {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) pairs.push({ link: link, section: section });
  });

  const toTop = document.querySelector(".back-to-top");

  function updateActiveSection() {
    if (pairs.length) {
      // A seção ativa é a última cujo início passou de 35% da altura da tela
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = pairs[0];
      pairs.forEach(function (pair) {
        const top = pair.section.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = pair;
      });
      // No fim da página, a última seção fica ativa mesmo que não tenha chegado ao topo
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = pairs[pairs.length - 1];

      pairs.forEach(function (pair) {
        const isCurrent = pair === current;
        pair.link.classList.toggle("active", isCurrent);
        if (isCurrent) {
          pair.link.setAttribute("aria-current", "location");
        } else {
          pair.link.removeAttribute("aria-current");
        }
      });
    }

    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 480);
  }

  let frame = null;
  function onScrollOrResize() {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = null;
      updateActiveSection();
      revealPending();
    });
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
  window.addEventListener("load", onScrollOrResize);
  onScrollOrResize();

  /* ---------- Foco ao navegar por âncoras ---------- */
  // O scroll continua nativo (suave, quando permitido); o foco vai para o título da seção
  document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  /* ---------- Revelação suave ao rolar ---------- */
  // Verificação na rolagem (e não com IntersectionObserver): um elemento que é ultrapassado por um
  // salto de navegação nunca cruza a tela "com interseção" e ficaria invisível.
  let pendingReveal = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function revealPending() {
    if (!pendingReveal.length) return;
    const limit = window.innerHeight * 0.92;
    pendingReveal = pendingReveal.filter(function (el) {
      if (el.getBoundingClientRect().top >= limit) return true;
      el.classList.add("is-visible");
      return false;
    });
  }

  if (reduceMotion.matches) {
    pendingReveal.forEach(function (el) {
      el.classList.add("is-visible");
    });
    pendingReveal = [];
  }

  /* ---------- Filtros do portfólio ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const FADE_MS = reduceMotion.matches ? 0 : 240;

  function setItemVisible(item, show) {
    clearTimeout(item._hideTimer);
    if (show) {
      if (!item.hidden && !item.classList.contains("is-filtered-out")) return;
      item.hidden = false;
      item.classList.add("is-filtered-out");
      // Duplo requestAnimationFrame: o estado inicial é pintado antes da transição
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          item.classList.remove("is-filtered-out");
        });
      });
    } else {
      if (item.hidden) return;
      item.classList.add("is-filtered-out");
      item._hideTimer = setTimeout(function () {
        item.hidden = true;
      }, FADE_MS);
    }
  }

  function applyFilter(filter) {
    filterButtons.forEach(function (btn) {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    portfolioItems.forEach(function (item) {
      const categories = item.dataset.cat.split(" ");
      const match = filter === "*" || categories.indexOf(filter) !== -1;
      setItemVisible(item, match);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.dataset.filter);
    });
  });
})();
