import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationService } from './notification.service';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [PrismaModule],
  providers: [NotificationService, SchedulerService],
  exports: [NotificationService, SchedulerService],
})
export class NotificationModule {}
