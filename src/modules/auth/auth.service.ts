import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UsuarioService } from '../usuario/usuario.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async login (correo: string, password: string): Promise<{access_token: string}> {
    try {
      const usuario = await this.usuarioService.findOneByCorreo(correo)
      console.log("este es el resultado: ", usuario)
      if (usuario.password !== password) throw new UnauthorizedException('Credenciales no válidas')
      const payload = {
        sub: usuario.idUsuario,
        paterno: usuario.paterno,
        materno: usuario.materno,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw new UnauthorizedException('Credenciales no válidas')
      throw error
    }
  }
}
