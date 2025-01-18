import { Injectable } from '@nestjs/common';
import { Campaign, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CampaignCreateInput) {
    return this.prisma.campaign.create({ data });
  }

  async findAll(
    orderBy?: Prisma.CampaignOrderByWithRelationInput,
    where?: Prisma.CampaignWhereUniqueInput,
  ) {
    return this.prisma.campaign.findMany({ orderBy, where });
  }

  async findOne(id: number) {
    return this.prisma.campaign.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CampaignUpdateInput) {
    return this.prisma.campaign.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.campaign.delete({ where: { id } });
  }
}
