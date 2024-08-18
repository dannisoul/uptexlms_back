import { Module } from '@nestjs/common'
import { CategoriaController } from './categoria.controller'
import { CategoriaService } from './categoria.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Categoria } from 'src/entities/categoria.entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]),
    JwtModule
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
