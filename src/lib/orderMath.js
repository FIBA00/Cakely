// Patisserie Postcard: order maths are pure, testable, and shared by cart and checkout surfaces.
export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateDelivery(subtotal) {
  return subtotal === 0 || subtotal >= 90 ? 0 : 6;
}

export function calculateTotal(items) {
  const subtotal = calculateSubtotal(items);
  return { subtotal, delivery: calculateDelivery(subtotal), total: subtotal + calculateDelivery(subtotal) };
}
