import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';

@Injectable()
export class SignalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSignalDto: CreateSignalDto) {
    return this.prisma.signal.create({
      data: {
        title: createSignalDto.title,
        description: createSignalDto.description,
        source: createSignalDto.source,
        url: createSignalDto.url,
      },
    });
  }

  async findAll() {
    return this.prisma.signal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.signal.findUnique({
      where: {
        id,
      },
    });
  }

    async update(id: string, updateSignalDto: UpdateSignalDto) {
    return this.prisma.signal.update({
      where: {
        id,
      },
      data: updateSignalDto,
    });
  }

  async remove(id: string) {
    return this.prisma.signal.delete({
      where: {
        id,
      },
    });
  }
}