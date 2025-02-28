import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Prisma } from '@prisma/client';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() data: Prisma.CampaignUncheckedCreateInput) {
    return this.campaignsService.create(data);
  }

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campaignsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampaignDto: Prisma.CampaignUpdateInput,
  ) {
    return this.campaignsService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.campaignsService.remove(+id);
  }
}
