import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { EspecialidadService } from './especialidad.service'
import { CreateEspecialidadDto } from './dto/create-especialidad.dto'
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'

@Controller('especialidad')
@UseGuards(AuthGuard)
export class EspecialidadController {
  constructor (
    private especialidadService: EspecialidadService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.especialidadService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.especialidadService.findAll()
  }

  @Post()
  async create (@Body() createEspecialidadDto: CreateEspecialidadDto) {
    return this.especialidadService.create(createEspecialidadDto)
  }

  @Put(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEspecialidadDto: UpdateEspecialidadDto
  ) {
    return this.especialidadService.update(id, updateEspecialidadDto)
  }
}
