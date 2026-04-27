import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
  imports: [PrismaModule],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
