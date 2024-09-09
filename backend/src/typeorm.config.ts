import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';
import { Schedule } from './entity/schedule.entity';
import { Subject } from './entity/subject.entity';

export const ApiEntities = [User, Book, Subject, Schedule];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'crudapp',
  username: 'postgres',
  password: '123',
  entities: ApiEntities,
  logging: ['query', 'error'],
  synchronize: true,
};
