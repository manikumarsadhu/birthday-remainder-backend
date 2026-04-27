import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';

@Injectable()
export class BirthdayService {
  private readonly logger = new Logger(BirthdayService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBirthdayDto, userId: string) {
    const birthday = await this.prisma.birthday.create({
      data: {
        name: dto.name,
        dateOfBirth: new Date(dto.dateOfBirth),
        reminderDays: dto.reminderDays ?? 1,
        reminderTime: dto.reminderTime,
        relationship: dto.relationship,
        notes: dto.notes,
        userId,
      },
    });

    this.logger.log(`Birthday created: ${birthday.id} for user: ${userId}`);

    return birthday;
  }

  async findAll(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [birthdays, total] = await Promise.all([
      this.prisma.birthday.findMany({
        where: { userId, isActive: true },
        orderBy: { dateOfBirth: 'asc' },
        take: limit,
        skip,
      }),
      this.prisma.birthday.count({
        where: { userId, isActive: true },
      }),
    ]);

    return {
      data: birthdays,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: string, userId: string) {
    const existing = await this.prisma.birthday.findFirst({
      where: { id, userId, isActive: true },
    });

    if (!existing) {
      throw new NotFoundException('Birthday not found');
    }

    const birthday = await this.prisma.birthday.update({
      where: { id },
      data: { isActive: false },
    });

    this.logger.log(`Birthday removed: ${id} by user: ${userId}`);

    return birthday;
  }
}
