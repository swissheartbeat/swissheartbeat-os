import { Controller, Get } from '@nestjs/common';
import { CollectorService } from './collector.service';

@Controller('collector')
export class CollectorController {
  constructor(private readonly collectorService: CollectorService) {}

  @Get()
  async collect() {
    return this.collectorService.collect();
  }
}