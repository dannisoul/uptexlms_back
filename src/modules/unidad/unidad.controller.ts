import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { UnidadService } from './unidad.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-curso.dto';

@Controller('unidad')
@UseGuards(AuthGuard)
export class UnidadController {
    constructor(private unidadService: UnidadService){}

    @Get(':id')
    async findAllByCurso(@Param('id', ParseIntPipe) idCurso: number){
        return this.unidadService.findAllByCurso(idCurso)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUnidadDto: CreateUnidadDto){
        return this.unidadService.create(createUnidadDto)
    }
    
    @Patch(':id')
    async update(@Param('id', ParseIntPipe) idUnidad: number, @Body() updateUnidadDto: UpdateUnidadDto){
        return this.unidadService.update(idUnidad, updateUnidadDto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) idUnidad: number){
        return this.unidadService.delete(idUnidad)
    }
}
