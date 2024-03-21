import { Entity } from 'src/helpers/Entity';

export class RestaurantOpeningHour extends Entity {
  constructor(input: Partial<RestaurantOpeningHour>) {
    super(input);
  }

  dayOfWeek: number;
  openingTime: string;
  openingDurationMinutes: number;
  restaurantId: string;
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function calculateOpeningDurationMinutes(openingTime, closingTime) {
  const openingTimeMinutes = timeToMinutes(openingTime);
  let closingTimeMinutes = timeToMinutes(closingTime);

  if (closingTimeMinutes < openingTimeMinutes) {
    closingTimeMinutes += 24 * 60;
  }
  const openingDurationMinutes = closingTimeMinutes - openingTimeMinutes;

  return Number(openingDurationMinutes);
}
