// 0-255 → '00'-'ff'
export const decimalToHex = (dec: any) => {
  const tempHex = dec.toString(16);
  return (tempHex.length === 1 ? '0' : '') + tempHex;
  /**
   * padStart not compatible with Chrome 54 and older.
   * return dec.toString(16).padStart(2, '0');
   */
};

export const generateUniqueString = () => {
  const arr = new Uint8Array(40 / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, decimalToHex).join('');
};

export const safeAnyToNumber = (inputVal: any, fallbackNum = 0) => {
  const result = Number(inputVal);
  return isNaN(result) ? fallbackNum : result;
};

/**
 *
 * @param x input number
 * @param round number of fractional digits (the right of the decimal point)
 * @returns rounded number
 *
 * @example
 * numberRounding(12.78915, 2) => 12.79
 * numberRounding(50.700233, 3) => 50.7
 * numberRounding(50.700233, null|undefined|0) => 51
 */
export const numberRounding = (x: number, round = 0): number => {
  const roundProcess = 10 ** round;
  return Math.round((x + Number.EPSILON) * roundProcess) / roundProcess;
};

/**
 *
 * @param x input number
 * @param round number of fractional digits (the right of the decimal point)
 * @returns a decimal string
 *
 * @example
 * decimalization(12.78915, 2) => "12.79"
 * decimalization(50.700233, 3) => "50.700"
 * decimalization(50.700233, null|undefined|0) => "51"
 */
export const decimalization = (x: number, round = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: round,
    maximumFractionDigits: round,
    useGrouping: false,
  }).format(x);
};

/**
 *
 * @param x input number
 * @param f fractionDigits - Defaults to as many digits as necessary to specify the number (undefined).
 * @returns a decimal string
 *
 * @example
 * exponential(12.78915, 2) => "1.28e+1"
 * exponential(75.396, 3) => "7.540e+1"
 * exponential(75.396) => "7.5396e+1"
 * exponential(75.396, null|0) => "8e+1"
 * exponential(0.0075396) => "7.5396e-3"
 * exponential(0.0075396, null|0) => "8e-3"
 * exponential("sthNaN", any) => "NaN"
 */
export const exponential = (x: number | string, f?: number) => {
  return Number.parseFloat(x.toString()).toExponential(f);
};
