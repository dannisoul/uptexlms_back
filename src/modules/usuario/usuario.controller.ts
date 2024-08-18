import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { UsuarioService } from './usuario.service'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { AuthGuard } from 'src/common/guards/auth/auth.guard'

@Controller('usuario')
@UseGuards(AuthGuard)
export class UsuarioController {
  constructor (
        private usuarioService: UsuarioService
  ) {}

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id)
  }

  @Get()
  async findAll () {
    return this.usuarioService.findAll()
  }

  @Post()
  async create (@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto)
  }

  @Put(':id')
  async update (@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto)
  }
}
