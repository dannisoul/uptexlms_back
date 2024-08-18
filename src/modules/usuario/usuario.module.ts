import { Module } from '@nestjs/common'
import { UsuarioController } from './usuario.controller'
import { UsuarioService } from './usuario.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Usuario } from '../../entities/usuario.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
