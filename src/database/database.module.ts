import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]  // Add this line to export the service
})
export class DatabaseModule {}
