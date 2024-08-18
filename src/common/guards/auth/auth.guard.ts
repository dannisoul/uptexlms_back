import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async canActivate (
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeaders(request)
    if (!token) throw new UnauthorizedException('Se necesita proporcionar un token de acceso')
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') })
      request.usuario = payload
      return true
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado')
    }
  }

  extractTokenFromHeaders (request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
