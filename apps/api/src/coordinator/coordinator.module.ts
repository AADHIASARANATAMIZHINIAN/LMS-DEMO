import { Module } from '@nestjs/common';
import { CoordinatorController } from './coordinator.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CoordinatorController],
})
export class CoordinatorModule {}
