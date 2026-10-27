<script>
  import { u } from '$lib/url';
  const stages = [
    {
      name: 'Копии и настройки защиты',
      time: '4 часа',
      text: 'Проверяем, есть ли резервные копии, и если нет — настраиваем. В тот же заход закрываем то, что делается настройками: исходники, панель управления, заголовки, версии. Это одна работа с сервером, а не две.',
      kind: 'now'
    },
    {
      name: 'Вход, сессии и падения',
      time: '1 неделя',
      text: 'Один адрес вместо выбора сервера, защита страниц от белых экранов, страница 404. Плюс ограничение попыток входа, сессии с отзывом и запрет чужим сайтам читать базу. Авторизация одна, поэтому делается одним куском.',
      kind: 'now'
    },
    {
      name: 'Файлы и библиотеки',
      time: '1 неделя',
      text: 'Закрываем список загрузок и выдачу файлов, обновляем две библиотеки. Идёт параллельно со входом: другой слой, другой разработчик.',
      kind: 'now'
    },
    {
      name: 'Кому продлевать',
      time: '2–3 недели',
      text: 'Список клиентов с истёкшим и истекающим абонементом: фильтр по залу, сортировка по сроку, кнопка написать, фильтры на экране задач. Здесь же закрываем публичный список клиентов: проверять надо те же страницы кабинета.',
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
      name: 'Уведомления в PWA',
      time: '2–3 недели',
      text: 'Web Push: на Android работает сразу, на iPhone с 16.4, если приложение добавлено на экран «Домой». Нужны сервис-воркер, подписки и один планировщик, иначе на пяти серверах пойдут дубли.',
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
    ['Отклик на рассылки', 'Сколько родителей переходят по ссылке из рассылки. Показывает, работает ли канал вообще.'],
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
  <meta name="description" content="Девять этапов со сроками, включая правки безопасности, ворота перед приложениями, постоянный режим и арифметика на реальных цифрах CRM." />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>План</h1>
    <p class="lede">
      Порядок неслучаен: сначала дешёвое, что снимает ежедневное раздражение и закрывает
      открытые двери, потом то, что возвращает деньги, и только затем приложения.
      Оценки для команды из одного или двух разработчиков, точность плюс-минус тридцать
      процентов.
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
              <h3>{stage.name}</h3>
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
      Фундамент нужен всем: здесь мнения сошлись. По приложениям разошлись: рынок говорит
      «не строить», продукт и инженерия — «строить, но две сборки». Спор решается за один
      день на данных.
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
      Если открывают часто, но не возвращаются, вопрос в содержании. И отдельно: пока файлы
      и список клиентов открыты, кабинет родителям показывать нельзя. Приложение расширяет
      аудиторию, а значит и утечку.
    </p>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <h2>Дальше — постоянно</h2>
    <p class="band__lede">
      Разовые правки закрывают то, что открыто сейчас. Но система живёт: выходят обновления
      Strapi и библиотек, меняются сотрудники, копится мусор в правах доступа. Без режима
      всё это возвращается через полгода. Это не проект, а обслуживание.
    </p>
    <ul class="gates">
      <li>
        <h3>Раз в месяц — обновления</h3>
        <p>Обновляем Strapi и библиотеки, прогоняем вход, календарь и кабинет. Час работы, зато без сюрпризов.</p>
      </li>
      <li>
        <h3>Раз в неделю — копии</h3>
        <p>Смотрим, что резервная копия создалась и лежит на другом сервере. Раз в квартал пробуем восстановить на тестовой машине: копия, которую не проверяли, копией не считается.</p>
      </li>
      <li>
        <h3>Постоянно — сигналы</h3>
        <p>Уведомления на серию неудачных входов и на изменение прав администратора. Плюс контроль, что сертификаты и место на дисках в порядке.</p>
      </li>
      <li>
        <h3>Раз в квартал — внешняя проверка</h3>
        <p>Повторяем этот аудит: новые функции добавляют новые двери. Час сканирования дешевле, чем разбор последствий.</p>
      </li>
    </ul>
    <p class="band__after">
      Ориентир: четыре–шесть часов в месяц. Если отдать на обслуживание, это фиксированная
      сумма, а не сюрприз в момент сбоя. И это же снимает вопрос «а кто за это отвечает»:
      у системы появляется хозяин.
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
  </div>
</section>


<section class="meta">
  <div class="wrap">
    <h2>Техническая база</h2>
    <p class="meta__lede">
      Что стоит сейчас. Это констатация, а не предложение: все цифры сняты с работающей
      системы 26 октября 2026 года, данные клиентов не публикуются. Стоимость — оценка
      по публичному прайсу, а не счёт.
    </p>
    <dl class="meta__list">
      <div><dt>Режим работы</dt><dd>только чтение: ни одной записи в CRM не изменено</dd></div>
      <div><dt>Фронтенд</dt><dd>React 17 на Create React App, Ant Design, MobX, Apollo Client</dd></div>
      <div><dt>Бэкенд</dt><dd>Strapi 4, GraphQL, авторизация по JWT</dd></div>
      <div><dt>Веб-сервер</dt><dd>nginx версий 1.18 и 1.28 на разных машинах, только HTTP/1.1, сертификаты Let's Encrypt</dd></div>
      <div><dt>Инфраструктура</dt><dd>пять серверов приложений на четырёх машинах, одна база, общее хранилище файлов</dd></div>
      <div><dt>Серверы и хостинг</dt><dd>Selectel, Новосибирск. Считал по публичному прайсу: пять облачных серверов 2×4 ГБ по 3 120 ₽ плюс база 5 640 ₽ — около 21 000 ₽ в месяц. Если узлы крупнее, 4×8 ГБ по 5 640 ₽ и база 10 290 ₽ — около 38 500 ₽.</dd></div>
      <div><dt>Если сократить</dt><dd>два узла 4×8 ГБ и база 8×16: около 21 500 ₽ в месяц. Двух узлов хватает: 1 832 клиента и 3 816 файлов. Пять узлов — это ещё и пять точек отказа и пять мест для обновления.</dd></div>
      <div><dt>Домен и сертификаты</dt><dd>домен .ru от 300 до 900 ₽ в год, сертификаты Let's Encrypt бесплатно.</dd></div>
      <div><dt>Резервные копии</dt><dd>объектное хранилище от 100 до 300 ₽ в месяц, плюс проверка восстановления раз в квартал.</dd></div>
      <div><dt>Объём данных</dt><dd>1 832 клиента, 31 581 тренировка, 4 490 абонементов, 1 419 рассылок, 2 675 аккаунтов, 10 залов, 3 816 файлов</dd></div>
      <div><dt>Доля выручки</dt><dd>инфраструктура — это 5–9 процентов поступлений одного зала «Сила» (423 150 ₽ в месяц). Не самая дорогая часть системы, дороже обходится простой.</dd></div>
    </dl>
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
    border: 2px solid var(--ink);
    background: var(--ink);
    z-index: 1;
  }

        .stage--later .stage__marker {
    border-color: var(--muted);
    background: var(--paper);
  }

  .stage__top {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }

  .stage__top h3 {
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
    border-top: 1px solid var(--line);
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
    border-top: 1px solid var(--line);
  }

  .gates li {
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
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
    font-family: var(--sans);
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    min-width: 9ch;
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


  @media (min-width: 760px) {
  }
  .meta {
    background: var(--surface);
    border-top: 1px solid var(--line);
  }

  .meta h2 {
    margin-bottom: 10px;
  }

  .meta__lede {
    color: var(--muted);
    font-size: 0.9375rem;
    max-width: 62ch;
    margin-bottom: clamp(20px, 3vw, 28px);
  }

  .meta__list {
    margin: 0;
    border-top: 1px solid var(--line);
  }

  .meta__list div {
    display: grid;
    gap: 4px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
  }

  .meta__list dt {
    font-size: 0.8125rem;
    color: var(--muted);
  }

  .meta__list dd {
    margin: 0;
    color: var(--ink-2);
    max-width: 66ch;
  }

  @media (min-width: 760px) {
    .meta__list div {
      grid-template-columns: 200px 1fr;
      gap: 24px;
      align-items: baseline;
    }
  }


  .stage {
    grid-template-columns: 1fr;
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
    margin-bottom: 8px;
    padding-bottom: 14px;
  }
  .stage::before, .stage__marker { display: none; }
  .gates { border-top: 0; }
  .gates li {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 14px 16px;
    margin-bottom: 8px;
  }
  .money { border-top: 0; }
  .money li {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 14px 16px;
    margin-bottom: 8px;
  }
  .meta { background: transparent; border-top: 0; }
  .meta__list { border-top: 0; }
  .meta__list div {
    background: var(--surface);
    border: 0;
    border-radius: var(--r-md);
    padding: 12px 16px;
    margin-bottom: 8px;
  }
</style>
