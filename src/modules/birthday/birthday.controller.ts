import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { BirthdayService } from './birthday.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Birthdays')
@Controller('birthdays')
export class BirthdayController {
  private readonly logger = new Logger(BirthdayController.name);

  constructor(private service: BirthdayService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new birthday' })
  @ApiResponse({ status: 201, description: 'Birthday created' })
  create(
    @Body() dto: CreateBirthdayDto,
    @Request() req: { user: { userId: string } },
  ) {
    this.logger.log(`Creating birthday for user: ${req.user.userId}`);
    return this.service.create(dto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all birthdays' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Request() req: { user: { userId: string } },
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.service.findAll(req.user.userId, page, limit);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a birthday (soft delete)' })
  remove(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.service.remove(id, req.user.userId);
  }
}
