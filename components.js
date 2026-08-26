/**
 * portfolio-header — Web Component (sem Shadow DOM)
 *
 * Breakpoints extraídos do Figma (node: 52:5052):
 *   Desktop  → largura ≥ 1024px | h=80px | padding horizontal: 120px | links: About, Projects, Experience, Contact
 *   Tablet   → largura 768–1023px | h=72px | padding horizontal: 24px  | links: About, Projects, Experience, Contact
 *   Mobile   → largura < 768px   | h=64px | padding horizontal: 16px  | hamburger menu com overlay
 */

class PortfolioHeader extends HTMLElement {
  constructor() {
    super();
    this._menuOpen = false;
  }

  connectedCallback() {
    this.render();
    this._bindEvents();
  }

  get _isProjectPage() {
    const path = window.location.pathname;
    return !path.endsWith('index.html') && !path.endsWith('/') && path !== '';
  }

  // Links de navegação (Home page ou Sub-página)
  get _navLinks() {
    const prefix = this._isProjectPage ? 'index.html' : '';
    return [
      { label: 'About', href: `${prefix}#about` },
      { label: 'Projects', href: `${prefix}#projects` },
      { label: 'Experience', href: `${prefix}#experience` },
      { label: 'Contact', href: `${prefix}#contact` },
    ];
  }

  render() {
    const linksHTML = this._navLinks
      .map(link => `
        <li>
          <a href="${link.href}" class="navbar__link label-base">${link.label}</a>
        </li>`)
      .join('');

    this.innerHTML = `
      <nav class="navbar" id="main-nav" aria-label="Navegação principal">

        <!-- ── Desktop & Tablet ── -->
        <div class="navbar__inner">

          <!-- Logo -->
          <a href="index.html" class="navbar__logo" aria-label="Paulo Chiozzini — Home">
            <img
              src="assets/logo.png"
              alt="Logo Paulo Chiozzini"
              class="navbar__logo-img"
              width="28"
              height="28"
            />
            <span class="navbar__logo-name label-base">Paulo Chiozzini</span>
          </a>

          <!-- Links (desktop/tablet) -->
          <ul class="navbar__links" id="navbar-links" role="list">
            ${linksHTML}
          </ul>

          <!-- Hamburger (mobile only) -->
          <button
            class="navbar__hamburger"
            id="navbar-hamburger"
            aria-expanded="false"
            aria-controls="navbar-drawer"
            aria-label="Abrir menu"
          >
            <i class="ph ph-list" aria-hidden="true"></i>
          </button>
        </div>

        <!-- ── Mobile Drawer ── -->
        <div
          class="navbar__drawer"
          id="navbar-drawer"
          aria-hidden="true"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <ul class="navbar__drawer-links" role="list">
            ${this._navLinks.map(link => `
              <li class="navbar__drawer-item">
                <a href="${link.href}" class="navbar__drawer-link label-base">${link.label}</a>
              </li>`).join('')}
          </ul>
        </div>

      </nav>
    `;
  }

  _bindEvents() {
    const hamburger = this.querySelector('#navbar-hamburger');
    const drawer = this.querySelector('#navbar-drawer');
    const links = this.querySelectorAll('.navbar__drawer-link');

    hamburger?.addEventListener('click', () => this._toggleMenu());

    // Fechar ao clicar em um link do drawer
    links.forEach(link => {
      link.addEventListener('click', () => this._closeMenu());
    });

    // Fechar ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._menuOpen) this._closeMenu();
    });
  }

  _toggleMenu() {
    this._menuOpen ? this._closeMenu() : this._openMenu();
  }

  _openMenu() {
    this._menuOpen = true;
    const hamburger = this.querySelector('#navbar-hamburger');
    const drawer = this.querySelector('#navbar-drawer');
    const icon = hamburger?.querySelector('i');

    hamburger?.setAttribute('aria-expanded', 'true');
    hamburger?.setAttribute('aria-label', 'Fechar menu');
    drawer?.setAttribute('aria-hidden', 'false');
    drawer?.classList.add('navbar__drawer--open');
    icon?.classList.replace('ph-list', 'ph-x');
    document.body.style.overflow = 'hidden';
  }

  _closeMenu() {
    this._menuOpen = false;
    const hamburger = this.querySelector('#navbar-hamburger');
    const drawer = this.querySelector('#navbar-drawer');
    const icon = hamburger?.querySelector('i');

    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Abrir menu');
    drawer?.setAttribute('aria-hidden', 'true');
    drawer?.classList.remove('navbar__drawer--open');
    icon?.classList.replace('ph-x', 'ph-list');
    document.body.style.overflow = '';
  }
}

