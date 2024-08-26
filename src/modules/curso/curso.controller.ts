import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { CursoService } from './curso.service'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'
import { CreateCursoDto } from './dto/create-curso.dto'
import { UpdateCursoDto } from './dto/update-curso.dto'

@Controller('curso')
@UseGuards(AuthGuard)
export class CursoController {
  constructor (
        private cursoService: CursoService
  ) {}

    @Get()
  async findAll () {
    return this.cursoService.findAll()
  }

    @Get(':id')
    async findOne (@Param('id', ParseIntPipe) idCurso: number) {
      return this.cursoService.findOne(idCurso)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create (@Body() createCursoDto: CreateCursoDto) {
      return this.cursoService.create(createCursoDto)
    }

    @Patch(':id')
    async update (@Param('id', ParseIntPipe) IdCurso: number, @Body() updateCursoDto: UpdateCursoDto) {
      return this.cursoService.update(IdCurso, updateCursoDto)
    }

    @Delete(':id')
    async delete (@Param('id', ParseIntPipe) idCurso: number) {
      return this.cursoService.delete(idCurso)
    }

    @Get('byTeacher/:id')
    async findAllByTeacher (@Param('id', ParseIntPipe) idTeacher: number) {
      console.log('Entro sin paginacion')
      return this.cursoService.findAllByTeacher(idTeacher)
    }

    @Get('byTeacher/:id/paginated')
    async findAllByTeacherPagination (
        @Param('id', ParseIntPipe) idTeacher: number,
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10
    ) {
      return this.cursoService.findAllByTeacherPagination(idTeacher, page, limit)
    }
}
