import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTenantService {
  constructor(private readonly prisma: PrismaService) {}

  getClient(tenantId: string) {
    return this.prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }: any) {
            const tenantModels = [
              'User', 'Department', 'Program', 'Batch', 'Class', 'Course', 
              'CourseOffering', 'Student', 'Teacher', 'Coordinator'
            ];
            
            if (tenantModels.includes(model as string)) {
              if (['findUnique', 'findUniqueOrThrow', 'findFirst', 'findFirstOrThrow', 'findMany', 'count', 'update', 'updateMany', 'delete', 'deleteMany'].includes(operation)) {
                args.where = { ...(args.where || {}), tenantId };
              }
              if (['create'].includes(operation)) {
                args.data = { ...args.data, tenantId };
              }
              if (['createMany'].includes(operation)) {
                if (Array.isArray(args.data)) {
                  args.data = args.data.map((d: any) => ({ ...d, tenantId }));
                } else {
                  args.data = { ...args.data, tenantId };
                }
              }
            }
            return query(args);
          },
        },
      },
    });
  }
}
