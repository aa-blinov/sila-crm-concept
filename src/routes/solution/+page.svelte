<script>
  import { u } from '$lib/url';
  const roles = [
    {
      name: 'Тренер',
      count: '12 человек',
      what: 'Отдельная сборка. Работает без интернета, отметка посещения в один тап, навыки из списка проекта, три экрана вместо календаря на сутки.'
    },
    {
      name: 'Семья',
      count: '858 родителей, 1 800 детей',
      what: 'Одна сборка на двоих. Родитель видит расписание, абонемент и прогресс. Ребёнок входит в детский режим с того же телефона: уровни, значки, витрина.'
    },
    {
      name: 'Владелец',
      count: '3 человека',
      what: 'Не приложение, а экран с шестью цифрами. Ставить PWA ради трёх человек незачем.'
    }
  ];

  const rules = [
    ['Личный прогресс, не соревнование', 'Чужих баллов нет в системе вообще. Сравнение только с собой в прошлом месяце.'],
    ['Ничего не сгорает', 'Уровень не понижается, баллы не истекают, дедлайнов нет. Пропуск по болезни не становится наказанием.'],
    ['Возвращение важнее серии', 'Отдельный значок и +10 баллов за возврат после двух недель перерыва. Это единственная механика, которая прямо работает на удержание.'],
    ['Восемь из десяти баллов начисляются сами', 'Если тренер ничего не нажал, ребёнок всё равно получает +10 за тренировку.']
  ];

  const metrics = [
    ['Доля продлений', 'Из тех, у кого абонемент закончился в этом месяце, сколько оформили новый за 30 дней.'],
    ['Посещаемость', 'Визитов на ребёнка в неделю и доля пропусков. Реагирует через две недели, раньше продлений.'],
    ['Охват начислениями', 'Доля детей, получивших хотя бы один балл за 28 дней. Цель 85 процентов.']
  ];
</script>

