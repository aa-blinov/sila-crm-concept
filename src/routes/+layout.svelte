<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { u } from '$lib/url';

  let { children } = $props();

  const links = [
    { href: u('/'), label: 'Обзор' },
    { href: u('/problems/'), label: 'Проблемы' },
    { href: u('/solution/'), label: 'Что делать' },
    { href: u('/plan/'), label: 'План' }
  ];

  const home = u('/');
  const isActive = (href) =>
    href === home ? $page.url.pathname === home : $page.url.pathname.startsWith(href);
</script>

<a class="skip" href="#main">К содержанию</a>

<header class="bar">
  <div class="bar__in wrap">
    <a class="brand" href={u('/')} aria-label="Сила Скилла, разбор продукта">
      <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#ffffff" />
        <rect x="8" y="18" width="4" height="7" rx="1.2" fill="#2d68c4" opacity="0.5" />
        <rect x="14" y="13" width="4" height="12" rx="1.2" fill="#2d68c4" opacity="0.75" />
        <rect x="20" y="7" width="4" height="18" rx="1.2" fill="#2d68c4" />
        <circle cx="22" cy="7" r="2.2" fill="#e70314" />
      </svg>
      <span class="brand__text">
        <strong>СИЛА СКИЛЛА</strong>
        <span>разбор CRM</span>
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
  }

  .bar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: var(--blue);
  }

  .bar__in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 56px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    color: #fff;
  }

  .brand__mark {
    width: 28px;
    height: 28px;
    flex: none;
  }

  .brand__text {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    min-width: 0;
  }

  .brand__text strong {
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .brand__text span {
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.78);
    white-space: nowrap;
  }

  .nav {
    display: none;
    gap: 2px;
  }

  .nav__link {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.86);
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .nav__link:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }

  .nav__link[aria-current='page'] {
    background: #fff;
    color: var(--blue-deep);
  }

  main {
    padding-bottom: calc(76px + env(safe-area-inset-bottom));
  }

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
    background: #fff;
    border-top: 1px solid var(--line);
  }

  .tabs__link {
    display: grid;
    place-items: center;
    min-height: 44px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted);
    text-align: center;
  }

  .tabs__link[aria-current='page'] {
    color: var(--blue);
    background: var(--blue-wash);
  }

  @media (min-width: 720px) {
    .nav {
      display: flex;
    }

    .tabs {
      display: none;
    }

    main {
      padding-bottom: 24px;
    }
  }

  @media (max-width: 359px) {
    .brand__text span {
      display: none;
    }

    .tabs__link {
      font-size: 0.6875rem;
    }
  }
</style>
