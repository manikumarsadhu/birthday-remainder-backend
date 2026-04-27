import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { DeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Devices')
@Controller('devices')
export class DeviceController {
  private readonly logger = new Logger(DeviceController.name);

  constructor(private service: DeviceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register FCM device token' })
  async register(
    @Body() dto: DeviceDto,
    @Request() req: { user: { userId: string } },
  ) {
    this.logger.log(`Registering device for user: ${req.user.userId}`);
    return this.service.register(dto, req.user.userId);
  }
}
