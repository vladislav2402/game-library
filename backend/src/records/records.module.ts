import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Schedule } from 'src/entity/schedule.entity';
import { Book } from 'src/entity/book.entity';
import { Subject } from 'src/entity/subject.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Schedule, Book, Subject])],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule { }
