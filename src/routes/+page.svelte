<script>
  import { u } from '$lib/url';
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
        Данные в порядке, система собрана правильно. Проблемы в другом месте.
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
        Так выглядит вход в CRM с основного адреса. Это не медленная загрузка: страница
        сама выбирает сервер и уводит на другой домен. В моём прогоне ушла на c0.sila-crm.ru.
      </figcaption>
    </figure>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <h2 class="lead">Самое дорогое — не вход</h2>
    <p class="prose">
      Вход раздражает, но денег стоит другое. В системе 4 490 абонементов, и чтобы найти
      клиента с истёкшим, нужно листать 225 страниц без единого фильтра. Отчёт показывает
      «не продлили 30» по залу, но не показывает, кто эти тридцать и что с ними делать.
      Автоматика создаёт задачу «нет абонемента», и она теряется среди 160 других.
    </p>
    <p class="prose">
      Одно продление безлимита — 55 000 ₽. Три возвращённых клиента в месяц закрывают
      работу над этим с запасом. Поэтому в плане первой идёт не разработка приложений,
      а видимость продлений.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Как читать дальше</h2>
    <ol class="route">
      <li>
        <a href={u('/problems/')}>
          <span class="route__n">Разбор</span>
          <span class="route__t">Пять проблем по убыванию цены. С экранами и оценкой работ.</span>
        </a>
      </li>
      <li>
        <a href={u('/solution/')}>
          <span class="route__n">Что делать</span>
          <span class="route__t">В том же порядке: сначала вход и продления, потом приложения.</span>
        </a>
      </li>
      <li>
        <a href={u('/plan/')}>
          <span class="route__n">План</span>
          <span class="route__t">Этапы, ворота перед разработкой приложений и арифметика.</span>
        </a>
      </li>
    </ol>
  </div>
</section>

<style>
  .hero {
    padding: clamp(24px, 5vw, 56px) 0 clamp(16px, 3vw, 28px);
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

  .lead {
    margin-bottom: 16px;
  }

  .prose {
    color: var(--ink-2);
    max-width: 64ch;
  }

  .prose + .prose {
    margin-top: 14px;
  }

  .route {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .route a {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 8px 20px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
    align-items: baseline;
  }

  .route__n {
    font-family: var(--cond);
    font-size: 1.0625rem;
    font-weight: 700;
  }

  .route__t {
    color: var(--ink-2);
    font-size: 0.9375rem;
  }

  .route a:hover .route__n {
    color: var(--blue-deep);
  }

  @media (max-width: 560px) {
    .route a {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }

  @media (min-width: 900px) {
    .hero__grid {
      grid-template-columns: 0.95fr 1.05fr;
      gap: clamp(32px, 5vw, 64px);
    }
  }
</style>
