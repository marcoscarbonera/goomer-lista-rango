import { DeepPartial } from 'typeorm';

export abstract class Entity {
  protected constructor(input?: DeepPartial<Entity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        (this as any)[key] = value;
      }
    }
  }
}