<svelte:head>
  <title>Что делать: вход, продления, приложения</title>
  <meta name="description" content="Порядок работ: сначала один адрес и экран «кому продлевать», потом приложения для тренера и семьи, геймификация и метрики." />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>Что делать</h1>
    <p class="lede">
      Систему не переписываем: база, данные и схема остаются. Порядок тот же, что в разборе:
      сначала вход и продления, потом приложения.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Сначала вход и продления</h2>
    <p class="band__lede">
      Четыре правки закрывают то, что стоит денег, доверия и безопасности. Ни одна не требует
      переписывать систему. Сроки рассчитаны с 30 октября.
    </p>
    <ol class="fix">
      <li>
        <h3>Один адрес вместо пяти</h3>
        <p>Сотрудник входит туда, куда вошёл: сессия не теряется, ссылки клиентам уходят с одного домена.</p>
        <span class="fix__time">3 дня</span>
      </li>
      <li>
        <h3>Экран «кому продлевать»</h3>
        <p>Список с фильтром по залу и сортировкой по сроку, кнопка написать. Плюс фильтры в задачах.</p>
        <span class="fix__time">2 недели</span>
      </li>
      <li>
        <h3>Карточки перестают падать</h3>
        <p>Проверка на пустое имя и общая защита страниц: вместо белого листа сообщение и кнопка.</p>
        <span class="fix__time">6 часов</span>
      </li>
      <li>
        <h3>Файлы закрыты, клиенты видны</h3>
        <p>Фотографии и документы перестают быть доступны посторонним. Список клиентов закрываем вместе с экраном продлений: там проверяются те же страницы кабинета.</p>
        <span class="fix__time">5 дней</span>
      </li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Потом приложения: тренер и семья</h2>
    <ul class="roles">
      {#each roles as role}
        <li>
          <div class="roles__head">
            <h3>{role.name}</h3>
            <span class="roles__count">{role.count}</span>
          </div>
          <p>{role.what}</p>
        </li>
      {/each}
    </ul>
    <p class="note">
      Почему семья одной сборкой: у детей 5–14 лет обычно нет своего телефона и почты.
      Отдельный вход ребёнку не нужен, а отдельное приложение удваивает стоимость каждой
      будущей правки.
    </p>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <h2>Геймификация без рейтингов</h2>
    <p class="band__lede">
      В CRM уже есть основа: уровни 1–4 с цветами, навыки по группам, баллы. Не хватает
      журнала начислений и понятной шкалы: сейчас на публичной странице «48 / 79, до
      следующего 11», а 48 плюс 11 не равно 79.
    </p>
    <ul class="rules">
      {#each rules as rule}
        <li>
          <h3>{rule[0]}</h3>
          <p>{rule[1]}</p>
        </li>
      {/each}
    </ul>
    <p class="after">
      Цифры: посещение даёт +10 автоматически, навык +15 и не больше двух в неделю,
      возвращение после перерыва +10. Самая дешёвая награда стоит 30 баллов, то есть
      три тренировки.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Что меряем</h2>
    <p class="lede">
      Ни одной метрики удержания в системе сейчас нет. Все три считаются из данных,
      которые уже лежат в базе.
    </p>
    <ol class="metrics">
      {#each metrics as m}
        <li>
          <h3>{m[0]}</h3>
          <p>{m[1]}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .head {
    padding: clamp(32px, 7vw, 64px) 0 clamp(20px, 4vw, 32px);
  }

  .head h1 {
    margin-bottom: 18px;
  }

  .section h2 {
    margin-bottom: clamp(20px, 3vw, 28px);
  }

  .roles {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .roles li {
    padding: clamp(20px, 3vw, 28px) 0;
    border-bottom: 1px solid var(--line);
    display: grid;
    gap: 8px;
  }

  .roles__head {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
  }

  .roles h3 {
    font-size: var(--step-2);
  }

  .roles__count {
    font-size: 0.8125rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .roles p {
    color: var(--ink-2);
    max-width: 62ch;
  }

  .note {
    margin-top: 20px;
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 64ch;
  }

  .band {
    border-top: 1px solid var(--line);
  }

  .band__lede {
    color: var(--ink-2);
    max-width: 64ch;
    margin-bottom: clamp(24px, 4vw, 34px);
  }

  .rules {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: clamp(18px, 3vw, 26px);
  }

  .rules h3 {
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
    margin-bottom: 6px;
  }

  .rules p {
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 52ch;
  }

  .metrics {
    list-style: none;
    counter-reset: metric;
    margin: clamp(24px, 4vw, 34px) 0 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .metrics li {
    counter-increment: metric;
    padding: 20px 0;
    border-bottom: 1px solid var(--line);
    display: grid;
    gap: 6px;
  }

  .metrics h3 {
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
  }

  .metrics h3::before {
    content: counter(metric) '. ';
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .metrics p {
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 60ch;
  }


  @media (min-width: 760px) {
    .rules {
      gap: clamp(18px, 2.5vw, 24px);
    }

  }
  .fix {
    list-style: none;
    counter-reset: fix;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .fix li {
    counter-increment: fix;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4px 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
  }

  .fix h3 {
    grid-column: 1;
    font-family: var(--sans);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0;
  }

  .fix h3::before {
    content: counter(fix) '. ';
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .fix p {
    grid-column: 1;
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 60ch;
  }

  .fix__time {
    grid-column: 2;
    grid-row: 1;
    font-size: 0.8125rem;
    color: var(--muted);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }


  .roles { border-top: 0; }
  .roles li {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 16px;
    margin-bottom: 8px;
  }
  .fix { border-top: 0; }
  .fix li {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 14px 16px;
    margin-bottom: 8px;
  }
  .metrics { border-top: 0; }
  .metrics li {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 14px 16px;
    margin-bottom: 8px;
  }
  .note {
    border-top: 0;
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
  }
</style>
