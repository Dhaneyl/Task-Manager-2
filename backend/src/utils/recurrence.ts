import { IRecurrencePattern } from '../models/Task';

/**
 * Calculate the next occurrence date based on recurrence pattern
 */
export const calculateNextOccurrence = (
  currentDate: Date,
  pattern: IRecurrencePattern
): Date | null => {
  const nextDate = new Date(currentDate);

  switch (pattern.frequency) {
    case 'daily':
      nextDate.setDate(nextDate.getDate() + pattern.interval);
      break;

    case 'weekly':
      nextDate.setDate(nextDate.getDate() + (pattern.interval * 7));
      // If specific days of week are set, find the next matching day
      if (pattern.daysOfWeek && pattern.daysOfWeek.length > 0) {
        const currentDay = nextDate.getDay();
        const sortedDays = pattern.daysOfWeek.sort((a, b) => a - b);
        const nextDay = sortedDays.find(day => day > currentDay) || sortedDays[0];
        const daysToAdd = nextDay > currentDay ? nextDay - currentDay : 7 - currentDay + nextDay;
        nextDate.setDate(nextDate.getDate() + daysToAdd);
      }
      break;

    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + pattern.interval);
      // If specific day of month is set
      if (pattern.dayOfMonth) {
        nextDate.setDate(pattern.dayOfMonth);
      }
      break;

    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + pattern.interval);
      break;

    default:
      return null;
  }

  // Check if next occurrence exceeds end date
  if (pattern.endDate && nextDate > new Date(pattern.endDate)) {
    return null;
  }

  return nextDate;
};

/**
 * Check if a task should generate a new instance based on recurrence
 */
export const shouldGenerateNextInstance = (
  dueDate: Date,
  pattern: IRecurrencePattern,
  completed: boolean
): boolean => {
  if (!completed) return false;

  const now = new Date();
  const nextOccurrence = calculateNextOccurrence(dueDate, pattern);

  return nextOccurrence !== null && nextOccurrence <= now;
};
