/**
 * Funcionalidades do portfólio de Mateus Natal:
 * - alternância de tema claro/escuro (preferência salva no navegador)
 * - carrossel de destaques
 * - estudo de caso em modal (index.html) e em página própria (portfolio-details.html)
 * - ano atual no rodapé
 */
(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /*
   * Dados dos projetos. A chave é o parâmetro ?p= usado nos links.
   *
   * Campos obrigatórios: title, category, images, description, role.
   * Campos opcionais (a seção só aparece no estudo de caso quando preenchida):
   *   problem     texto: problema ou necessidade identificada
   *   solution    texto: conceito e solução desenvolvida
   *   process     lista de textos: etapas do processo
   *   tools       lista de textos: ferramentas e tecnologias
   *   results     texto: resultado final
   *   learnings   texto: aprendizados
   *   links       lista de { label, url }: acesso ao projeto ou ao código
   * Não preencha campos com informações que não sejam verdadeiras.
   */
  const PROJECTS = {
    "gabriel-marques": {
      title: "Gabriel Marques Escola de Inglês",
      category: "Identidade visual · Web · Produtos",
      images: [
        "assets/img/portfolio/gm-capa.jpg",
        "assets/img/portfolio/gm-logo-principal.jpg",
        "assets/img/portfolio/gm-logo-horizontal.jpg",
        "assets/img/portfolio/gm-logo-variacoes.jpg",
        "assets/img/portfolio/gm-site-inicial.jpg",
        "assets/img/portfolio/gm-camisetas-polo.jpg",
        "assets/img/portfolio/gm-banner-curso.jpg",
        "assets/img/portfolio/gm-sala-de-aula.jpg"
      ],
      description: "Identidade visual da Gabriel Marques Escola de Inglês, com logotipo que combina as iniciais GM e a bandeira dos Estados Unidos, variações de cor e aplicações em site, uniformes, banner de curso e sala de aula.",
      role: "Criação da identidade visual e do logotipo, das variações de cor e das aplicações em site, uniformes, banner de curso e sala de aula."
    },
    "mix-economia": {
      title: "Mix Economia",
      category: "Identidade visual",
      images: [
        "assets/img/portfolio/mix-economia-logo.jpg",
        "assets/img/portfolio/mix-economia-logo-horizontal.jpg",
        "assets/img/portfolio/mix-economia-variacoes.jpg",
        "assets/img/portfolio/mix-economia-paleta.jpg",
        "assets/img/portfolio/mix-economia-fachada.jpg",
        "assets/img/portfolio/mix-economia-loja.jpg",
        "assets/img/portfolio/mix-economia-carrinho.jpg",
        "assets/img/portfolio/mix-economia-atendente.jpg",
        "assets/img/portfolio/mix-economia-sacolas.jpg"
      ],
      description: "Identidade visual da Mix Economia, com logotipo de carrinho de compras e variações de cor, aplicado em fachada, loja, sacolas e uniforme.",
      role: "Desenvolvimento do logotipo com carrinho de compras, da paleta de cores e das variações, com aplicações em fachada, loja, sacolas e uniforme."
    },
    "analytica": {
      title: "Analytica",
      category: "Identidade visual · Web",
      images: [
        "assets/img/portfolio/analytica-logo-principal.jpg",
        "assets/img/portfolio/analytica-identidade-visual.jpg",
        "assets/img/portfolio/analytica-landing-page.jpg",
        "assets/img/portfolio/analytica-painel-dashboard.jpg",
        "assets/img/portfolio/analytica-painel-2.jpg"
      ],
      description: "Identidade visual, landing page e painéis de dashboard para a plataforma de análise de dados Analytica. A identidade usa logotipo, paleta de cores e tipografia aplicados em papelaria, uniformes e peças digitais.",
      role: "Identidade visual (logotipo, paleta de cores e tipografia), landing page e painéis de dashboard."
    },
    "haras-conceicao": {
      title: "Haras Conceição",
      category: "Identidade visual · Produtos",
      images: [
        "assets/img/portfolio/haras-identidade-logo.jpg",
        "assets/img/portfolio/haras-logo-horizontal.jpg",
        "assets/img/portfolio/haras-logo-variacoes.jpg",
        "assets/img/portfolio/haras-conceicao-placa.jpg",
        "assets/img/portfolio/haras-conceicao-caneca.jpg",
        "assets/img/portfolio/haras-conceicao-camisa.jpg",
        "assets/img/portfolio/haras-bolsa-viagem.jpg"
      ],
      description: "Identidade visual e produtos do Haras Conceição: logotipo em placa de entrada, caneca, camisa e bolsa, com ilustração de cavalo e acabamento em tons escuros e dourados.",
      role: "Logotipo, variações e aplicações em placa de entrada, caneca, camisa e bolsa de viagem."
    },
    "drogaria-areal-placa": {
      title: "Placas de rua personalizadas",
      category: "Placas",
      images: [
        "assets/img/portfolio/drogaria-areal-placa-mockup.jpg",
        "assets/img/portfolio/drogaria-areal-placa-arte.jpg",
        "assets/img/portfolio/drogamaxi-placa-mockup.jpg",
        "assets/img/portfolio/drogamaxi-placa-arte.jpg"
      ],
      description: "Placas de rua personalizadas com o nome da rua, o logotipo e os contatos do estabelecimento, apresentadas em mockup e na arte final. Exemplos: Drogaria Areal e Drogamaxi.",
      role: "Arte final e mockup das placas, com nome da rua, logotipo e contatos do estabelecimento."
    },
    "placa-obra-floramar": {
      title: "Placa de obra",
      category: "Placas",
      images: [
        "assets/img/portfolio/placa-obra-floramar-mockup.jpg",
        "assets/img/portfolio/placa-obra-floramar-arte.jpg"
      ],
      description: "Placa de identificação da obra Floramar, com os dados do projeto e do responsável técnico, apresentada em mockup no canteiro e na arte final.",
      role: "Arte final e mockup da placa, com os dados do projeto e do responsável técnico."
    },
    "convite-casamento-lilian": {
      title: "Convite de casamento",
      category: "Impressos",
      images: [
        "assets/img/portfolio/convite-casamento-lilian-mockup.jpg",
        "assets/img/portfolio/convite-casamento-lilian-arte.jpg",
        "assets/img/portfolio/convite-casamento-lilian-cartao.jpg"
      ],
      description: "Convite de casamento com monograma e tipografia em serifa, impresso em papel de tom neutro e acompanhado de cartão complementar.",
      role: "Arte final do convite, com monograma e tipografia em serifa, e do cartão complementar."
    },
    "cardapios": {
      title: "Cardápios",
      category: "Impressos",
      images: [
        "assets/img/portfolio/cardapio-01-delicias-mockup.jpg",
        "assets/img/portfolio/cardapio-02-delicias-arte-2.jpg",
        "assets/img/portfolio/cardapio-03-delicias-arte.jpg",
        "assets/img/portfolio/cardapio-04-trinity-mockup.jpg",
        "assets/img/portfolio/cardapio-05-trinity-arte-2.jpg",
        "assets/img/portfolio/cardapio-06-trinity-arte.jpg",
        "assets/img/portfolio/cardapio-07-toro-mockup.jpg",
        "assets/img/portfolio/cardapio-08-toro-arte.jpg",
        "assets/img/portfolio/cardapio-09-toro-arte-2.jpg"
      ],
      description: "Cardápios para as marcas Delícias (açaí), Trinity Lounge e Toro, apresentados em mockup em bar e na arte final de cada página.",
      role: "Arte final das páginas de cardápio das marcas Delícias, Trinity Lounge e Toro, com mockups em bar."
    },
    "amendoka-embalagens": {
      title: "Amendo'Ká",
      category: "Embalagens",
      images: [
        "assets/img/portfolio/amendoka-01-capa.jpg",
        "assets/img/portfolio/amendoka-02-rotulo.jpg",
        "assets/img/portfolio/amendoka-03-rotulo.jpg",
        "assets/img/portfolio/amendoka-04-rotulo.jpg"
      ],
      description: "Embalagens da Amendo'Ká, com rótulos para paçoca natural, de café e de chocolate, sem açúcar e sem glúten, apresentados em foto de produto e nos rótulos individuais.",
      role: "Criação dos rótulos individuais para paçoca natural, de café e de chocolate."
    },
    "copos": {
      title: "Copos personalizados",
      category: "Produtos",
      images: [
        "assets/img/portfolio/copos-capa.jpg",
        "assets/img/portfolio/4play-copo-arte.jpg",
        "assets/img/portfolio/biri-drink-copo-expo.jpg",
        "assets/img/portfolio/biri-drink-arte-expo-cordeiro.jpg",
        "assets/img/portfolio/biri-drink-copos-campanha.jpg",
        "assets/img/portfolio/biri-drink-arte-provinha.jpg",
        "assets/img/portfolio/biri-drink-good-vibes-mockup.jpg",
        "assets/img/portfolio/biri-drink-good-vibes-arte.jpg",
        "assets/img/portfolio/copo-mockup-cruzeiro.jpg",
        "assets/img/portfolio/cruzeiro-arte-copo.jpg",
        "assets/img/portfolio/palmeiras-copo-mockup.jpg",
        "assets/img/portfolio/palmeiras-arte-copo.jpg",
        "assets/img/portfolio/atletico-copo-mockup.jpg",
        "assets/img/portfolio/atletico-arte-copo.jpg",
        "assets/img/portfolio/wesley-gonzaga-copo-mockup.jpg",
        "assets/img/portfolio/wesley-gonzaga-arte-copo.jpg",
        "assets/img/portfolio/fluor-copo-mockup.jpg",
        "assets/img/portfolio/fluor-arte-copo.jpg",
        "assets/img/portfolio/tardezinha-copo-mockup.jpg",
        "assets/img/portfolio/tardezinha-copo-arte.jpg",
        "assets/img/portfolio/vigora-copo-mockup.jpg",
        "assets/img/portfolio/vigora-copo-arte.jpg"
      ],
      description: "Copos e lanyards personalizados para marcas, eventos e campanhas: Biri Drink, Cruzeiro, Palmeiras, Atlético, Wesley Gonzaga, Uma noite de Fluor, 4Play, Tardezinha e Vigora Telecom. Cada peça aparece em mockup e na arte final.",
      role: "Criação das artes e dos mockups dos copos e lanyards de cada marca, evento e campanha listados."
    },
    "trifecta-campanha": {
      title: "Trifecta",
      category: "Embalagens",
      images: [
        "assets/img/portfolio/trifecta-variante-1x1.jpg",
        "assets/img/portfolio/trifecta-variante-3x4.jpg",
        "assets/img/portfolio/trifecta-variante-a.jpg",
        "assets/img/portfolio/trifecta-variante-b.jpg",
        "assets/img/portfolio/trifecta-variante-c.jpg"
      ],
      description: "Peça de campanha para refeições prontas, com embalagens em destaque, chamada principal em tipografia forte e cores laranja e azul. Cinco variações do mesmo layout.",
      role: "Criação do layout da campanha e de suas cinco variações de formato e composição."
    },
    "villa-smart-farm": {
      title: "Villa Smart Farm",
      category: "Impressos",
      images: [
        "assets/img/portfolio/villa-farm-folheto-mockup.jpg",
        "assets/img/portfolio/villa-farm-folheto.jpg",
        "assets/img/portfolio/villa-farm-instrucoes.jpg",
        "assets/img/portfolio/villa-farm-logo.jpg"
      ],
      description: "Material da Villa Smart Farm, loja de ordenhas inteligentes: logotipo, folheto de produtos, mockup do folheto e instruções de montagem e uso.",
      role: "Logotipo, folheto de produtos, mockup do folheto e instruções de montagem e uso."
    }
  };

  /* ---------- Utilitários ---------- */
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function getProject(slug) {
    return slug && Object.prototype.hasOwnProperty.call(PROJECTS, slug) ? PROJECTS[slug] : null;
  }

  /* ---------- Tema claro/escuro ---------- */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      const icon = btn.querySelector("i");
      const label = btn.querySelector("span");
      if (icon) icon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
      if (label) label.textContent = isDark ? "Usar tema claro" : "Usar tema escuro";
    });
  }

  function initTheme() {
    applyTheme(currentTheme());
    document.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-theme-toggle]");
      if (!btn) return;
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (err) {
        /* armazenamento indisponível: o tema vale apenas nesta página */
      }
    });
  }

  /* ---------- Estudo de caso (usado pelo modal e pela página de detalhes) ---------- */
  function listOf(items, ordered) {
    const tag = ordered ? "ol" : "ul";
    return "<" + tag + " class=\"case-list\">" + items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</" + tag + ">";
  }

  function block(title, body) {
    return body ? '<section class="case-block"><h3>' + title + "</h3>" + body + "</section>" : "";
  }

  function paragraph(text) {
    return text ? "<p>" + escapeHtml(text) + "</p>" : "";
  }

  function chips(items) {
    return items && items.length
      ? '<ul class="chips">' + items.map(function (t) { return '<li class="chip">' + escapeHtml(t) + "</li>"; }).join("") + "</ul>"
      : "";
  }

  function galleryHtml(project) {
    const total = project.images.length;
    // Cada imagem aparece inteira (contain) sobre uma cópia desfocada de si mesma, sem cortes nem vazios
    const slides = project.images.map(function (src, index) {
      const safeSrc = escapeHtml(src);
      const alt = escapeHtml(project.title) + ": imagem " + (index + 1) + " de " + total;
      return (
        '<div class="swiper-slide"><figure class="case-slide">' +
        '<img class="fit-bg" src="' + safeSrc + '" alt="" aria-hidden="true" loading="lazy" decoding="async">' +
        '<img class="fit-img" src="' + safeSrc + '" alt="' + alt + '" loading="' + (index === 0 ? "eager" : "lazy") + '" decoding="async">' +
        "</figure></div>"
      );
    }).join("");

    return (
      '<div class="case-gallery" data-gallery>' +
      '  <div class="swiper case-swiper" tabindex="0" aria-label="Imagens do projeto. Use as setas para navegar.">' +
      '    <div class="swiper-wrapper">' + slides + "</div>" +
      "  </div>" +
      '  <div class="case-gallery-bar">' +
      '    <button type="button" class="case-nav" data-gallery-prev aria-label="Imagem anterior"><i class="bi bi-chevron-left" aria-hidden="true"></i></button>' +
      '    <span class="case-count" aria-live="polite"><span data-gallery-current>1</span> / ' + total + "</span>" +
      '    <button type="button" class="case-nav" data-gallery-next aria-label="Próxima imagem"><i class="bi bi-chevron-right" aria-hidden="true"></i></button>' +
      "  </div>" +
      "</div>"
    );
  }

  /**
   * Monta o estudo de caso. mode = "modal" (dentro do index) ou "page" (portfolio-details.html).
   * Seções sem conteúdo no PROJECTS não são exibidas.
   */
  function buildCaseHtml(slug, project, mode) {
    const main = [
      block("Contexto e objetivo", paragraph(project.description)),
      block("Minha contribuição", paragraph(project.role)),
      block("Problema e necessidade", paragraph(project.problem)),
      block("Conceito e solução", paragraph(project.solution)),
      block("Processo", project.process && project.process.length ? listOf(project.process, true) : ""),
      block("Resultado", paragraph(project.results)),
      block("Aprendizados", paragraph(project.learnings))
    ].join("");

    const links = project.links && project.links.length
      ? block(
          "Links",
          '<ul class="case-links">' + project.links.map(function (link) {
            return (
              '<li><a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' +
              escapeHtml(link.label) + ' <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></a></li>'
            );
          }).join("") + "</ul>"
        )
      : "";

    const info = block(
      "Informações",
      "<dl class=\"case-info\"><dt>Categoria</dt><dd>" + escapeHtml(project.category) + "</dd></dl>" +
      (project.tools && project.tools.length ? "<h4 class=\"case-subhead\">Ferramentas e tecnologias</h4>" + chips(project.tools) : "")
    );

    const actions = mode === "modal"
      ? '<a class="btn btn-primary" href="#contact" data-close-case="section">Falar sobre um projeto</a>' +
        '<a class="btn btn-outline" href="portfolio-details.html?p=' + encodeURIComponent(slug) + '">Página completa</a>'
      : '<a class="btn btn-primary" href="index.html#contact">Falar sobre um projeto</a>' +
        '<a class="btn btn-outline" href="index.html#portfolio">Voltar ao portfólio</a>';

    const heading = mode === "page" ? "h1" : "h2";

    return (
      '<header class="case-head">' +
      '  <p class="case-cat">' + escapeHtml(project.category) + "</p>" +
      "  <" + heading + ' class="case-title" id="case-title">' + escapeHtml(project.title) + "</" + heading + ">" +
      "</header>" +
      galleryHtml(project) +
      '<div class="case-columns">' +
      '  <div class="case-main">' + main + "</div>" +
      '  <aside class="case-aside">' + info + links + '  <div class="case-actions">' + actions + "</div>" +
      "  </aside>" +
      "</div>"
    );
  }

  let gallerySwiper = null;

  function destroyGallery() {
    if (gallerySwiper) {
      gallerySwiper.destroy(true, true);
      gallerySwiper = null;
    }
  }

  function initGallery(root) {
    const gallery = root.querySelector("[data-gallery]");
    if (!gallery || typeof Swiper === "undefined") return;

    const el = gallery.querySelector(".case-swiper");
    const current = gallery.querySelector("[data-gallery-current]");

    destroyGallery();
    gallerySwiper = new Swiper(el, {
      // Troca por opacidade: a área da imagem não se move nem muda de tamanho
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: reduceMotion.matches ? 0 : 420,
      observer: true,
      observeParents: true,
      on: {
        slideChange: function (swiper) {
          if (current) current.textContent = String(swiper.realIndex + 1);
        }
      }
    });

    gallery.querySelector("[data-gallery-prev]").addEventListener("click", function () {
      gallerySwiper.slidePrev();
    });
    gallery.querySelector("[data-gallery-next]").addEventListener("click", function () {
      gallerySwiper.slideNext();
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        gallerySwiper.slidePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        gallerySwiper.slideNext();
      }
    });
  }

  /* ---------- Modal do estudo de caso (elemento <dialog>) ---------- */
  const modal = document.getElementById("case-modal");
  const modalContent = document.getElementById("case-content");
  let lastTrigger = null;
  let restoreFocusOnClose = true;
  let cancelPendingClose = null;

  function openCase(slug, trigger) {
    const project = getProject(slug);
    if (!modal || !modalContent || !project || typeof modal.showModal !== "function") return false;

    // Se o modal ainda estava fechando, o fechamento pendente é cancelado
    if (cancelPendingClose) cancelPendingClose();

    lastTrigger = trigger || null;
    restoreFocusOnClose = true;

    modalContent.innerHTML = buildCaseHtml(slug, project, "modal");
    initGallery(modalContent);

    modal.classList.remove("is-open");
    if (!modal.open) modal.showModal();
    modal.querySelector(".case-content").scrollTop = 0;
    document.documentElement.classList.add("case-open");

    // Duplo requestAnimationFrame: a posição inicial é pintada antes da transição de entrada
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modal.classList.add("is-open");
      });
    });
    return true;
  }

  function finishClose(onClosed) {
    if (!modal.open) return;
    const target = restoreFocusOnClose ? lastTrigger : null;
    modal.close();
    resetModalState();
    // Foco de volta ao elemento que abriu o estudo de caso (sem rolar a página)
    if (target && target.isConnected) target.focus({ preventScroll: true });
    lastTrigger = null;
    if (onClosed) onClosed();
  }

  function resetModalState() {
    document.documentElement.classList.remove("case-open");
    destroyGallery();
    modal.classList.remove("is-open");
    modalContent.innerHTML = "";
  }

  function closeCase(options) {
    if (!modal || !modal.open) return;
    if (options && options.restoreFocus === false) restoreFocusOnClose = false;
    const onClosed = options && options.onClosed;

    if (reduceMotion.matches || !modal.classList.contains("is-open")) {
      finishClose(onClosed);
      return;
    }

    modal.classList.remove("is-open");
    const panel = modal.querySelector(".case-panel");
    let timer = null;
    let done = false;

    function cleanup() {
      done = true;
      clearTimeout(timer);
      panel.removeEventListener("transitionend", onEnd);
      if (cancelPendingClose === cleanup) cancelPendingClose = null;
    }

    function finish() {
      if (done) return;
      cleanup();
      finishClose(onClosed);
    }

    function onEnd(e) {
      if (e.target === panel && e.propertyName === "opacity") finish();
    }

    cancelPendingClose = cleanup;
    panel.addEventListener("transitionend", onEnd);
    // Garante o fim do fechamento mesmo se a transição não disparar
    timer = setTimeout(finish, 400);
  }

  function initModal() {
    if (!modal || typeof modal.showModal !== "function") return;

    // Escape: o navegador dispara "cancel"; fechamos com animação em vez de fechar abruptamente
    modal.addEventListener("cancel", function (e) {
      e.preventDefault();
      closeCase();
    });

    modal.addEventListener("click", function (e) {
      // Clique no fundo (fora do painel) fecha o modal
      if (e.target === modal) {
        closeCase();
        return;
      }
      const closer = e.target.closest("[data-close-case]");
      if (!closer) return;

      if (closer.dataset.closeCase === "section") {
        // Link de ação: fecha o modal e, só então, leva o foco à seção de destino
        e.preventDefault();
        const hash = closer.getAttribute("href");
        closeCase({
          restoreFocus: false,
          onClosed: function () {
            const section = document.querySelector(hash);
            window.location.hash = hash;
            if (section) {
              section.setAttribute("tabindex", "-1");
              section.focus({ preventScroll: true });
            }
          }
        });
        return;
      }

      closeCase();
    });

    // Rede de segurança para fechamentos que não passem por finishClose (o evento é assíncrono,
    // por isso só limpa se o modal não tiver sido reaberto nesse meio-tempo)
    modal.addEventListener("close", function () {
      if (!modal.open) resetModalState();
    });

    // Links de projeto (cards, imagem em destaque) abrem o modal; sem JS seguem para a página de detalhes
    document.addEventListener("click", function (e) {
      const link = e.target.closest("a[data-project]");
      if (!link || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (openCase(link.dataset.project, link)) e.preventDefault();
    });
  }

  /* ---------- Carrossel de destaques do portfólio ---------- */
  let showcaseProject = null;

  function showProjectDetails(slug) {
    const panel = document.getElementById("showcase-details");
    const project = getProject(slug);
    if (!panel || !project) return;

    showcaseProject = slug;
    panel.querySelector(".showcase-details-cat").textContent = project.category;
    panel.querySelector(".showcase-details-title").textContent = project.title;
    panel.querySelector(".showcase-details-text").textContent = project.description;
    // Abre o cartão pela transição CSS, sem trocar display (evita saltos no layout)
    const wrap = document.getElementById("showcase-details-wrap");
    if (wrap) {
      wrap.inert = false;
      wrap.classList.add("is-open");
    }
  }

  function hideProjectDetails() {
    const wrap = document.getElementById("showcase-details-wrap");
    if (!wrap) return;
    wrap.classList.remove("is-open");
    wrap.inert = true;
  }

  function initShowcase() {
    const carousel = document.querySelector(".showcase-swiper");
    if (!carousel || typeof Swiper === "undefined") return;

    const swiper = new Swiper(carousel, {
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      spaceBetween: 24,
      speed: reduceMotion.matches ? 0 : 900,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      // Qualquer interação do usuário interrompe a passagem automática
      autoplay: reduceMotion.matches ? false : { delay: 4500, disableOnInteraction: true }
    });

    // Delegação de eventos: também funciona nos slides clonados pelo modo loop
    carousel.addEventListener("click", function (e) {
      const slide = e.target.closest(".showcase-slide");
      if (!slide) return;
      if (swiper.autoplay && swiper.autoplay.running) swiper.autoplay.stop();
      showProjectDetails(slide.dataset.project);
    });

    const openBtn = document.querySelector("[data-open-showcase]");
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        if (showcaseProject) openCase(showcaseProject, openBtn);
      });
    }

    const closeBtn = document.querySelector("[data-close-showcase]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        // Antes de tornar o painel inerte, o foco volta ao slide ativo do carrossel
        const active = carousel.querySelector(".swiper-slide-active");
        if (active) active.focus({ preventScroll: true });
        hideProjectDetails();
        if (swiper.autoplay && swiper.autoplay.start) swiper.autoplay.start();
      });
    }
  }

  /* ---------- Página de detalhes (portfolio-details.html) ---------- */
  function renderProjectPage() {
    const container = document.getElementById("project-content");
    if (!container) return;

    const slug = new URLSearchParams(window.location.search).get("p");
    const project = getProject(slug);
    const crumb = document.getElementById("crumb-title");

    if (!project) {
      container.innerHTML =
        '<div class="project-missing">' +
        "<h2>Projeto não encontrado</h2>" +
        '<p>O link pode estar incompleto. Volte à lista de projetos para escolher um trabalho.</p>' +
        '<a class="btn btn-primary" href="index.html#portfolio">Ver portfólio</a>' +
        "</div>";
      if (crumb) crumb.textContent = "Projeto não encontrado";
      document.title = "Projeto não encontrado | Mateus Natal";
      return;
    }

    document.title = project.title + " | Mateus Natal";
    if (crumb) crumb.textContent = project.title;
    container.innerHTML = '<article class="case-article">' + buildCaseHtml(slug, project, "page") + "</article>";
    initGallery(container);
  }

  /* ---------- Ano atual no rodapé ---------- */
  function setYear() {
    const el = document.getElementById("current-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Inicialização ---------- */
  function init() {
    initTheme();
    initModal();
    initShowcase();
    renderProjectPage();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
