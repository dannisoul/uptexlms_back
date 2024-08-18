import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { NivelService } from './nivel.service'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'
import { UpdateNivelDto } from './dto/update-nivel.dto'
import { CreateNivelDto } from './dto/create-nivel.dto'

@Controller('nivel')
@UseGuards(AuthGuard)
export class NivelController {
  constructor (
        private nivelService: NivelService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.nivelService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.nivelService.findAll()
  }

  @Post()
  async create (@Body() createNivelDto: CreateNivelDto) {
    return this.nivelService.create(createNivelDto)
  }

  @Put(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNivelDto: UpdateNivelDto
  ) {
    return this.nivelService.update(id, updateNivelDto)
  }
}
