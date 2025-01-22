import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ChannelCreateInput) {
    return this.prisma.channel.create({ data });
  }

  async findAll() {
    return this.prisma.channel.findMany();
  }

  async findOne(id: number) {
    return this.prisma.channel.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ChannelUpdateInput) {
    return this.prisma.channel.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.channel.delete({ where: { id } });
  }
}
