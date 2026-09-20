import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, PrismaHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Transport, RedisOptions } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('docs', 'https://docs.nestjs.com'),
      () => this.prisma.pingCheck('database', prisma),
      () => this.microservice.pingCheck<RedisOptions>('redis', {
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
        },
      }),
    ]);
  }
}
