export default function formatNumber(price: number | null | undefined) {
  if (price !== undefined && price !== null) {
    const isNegative = price < 0;
    const absolutePrice = Math.abs(price);

    const priceString = absolutePrice.toString();
    let integerPart;
    let decimalPart = '00';

    if (priceString.length === 6) {
      integerPart = priceString.substring(0, 1);
      const middleDigits = priceString.substring(1, 4);
      integerPart += (middleDigits !== '000') ? `,${middleDigits}` : '';
      decimalPart = priceString.substring(4);
    } else {
      integerPart = priceString.substring(0, priceString.length - 2);
      decimalPart = priceString.substring(priceString.length - 2);
    }

    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const formattedIntegerPart = isNegative ? `-${integerPart}` : integerPart;

    return `${formattedIntegerPart}.${decimalPart}`;
  }
  return '';
}

// Utility functions to prevent precision loss in currency calculations
export function safeAdd(a: number, b: number): number {
  return Math.round((a + b) * 100) / 100;
}

export function safeSubtract(a: number, b: number): number {
  return Math.round((a - b) * 100) / 100;
}

export function safeMultiply(a: number, b: number): number {
  return Math.round(a * b * 100) / 100;
}

export function safeDivide(a: number, b: number): number {
  return Math.round((a / b) * 100) / 100;
}

// Convert to cents to avoid floating point precision issues
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

// Convert from cents back to decimal
export function fromCents(cents: number): number {
  return cents / 100;
}
