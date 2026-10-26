<script>
  import { u } from '$lib/url';

  const findings = [
    {
      title: 'Вход уводит на другой домен',
      text: 'Основной адрес не открывает CRM. Он замеряет пять серверов и перекидывает на самый быстрый. Сессия остаётся на прежнем сервере, поэтому после перекидывания пароль приходится вводить заново. Если быстрее всех окажется главный сервер, страница перекинет на саму себя.'
    },
    {
      title: 'Часть карточек клиентов не открывается',
      text: 'Вместо карточки белый лист: ни сообщения, ни кнопки. Причина в одной строке кода, которой не хватает проверки на пустое имя. Таких записей 96. Общей защиты от подобных сбоев в приложении нет, поэтому любая мелочь в данных даёт пустоту.'
    },
    {
      title: 'Продление абонемента не управляется',
      text: 'Чтобы найти клиента с истёкшим абонементом, нужно листать 225 страниц без единого фильтра. Отчёт показывает «не продлили 30» по залу, но не показывает, кто эти 30 и что с ними делать. Задача «нет абонемента» создаётся автоматически и теряется среди 160 других.'
    }
  ];
</script>

<svelte:head>
  <title>Сила Скилла: разбор CRM и план работ</title>
  <meta
    name="description"
    content="Разбор работающей CRM сети детских спортшкол: что нашли, что предлагаем и в каком порядке. С цифрами из системы."
  />
</svelte:head>

<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1>
        <span>Пять серверов.</span>
        <span>Один вход.</span>
      </h1>
      <p class="lede">
        Разобрал CRM «Сила Скилла» целиком: пять серверов, тридцать экранов, 1 832 клиента.
        Ниже то, что нашёл, и порядок, в котором это стоит чинить.
      </p>
      <p class="hero__links">
        <a href={u('/problems/')}>Что ещё нашёл</a>
        <span aria-hidden="true">·</span>
        <a href={u('/plan/')}>План и сроки</a>
      </p>
    </div>

    <figure class="shot">
      <div class="shot__frame">
        <img
          src={u('/shots/chooser.webp')}
          alt="Страница с индикатором загрузки и надписью «Загрузка»"
          width="1280"
          height="800"
          decoding="async"
        />
      </div>
      <figcaption>
        Основной адрес CRM. Это не ошибка сети и не долгая загрузка: страница сама выбирает
        сервер и уводит на другой домен. В моём прогоне ушла на c0.sila-crm.ru.
      </figcaption>
    </figure>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap prose">
    <p>
      Система собрана правильно: одна база на пять серверов, данные на всех совпадают,
      файлы доступны отовсюду. Переписывать нечего. Ломается вход, и не хватает одной вещи,
      которая приносит деньги: видимости продлений.
    </p>
  </div>
</section>

<section class="section findings">
  <div class="wrap">
    <h2>Что именно не работает</h2>
    <ol class="findings__list">
      {#each findings as f}
        <li>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </li>
      {/each}
    </ol>
    <p class="findings__more">
      Все находки с ценой каждой, экранами и оценкой работ: <a href={u('/problems/')}>разбор</a>.
      Что предлагаю и в каком порядке: <a href={u('/plan/')}>план</a>.
    </p>
  </div>
</section>

<style>
  .hero {
    padding: clamp(24px, 5vw, 56px) 0 clamp(20px, 3vw, 32px);
  }

  .hero__grid {
    display: grid;
    gap: clamp(24px, 4vw, 44px);
    align-items: start;
  }

  .hero__text {
    display: grid;
    gap: 18px;
    align-content: start;
  }

  .hero h1 {
    font-size: clamp(2rem, 5.2vw, 3.2rem);
    line-height: 1.02;
  }

  .hero h1 span {
    display: block;
  }

  .hero__links {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9375rem;
    color: var(--muted);
  }

  .hero__links a {
    color: var(--ink);
    border-bottom: 1px solid var(--ink);
    padding-bottom: 1px;
  }

  .hero__links a:hover {
    color: var(--blue-deep);
    border-color: var(--blue-deep);
  }

  /* настоящий экран вместо нарисованной схемы */
  .shot {
    margin: 0;
    display: grid;
    gap: 12px;
  }

  .shot__frame {
    border: 1px solid var(--line);
    border-radius: var(--r-md);
    overflow: hidden;
    background: #fff;
    box-shadow: var(--shadow-1);
  }

  .shot__frame img {
    display: block;
    width: 100%;
    height: auto;
  }

  .shot figcaption {
    font-size: 0.8125rem;
    color: var(--muted);
    line-height: 1.5;
    max-width: 52ch;
  }

  .prose p {
    max-width: 62ch;
    color: var(--ink-2);
    font-size: var(--step-1);
    line-height: 1.55;
  }

  .findings h2 {
    margin-bottom: clamp(18px, 3vw, 26px);
  }

  .findings__list {
    list-style: none;
    counter-reset: f;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .findings__list li {
    counter-increment: f;
    display: grid;
    gap: 8px;
    padding: clamp(20px, 3vw, 28px) 0;
    border-bottom: 1px solid var(--line);
  }

  .findings__list h3 {
    font-family: var(--sans);
    font-size: var(--step-2);
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  .findings__list h3::before {
    content: counter(f) '. ';
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .findings__list p {
    color: var(--ink-2);
    max-width: 64ch;
  }

  .findings__more {
    margin-top: 22px;
    font-size: 0.9375rem;
    color: var(--muted);
    max-width: 64ch;
  }

  .findings__more a {
    color: var(--ink);
    border-bottom: 1px solid var(--line);
  }

  .findings__more a:hover {
    border-color: var(--ink);
  }

  @media (min-width: 900px) {
    .hero__grid {
      grid-template-columns: 0.95fr 1.05fr;
      gap: clamp(32px, 5vw, 64px);
    }
  }
</style>
