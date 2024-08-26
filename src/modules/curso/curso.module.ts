import { Module } from '@nestjs/common'
import { CursoService } from './curso.service'
import { CursoController } from './curso.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Curso } from 'src/entities/curso.entity'
import { JwtModule } from '@nestjs/jwt'
import { UsuarioModule } from '../usuario/usuario.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    JwtModule,
    UsuarioModule
  ],
  providers: [CursoService],
  controllers: [CursoController],
  exports: [CursoService]
})
export class CursoModule {}
