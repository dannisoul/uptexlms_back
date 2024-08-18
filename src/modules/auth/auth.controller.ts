import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dt'

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login (@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.correo, loginDto.password)
  }
}
