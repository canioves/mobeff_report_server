import { Module } from '@nestjs/common';
import { AppController } from './report.controller';
import { AppService } from './report.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
