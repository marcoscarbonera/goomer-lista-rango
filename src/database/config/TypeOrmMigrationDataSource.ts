import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmConfig } from './TypeOrmConfig';
import { join } from 'path';

const TypeOrmMigrationConfig: PostgresConnectionOptions = {
  ...(TypeOrmConfig as PostgresConnectionOptions),

  migrationsTableName: 'Migration',
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
};
const typeOrmMigrationDataSource = new DataSource(TypeOrmMigrationConfig);

typeOrmMigrationDataSource.initialize();

export default typeOrmMigrationDataSource;
