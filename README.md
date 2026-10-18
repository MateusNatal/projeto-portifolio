# Portfólio pessoal – Mateus Natal

Site de portfólio com meus trabalhos em design gráfico, identidade visual, produtos promocionais e desenvolvimento web. Apresenta minha trajetória profissional, habilidades, serviços e formas de contato.

## Objetivo

Reunir em um só lugar os meus trabalhos e informações profissionais, facilitando o contato de clientes, empresas e recrutadores.

## Seções

- **Início**: apresentação com destaque para as áreas de atuação.
- **Sobre**: resumo profissional e dados de contato.
- **Habilidades**: principais ferramentas e linguagens utilizadas.
- **Currículo**: formação acadêmica, cursos técnicos e experiência profissional.
- **Portfólio**: projetos organizados por categoria (identidade visual, web, produtos e embalagens), com ampliação de imagem e página de detalhes.
- **Serviços**: design gráfico, front-end, back-end, desenvolvimento web e interfaces de aplicações.
- **Contato**: e-mail, WhatsApp, Instagram, Spotify, GitHub e LinkedIn.

## Funcionalidades

- Layout responsivo para celulares, tablets e desktops, com menu lateral que vira gaveta em telas menores.
- Modo claro e modo escuro, com a preferência salva no navegador. Na primeira visita, o site segue a configuração do sistema operacional.
- Filtros de projetos por categoria.
- Visualização ampliada das imagens dos projetos.
- Página de detalhes de cada projeto, carregada a partir do endereço (`portfolio-details.html?p=...`).
- Animações de entrada e barras de habilidades, sem bibliotecas adicionais de framework.

## Tecnologias

- HTML5 e CSS3
- JavaScript (vanilla)
- [Bootstrap 5](https://getbootstrap.com/) (grid e utilitários)
- [Bootstrap Icons](https://icons.getbootstrap.com/) e [Boxicons](https://boxicons.com/)
- [AOS](https://michalsnik.github.io/aos/), [GLightbox](https://github.com/biati-digital/glightbox), [Isotope](https://isotope.metafizzy.co/), [Typed.js](https://github.com/mattboldt/typed.js/), [Swiper](https://swiperjs.com/) e [PureCounter](https://github.com/srexi/purecounterjs)
- Fontes Google: Open Sans, Raleway e Poppins

Não há etapa de build: o site é estático e roda diretamente nos arquivos.

## Estrutura do projeto

```
index.html                  Página principal
portfolio-details.html      Página de detalhes dos projetos (preenchida por JavaScript)
assets/
  css/style.css             Estilos base
  css/custom.css            Identidade visual, tema claro/escuro e responsividade
  js/main.js                Navegação, filtros, animações e galeria
  js/site.js                Tema, dados dos projetos e página de detalhes
  img/                      Foto de perfil, imagem de fundo e fotos gerais
  img/portfolio/            Imagens otimizadas dos projetos
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
2. Adicione um bloco de projeto em `index.html`, dentro de `.portfolio-container`, usando uma das categorias existentes (`filter-identidade`, `filter-web`, `filter-produtos` ou `filter-embalagens`).
3. Adicione uma entrada no objeto `PROJECTS` em `assets/js/site.js`, com a mesma chave usada no parâmetro `?p=` do link.

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
