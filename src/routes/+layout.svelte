<script>
  import '../app.css';
  import { page } from '$app/stores';

  let { children } = $props();

  const links = [
    { href: '/', label: 'Обзор' },
    { href: '/problems/', label: 'Проблемы' },
    { href: '/solution/', label: 'Решение' },
    { href: '/plan/', label: 'План' }
  ];

  const isActive = (href) =>
    href === '/' ? $page.url.pathname === '/' : $page.url.pathname.startsWith(href);
</script>

<a class="skip" href="#main">К содержанию</a>

<header class="bar">
  <div class="bar__in wrap">
    <a class="brand" href="/" aria-label="Сила Скилла, разбор продукта">
      <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#2d68c4" />
        <rect x="8" y="18" width="4" height="7" rx="1.4" fill="#fff" opacity="0.55" />
        <rect x="14" y="13" width="4" height="12" rx="1.4" fill="#fff" opacity="0.8" />
        <rect x="20" y="7" width="4" height="18" rx="1.4" fill="#fff" />
        <circle cx="22" cy="7" r="2.4" fill="#e70314" />
      </svg>
      <span class="brand__text">
        <strong>Сила Скилла</strong>
        <span>разбор и предложение</span>
      </span>
    </a>

    <nav class="nav" aria-label="Разделы">
      {#each links as link}
        <a href={link.href} class="nav__link" aria-current={isActive(link.href) ? 'page' : undefined}>
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="foot">
  <div class="wrap foot__in">
    <p>
      Предложение владельцу. Все цифры взяты из работающей системы 26 октября 2026.
      Данные клиентов не публикуются.
    </p>
    <p class="foot__meta">CRM: React, Strapi, пять серверов, одна база.</p>
  </div>
</footer>

<nav class="tabs" aria-label="Разделы">
  {#each links as link}
    <a href={link.href} class="tabs__link" aria-current={isActive(link.href) ? 'page' : undefined}>
      {link.label}
    </a>
  {/each}
</nav>

<style>
  .skip {
    position: absolute;
    left: -9999px;
  }

  .skip:focus {
    left: 16px;
    top: 12px;
    z-index: 50;
    background: #fff;
    padding: 10px 16px;
    border-radius: 8px;
    box-shadow: var(--shadow-2);
  }

  .bar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: color-mix(in srgb, var(--paper) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line-soft);
  }

  .bar__in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    height: 68px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .brand__mark {
    width: 32px;
    height: 32px;
    flex: none;
  }

  .brand__text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    min-width: 0;
  }

  .brand__text strong {
    font-family: var(--cond);
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .brand__text span {
    font-size: 0.75rem;
    color: var(--muted);
    white-space: nowrap;
  }

  .nav {
    display: none;
    gap: 4px;
  }

  .nav__link {
    padding: 9px 14px;
    border-radius: var(--r-pill);
    font-size: 0.9375rem;
    color: var(--ink-2);
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .nav__link:hover {
    color: var(--ink);
    background: #fff;
  }

  .nav__link[aria-current='page'] {
    background: var(--ink);
    color: #fff;
  }

  .foot {
    border-top: 1px solid var(--line);
    padding: 36px 0 calc(96px + env(safe-area-inset-bottom));
    background: var(--surface);
  }

  .foot__in {
    display: grid;
    gap: 10px;
    font-size: 0.875rem;
    color: var(--muted);
  }

  .foot__in p {
    max-width: 60ch;
  }

  .foot__meta {
    color: var(--muted);
  }

  /* нижние вкладки: телефон в руке, четыре раздела под большим пальцем */
  .tabs {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    padding: 6px 6px calc(6px + env(safe-area-inset-bottom));
    background: color-mix(in srgb, #fff 92%, transparent);
    backdrop-filter: blur(14px);
    border-top: 1px solid var(--line);
  }

  .tabs__link {
    display: grid;
    place-items: center;
    min-height: 46px;
    border-radius: 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--muted);
  }

  .tabs__link[aria-current='page'] {
    color: var(--blue-deep);
    background: var(--blue-wash);
  }

  @media (min-width: 720px) {
    .nav {
      display: flex;
    }

    .tabs {
      display: none;
    }

    .foot {
      padding-bottom: 36px;
    }
  }
</style>