customElements.define('portfolio-header', PortfolioHeader);


/* ==========================================================================
   portfolio-footer — Web Component (sem Shadow DOM)
   Breakpoints extraídos do Figma (node: 152:7679):
     Desktop  ≥ 1024px → pb=48px, cards em linha, bottom-bar inline
     Tablet  768–1023px → pb=32px, cards em linha, bottom-bar inline
     Mobile   < 768px  → pb=24px, cards empilhados, bottom-bar em coluna
   ========================================================================== */

class PortfolioFooter extends HTMLElement {
  connectedCallback() {
    this.render();
    this._bindEvents();
  }

  render() {
    this.innerHTML = `
      <footer class="site-footer" id="contact" aria-label="Rodapé e contato">

        <!-- Headline CTA -->
        <div class="footer__cta">
          <i class="ph-duotone ph-handshake footer__cta-icon" aria-hidden="true"></i>
          <h2 class="footer__cta-title heading-h5-bold">Let's work together</h2>
          <p class="footer__cta-body body-base">
            I'm currently available for freelance projects and consulting opportunities.<br>
            Let's discuss how we can create something amazing together.
          </p>
        </div>

        <!-- Contact Cards -->
        <div class="footer__cards">

          <a
            href="mailto:paulo.chiozzini@gmail.com"
            class="footer__card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar e-mail para paulo.chiozzini@gmail.com"
          >
            <div class="footer__card-icon-wrap">
              <i class="ph-duotone ph-envelope-open" aria-hidden="true"></i>
            </div>
            <div class="footer__card-info">
              <span class="footer__card-label label-sm">Email</span>
              <span class="footer__card-value body-base">paulo.chiozzini@gmail.com</span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/paulochiozzini/"
            class="footer__card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar LinkedIn de Paulo Chiozzini"
          >
            <div class="footer__card-icon-wrap">
              <i class="ph-duotone ph-linkedin-logo" aria-hidden="true"></i>
            </div>
            <div class="footer__card-info">
              <span class="footer__card-label label-sm">LinkedIn</span>
              <span class="footer__card-value body-base">Let's connect</span>
            </div>
          </a>

          <a
            href="https://www.instagram.com/paulochz/"
            class="footer__card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar Instagram @paulochz"
          >
            <div class="footer__card-icon-wrap">
              <i class="ph-duotone ph-instagram-logo" aria-hidden="true"></i>
            </div>
            <div class="footer__card-info">
              <span class="footer__card-label label-sm">Instagram</span>
              <span class="footer__card-value body-base">@paulochz</span>
            </div>
          </a>

        </div>

        <!-- Bottom Bar -->
        <div class="footer__bottom">

          <!-- Author -->
          <div class="footer__author">
            <img
              src="assets/avatar.png"
              alt="Foto de Paulo Chiozzini"
              class="footer__author-avatar"
              width="21"
              height="21"
            />
            <span class="footer__author-name body-base">Paulo Chiozzini</span>
          </div>

          <!-- Back to top -->
          <button
            class="btn btn--subtle btn--sm footer__back-top"
            id="footer-back-top"
            aria-label="Voltar ao topo da página"
          >
            <i class="ph ph-arrow-line-up" aria-hidden="true"></i>
            Back to top
          </button>

          <!-- Copyright -->
          <p class="footer__copy body-sm">© 2026 Paulo Chiozzini</p>

        </div>

      </footer>
    `;
  }

  _bindEvents() {
    const backTop = this.querySelector('#footer-back-top');
    backTop?.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(0, 300);
    });
  }
}

customElements.define('portfolio-footer', PortfolioFooter);

/**
 * other-projects — Web Component para exibir cards de outros projetos
 * Filtra automaticamente o projeto atual passado pelo atributo current="..."
 */
