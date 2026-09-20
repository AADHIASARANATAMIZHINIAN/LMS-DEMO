import { Controller, Post, Body, Res, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; passwordString: string; domain: string }, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(body.email, body.passwordString, body.domain);
    
    // HTTP-only cookie for security
    res.cookie('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return { success: true, user: { id: user.id, email: user.email, roles: user.userRoles.map((r: any) => r.role.name) } };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.session_token;
    if (token) {
      await this.authService.logout(token);
    }
    res.clearCookie('session_token');
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return {
      id: req.user.id,
      email: req.user.email,
      tenantId: req.user.tenantId,
      tenantName: req.user.tenant?.name ?? null,
      roles: req.user.userRoles.map((r: any) => r.role.name),
    };
  }
}
