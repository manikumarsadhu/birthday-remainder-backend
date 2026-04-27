import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty({ example: 'fcm-token-here' })
  @IsString()
  fcmToken!: string;

  @ApiProperty({ example: 'android', enum: ['android', 'ios'] })
  @IsString()
  @IsIn(['android', 'ios'])
  platform!: string;

  @ApiProperty({ example: 'Samsung Galaxy S21', required: false })
  @IsString()
  deviceName?: string;
}
