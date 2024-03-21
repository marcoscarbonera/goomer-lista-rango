import { config as dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv({ path: resolve('./.env') });
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PORT = process.env.PORT || '3000';

export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
export const POSTGRES_DB = process.env.POSTGRES_DB || '';
export const POSTGRES_CONNECTION_LIMIT =
  Number(process.env.POSTGRES_CONNECTION_LIMIT) || 10;
export const POSTGRES_CONNECTION_TIMEOUT =
  Number(process.env.POSTGRES_CONNECTION_TIMEOUT) || 30000;
