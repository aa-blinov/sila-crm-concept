// Проставляет базовый путь во все внутренние ссылки. Запуск: node tools/fix-links.cjs
const fs = require('fs');
const path = require('path');

const files = [
  'src/routes/+page.svelte',
  'src/routes/problems/+page.svelte',
  'src/routes/solution/+page.svelte',
  'src/routes/plan/+page.svelte'
];

for (const rel of files) {
  const file = path.join(__dirname, '..', rel);
  let text = fs.readFileSync(file, 'utf8');

  if (!text.includes("$lib/url")) {
    text = text.replace('<script>', "<script>\n  import { u } from '$lib/url';");
  }

  text = text
    .replace(/href="\/problems\/"/g, "href={u('/problems/')}")
    .replace(/href="\/solution\/"/g, "href={u('/solution/')}")
    .replace(/href="\/plan\/"/g, "href={u('/plan/')}")
    .replace(/href="\/"/g, "href={u('/')}");

  fs.writeFileSync(file, text, 'utf8');
  console.log('обновлён', rel);
}
