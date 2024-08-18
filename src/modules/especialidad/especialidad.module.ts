import { Module } from '@nestjs/common'
import { EspecialidadController } from './especialidad.controller'
import { EspecialidadService } from './especialidad.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Especialidad } from '../../entities/especialidad.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialidad]),
    JwtModule
  ],
  controllers: [EspecialidadController],
  providers: [EspecialidadService]
})
export class EspecialidadModule {

}
