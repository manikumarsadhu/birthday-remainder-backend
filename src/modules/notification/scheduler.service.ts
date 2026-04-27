import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from './notification.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private notifier: NotificationService,
  ) {}

  @Cron('0 9 * * *')
  async checkBirthdays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthdays = await this.prisma.birthday.findMany({
      where: { isActive: true },
      include: { user: { include: { devices: true } } },
    });

    for (const b of birthdays) {
      const nextBirthday = this.getNextBirthday(b.dateOfBirth, today);

      const daysUntil = Math.ceil(
        (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysUntil === b.reminderDays && b.user.devices.length > 0) {
        const notifications = b.user.devices.map((device) =>
          this.notifier
            .send(
              device.fcmToken,
              'Birthday Reminder 🎂',
              `${b.name}'s birthday is coming in ${daysUntil} day${daysUntil === 1 ? '' : 's'}!`,
            )
            .catch((err) =>
              this.logger.error(
                `Failed to send to ${device.fcmToken}: ${err.message}`,
              ),
            ),
        );
        await Promise.all(notifications);
      }
    }
  }

  private getNextBirthday(dateOfBirth: Date, today: Date): Date {
    const birth = new Date(dateOfBirth);
    const next = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );

    if (next < today) {
      next.setFullYear(today.getFullYear() + 1);
    }

    return next;
  }
}
