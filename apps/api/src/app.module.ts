import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { ExecutionModule } from './execution/execution.module';
import { OwnerModule } from './owner/owner.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule, 
    HttpModule, 
    PrismaModule, 
    AuthModule, 
    CoordinatorModule,
    TeacherModule,
    StudentModule, 
    ExecutionModule, 
    OwnerModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
