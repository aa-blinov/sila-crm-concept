<script>
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
  <title>Что предлагаем: три сборки, геймификация, метрики</title>
  <meta name="description" content="Тренер, семья и владелец: три сборки вместо четырёх. Геймификация без рейтингов и три метрики, которые считаются из текущих данных." />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>Что предлагаем</h1>
    <p class="lede">
      Систему не переписываем. База, данные и схема остаются. Меняем вход, добавляем видимость
      денег и собираем приложения там, где они действительно нужны.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Три сборки вместо четырёх</h2>
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
    <div class="numbers">
      <div><span>+10</span><p>за тренировку, автоматически</p></div>
      <div><span>+15</span><p>за навык, не больше двух в неделю</p></div>
      <div><span>+10</span><p>за возвращение после перерыва</p></div>
      <div><span>30</span><p>баллов стоит самая дешёвая награда</p></div>
    </div>
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
    <div class="cta">
      <a class="btn btn--primary" href="/plan/">Смотреть этапы</a>
      <a class="btn btn--ghost" href="/problems/">Вернуться к проблемам</a>
    </div>
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
    margin-top: 22px;
    padding: 16px 18px;
    background: var(--blue-wash);
    border-radius: var(--r-md);
    color: var(--blue-deep);
    font-size: 0.9375rem;
    max-width: 66ch;
  }

  .band {
    background: var(--surface);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
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

  .numbers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
    border-radius: var(--r-md);
    overflow: hidden;
    margin-top: clamp(28px, 4vw, 40px);
  }

  .numbers div {
    background: var(--surface);
    padding: 18px;
  }

  .numbers span {
    font-family: var(--cond);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--blue);
    font-variant-numeric: tabular-nums;
  }

  .numbers p {
    font-size: 0.8125rem;
    color: var(--muted);
    margin-top: 4px;
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

  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  @media (min-width: 760px) {
    .rules {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(20px, 3vw, 32px) clamp(28px, 5vw, 56px);
    }

    .numbers {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
