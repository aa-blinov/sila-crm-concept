// Скачивает Roboto и Roboto Condensed с Google Fonts в static/fonts,
// переписывает CSS на локальные файлы. Запуск: node tools/fetch-fonts.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Condensed:wght@700&display=swap';
const OUT = path.join(__dirname, '..', 'static', 'fonts');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(get(res.headers.location));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
      })
      .on('error', reject);
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const css = (await get(CSS_URL)).body.toString('utf8');
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
  console.log('файлов шрифтов:', urls.length);

  const map = new Map();
  for (const url of urls) {
    const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8);
    const name = path.basename(new URL(url).pathname).replace(/\.woff2$/, '') + '-' + hash + '.woff2';
    const body = (await get(url)).body;
    fs.writeFileSync(path.join(OUT, name), body);
    map.set(url, name);
  }

  let out = css.replace(/url\((https:\/\/[^)]+\.woff2)\)/g, (_m, u) => `url(./${map.get(u)})`);
  out = '/* Шрифты загружены с Google Fonts (Roboto, Roboto Condensed), лицензия OFL 1.1 */\n' + out;
  fs.writeFileSync(path.join(OUT, 'fonts.css'), out, 'utf8');
  console.log('готово: static/fonts/fonts.css');
})();
