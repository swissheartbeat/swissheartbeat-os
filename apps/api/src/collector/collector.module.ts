import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service';
import { CollectorController } from './collector.controller';
import { RssCollector } from './rss/rss.collector';
import { SignalModule } from '../signal/signal.module';

@Module({
  imports: [SignalModule],
  controllers: [CollectorController],
  providers: [CollectorService, RssCollector],
  exports: [CollectorService],
})
export class CollectorModule {}