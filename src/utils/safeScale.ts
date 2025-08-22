import { moderateScale } from 'react-native-size-matters';

/**
 * Safe scaling function that prevents precision loss errors
 * @param size - The size to scale
 * @returns The scaled size as an integer
 */
export function safeScale(size: number): number {
  // Ensure the size is a valid number
  if (typeof size !== 'number' || isNaN(size)) {
    return 0;
  }
  
  // Use moderateScale without the factor parameter to avoid precision issues
  const scaledSize = moderateScale(size);
  
  // Round to nearest integer to prevent floating point precision issues
  return Math.round(scaledSize);
}

/**
 * Safe scaling function for specific use cases where you need more control
 * @param size - The size to scale
 * @param factor - Optional factor (defaults to 0.5 for moderate scaling)
 * @returns The scaled size as an integer
 */
export function safeScaleWithFactor(size: number, factor: number = 0.5): number {
  // Ensure the size and factor are valid numbers
  if (typeof size !== 'number' || isNaN(size) || typeof factor !== 'number' || isNaN(factor)) {
    return 0;
  }
  
  // Use moderateScale with the factor
  const scaledSize = moderateScale(size, factor);
  
  // Round to nearest integer to prevent floating point precision issues
  return Math.round(scaledSize);
}

/**
 * Safe scaling function that handles edge cases and provides fallbacks
 * @param size - The size to scale
 * @param fallback - Fallback size if scaling fails
 * @returns The scaled size or fallback
 */
export function safeScaleWithFallback(size: number, fallback: number = 16): number {
  try {
    const scaledSize = safeScale(size);
    return scaledSize > 0 ? scaledSize : fallback;
  } catch (error) {
    console.warn('Scaling failed, using fallback:', error);
    return fallback;
  }
}
