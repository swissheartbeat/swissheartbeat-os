import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignalModule } from './signal/signal.module';
import { PrismaModule } from './prisma/prisma.module';
import { EvidenceModule } from './evidence/evidence.module';

@Module({
  imports: [
    PrismaModule,
    SignalModule,
    EvidenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}