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
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  create(@Body() data) {
    return this.channelsService.create(data);
  }

  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data) {
    return this.channelsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.remove(+id);
  }
}
