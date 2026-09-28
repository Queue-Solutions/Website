export function formatPrice(value, locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(value);
}
