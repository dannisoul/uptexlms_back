import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Curso } from 'src/entities/curso.entity'
import { DeleteResult, Not, Repository, UpdateResult } from 'typeorm'
import { CreateCursoDto } from './dto/create-curso.dto'
import { UpdateCursoDto } from './dto/update-curso.dto'
import { UsuarioService } from '../usuario/usuario.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CursoService {
  constructor (
        @InjectRepository(Curso) private cursoRepository: Repository<Curso>,
        private readonly usuarioService: UsuarioService,
        private readonly configService: ConfigService
  ) {}

  async findAll (): Promise<Curso[]> {
    return this.cursoRepository.find()
  }

  async findOne (idCurso: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { idCurso } })
    if (!curso) throw new NotFoundException(`No existe ningun curso con el id ${idCurso} en la base de datos`)
    return curso
  }

  async create (createCursoDto: CreateCursoDto): Promise<CreateCursoDto & Curso> {
    const cursoExists = await this.cursoRepository.findOne({ where: { nombre: createCursoDto.nombre } })
    if (cursoExists) throw new ConflictException('Ya existe un curso con ese nombre')
    return this.cursoRepository.save(createCursoDto)
  }

  async update (idCurso: number, curso: UpdateCursoDto): Promise<UpdateResult> {
    const cursoExists = await this.cursoRepository.findOne({ where: { idCurso } })
    if (!cursoExists) throw new NotFoundException(`No existe ningun curso con el id ${idCurso} en la base de datos`)
    if (curso.nombre) {
      const cursoNameRepit = await this.cursoRepository.findOne({ where: { nombre: curso.nombre, idCurso: Not(idCurso) } })
      if (cursoNameRepit) throw new ConflictException('Ya existe un curso con ese nombre')
    }
    return this.cursoRepository.update({ idCurso }, curso)
  }

  async delete (idCurso: number): Promise<DeleteResult> {
    const curso = await this.cursoRepository.findOne({ where: { idCurso } })
    if (!curso) throw new NotFoundException(`No existe ningun curso con el id ${idCurso} en la base de datos`)
    return this.cursoRepository.delete({ idCurso })
  }

  async findAllByTeacher (idTeacher: number, page: number, limit: number): Promise<any> {
    const usuario = await this.usuarioService.findOne(idTeacher)
    if (!usuario) throw new NotFoundException(`No existe ningun usuario con el id ${idTeacher} en la base de datos`)
    if (usuario.rol !== 2) throw new ConflictException('Este usuario no tiene el rol de docente')

    const [result, total] = await this.cursoRepository.findAndCount({
      where: { idUsuario: idTeacher },
      skip: (page - 1) * limit,
      take: limit
    })

    if (result.length === 0) {
      throw new NotFoundException('No hay cursos')
    }
    
    const baseUrl = this.configService.get<string>('BASE_URL') + 'curso/byTeacher/'
    const totalPaginas = Math.ceil(total / limit)
    const paginaSiguiente = page < totalPaginas ? `${baseUrl}${idTeacher}?page=${page + 1}&limit=${limit}` : null
    const paginaAnterior = page > 1 ? `${baseUrl}${idTeacher}?page=${page - 1}&limit=${limit}` : null

    return {
      cursos: result,
      total,
      totalPaginas,
      paginaActual: page,
      paginaSiguiente,
      paginaAnterior
    }
  }
}
