// Checkout calculations for the demo web app.
// Prices are in PLN; standard Polish VAT rate is 23%.

const VAT_RATE = 0.23;

function vatAmount(net) {
  // DEMO BUG (Scenario A): Math.floor truncates instead of rounding,
  // so some totals are one grosz too low (e.g. 19.99 -> 24.58 instead of 24.59).
  return Math.round(net * VAT_RATE * 100) / 100;
}

function grossTotal(items) {
  const net = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = vatAmount(net);
  return Math.round((net + vat) * 100) / 100;
}

module.exports = { VAT_RATE, vatAmount, grossTotal };
