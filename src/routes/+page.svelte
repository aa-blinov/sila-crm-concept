<script>
  import { u } from '$lib/url';
  let mode = $state('now');
  let cursor = $state(-1);
  let tries = $state(0);
  let lost = $state(0);
  let running = $state(false);
  let result = $state(null);

  const nodes = ['sila-crm.ru', 'c0', 'c1', 'c2', 'c3'];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function run() {
    if (running) return;
    running = true;
    result = null;

    for (let i = 0; i < 11; i++) {
      cursor = Math.floor(Math.random() * nodes.length);
      await sleep(45 + i * 9);
    }

    const idx = mode === 'now' ? (Math.random() < 0.22 ? 0 : 1 + Math.floor(Math.random() * 4)) : 0;
    cursor = idx;
    tries += 1;

    if (mode === 'now') {
      if (idx === 0) {
        result = { kind: 'loop', note: 'Перебросило на ту же страницу. По кругу.' };
      } else {
        lost += 1;
        result = { kind: 'lost', note: 'Сессия осталась на другом сервере. Пароль заново.' };
      }
    } else {
      result = { kind: 'ok', note: 'Один адрес. Сессия на месте.' };
    }
    running = false;
  }

  function switchMode(next) {
    mode = next;
    result = null;
    cursor = -1;
  }

  const facts = [
    {
      title: 'Система собрана правильно',
      text: 'Одна база, пять серверов, общее хранилище файлов. Данные на всех серверах совпадают. Переписывать нечего.'
    },
    {
      title: 'Ломается вход',
      text: 'Основной адрес не открывает CRM, а выбирает сервер за сотрудника. Отсюда разлогины, циклы и ссылки на оплату, которые не открываются.'
    },
    {
      title: 'Деньги не видны',
      text: 'Чтобы найти клиента с истёкшим абонементом, нужно листать 225 страниц без фильтров. Отчёт говорит «не продлили 30», но не говорит, кто эти 30.'
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
        <span>Ноль предсказуемости.</span>
      </h1>
      <p class="lede">
        Разобрали CRM «Сила Скилла» целиком: пять серверов, тридцать экранов, 1 832 клиента.
        Вот что нашли и что предлагаем делать.
      </p>
      <div class="hero__actions">
        <a class="btn btn--primary" href={u('/problems/')}>Что нашли</a>
        <a class="btn btn--ghost" href={u('/plan/')}>План работ</a>
      </div>
    </div>

    <div class="demo" aria-labelledby="demo-title">
      <div class="demo__head">
        <span class="demo__dot" aria-hidden="true"></span>
        <h2 id="demo-title">Как устроен вход</h2>
        <div class="demo__switch" role="group" aria-label="Режим схемы">
          <button
            type="button"
            class:on={mode === 'now'}
            onclick={() => switchMode('now')}
            aria-pressed={mode === 'now'}>Сейчас</button
          >
          <button
            type="button"
            class:on={mode === 'fixed'}
            onclick={() => switchMode('fixed')}
            aria-pressed={mode === 'fixed'}>После правки</button
          >
        </div>
      </div>

      <ul class="demo__nodes" aria-hidden="true">
        {#each nodes as node, i}
          <li class:hot={cursor === i}>{node}</li>
        {/each}
      </ul>

      <div class="demo__stage">
        {#if result}
          <p class="demo__node" class:demo__node--bad={result.kind !== 'ok'}>
            {result.kind === 'loop' ? 'sila-crm.ru' : mode === 'now' ? nodes[cursor] : 'sila-crm.ru'}
          </p>
          <p class="demo__note">{result.note}</p>
        {:else}
          <p class="demo__node demo__node--idle">{running ? 'выбираем…' : 'нажмите «Войти»'}</p>
          <p class="demo__note">
            {mode === 'now'
              ? 'Сервер выбирается заново при каждом входе'
              : 'Адрес один, выбирать нечего'}
          </p>
        {/if}
      </div>

      <div class="demo__foot">
        <button class="btn btn--primary demo__btn" type="button" onclick={run} disabled={running}>
          Войти
        </button>
        <dl class="demo__stats">
          <div><dt>входов</dt><dd>{tries}</dd></div>
          <div><dt>{mode === 'now' ? 'потеряно сессий' : 'сохранено сессий'}</dt><dd>{mode === 'now' ? lost : tries}</dd></div>
        </dl>
      </div>

      <p class="demo__caption">Схема работы диспетчера, не настоящий вход в систему.</p>
    </div>
  </div>
</section>

<section class="section facts">
  <div class="wrap">
    <h2>Три вывода из аудита</h2>
    <ol class="facts__list">
      {#each facts as fact}
        <li class="facts__item">
          <div>
            <h3>{fact.title}</h3>
            <p>{fact.text}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="section next">
  <div class="wrap">
    <h2>Что внутри</h2>
    <ul class="next__list">
      <li>
        <a href={u('/problems/')}>
          <span class="next__label">Проблемы</span>
          <span class="next__desc">Шесть находок с ценой каждой. Что ломает работу и сколько это стоит в деньгах и доверии.</span>
          <span class="next__arrow" aria-hidden="true">→</span>
        </a>
      </li>
      <li>
        <a href={u('/solution/')}>
          <span class="next__label">Решение</span>
          <span class="next__desc">Три сборки вместо четырёх, геймификация без рейтингов, метрики, которые считаются из текущих данных.</span>
          <span class="next__arrow" aria-hidden="true">→</span>
        </a>
      </li>
      <li>
        <a href={u('/plan/')}>
          <span class="next__label">План</span>
          <span class="next__desc">Этапы со сроками, ворота перед разработкой приложений и арифметика на ваших цифрах.</span>
          <span class="next__arrow" aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  </div>
</section>

<style>
  .hero {
    padding: clamp(24px, 5vw, 48px) 0 clamp(24px, 4vw, 44px);
  }

  .hero__grid {
    display: grid;
    gap: clamp(28px, 5vw, 44px);
    align-items: start;
  }

  .hero__text {
    display: grid;
    gap: 20px;
  }

  .hero h1 {
    font-size: clamp(2rem, 5.2vw, 3.2rem);
    line-height: 1.02;
  }

  .hero h1 span {
    display: block;
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 4px;
  }

  /* ---------- схема входа ---------- */
  .demo {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-2);
    padding: 18px;
    display: grid;
    gap: 16px;
  }

  .demo__head {
    display: flex;
    align-items: center;
    gap: 8px 10px;
    flex-wrap: wrap;
  }

  .demo__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--red);
    flex: none;
  }

  .demo__head h2 {
    font-family: var(--sans);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0;
    flex: 1 1 150px;
  }

  .demo__switch {
    margin-left: auto;
  }

  .demo__switch {
    display: inline-flex;
    padding: 3px;
    background: var(--paper);
    border-radius: var(--r-pill);
    border: 1px solid var(--line-soft);
  }

  .demo__switch button {
    border: 0;
    background: transparent;
    padding: 7px 12px;
    border-radius: var(--r-pill);
    font: 500 0.75rem/1 var(--sans);
    color: var(--muted);
    cursor: pointer;
    min-height: 30px;
  }

  .demo__switch button.on {
    background: var(--ink);
    color: #fff;
  }

  .demo__nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .demo__nodes li {
    padding: 6px 10px;
    border-radius: var(--r-pill);
    border: 1px solid var(--line);
    font-size: 0.75rem;
    color: var(--muted);
    transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
    font-variant-numeric: tabular-nums;
  }

  .demo__nodes li.hot {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
  }

  .demo__stage {
    display: grid;
    gap: 4px;
    padding: 14px 16px;
    background: var(--paper);
    border-radius: var(--r-md);
    min-height: 92px;
    align-content: center;
  }

  .demo__node {
    font-family: var(--cond);
    font-size: clamp(1.5rem, 5vw, 1.9rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
  }

  .demo__node--idle {
    color: var(--muted);
    font-size: 1.25rem;
    font-family: var(--sans);
    font-weight: 400;
  }

  .demo__node--bad {
    color: var(--red);
  }

  .demo__note {
    font-size: 0.8125rem;
    color: var(--muted);
  }

  .demo__foot {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .demo__btn {
    flex: 1;
    min-width: 140px;
  }

  .demo__btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .demo__stats {
    display: flex;
    gap: 18px;
    margin: 0;
  }

  .demo__stats dt {
    font-size: 0.6875rem;
    color: var(--muted);
    text-transform: lowercase;
  }

  .demo__stats dd {
    margin: 0;
    font-family: var(--cond);
    font-size: 1.25rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .demo__caption {
    font-size: 0.75rem;
    color: var(--muted);
  }

  /* ---------- выводы ---------- */
  .facts {
    padding-top: clamp(12px, 2.5vw, 28px);
  }

  .facts h2 {
    margin-bottom: clamp(20px, 3vw, 32px);
  }

  .facts__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0;
    border-top: 1px solid var(--line);
  }

  .facts__item {
    display: grid;
    gap: clamp(16px, 3vw, 28px);
    padding: clamp(22px, 3.5vw, 34px) 0;
    border-bottom: 1px solid var(--line);
    align-items: start;
  }

  .facts__item h3 {
    margin-bottom: 8px;
  }

  .facts__item p {
    color: var(--ink-2);
    max-width: 60ch;
  }

  /* ---------- навигация ---------- */
  .next h2 {
    margin-bottom: clamp(20px, 3vw, 30px);
  }

  .next__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .next__list a {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'label arrow' 'desc desc';
    gap: 6px 16px;
    padding: clamp(18px, 3vw, 26px) 0;
    border-bottom: 1px solid var(--line);
    transition: color 0.15s ease;
  }

  .next__list a:hover {
    color: var(--blue-deep);
  }

  .next__label {
    grid-area: label;
    font-family: var(--cond);
    font-size: var(--step-3);
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .next__desc {
    grid-area: desc;
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 62ch;
  }

  .next__arrow {
    grid-area: arrow;
    align-self: center;
    font-size: 1.25rem;
    color: var(--muted);
  }

  @media (min-width: 900px) {
    .hero__grid {
      grid-template-columns: 1.05fr 0.95fr;
      align-items: center;
    }

    .next__list a {
      grid-template-columns: 220px 1fr auto;
      grid-template-areas: 'label desc arrow';
      align-items: center;
    }
  }
</style>
