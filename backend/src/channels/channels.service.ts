import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ChannelCreateInput) {
    return this.prisma.channel.create({ data });
  }

  findAll() {
    return this.prisma.channel.findMany();
  }

  findOne(id: number) {
    return this.prisma.channel.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ChannelUpdateInput) {
    return this.prisma.channel.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.campaign.delete({ where: { id } });
  }
}
