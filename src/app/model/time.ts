import { endOfDay, startOfDay } from 'date-fns';

export interface StartDateEndDate {
  start: number;
  end: number;
}
export function add0(a: number): string {
  return a >= 0 && a <= 9 ? `0${a}` : a.toString();
}
export function isWithin(date: number, start: number, end?: number): boolean {
  const startDate = startOfDay(start).getTime();
  const endDate = end ? endOfDay(end).getTime() : Infinity;
  return date >= startDate && date <= endDate;
}
