import { Constructor, IPaginationData } from '@/interfaces/interfaceCommon';
import { t } from 'i18next';

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const renderPaginationInfo = (paginationData?: IPaginationData): string => {
  if (!paginationData) {
    return '';
  }
  const { currentPage, size, totalPages, totalRecords } = paginationData;

  if (!size) {
    return '';
  }

  const startIndex = (currentPage || 0) * size - size + 1;
  const endIndex = totalPages === currentPage ? totalRecords : startIndex + size - 1;

  return t('common.pagination.info', { startIndex, endIndex, totalRecords });
};

export const millisecondsToMinutesRound = (milliseconds: number): number => {
  return Math.round((milliseconds / 1000 / 60) * 100) / 100;
};

/**
 *
 * @warning untested.
 */
export const typeGuard = <T>(o: any, className: Constructor<T>): o is T => {
  return o instanceof className;
};

/**
 *
 * @param input any
 * @returns JSON `object`
 * @returns `undefined` if the input is an invalid JSON string.
 *
 * @example
 * safeStringToJSON('null'|'123'|'abc'|'undefined') => undefined
 * safeStringToJSON(null|123|undefined) => undefined
 * safeStringToJSON('{...any}') => ({...any})
 */
export const safeAnyToJSON = (input: any) => {
  try {
    const result = JSON.parse(input);
    return result && typeof result === 'object' ? result : undefined; // typeof null = 'object'
  } catch (_) {
    return undefined;
  }
};
