<script>
  import { u } from '$lib/url';

  const shots = [
    {
      src: '/shots/crm-blank.webp',
      alt: 'Пустая белая страница вместо карточки клиента',
      title: 'Пустая страница',
      text: 'Карточка клиента №184. Ни сообщения об ошибке, ни кнопки, ни подсказки.',
      w: 760,
      h: 640
    },
    {
      src: '/shots/crm-tasks.webp',
      alt: 'Список задач с датами 2022 и 2024 года',
      title: 'Задачи с 2022 года',
      text: 'Одна лента: ноябрь 2024, май 2022, апрель 2023. Фильтра по дате нет.',
      w: 700,
      h: 752
    },
    {
      src: '/shots/crm-subscriptions.webp',
      alt: 'Список абонементов, которые закончились в феврале 2022',
      title: 'Абонементы: 225 страниц',
      text: 'Первая страница открывается на феврале 2022. В восьмой строке: null/12 тренировок.',
      w: 700,
      h: 752
    }
  ];

  const items = [
    {
      tag: 'риск',
      kind: 'risk',
      title: 'Данные клиентов открыты без авторизации',
      text: 'Запрос к API без входа в систему возвращает клиентов с именами и фамилиями. Проверено запросом без токена. Для публичного кабинета доступ нужен, но не в объёме «все 1 832 клиента списком».',
      cost: '3–5 дней работы'
    },
    {
      tag: 'время',
      kind: 'time',
      title: 'Вход как лотерея',
      text: 'Основной адрес замеряет пять серверов и выбирает за сотрудника. Отсюда разлогины при каждом переезде, цикл перезагрузок и потерянное время у всех, кто работает в системе.',
      cost: '2 дня работы'
    },
    {
      tag: 'доверие',
      kind: 'risk',
      title: 'Белый экран вместо карточки клиента',
      text: 'Если у родителя пустое имя, страница падает целиком. Таких записей 96. Общей защиты от ошибок в приложении нет, поэтому любая подобная мелочь даёт пустоту без объяснений.',
      cost: '6 часов работы'
    },
    {
      tag: 'деньги',
      kind: 'money',
      title: 'Продление абонемента не управляется',
      text: '4 490 абонементов, 225 страниц, ни одного фильтра. Первая страница открывается на январе 2022. Задача «нет абонемента» создаётся автоматически и теряется среди 160 других.',
      cost: '2–3 недели работы'
    },
    {
      tag: 'деньги',
      kind: 'money',
      title: 'Ссылка на оплату зависит от сервера',
      text: 'Клиент получает адрес того сервера, где в этот момент работал сотрудник. В рассылках встречаются и sila-crm.ru, и c2.sila-crm.ru. Часть ссылок не открывается.',
      cost: 'входит в правку входа'
    },
    {
      tag: 'данные',
      kind: 'data',
      title: '33 клиента не видны в списке',
      text: 'У них нет аккаунта, а список «Клиенты» строится по аккаунтам. Эти люди существуют в базе, но найти их можно только по прямой ссылке. Значит, их не обзванивают.',
      cost: '1 день работы'
    }
  ];
</script>

<svelte:head>
  <title>Что нашли: шесть проблем CRM «Сила Скилла»</title>
  <meta name="description" content="Результат аудита: вход через диспетчер, белые экраны, неуправляемое продление абонементов, ссылки на оплату, невидимые клиенты, открытый доступ к данным." />
</svelte:head>

<section class="head">
  <div class="wrap">
    <h1>Что нашли</h1>
    <p class="lede">
      Каждый пункт проверен на работающей системе 26 октября 2026. В CRM ничего не менялось:
      только чтение, обход экранов и запросы к данным.
    </p>
  </div>
</section>

<section class="list">
  <div class="wrap">
    <ul>
      {#each items as item}
        <li>
          <span class="tag tag--{item.kind}">{item.tag}</span>
          <div class="body">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <p class="cost">{item.cost}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section shots">
  <div class="wrap">
    <h2>Как это выглядит</h2>
    <p class="shots__note">
      Настоящие экраны системы. Имена, аватары и телефоны скрыты, остальное как есть.
    </p>
    <ul class="shots__list">
      {#each shots as s}
        <li>
          <figure>
            <div class="shots__frame">
              <img src={u(s.src)} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
            </div>
            <figcaption>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>Что это значит вместе</h2>
    <p>
      По отдельности каждая мелочь терпима. Вместе они дают одно: сотрудник не доверяет
      системе и работает мимо неё. Самые дорогие пункты даже не про код: в системе нельзя
      быстро ответить на вопрос «кому звонить, чтобы продлить абонемент».
    </p>
  </div>
</section>

<style>
  .head {
    padding: clamp(32px, 7vw, 64px) 0 clamp(20px, 4vw, 32px);
  }

  .head h1 {
    margin-bottom: 18px;
  }

  .list {
    padding-bottom: clamp(20px, 4vw, 36px);
  }

  .list ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }

  .list li {
    display: grid;
    gap: 12px;
    padding: clamp(22px, 3.5vw, 34px) 0;
    border-bottom: 1px solid var(--line);
  }

  .body h2 {
    font-size: var(--step-2);
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .body p {
    color: var(--ink-2);
    max-width: 64ch;
  }

  .cost {
    margin-top: 10px;
    font-size: 0.8125rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .section h2 {
    margin-bottom: 20px;
  }

  .section p + p {
    margin-top: 14px;
  }

  .section p {
    color: var(--ink-2);
    max-width: 64ch;
  }

  .shots__note {
    color: var(--muted);
    font-size: 0.9375rem;
    max-width: 60ch;
    margin-bottom: clamp(18px, 3vw, 26px);
  }

  .shots__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: clamp(18px, 3vw, 26px);
  }

  .shots__list figure {
    margin: 0;
    display: grid;
    gap: 10px;
  }

  .shots__frame {
    border: 1px solid var(--line);
    border-radius: var(--r-md);
    overflow: hidden;
    background: #fff;
    box-shadow: var(--shadow-1);
  }

  .shots__frame img {
    display: block;
    width: 100%;
    height: auto;
  }

  .shots__list figcaption {
    display: grid;
    gap: 3px;
    font-size: 0.875rem;
    color: var(--ink-2);
  }

  .shots__list figcaption strong {
    font-family: var(--cond);
    font-size: 1.0625rem;
    color: var(--ink);
    letter-spacing: -0.01em;
  }


  @media (min-width: 860px) {
    .shots__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 760px) {
    .list li {
      grid-template-columns: 110px 1fr;
      gap: 28px;
      align-items: start;
    }

    .tag {
      justify-self: start;
      margin-top: 4px;
    }
  }
</style>
