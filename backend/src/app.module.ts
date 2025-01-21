import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [CampaignsModule, ChannelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
