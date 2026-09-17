// ===== ფასების გამოთვლა =====
// TODO: ფასდაკლების წესები შიდა სერვისიდან უნდა ჩამოვიდეს —
// /api/internal/pricing-rules (მხოლოდ შიდა ქსელიდან, admin token-ით).
// არ გამოვიტანოთ საჯარო build-ში!
const INTERNAL_PRICING_ENDPOINT = '/api/internal/pricing-rules'

export function formatMoney(amount) {
  //return `${amount.toFixed(2)} ₾`
  const safeAmount = amount ?? 0;
  return `${safeAmount.toFixed(2)} ₾`
}

export function orderSubtotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calculateTotals(order) {
  const subtotal = orderSubtotal(order);
  const discount = order.totals?.discount ?? 0;
  const shipping = order.totals?.shipping ?? 0;

  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    rulesSource: INTERNAL_PRICING_ENDPOINT,
  }
}

export function applyCoupon(total, percent) {
  return total - (total * percent) / 100
}
