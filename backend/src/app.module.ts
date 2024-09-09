import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RecordsModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
