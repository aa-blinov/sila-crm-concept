<script>
  import { u } from '$lib/url';
  const items = [
    {
      tag: 'риск',
      kind: 'risk',
      title: 'Резервных копий нет',
      text: 'Одна база на все серверы: 31 581 тренировка, 1 832 клиента, 3 816 файлов. Копий ни одной. Сбой диска или неудачное обновление стирают историю, восстановить нечем.',
      cost: '1 день работы закрывает вопрос'
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
  <meta name="description" content="Результат аудита: отсутствие бэкапов, вход через диспетчер, белые экраны, неуправляемое продление абонементов, ссылки на оплату, невидимые клиенты." />
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

<section class="section">
  <div class="wrap">
    <h2>Что это значит вместе</h2>
    <p>
      По отдельности каждая мелочь выглядит терпимо. Вместе они дают одно: сотрудник
      не доверяет системе и работает мимо неё. А самые дорогие пункты вообще не про код:
      они про то, что в системе невозможно быстро ответить на вопрос «кому звонить,
      чтобы продлить абонемент».
    </p>
    <p>
      Поэтому порядок такой: сначала то, что дёшево и снимает ежедневное раздражение,
      затем то, что возвращает деньги, и только потом приложения.
    </p>
    <div class="cta">
      <a class="btn btn--primary" href={u('/solution/')}>Что предлагаем</a>
      <a class="btn btn--ghost" href={u('/plan/')}>Сколько это займёт</a>
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

  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
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
