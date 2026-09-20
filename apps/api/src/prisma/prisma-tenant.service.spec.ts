import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaTenantService } from './prisma-tenant.service';
import { PrismaService } from './prisma.service';

describe('PrismaTenantService', () => {
  let service: PrismaTenantService;
  let prisma: PrismaService;

  beforeEach(async () => {
    // Mock the Prisma service methods
    const mockPrismaService = {
      $extends: vi.fn().mockImplementation((config) => {
        // Return a dummy client that captures query arguments
        return {
          user: {
            findMany: async (args: any) => {
              // Simulate the extension logic
              const resultArgs = { ...args };
              const mockQuery = (a: any) => a;
              return config.query.$allModels.$allOperations({ 
                model: 'User', 
                operation: 'findMany', 
                args: resultArgs, 
                query: mockQuery 
              });
            }
          }
        };
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaTenantService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PrismaTenantService>(PrismaTenantService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should automatically append tenantId to queries', async () => {
    const tenantId = 'test-tenant-123';
    const tenantClient = service.getClient(tenantId);
    
    // Call our mocked extension
    const queryArgs = await (tenantClient as any).user.findMany({ where: { isActive: true } });
    
    // Assert that the tenantId was securely injected into the where clause
    expect(queryArgs.where).toEqual({
      isActive: true,
      tenantId: tenantId
    });
  });

  it('should override frontend-supplied tenantId with the verified backend tenantId', async () => {
    const backendTenantId = 'secure-backend-tenant';
    const tenantClient = service.getClient(backendTenantId);
    
    // User attempts to inject a different tenant ID
    const queryArgs = await (tenantClient as any).user.findMany({ 
      where: { tenantId: 'malicious-tenant-id' } 
    });
    
    // Assert backend overwrites it
    expect(queryArgs.where.tenantId).toEqual(backendTenantId);
  });
});
