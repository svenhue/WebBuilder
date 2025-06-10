import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { auditPlugin } from './auditing/plugins/audit.plugin';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        // Apply the audit plugin globally to all schemas
        mongoose.plugin(auditPlugin);
        
        return {
          uri: 'mongodb://localhost:27017/WebBuilder',
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
