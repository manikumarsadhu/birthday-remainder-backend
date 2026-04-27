import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';
import { BirthdayService } from './birthday.service';
import { BirthdayController } from './birthday.controller';

@Module({
  imports: [PrismaModule, NotificationModule],
  providers: [BirthdayService],
  controllers: [BirthdayController],
  exports: [BirthdayService],
})
export class BirthdayModule {}
