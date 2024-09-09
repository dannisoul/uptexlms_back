import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from 'src/entities/grupo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grupo]),
    JwtModule
  ],
  providers: [GrupoService],
  controllers: [GrupoController],
  exports: [GrupoService],
})
export class GrupoModule {}