const ALL_PORTFOLIO_PROJECTS = [
  {
    id: 'segsocial-domestic-employer',
    title: 'Domestic Employer Contributions Payment via MB WAY',
    url: 'project-segsocial-domestic-employer.html',
    thumbnailDesktop: 'assets/thumbnail-ss-domestic-employer.png',
    thumbnailDesktop2x: 'assets/thumbnail-ss-domestic-employer@2x.png',
    thumbnailMobile: 'assets/thumbnail-ss-domestic-employer-1.png',
    thumbnailMobile2x: 'assets/thumbnail-ss-domestic-employer@2x-1.png',
  },
  {
    id: 'segsocial-notifications',
    title: 'Portugal Social Security - Notifications of Late Payments',
    url: '#',
    thumbnailDesktop: 'assets/thumbnail-ss-notifications.png',
    thumbnailDesktop2x: 'assets/thumbnail-ss-notifications@2x.png',
    thumbnailMobile: 'assets/thumbnail-ss-notifications-1.png',
    thumbnailMobile2x: 'assets/thumbnail-ss-notifications@2x-1.png',
  },
  {
    id: 'pagbank',
    title: 'PagBank',
    url: '#',
    thumbnailDesktop: 'assets/thumbnail-pagbank.png',
    thumbnailDesktop2x: 'assets/thumbnail-pagbank@2x.png',
    thumbnailMobile: 'assets/thumbnail-pagbank-1.png',
    thumbnailMobile2x: 'assets/thumbnail-pagbank@2x-1.png',
  },
  {
    id: 'yamaha-liberacred',
    title: 'Yamaha Liberacred',
    url: '#',
    thumbnailDesktop: 'assets/thumbnail-yamaha-liberacred.png',
    thumbnailDesktop2x: 'assets/thumbnail-yamaha-liberacred@2x.png',
    thumbnailMobile: 'assets/thumbnail-yamaha-liberacred-1.png',
    thumbnailMobile2x: 'assets/thumbnail-yamaha-liberacred@2x-1.png',
  },
];

class OtherProjects extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get _currentProjectId() {
    return this.getAttribute('current') || '';
  }

  render() {
    const currentId = this._currentProjectId;
    const related = ALL_PORTFOLIO_PROJECTS.filter(p => p.id !== currentId);

    const cardsHTML = related.map(project => `
      <article class="related-project-card">
        <a href="${project.url}" class="related-project-card__link" aria-label="Ver projeto: ${project.title}">
          <picture class="related-project-card__picture">
            <source media="(min-width: 1024px)" srcset="${project.thumbnailDesktop} 1x, ${project.thumbnailDesktop2x} 2x">
            <img
              src="${project.thumbnailMobile}"
              srcset="${project.thumbnailMobile} 1x, ${project.thumbnailMobile2x} 2x"
              alt="Thumbnail do projeto ${project.title}"
              class="related-project-card__img"
              loading="lazy"
              width="384"
              height="224"
            />
          </picture>
          <div class="related-project-card__overlay" aria-hidden="true"></div>
        </a>
      </article>
    `).join('');

    this.innerHTML = `
      <section class="other-projects" aria-labelledby="other-projects-heading">
        <div class="other-projects__inner">
          <h2 id="other-projects-heading" class="other-projects__title">Check my other projects</h2>
          <div class="other-projects__grid">
            ${cardsHTML}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('other-projects', OtherProjects);


/* ==========================================================================
   Suavização de Scroll (300ms Ease-Out) para Ancoragens e Voltar ao Topo
   ========================================================================== */

/**
 * Executa animação de scroll vertical com duração e curva ease-out customizadas
 * @param {number} targetY - Posição Y de destino em pixels
 * @param {number} duration - Duração em ms (padrão 300ms)
 */
function smoothScrollTo(targetY, duration = 300) {
  const startY = window.scrollY || window.pageYOffset;
  const difference = targetY - startY;
  if (Math.abs(difference) < 1) return;

  const startTime = performance.now();

  // Curva Ease-Out Cubic: desacelera suavemente no final
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);

    window.scrollTo(0, startY + difference * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Intercepta todos os links internos de ancoragem (#) para aplicar o ease-out de 300ms
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href || href === '#') return;

  const targetEl = document.querySelector(href);
  if (!targetEl) return;

  e.preventDefault();

  // Desconta a altura da navbar fixa
  const navbar = document.querySelector('.navbar');
  const headerOffset = navbar ? navbar.offsetHeight : 80;
  const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = Math.max(0, elementPosition - headerOffset);

  smoothScrollTo(offsetPosition, 300);

  // Atualiza o hash da URL
  if (history.pushState) {
    history.pushState(null, '', href);
  }
});

/* ==========================================================================
   Image Lightbox Modal Controller
   ========================================================================== */
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal-target]');
  if (trigger) {
    // Modal de zoom só está ativo em resoluções de tablet para baixo (< 1024px)
    if (window.innerWidth >= 1024) return;

    const modalId = trigger.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    if (modal) {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    }
    return;
  }

  const closeBtn = e.target.closest('[data-modal-close]');
  if (closeBtn) {
    const modal = closeBtn.closest('dialog') || document.querySelector('dialog[open]');
    if (modal) {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
      document.body.style.overflow = '';
    }
  }
});

// Close modal on Escape key and restore scroll
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.querySelector('dialog[open]');
    if (modal) {
      document.body.style.overflow = '';
    }
  }
});

// Dialog native close event cleanup
document.querySelectorAll('dialog').forEach(modal => {
  modal.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
});


