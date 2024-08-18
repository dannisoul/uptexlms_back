import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Nivel } from 'src/entities/nivel.entity'
import { Repository, UpdateResult } from 'typeorm'
import { CreateNivelDto } from './dto/create-nivel.dto'
import { UpdateNivelDto } from './dto/update-nivel.dto'

@Injectable()
export class NivelService {
  constructor (
        @InjectRepository(Nivel) private nivelRepository: Repository<Nivel>
  ) {}

  async findOne (idNivel: number): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({ where: { idNivel } })
    if (!nivel) throw new NotFoundException(`El nivel con el id ${idNivel} no existe en la base de datos`)
    return nivel
  }

  async findAll () {
    return this.nivelRepository.find()
  }

  async create (createNivelDto: CreateNivelDto): Promise<CreateNivelDto & Nivel> {
    const nivelExists = await this.nivelRepository.findOne({ where: { nombre: createNivelDto.nombre } })
    if (nivelExists) throw new ConflictException('Este nivel ya esta en la base de datos')
    return this.nivelRepository.save(createNivelDto)
  }

  async update (idNivel: number, updateNivelDto: UpdateNivelDto): Promise<UpdateResult> {
    const nivel = await this.nivelRepository.findOne({ where: { idNivel } })
    if (!nivel) throw new NotFoundException(`El nivel con el id ${idNivel} no existe en la base de datos`)
    const nivelExists = await this.nivelRepository.findOne({ where: { nombre: updateNivelDto.nombre } })
    if (nivelExists) throw new ConflictException('Esta nivel ya esta en la base de datos')
    return this.nivelRepository.update(idNivel, updateNivelDto)
  }
}
