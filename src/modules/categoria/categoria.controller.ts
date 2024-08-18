import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { CategoriaService } from './categoria.service'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'

@Controller('categoria')
@UseGuards(AuthGuard)
export class CategoriaController {
  constructor (
        private categoriaService: CategoriaService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.categoriaService.findAll()
  }

  @Post()
  async create (@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto)
  }

  @Put(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto
  ) {
    return this.categoriaService.update(id, updateCategoriaDto)
  }
}
