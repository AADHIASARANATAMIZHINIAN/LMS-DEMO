import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StudentController],
})
export class StudentModule {}
