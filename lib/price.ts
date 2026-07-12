/**
 * Parse a euro-formatted price string into a number.
 * Handles formats like "€16.50", "€16,50", "16.50", "€ 16,50 €".
 */
export function parsePrice(price: string): number {
  return parseFloat(price.replace("€", "").replace(",", ".").trim());
}
