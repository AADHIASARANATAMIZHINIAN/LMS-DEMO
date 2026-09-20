import { CoordinatorModule } from "./coordinator/coordinator.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';

import { ExecutionModule } from './execution/execution.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule, AuthModule, CoordinatorModule, ExecutionModule, OwnerModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
