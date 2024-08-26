import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { PaisService } from './pais.service'
import { UpdatePaisDto } from './dto/update-pais.dto'
import { CreatePaisDto } from './dto/create-pais.dto'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'

@Controller('pais')
@UseGuards(AuthGuard)
export class PaisController {
  constructor (
    private paisService: PaisService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.paisService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.paisService.findAll()
  }

  @Post()
  async create (@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto)
  }

  @Put(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaisDto: UpdatePaisDto
  ) {
    return this.paisService.update(id, updatePaisDto)
  }

  @Delete(':id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return this.paisService.delete(id)
  }
}
