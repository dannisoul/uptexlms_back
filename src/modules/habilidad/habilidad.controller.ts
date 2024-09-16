import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { HabilidadService } from './habilidad.service'
import { CreateHabilidadDto } from './dto/create-habilidad.dto'
import { UpdateHabilidadDto } from './dto/update-habilidad.dto'

@Controller('habilidad')
export class HabilidadController {
  constructor (
        private habilidadService: HabilidadService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.habilidadService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.habilidadService.findAll()
  }

  @Post()
  async create (@Body() createHabilidadDto: CreateHabilidadDto) {
    return this.habilidadService.create(createHabilidadDto)
  }

  @Put(':id')
  async update (
            @Param('id', ParseIntPipe) id: number,
            @Body() updateHabilidadDto: UpdateHabilidadDto
  ) {
    return this.habilidadService.update(id, updateHabilidadDto)
  }

  @Delete(':id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return this.habilidadService.delete(id)
  }
}
