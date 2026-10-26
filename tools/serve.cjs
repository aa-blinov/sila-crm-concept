// Локальный сервер, который повторяет GitHub Pages: сайт живёт под /sila-crm-concept/.
// Запуск: node tools/serve.cjs
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'build');
const PREFIX = '/sila-crm-concept';
const PORT = Number(process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);

    if (url === PREFIX) {
      res.writeHead(301, { Location: PREFIX + '/' });
      return res.end();
    }
    if (!url.startsWith(PREFIX + '/')) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Снаружи префикса ничего нет');
    }

    let rel = url.slice(PREFIX.length + 1);
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';

    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end();
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>404</h1>');
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log(`http://127.0.0.1:${PORT}${PREFIX}/`);
  });
