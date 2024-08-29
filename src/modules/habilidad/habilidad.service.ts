import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Habilidad } from 'src/entities/habilidad.entity'
import { Not, Repository, UpdateResult } from 'typeorm'
import { CreateHabilidadDto } from './dto/create-habilidad.dto'
import { UpdateHabilidadDto } from './dto/update-habilidad.dto'

@Injectable()
export class HabilidadService {
  constructor (
        @InjectRepository(Habilidad) private habilidadRepository : Repository<Habilidad>
  ) {}

  async findOne (idHabilidad: number): Promise<Habilidad> {
    const habilidad = await this.habilidadRepository.findOne({ where: { idHabilidad } })
    if (!habilidad) throw new NotFoundException(`La habilidad con el id ${idHabilidad} no se encuentra en la base de datos`)
    return habilidad
  }

  async findAll (): Promise<Habilidad[]> {
    return this.habilidadRepository.find()
  }

  async create (createHabilidadDto:CreateHabilidadDto): Promise<Habilidad &CreateHabilidadDto> {
    const habilidadExists = await this.habilidadRepository.findOne({ where: { nombre: createHabilidadDto.nombre } })
    if (habilidadExists) throw new ConflictException('Esta habilidad ya esta en la base de datos')
    const habilidad = await this.habilidadRepository.save(createHabilidadDto)
    return habilidad
  }

  async update (idHabilidad: number, updateHabilidadDto: UpdateHabilidadDto): Promise<UpdateResult> {
    const habilidad = await this.habilidadRepository.findOne({ where: { idHabilidad } })
    if (!habilidad) throw new NotFoundException(`La habilidad con el id ${idHabilidad} no se encuentra en la base de datos`)
    const habilidadExists = await this.habilidadRepository.findOne({ where: { nombre: updateHabilidadDto.nombre, idHabilidad: Not(idHabilidad) } })
    if (habilidadExists) throw new ConflictException('Esta habilidad ya esta en la base de datos')
    const result = await this.habilidadRepository.update(idHabilidad, updateHabilidadDto)
    return result
  }

  async delete (idHabilidad: number) {
    const habilidad = await this.habilidadRepository.findOne({ where: { idHabilidad } })
    if (!habilidad) throw new NotFoundException(`La habilidad con el id ${idHabilidad} no se encuentra en la base de datos`)
    return this.habilidadRepository.delete(idHabilidad)
  }
}
