/** Two-digit, one-based list index: 0 -> "01". */
export const pad = (i: number) => String(i + 1).padStart(2, '0');
