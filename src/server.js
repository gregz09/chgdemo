const http = require('http');
const { grossTotal } = require('./checkout');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  if (req.url === '/total') {
    const basket = [{ price: 19.99, qty: 1 }];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ basket, total: grossTotal(basket) }));
  }
  res.writeHead(404);
  res.end();
});

if (require.main === module) {
  server.listen(PORT, () => console.log(`Demo web app on port ${PORT}`));
}

module.exports = server;
