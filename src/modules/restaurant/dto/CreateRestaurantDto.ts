export class CreateRestaurantDto {
  id: string;
  name: string;
  urlImage: string;

  address: Address;

  openingHours: OpeningHours[];
}

export class Address {
  street: string;
  streetNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export class OpeningHours {
  dayOfWeek: number;
  openingTime: string;
  closingTime: string;
  openingDurationMinutes: number;
}
