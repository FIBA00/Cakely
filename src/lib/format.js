// Patisserie Postcard: utility formatting preserves concise, reassuring commerce language.
export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export function formatDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(value));
}

export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
