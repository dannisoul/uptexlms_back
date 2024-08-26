import { Module } from '@nestjs/common'
import { PaisController } from './pais.controller'
import { PaisService } from './pais.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pais } from 'src/entities/pais.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Pais]),
    JwtModule
  ],
  controllers: [PaisController],
  providers: [PaisService]
})
export class PaisModule {}
