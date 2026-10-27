<script>
  import { u } from '$lib/url';

  const stages = [
    {
      name: 'Копии и защита',
      time: '30 октября, пятница',
      text: 'Проверяем, есть ли резервные копии, и если нет, настраиваем. В тот же день закрываем то, что открыто наружу: исходники, панель управления, служебные настройки.',
      result: 'Систему можно потерять только вместе с сервером, а не по случайности.',
      kind: 'now'
    },
    {
      name: 'Вход без нервов',
      time: '2–4 ноября',
      text: 'Один адрес вместо выбора сервера. Пустые экраны заменяются сообщением с кнопкой. Плюс ограничение попыток входа и возможность выгнать чужую сессию.',
      result: 'Сотрудник входит с первого раза. Разлогинов и потерянных паролей нет.',
      kind: 'now'
    },
    {
      name: 'Файлы и обновления',
      time: '5–7 ноября',
      text: 'Фотографии и документы детей перестают быть доступны посторонним. Обновляем части программы, в которых нашлись известные уязвимости.',
      result: 'Личные файлы видят только те, кому положено.',
      kind: 'now'
    },
    {
      name: 'Кому продлевать',
      time: '9–20 ноября',
      text: 'Экран со списком тех, у кого абонемент заканчивается или закончился: фильтр по залу, сортировка по сроку, кнопка написать. Задачи больше не теряются в общей ленте.',
      result: 'Появляется ежедневный список звонков. Это и возвращает деньги.',
      kind: 'money'
    },
    {
      name: 'Ворота',
      time: '23 ноября',
      text: 'Смотрим пять цифр, которые уже есть в системе: открывают ли родители кабинет, возвращаются ли, платят ли по ссылке.',
      result: 'Решение про приложения принимается по цифрам, а не по вкусу.',
      kind: 'gate'
    },
    {
      name: 'Приложения для тренера и семьи',
      time: 'с 24 ноября по 11 декабря',
      text: 'Две сборки на одном ядре. Первым идёт тренер: он отмечает посещение в зале с телефона. Следом родитель видит расписание, абонемент и прогресс.',
      result: 'Данные появляются там, где происходит работа, а не в офисе.',
      kind: 'later'
    },
    {
      name: 'Уведомления',
      time: '14–22 декабря',
      text: 'Приложение напоминает, что абонемент заканчивается и что скоро тренировка. На Android сразу, на iPhone с 16.4 и если приложение добавлено на экран «Домой».',
      result: 'Родитель узнаёт о продлении от вас, а не наоборот.',
      kind: 'later'
    },
    {
      name: 'Баллы и опросы',
      time: 'с 23 декабря по 15 января',
      text: 'Личный прогресс ребёнка: баллы, уровни, значки за возвращение. Короткие опросы родителям. Без рейтингов между детьми.',
      result: 'Есть за что возвращаться, кроме тренировки.',
      kind: 'later'
    },
    {
      name: 'Экран владельца',
      time: '18–29 января',
      text: 'Шесть цифр на одном экране: продления, посещаемость, деньги по залам, отток.',
      result: 'Решения принимаются по цифрам, а не по ощущениям.',
      kind: 'later'
    }
  ];

  const gains = [
    ['Вход перестаёт быть лотереей', 'Сотрудник открывает один адрес и попадает в систему. Никаких «у меня опять не пускает».'],
    ['Продления становятся видны', '225 страниц без фильтров превращаются в один список «кому звонить на этой неделе».'],
    ['Данные детей закрыты', 'Фотографии и документы видны только тем, кому положено. Это уже вопрос не репутации, а закона.'],
    ['Приложения появляются, когда готовы данные', 'Тренер в зале, родитель в телефоне. Но только после ворот, а не по желанию.']
  ];

  const costs = [
    ['Серверы сейчас', '21 000–38 500 ₽ в месяц', 'пять узлов и база в Selectel, Новосибирск'],
    ['Если оставить два узла', '12 000–21 500 ₽ в месяц', 'нагрузка это позволяет: 1 832 клиента и 3 816 файлов'],
    ['Домен .ru', '450 ₽ в год', 'плюс сертификаты и DNS бесплатно'],
    ['Копии в хранилище', '100–300 ₽ в месяц', 'лежат отдельно от серверов'],
    ['Постоянный режим', '4–6 часов в месяц', 'обновляем программу, проверяем копии, следим за сигналами, раз в квартал внешняя проверка'],
    ['Работы по этапам', 'с 30 октября по 29 января', 'около трёх месяцев календарно; основное закрывается к 20 ноября']
  ];

  const risks = [
    ['Данные детей открыты', 'Сейчас фотографии и документы может скачать кто угодно. Кроме репутации, это требования закона о персональных данных: штрафы и предписания.'],
    ['База в одном экземпляре', 'Если копий нет, сбой диска или неудачное обновление стирают 31 тысячу тренировок. Восстанавливать будет нечего.'],
    ['Деньги уходят молча', 'Продление безлимита стоит 55 000 ₽. Пока список продлений не виден, эти деньги уходят к конкурентам, и никто этого не замечает.']
  ];

  const gates = [
    ['Открытия кабинета', 'Сколько родителей вообще открывают страницу за месяц.'],
    ['Повторные заходы', 'Сколько из них возвращаются. Один заход ничего не значит.'],
    ['Оплаты по ссылке', 'Сколько оплат проходит через страницу оплаты.'],
    ['Отклик на рассылки', 'Сколько родителей переходят по ссылке из рассылки.'],
    ['Возраст 13+', 'Есть ли дети, которым телефон действительно нужен.']
  ];

  const needs = [
    ['Доступ к серверам', 'Либо человек, который применит правки: часть работ делается настройками, без программиста.'],
    ['Нерабочий час-два', 'Вход и сессии затронут всех сотрудников. Лучше вечером, чтобы никто не работал в этот момент.'],
    ['Копия базы', 'Для проверки загрузки файлов. На рабочей системе такие проверки делать нельзя.'],
    ['Решение по копиям', 'Проверить, есть ли резервные копии, и если нет, включить. Это единственный пункт, который нельзя отложить.']
  ];

  const money = [
    ['55 000 ₽', 'одно продление безлимитного абонемента'],
    ['423 150 ₽', 'поступления зала «Сила» за месяц'],
    ['165 000 ₽', 'три удержанных клиента в месяц']
  ];

  const tech = [
    ['Фронтенд', 'React 17 на Create React App, Ant Design, MobX, Apollo Client'],
    ['Бэкенд', 'Strapi 4, GraphQL, авторизация по JWT'],
    ['Веб-сервер', 'nginx 1.18 и 1.28 на разных машинах, только HTTP/1.1, сертификаты Let’s Encrypt'],
    ['Инфраструктура', 'пять серверов приложений на четырёх машинах, одна база, общее хранилище файлов'],
    ['Объём данных', '1 832 клиента, 31 581 тренировка, 4 490 абонементов, 1 419 рассылок, 2 675 аккаунтов, 10 залов, 3 816 файлов']
  ];
