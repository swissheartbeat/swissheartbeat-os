import { Controller, Get } from '@nestjs/common';
import { SignalService } from './signal.service';

@Controller('signals')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Get()
  findAll() {
    return this.signalService.findAll();
  }
}