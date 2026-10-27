const { VAT_RATE, vatAmount, grossTotal } = require('../src/checkout');

describe('checkout', () => {
  test('uses 23% VAT', () => {
    expect(VAT_RATE).toBe(0.23);
  });

  test('VAT on a round amount', () => {
    expect(vatAmount(100)).toBe(23);
  });

  test('gross total for several items', () => {
    expect(grossTotal([{ price: 50, qty: 2 }, { price: 100, qty: 1 }])).toBe(246);
  });

  test('empty basket costs nothing', () => {
    expect(grossTotal([])).toBe(0);
  });
});
