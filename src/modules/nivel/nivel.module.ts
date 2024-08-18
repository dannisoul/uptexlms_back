import { Module } from '@nestjs/common'
import { NivelController } from './nivel.controller'
import { NivelService } from './nivel.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Nivel } from 'src/entities/nivel.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Nivel]),
    JwtModule
  ],
  controllers: [NivelController],
  providers: [NivelService]
})
export class NivelModule {}
