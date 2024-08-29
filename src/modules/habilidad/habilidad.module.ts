import { Module } from '@nestjs/common'
import { HabilidadController } from './habilidad.controller'
import { HabilidadService } from './habilidad.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Habilidad } from 'src/entities/habilidad.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Habilidad]),
    JwtModule
  ],
  controllers: [HabilidadController],
  providers: [HabilidadService],
  exports: [TypeOrmModule]
})
export class HabilidadModule {}
