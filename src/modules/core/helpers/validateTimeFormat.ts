import { InvalidTimeFormatError } from '@core/helpers/exceptions/InvalidTimeFormatError';

export function validateTimeFormat(timeString: string): void {
  const timeRegex = /^(?:2[0-3]|[01]\d):\d\d$/; // Expressão regular para validar o formato HH:mm

  if (!timeRegex.test(timeString)) {
    throw new InvalidTimeFormatError(
      'Formato de tempo inválido. Por favor, use HH:mm.',
    );
  }
}
