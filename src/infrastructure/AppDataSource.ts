import 'reflect-metadata';
import { DataSource } from 'typeorm';
import PostTypeORM from '../domains/posts/Entity/Post.typeorm';
import * as dotenv from 'dotenv';
import ImageTypeORM from '../domains/images/Entity/Image.typeorm';

dotenv.config();
export const AppDataSource = new DataSource({
  url:
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/postgres',
  type: 'postgres',
  database: 'postgres',
  synchronize: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  // logging: true,
  entities: [PostTypeORM, ImageTypeORM],
  subscribers: [],
  migrations: [],
});
AppDataSource.initialize()
  .then(async () => {
    console.log('migrations', AppDataSource.migrations);
    await AppDataSource.runMigrations();
    console.log('We are at the environment: ', process.env.NODE_ENV);
  })
  .catch(err => console.error('Erro ao initializar banco de dados', err));
