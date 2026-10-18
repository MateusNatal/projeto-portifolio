/**
 * Funcionalidades do portfólio de Mateus Natal:
 * - alternância de tema claro/escuro (preferência salva no navegador)
 * - página de detalhe do projeto, preenchida a partir de PROJECTS
 * - ano atual no rodapé
 */
(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";

  /*
   * Dados dos projetos. A chave é o parâmetro ?p= usado nos links de portfolio-details.html.
   * "images" lista as imagens do projeto; a primeira é usada no card da listagem.
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
      description: "Identidade visual da Gabriel Marques Escola de Inglês, com logotipo com a bandeira dos Estados Unidos, variações de cor e aplicações em site, uniformes, banner de curso e sala de aula."
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
      description: "Identidade visual da Mix Economia, com logotipo de carrinho de compras e variações de cor, aplicado em fachada, loja, sacolas e uniforme."
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
      description: "Identidade visual, landing page e painéis de dashboard para a plataforma de análise de dados Analytica. A identidade usa logotipo, paleta de cores e tipografia aplicados em papelaria, uniformes e peças digitais."
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
      description: "Identidade visual e produtos do Haras Conceição: logotipo em placa de entrada, caneca, camisa e bolsa, com ilustração de cavalo e acabamento em tons escuros e dourados."
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
      description: "Placas de rua personalizadas com o nome da rua, o logotipo e os contatos do estabelecimento, apresentadas em mockup e na arte final. Exemplos: Drogaria Areal e Drogamaxi."
    },
    "placa-obra-floramar": {
      title: "Placa de obra – Floramar",
      category: "Placas",
      images: [
        "assets/img/portfolio/placa-obra-floramar-mockup.jpg",
        "assets/img/portfolio/placa-obra-floramar-arte.jpg"
      ],
      description: "Placa de identificação da obra Floramar, com os dados do projeto e do responsável técnico, apresentada em mockup no canteiro e na arte final."
    },
    "convite-casamento-lilian": {
      title: "Convite de casamento – Lilian e Paulo",
      category: "Impressos",
      images: [
        "assets/img/portfolio/convite-casamento-lilian-mockup.jpg",
        "assets/img/portfolio/convite-casamento-lilian-arte.jpg",
        "assets/img/portfolio/convite-casamento-lilian-cartao.jpg"
      ],
      description: "Convite de casamento com monograma e tipografia em serifa, impresso em papel de tom neutro e acompanhado de cartão complementar."
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
      description: "Cardápios para as marcas Delícias (açaí), Trinity Lounge e Toro, apresentados em mockup em bar e na arte final de cada página."
    },
    "amendoka-embalagens": {
      title: "Amendo'Ká – Embalagens",
      category: "Embalagens",
      images: [
        "assets/img/portfolio/amendoka-01-capa.jpg",
        "assets/img/portfolio/amendoka-02-rotulo.jpg",
        "assets/img/portfolio/amendoka-03-rotulo.jpg",
        "assets/img/portfolio/amendoka-04-rotulo.jpg"
      ],
      description: "Embalagens da Amendo'Ká, com rótulos para paçoca natural, de café e de chocolate, sem açúcar e sem glúten, apresentados em foto de produto e nos rótulos individuais."
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
      description: "Copos e lanyards personalizados para marcas, eventos e campanhas: Biri Drink, Cruzeiro, Palmeiras, Atlético, Wesley Gonzaga, Uma noite de Fluor, 4Play, Tardezinha e Vigora Telecom. Cada peça aparece em mockup e na arte final."
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
      description: "Peça de campanha para refeições prontas, com embalagens em destaque, chamada principal em tipografia forte e cores laranja e azul. Cinco variações do mesmo layout."
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
      description: "Material da Villa Smart Farm, loja de ordenhas inteligentes: logotipo, folheto de produtos, mockup do folheto e instruções de montagem e uso."
    }
  };

  /* ---------- Tema claro/escuro ---------- */
  function getTheme() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = theme === "dark";
    btn.querySelector("i").className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    btn.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
    btn.setAttribute("title", isDark ? "Modo claro" : "Modo escuro");
  }

  function initTheme() {
    applyTheme(getTheme());
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const next = getTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* armazenamento indisponível: o tema vale apenas nesta página */
      }
    });
  }

  /* ---------- Página de detalhe do projeto ---------- */
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderProject() {
    const container = document.getElementById("project-content");
    if (!container) return;

    const slug = new URLSearchParams(window.location.search).get("p");
    const project = slug && Object.prototype.hasOwnProperty.call(PROJECTS, slug) ? PROJECTS[slug] : null;

    if (!project) {
      container.innerHTML =
        '<div class="col-12"><div class="project-missing">' +
        "<h2>Projeto não encontrado</h2>" +
        '<p>O link pode estar incompleto. Volte à lista de projetos para escolher um trabalho.</p>' +
        '<a class="btn-get-started" href="index.html#portfolio">Ver portfólio</a>' +
        "</div></div>";
      document.getElementById("crumb-title").textContent = "Projeto não encontrado";
      document.title = "Projeto não encontrado | Mateus Natal";
      return;
    }

    document.title = project.title + " | Mateus Natal";
    document.getElementById("crumb-title").textContent = project.title;

    const gallery = project.images
      .map(function (src, index) {
        return (
          '<a class="project-image glightbox" href="' + escapeHtml(src) + '" data-gallery="project">' +
          '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(project.title) + (index > 0 ? " (imagem " + (index + 1) + ")" : "") + '" loading="' + (index === 0 ? "eager" : "lazy") + '">' +
          "</a>"
        );
      })
      .join("");

    container.innerHTML =
      '<div class="col-lg-8">' +
      '  <div class="project-gallery">' + gallery + "</div>" +
      "</div>" +
      '<div class="col-lg-4">' +
      '  <div class="portfolio-info">' +
      "    <h3>Informações</h3>" +
      "    <ul>" +
      "      <li><strong>Categoria</strong>: " + escapeHtml(project.category) + "</li>" +
      "    </ul>" +
      "  </div>" +
      '  <div class="portfolio-description">' +
      "    <h2>" + escapeHtml(project.title) + "</h2>" +
      "    <p>" + escapeHtml(project.description) + "</p>" +
      '    <a class="btn-get-started btn-small" href="index.html#contact">Falar sobre um projeto</a>' +
      "  </div>" +
      "</div>";

    if (window.GLightbox) {
      GLightbox({ selector: ".project-image" });
    }
  }


  /* ---------- Ano atual no rodapé ---------- */
  function setYear() {
    const el = document.getElementById("current-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Inicialização ---------- */
  function init() {
    initTheme();
    renderProject();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
