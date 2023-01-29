import 'reflect-metadata';
import { DataSource } from 'typeorm';
import PostTypeORM from '../domains/posts/Entity/Post.typeorm';
import PeopleTypeORM from '../domains/people/Entity/People.typeorm';
import ScaleTypeORM, {
  BandTypeORM,
} from '../domains/scales/Entity/Scale.typeorm';
import * as dotenv from 'dotenv';
import { initialSeed1670163084200 } from './migrations/1670163084200-initialSeed';
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
  entities: [
    PostTypeORM,
    PeopleTypeORM,
    ScaleTypeORM,
    BandTypeORM,
    ImageTypeORM,
  ],
  subscribers: [],
  migrations: [initialSeed1670163084200],
});
AppDataSource.initialize()
  .then(async () => {
    console.log('migrations', AppDataSource.migrations);
    await AppDataSource.runMigrations();
    console.log('We are at the environment: ', process.env.NODE_ENV);
  })
  .catch(err => console.error('Erro ao initializar banco de dados', err));
