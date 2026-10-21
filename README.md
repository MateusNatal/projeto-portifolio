# Portfólio pessoal – Mateus Natal

Site de portfólio com meus trabalhos em design gráfico, identidade visual, produtos personalizados e desenvolvimento web. Apresenta minha trajetória profissional, habilidades, serviços e formas de contato.

## Objetivo

Reunir em um só lugar os meus trabalhos e informações profissionais, facilitando o contato de clientes, empresas e recrutadores.

## Seções

- **Início**: apresentação com o nome, a área de atuação e botões para o portfólio e para o contato.
- **Sobre**: resumo profissional e dados de contato.
- **Habilidades**: ferramentas e competências agrupadas por especialidade, com onde cada grupo aparece nos projetos.
- **Currículo**: resumo, experiência profissional e formação.
- **Portfólio**: destaques em carrossel, filtros por categoria e estudo de caso de cada projeto (em janela ou em página própria).
- **Serviços**: design gráfico e impressos, identidade visual, desenvolvimento de sites e aplicações e automações.
- **Contato**: WhatsApp e e-mail em destaque, redes sociais como canais secundários e mapa de Belo Horizonte.

## Funcionalidades

- Barra lateral fixa com o menu no computador; em telas menores, uma barra superior com menu em gaveta (fecha com Escape ou ao tocar fora).
- A seção atual fica destacada no menu enquanto você rola a página.
- Tema escuro por padrão, com alternância para o tema claro. A escolha fica salva no navegador.
- Filtros de projetos por categoria, com transição suave.
- Estudo de caso em janela (modal) com galeria de imagens, navegação por teclado e foco gerenciado. Também acessível em página própria (`portfolio-details.html?p=...`).
- Animações discretas de entrada, com respeito à preferência de movimento reduzido do sistema.
- Mapa do Google Maps incorporado na seção de contato (incorporação pública, sem chave de API).

## Tecnologias

- HTML5 e CSS3
- JavaScript (vanilla)
- [Bootstrap 5](https://getbootstrap.com/) (grid e utilitários)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Swiper](https://swiperjs.com/) (carrossel de destaques e galeria dos projetos)
- Fontes Google: Poppins e Open Sans

Não há etapa de build: o site é estático e roda diretamente nos arquivos.

## Estrutura do projeto

```
index.html                  Página principal (inclui o modal de estudo de caso)
portfolio-details.html      Página de detalhes dos projetos (preenchida por JavaScript)
assets/
  css/style.css             Estrutura: barra lateral, menu móvel, seções e rodapé
  css/custom.css            Identidade visual: cores (tokens de tema), componentes e responsividade
  js/main.js                Menu, seção atual, filtros, revelação ao rolar e botão de voltar ao topo
  js/site.js                Tema, dados dos projetos (PROJECTS), destaques, modal e página de detalhes
  img/                      Foto de perfil, imagens gerais e favicon
  img/portfolio/            Imagens dos projetos
  vendor/                   Bibliotecas de terceiros
```

## Como executar localmente

Pré-requisitos: qualquer navegador moderno. Opcionalmente, Node.js para servir a pasta localmente.

Opção 1 – abrir diretamente: dê dois cliques em `index.html`.

Opção 2 – servidor local (recomendado, pois evita restrições do navegador ao carregar arquivos locais):

```bash
# na pasta do projeto
npx serve .
# ou, se tiver Python instalado
python -m http.server 8000
```

Depois acesse `http://localhost:3000` (serve) ou `http://localhost:8000` (Python).

## Adicionando um projeto

1. Otimize a imagem (recomendado: largura de 1200 px, formato JPG ou WebP) e salve em `assets/img/portfolio/`, com um nome descritivo em minúsculas e sem espaços, por exemplo `cliente-logo.jpg`.
2. Adicione um bloco `<article class="portfolio-item">` em `index.html`, dentro de `#portfolio-grid`. O atributo `data-cat` define as categorias do filtro, separadas por espaço: `identidade`, `web`, `produtos`, `embalagens`, `impressos` ou `placas`. Use `data-featured` para exibir o selo "Destaque". Em logotipos e artes quadradas, marque a miniatura com `data-fit="contain"` (a imagem aparece inteira); fotos e mockups usam o recorte padrão.
3. Adicione uma entrada no objeto `PROJECTS` em `assets/js/site.js`, com a mesma chave usada no parâmetro `?p=` do link (`data-project`).

Campos do `PROJECTS`:

- **Obrigatórios:** `title`, `category`, `images` (lista de caminhos), `description` (contexto e objetivo) e `role` (minha contribuição).
- **Opcionais** (o bloco só aparece no estudo de caso quando preenchido): `problem` (problema ou necessidade), `solution` (conceito e solução), `process` (lista de etapas), `tools` (lista de ferramentas), `results` (resultado), `learnings` (aprendizados) e `links` (lista de `{ label, url }` para o projeto ou o código).

Preencha apenas informações verdadeiras. Campos ausentes simplesmente não são exibidos.

## Publicação no GitHub Pages

O site é publicado a partir do repositório no GitHub. O GitHub Pages publica os arquivos estáticos do repositório, sem processamento adicional.

Para atualizar o site publicado:

```bash
git add .
git commit -m "Atualiza o portfólio"
git push origin <branch-de-publicacao>   # substitua pela branch configurada em Settings → Pages
```

Confira em **Settings → Pages** no repositório qual é a origem da publicação:

- **Deploy from a branch**: o GitHub publica automaticamente a pasta raiz da branch configurada (por exemplo, `main` / `/ (root)`). Após o `push`, aguarde alguns minutos.
- **GitHub Actions**: a publicação depende do workflow configurado em `.github/workflows`. Confira a aba **Actions** após o `push`.

Os caminhos usados no site são relativos (por exemplo, `assets/css/style.css`), então o site funciona tanto na raiz de um domínio quanto em um subcaminho do GitHub Pages.

## Contato

- E-mail: mateusdaniel99@gmail.com
- WhatsApp: +55 (31) 9 9507-6206
- Instagram: [@mateusdiasnatal](https://www.instagram.com/mateusdiasnatal/)
- GitHub: [github.com/MateusNatal](https://github.com/MateusNatal)
- LinkedIn: [linkedin.com/in/mateus-natal](https://www.linkedin.com/in/mateus-natal/)
- Spotify: [Mateus Natal](https://open.spotify.com/user/gl5842yqh6wpzvgr99jpq20lp)
