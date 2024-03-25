export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function calculateDurationMinutes(openingTime, closingTime) {
  const timetoMinutes = timeToMinutes(openingTime);
  let closingTimeMinutes = timeToMinutes(closingTime);

  if (closingTimeMinutes < timetoMinutes) {
    closingTimeMinutes += 24 * 60;
  }
  const openingDurationMinutes = closingTimeMinutes - timetoMinutes;

  validateTimeToOpeningDurationMinutes(openingDurationMinutes);

  return Number(openingDurationMinutes);
}

function validateTimeToOpeningDurationMinutes(openingDurationMinutes: number) {
  if (openingDurationMinutes < 15) {
    throw new Error('A duração de abertura deve ser maior que 15 minutos');
  }
}
