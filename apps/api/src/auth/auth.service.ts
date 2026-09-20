import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(email: string, passwordString: string, domain: string) {
    const tenant = await this.prisma.tenant.findUnique({ where: { domain } });
    if (!tenant) throw new UnauthorizedException('Invalid institution domain');

    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
      include: { userRoles: { include: { role: true } } }
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(passwordString, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isStudent = user.userRoles.some((ur: any) => ur.role.name === 'STUDENT');
    if (isStudent) {
      await this.prisma.authSession.deleteMany({
        where: { userId: user.id }
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    const session = await this.prisma.authSession.create({
      data: {
        userId: user.id,
        token,
        expiresAt
      }
    });

    return { token: session.token, user };
  }

  async logout(token: string) {
    await this.prisma.authSession.deleteMany({
      where: { token }
    });
  }

  async validateSession(token: string) {
    const session = await this.prisma.authSession.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            userRoles: { include: { role: true } },
            tenant: true
          }
        }
      }
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session.user;
  }
}
