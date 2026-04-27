import {
  IsString,
  IsDateString,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBirthdayDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '1990-05-15' })
  @IsDateString()
  dateOfBirth!: string;

  @ApiPropertyOptional({
    example: 7,
    description: 'Days before birthday to send reminder',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  reminderDays?: number;

  @ApiPropertyOptional({ example: '09:00' })
  @IsOptional()
  @IsString()
  reminderTime?: string;

  @ApiPropertyOptional({ example: 'Friend' })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
