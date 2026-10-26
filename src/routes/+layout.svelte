<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { u } from '$lib/url';

  let { children } = $props();

  const links = [
    { href: u('/'), label: 'Обзор' },
    { href: u('/problems/'), label: 'Проблемы' },
    { href: u('/solution/'), label: 'Что делать' },
    { href: u('/plan/'), label: 'План' },
    { href: u('/security/'), label: 'Защита' }
  ];

  const home = u('/');
  const isActive = (href) =>
    href === home ? $page.url.pathname === home : $page.url.pathname.startsWith(href);
</script>

<a class="skip" href="#main">К содержанию</a>

<header class="bar">
  <div class="bar__in wrap">
    <a class="brand" href={u('/')} aria-label="Сила Скилла, разбор CRM">
      <img
        class="brand__logo"
        src={u('/brand/sila-logo-white.svg')}
        alt="Сила Скилла"
        width="120"
        height="32"
      />
      <span class="brand__tag">разбор CRM</span>
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
    min-height: 44px;
  }

  .brand__logo {
    width: 112px;
    height: auto;
    display: block;
    flex: none;
  }

  .brand__tag {
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.8);
    padding-left: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    white-space: nowrap;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    color: #fff;
  }





  .nav {
    display: none;
    gap: 2px;
  }

  .nav__link {
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.8125rem;
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
    grid-template-columns: repeat(5, 1fr);
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
    .brand__tag {
      display: none;
    }

    .tabs__link {
      font-size: 0.6875rem;
      line-height: 1.15;
      padding: 0 2px;
    }

    .nav__link {
      padding: 8px 8px;
      font-size: 0.8125rem;
    }
  }
</style>
