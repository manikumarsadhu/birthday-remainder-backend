import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  private readonly logger = new Logger(DeviceService.name);

  constructor(private prisma: PrismaService) {}

  async register(dto: DeviceDto, userId: string) {
    const existing = await this.prisma.device.findUnique({
      where: { fcmToken: dto.fcmToken },
      include: { user: true },
    });

    if (existing) {
      if (existing.userId !== userId) {
        await this.prisma.device.update({
          where: { fcmToken: dto.fcmToken },
          data: { userId, isActive: true },
        });
        this.logger.log(
          `FCM token reassigned from user ${existing.userId} to ${userId}`,
        );
      } else if (!existing.isActive) {
        await this.prisma.device.update({
          where: { fcmToken: dto.fcmToken },
          data: { isActive: true },
        });
        this.logger.log(`FCM token reactivated for user: ${userId}`);
      }
      return {
        message: 'Device token registered',
        isNew: existing.userId === userId,
      };
    }

    const device = await this.prisma.device.create({
      data: { ...dto, userId },
    });

    this.logger.log(`New device registered for user: ${userId}`);

    return { device, isNew: true };
  }

  async remove(fcmToken: string, userId: string) {
    return this.prisma.device.updateMany({
      where: { fcmToken, userId },
      data: { isActive: false },
    });
  }

  async findAll(userId: string) {
    return this.prisma.device.findMany({
      where: { userId, isActive: true },
    });
  }
}
