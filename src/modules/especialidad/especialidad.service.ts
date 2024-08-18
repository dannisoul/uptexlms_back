import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Especialidad } from '../../entities/especialidad.entity'
import { Not, Repository, UpdateResult } from 'typeorm'
import { CreateEspecialidadDto } from './dto/create-especialidad.dto'
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto'

@Injectable()
export class EspecialidadService {
  constructor (
        @InjectRepository(Especialidad) private especialidadRepository : Repository<Especialidad>
  ) {}

  async findOne (idEspecialidad: number): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOne({ where: { idEspecialidad } })
    if (!especialidad) throw new NotFoundException()
    return especialidad
  }

  async findAll (): Promise<Especialidad[]> {
    return this.especialidadRepository.find()
  }

  async create (createEspecialidadDto: CreateEspecialidadDto): Promise<Especialidad & CreateEspecialidadDto> {
    const especialidadExists = await this.especialidadRepository.findOne({ where: { nombre: createEspecialidadDto.nombre } })
    if (especialidadExists) throw new ConflictException('Esta especialidad ya esta en la base de datos')
    const especialidad = await this.especialidadRepository.save(createEspecialidadDto)
    return especialidad
  }

  async update (idEspecialidad: number, updateEspecialidadDto: UpdateEspecialidadDto): Promise<UpdateResult> {
    const especialidad = await this.especialidadRepository.findOne({ where: { idEspecialidad } })
    if (!especialidad) throw new NotFoundException(`La especialidad con el id ${idEspecialidad} no se encuentra en la base de datos`)
    const especialidadExists = await this.especialidadRepository.findOne({ where: { nombre: updateEspecialidadDto.nombre, idEspecialidad: Not(idEspecialidad) } })
    if (especialidadExists) throw new ConflictException('El nombre de esta especialidad ya esta en la base de datos')
    const result = await this.especialidadRepository.update(idEspecialidad, updateEspecialidadDto)
    return result
  }
}
