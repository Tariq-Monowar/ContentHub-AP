import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Token not found in Authorization header');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token);
        request.user = payload;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  
    private extractTokenFromHeader(request: any): string | undefined {
      const authHeader = request.headers.authorization;
  
      if (!authHeader) return undefined;
  
      const parts = authHeader.split(' ');
  
      // Accept both "Bearer <token>" or just "<token>"
      if (parts.length === 2) {
        return parts[1]; // assume format like "Bearer <token>" or "JWT <token>"
      } else if (parts.length === 1) {
        return parts[0]; // assume just the token without prefix
      }
  
      return undefined;
    }
  }
  