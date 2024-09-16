import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from 'src/entities/unidad.entity';
import { UnidadController } from './unidad.controller';
import { UnidadService } from './unidad.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Unidad]),
        JwtModule
    ],
    controllers: [UnidadController],
    providers: [UnidadService],
    exports: [UnidadService],
})
export class UnidadModule {}
