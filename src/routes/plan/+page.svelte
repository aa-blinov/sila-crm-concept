<script>
  import { u } from '$lib/url';
  const stages = [
    {
      name: 'Резервные копии',
      time: '1 день',
      text: 'Проверить, есть ли дампы базы и архив файлов. Если нет, настроить: дамп раз в сутки, копия на другой сервер, проверка восстановления.',
      kind: 'now'
    },
    {
      name: 'Вход и белые экраны',
      time: '2 дня',
      text: 'Один адрес вместо страницы выбора сервера, защита страниц от падений, страница 404, исправление опечатки.',
      kind: 'now'
    },
    {
      name: 'Кому продлевать',
      time: '2–3 недели',
      text: 'Список клиентов с истёкшим и истекающим абонементом: фильтр по залу, сортировка по сроку, кнопка написать. Плюс фильтры на экране задач.',
      kind: 'money'
    },
    {
      name: 'Telegram как канал',
      time: '1–2 недели',
      text: 'Уведомления без установки приложения. Бот в системе уже работает, рассылок через него 1 419.',
      kind: 'money'
    },
    {
      name: 'Ворота',
      time: '1–2 дня',
      text: 'Замер пяти цифр по уже накопленным данным. Решение о приложениях принимается по ним, а не по вкусу.',
      kind: 'gate'
    },
    {
      name: 'Приложения: тренер и семья',
      time: '4–6 недель',
      text: 'Две сборки на одном ядре. Тренер собирается первым: он создаёт данные, без него приложение семьи пустое.',
      kind: 'later'
    },
    {
      name: 'Геймификация и опросы',
      time: '2–3 недели',
      text: 'Журнал баллов, уровни, витрина, пульс-опросы. Только личный прогресс, без рейтингов.',
      kind: 'later'
    },
    {
      name: 'Экран владельца',
      time: '3–4 недели',
      text: 'Шесть цифр и воронка продлений. Смысл появляется, когда тренеры и родители уже в системе.',
      kind: 'later'
    }
  ];

  const gates = [
    ['Открытия кабинета', 'Сколько родителей вообще открывают публичную страницу за месяц.'],
    ['Повторные заходы', 'Сколько из них возвращаются. Один заход ничего не значит.'],
    ['Оплаты по ссылке', 'Сколько оплат проходит через страницу оплаты.'],
    ['Telegram', 'У скольких родителей подключён мессенджер. Это будущий канал.'],
    ['Возраст 13+', 'Есть ли дети, которым телефон действительно нужен.']
  ];

  const money = [
    ['55 000 ₽', 'одно продление безлимитного абонемента'],
    ['423 150 ₽', 'поступления зала «Сила» за месяц'],
    ['165 000 ₽', 'три удержанных клиента в месяц']
  ];
</script>

<svelte:head>
  <title>План: этапы, сроки и ворота</title>
  <meta name="description" content="Восемь этапов со сроками, ворота перед разработкой приложений и арифметика на реальных цифрах CRM." />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>План</h1>
    <p class="lede">
      Порядок неслучаен: сначала то, что дёшево и снимает ежедневное раздражение, затем
      то, что возвращает деньги, и только потом приложения. Оценки для команды из одного
      или двух разработчиков, точность плюс-минус тридцать процентов.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <ol class="timeline">
      {#each stages as stage}
        <li class="stage stage--{stage.kind}">
          <div class="stage__marker" aria-hidden="true"></div>
          <div class="stage__body">
            <div class="stage__top">
              <h2>{stage.name}</h2>
              <span class="stage__time">{stage.time}</span>
            </div>
            <p>{stage.text}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <h2>Ворота перед приложениями</h2>
    <p class="band__lede">
      Три разбора сошлись в одном: фундамент нужен всем. И разошлись в том, строить ли
      свои приложения. Рынок говорит «не строить»: приложение почти везде платная опция,
      а снизу демпингует бесплатный тариф. Продукт и инженерия говорят «строить, но две
      сборки». Спор решается за один день на данных, которые уже есть.
    </p>
    <ul class="gates">
      {#each gates as gate}
        <li>
          <h3>{gate[0]}</h3>
          <p>{gate[1]}</p>
        </li>
      {/each}
    </ul>
    <p class="band__after">
      Если страницу открывают единицы, приложение не спасёт: проблема не в обёртке.
      Если открывают часто, но не возвращаются, вопрос в содержании.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Арифметика</h2>
    <p class="lede">Цифры из системы, не прогноз.</p>
    <ul class="money">
      {#each money as m}
        <li>
          <span>{m[0]}</span>
          <p>{m[1]}</p>
        </li>
      {/each}
    </ul>
    <p class="close">
      Отсюда и порядок: три возвращённых клиента в месяц окупают работу над продлениями,
      а приложение такими деньгами не измеряется.
    </p>
    <div class="cta">
      <a class="btn btn--primary" href={u('/solution/')}>Что входит в решение</a>
      <a class="btn btn--ghost" href={u('/problems/')}>Что нашли</a>
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

  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .stage {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 16px;
    padding-bottom: clamp(22px, 3.5vw, 32px);
    position: relative;
  }

  .stage:last-child {
    padding-bottom: 0;
  }

  .stage::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 22px;
    bottom: 0;
    width: 2px;
    background: var(--line);
  }

  .stage:last-child::before {
    display: none;
  }

  .stage__marker {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 6px 0 0 5px;
    border: 2px solid var(--line);
    background: var(--paper);
    z-index: 1;
  }

  .stage--now .stage__marker {
    border-color: var(--red);
    background: var(--red);
  }

  .stage--money .stage__marker {
    border-color: var(--green);
    background: var(--green);
  }

  .stage--gate .stage__marker {
    border-color: var(--ink);
    background: var(--ink);
  }

  .stage--later .stage__marker {
    border-color: var(--blue);
    background: var(--surface);
  }

  .stage__top {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .stage__top h2 {
    font-size: var(--step-2);
    line-height: 1.2;
  }

  .stage__time {
    font-size: 0.8125rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .stage__body p {
    color: var(--ink-2);
    max-width: 62ch;
    font-size: 0.9375rem;
  }

  .band {
    background: var(--surface);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .band h2 {
    margin-bottom: 14px;
  }

  .band__lede {
    color: var(--ink-2);
    max-width: 66ch;
    margin-bottom: clamp(24px, 4vw, 32px);
  }

  .gates {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
    border-radius: var(--r-md);
    overflow: hidden;
  }

  .gates li {
    background: var(--surface);
    padding: 16px 18px;
  }

  .gates h3 {
    font-family: var(--sans);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0;
    margin-bottom: 4px;
  }

  .gates p {
    font-size: 0.875rem;
    color: var(--muted);
  }

  .band__after {
    margin-top: 20px;
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 64ch;
  }

  .money {
    list-style: none;
    margin: clamp(20px, 3vw, 28px) 0 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .money li {
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
    flex-wrap: wrap;
  }

  .money span {
    font-family: var(--cond);
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 700;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    min-width: 8ch;
  }

  .money p {
    color: var(--ink-2);
    font-size: 0.9375rem;
  }

  .close {
    margin-top: 22px;
    color: var(--ink-2);
    max-width: 62ch;
  }

  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  @media (min-width: 760px) {
    .gates {
      grid-template-columns: repeat(2, 1fr);
    }

    .gates li:last-child:nth-child(odd) {
      grid-column: span 2;
    }
  }
</style>