</script>

<svelte:head>
  <title>План для владельца: что делаем, сколько стоит, что нужно от вас</title>
  <meta
    name="description"
    content="План работ по CRM «Сила Скилла» для владельца: что получите, в каком порядке, сколько стоит и что нужно от вас."
  />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>План</h1>
    <p class="lede">
      Здесь только то, что нужно для решения: что вы получите, в каком порядке, сколько это
      стоит и что потребуется от вас. Сроки стартуют в пятницу 30 октября. Оценки
      оптимистичные, для команды из одного-двух разработчиков, точность плюс-минус
      тридцать процентов.
    </p>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <div class="panel">
      <p class="panel__lead">От вас нужно три решения</p>
      <ol class="decide">
        <li>Делать ли фундамент сейчас: копии, вход и закрытие данных. Это три недели с 30 октября и снимает риск потерять базу или вынести файлы детей.</li>
        <li>Когда запускать приложения: сразу после ворот 23 ноября или позже. Замер занимает один день.</li>
        <li>Кто отвечает за систему дальше. Постоянный режим: 4–6 часов в месяц.</li>
      </ol>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Что вы получите</h2>
    <ul class="gains">
      {#each gains as g}
        <li>
          <h3>{g[0]}</h3>
          <p>{g[1]}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>В каком порядке</h2>
    <p class="intro">
      Сначала дёшево и снимает ежедневное раздражение, потом то, что возвращает деньги,
      и только затем приложения.
    </p>
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
            <p class="stage__result">{stage.result}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <h2>Ворота: когда запускать приложения</h2>
    <p class="band__lede">
      Приложения стоят четыре-шесть недель и требуют, чтобы данные были в порядке. Перед
      стартом смотрим пять цифр, которые уже есть в системе.
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
      и список клиентов открыты, кабинет родителям показывать нельзя.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Сколько это стоит</h2>
    <p class="intro">
      Серверы и домен стоят денег, работы стоят времени. Ставку разработчика подставляйте свою:
      здесь человеко-недели, а не рубли.
    </p>
    <ul class="costs">
      {#each costs as c}
        <li>
          <span class="costs__name">{c[0]}</span>
          <span class="costs__sum">{c[1]}</span>
          <span class="costs__note">{c[2]}</span>
        </li>
      {/each}
    </ul>

    <h3 class="sub">Что приносят деньги</h3>
    <ul class="money">
      {#each money as m}
        <li>
          <span>{m[0]}</span>
          <p>{m[1]}</p>
        </li>
      {/each}
    </ul>
    <p class="after">
      Три возвращённых клиента в месяц окупают работу над продлениями с запасом. Приложение
      такими деньгами не измеряется: его считают по удержанию, и поэтому по нему сначала ворота.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Что будет, если не делать</h2>
    <ul class="risks">
      {#each risks as r}
        <li>
          <h3>{r[0]}</h3>
          <p>{r[1]}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section band">
  <div class="wrap">
    <h2>Дальше: постоянный режим</h2>
    <p class="band__lede">
      Разовые правки закрывают то, что открыто сейчас. Но система живёт: выходят обновления,
      меняются сотрудники. Без режима всё возвращается через полгода. Это не проект,
      а обслуживание.
    </p>
    <ul class="gates">
      <li>
        <h3>Раз в месяц: обновления</h3>
        <p>Обновляем программу и её части, прогоняем вход, календарь и кабинет. Час работы.</p>
      </li>
      <li>
        <h3>Раз в неделю: копии</h3>
        <p>Смотрим, что копия создалась и лежит на другом сервере. Раз в квартал пробуем восстановить: непроверенная копия копией не считается.</p>
      </li>
      <li>
        <h3>Постоянно: сигналы</h3>
        <p>Уведомления на серию неудачных входов и на смену прав администратора, контроль сертификатов и места на дисках.</p>
      </li>
      <li>
        <h3>Раз в квартал: внешняя проверка</h3>
        <p>Повторяем проверку безопасности: новые функции добавляют новые двери.</p>
      </li>
    </ul>
    <p class="band__after">
      Ориентир: 4–6 часов в месяц. Если отдать на обслуживание, это фиксированная
      сумма, а не сюрприз в момент сбоя. И понятно, кто отвечает.
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Что нужно от вас</h2>
    <ul class="needs">
      {#each needs as n}
        <li>
          <h3>{n[0]}</h3>
          <p>{n[1]}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section section--tight">
  <div class="wrap">
    <details class="tech">
      <summary>Технические детали для разработчика</summary>
      <p class="tech__note">
        Что стоит сейчас. Снято с работающей системы 26 октября 2026 года в режиме чтения:
        ни одной записи не изменено. Данные клиентов не публикуются.
      </p>
      <dl class="tech__list">
        {#each tech as t}
          <div><dt>{t[0]}</dt><dd>{t[1]}</dd></div>
        {/each}
      </dl>
    </details>
  </div>
</section>

<style>
  .head {
    padding: clamp(24px, 5vw, 48px) 0 clamp(8px, 2vw, 14px);
  }

  .head h1 {
    margin-bottom: 12px;
  }

  .panel {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: clamp(16px, 3vw, 24px);
  }

  .panel__lead {
    font-weight: 500;
    margin-bottom: 10px;
  }

  .decide {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 8px;
    color: var(--ink-2);
    font-size: 0.9375rem;
  }

  .gains,
  .risks,
  .needs {
    list-style: none;
    margin: clamp(14px, 2vw, 20px) 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .gains li,
  .risks li,
  .needs li {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 16px;
    display: grid;
    gap: 4px;
  }

  .gains h3,
  .risks h3,
  .needs h3 {
    font-size: 1rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .gains p,
  .risks p,
  .needs p {
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 66ch;
  }

  .intro {
    color: var(--ink-2);
    max-width: 64ch;
    margin-bottom: 6px;
  }

  .timeline {
    list-style: none;
    margin: clamp(14px, 2vw, 20px) 0 0;
    padding: 0;
  }

  .stage {
    position: relative;
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 12px;
    padding-bottom: 10px;
  }

  .stage:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 18px;
    bottom: 0;
    width: 1px;
    background: var(--line);
  }

  .stage__marker {
    width: 12px;
    height: 12px;
    margin: 5px 0 0 6px;
    border-radius: 50%;
    border: 2px solid var(--ink);
    background: var(--ink);
    z-index: 1;
  }

  .stage--later .stage__marker {
    border-color: var(--muted);
    background: var(--paper);
  }

  .stage__body {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
    display: grid;
    gap: 6px;
  }

  .stage__top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .stage__top h3 {
    font-size: 1rem;
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  .stage__time {
    font-size: 0.8125rem;
    color: var(--muted);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .stage__body p {
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 66ch;
  }

  .stage__result {
    color: var(--ink) !important;
    border-top: 1px solid var(--line);
    padding-top: 8px;
  }

  .band {
    border-top: 1px solid var(--line);
  }

  .band__lede {
    color: var(--ink-2);
    max-width: 64ch;
    margin-bottom: 16px;
  }

  .gates {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .gates li {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
  }

  .gates h3 {
    font-size: 0.9375rem;
    margin-bottom: 3px;
  }

  .gates p {
    color: var(--ink-2);
    font-size: 0.9375rem;
    max-width: 66ch;
  }

  .band__after {
    margin-top: 16px;
    color: var(--ink-2);
    max-width: 64ch;
    font-size: 0.9375rem;
  }

  .costs {
    list-style: none;
    margin: 16px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .costs li {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
    display: grid;
    gap: 2px;
  }

  .costs__name {
    font-size: 0.8125rem;
    color: var(--muted);
  }

  .costs__sum {
    font-size: 1.0625rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .costs__note {
    font-size: 0.875rem;
    color: var(--ink-2);
  }

  .sub {
    margin-top: clamp(24px, 4vw, 32px);
    margin-bottom: 4px;
    font-size: 1rem;
  }

  .money {
    list-style: none;
    margin: 12px 0 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }

  .money li {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 12px 16px;
    display: flex;
    align-items: baseline;
    gap: 14px;
    flex-wrap: wrap;
  }

  .money span {
    font-family: var(--cond);
    font-size: 1.125rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .money p {
    color: var(--ink-2);
    font-size: 0.9375rem;
  }

  .after {
    margin-top: 14px;
    color: var(--ink-2);
    max-width: 64ch;
    font-size: 0.9375rem;
  }

  .tech {
    background: var(--surface);
    border-radius: var(--r-md);
    padding: 14px 16px;
  }

  .tech summary {
    cursor: pointer;
    font-size: 0.9375rem;
    color: var(--blue);
  }

  .tech__note {
    margin-top: 10px;
    color: var(--muted);
    font-size: 0.875rem;
    max-width: 66ch;
  }

  .tech__list {
    margin: 12px 0 0;
    border-top: 1px solid var(--line);
  }

  .tech__list div {
    display: grid;
    gap: 2px;
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
  }

  .tech__list dt {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .tech__list dd {
    margin: 0;
    font-size: 0.875rem;
    color: var(--ink-2);
  }

  @media (min-width: 760px) {
    .stage__body {
      padding: 16px 20px;
    }

    .tech__list div {
      grid-template-columns: 160px 1fr;
      gap: 16px;
      align-items: baseline;
    }
  }
</style>
