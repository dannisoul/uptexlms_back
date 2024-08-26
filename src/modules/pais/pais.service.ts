import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pais } from 'src/entities/pais.entity'
import { Not, Repository, UpdateResult } from 'typeorm'
import { CreatePaisDto } from './dto/create-pais.dto'
import { UpdatePaisDto } from './dto/update-pais.dto'

@Injectable()
export class PaisService {
  constructor (
    @InjectRepository(Pais) private paisRepository: Repository<Pais>
  ) {}

  async findOne (idPais: number): Promise<Pais> {
    const pais = await this.paisRepository.findOne({ where: { idPais } })
    if (!pais) throw new NotFoundException(`El país con el id ${idPais} no se encuentra en la base de datos`)
    return pais
  }

  async findAll (): Promise<Pais[]> {
    return this.paisRepository.find()
  }

  async create (createPaisDto: CreatePaisDto): Promise<Pais & CreatePaisDto> {
    const paisExists = await this.paisRepository.findOne({ where: { nombre: createPaisDto.nombre } })
    if (paisExists) throw new ConflictException('El nombre de este pais ya esta en la base de datos')
    return this.paisRepository.save(createPaisDto)
  }

  async update (idPais: number, updatePaisDto: UpdatePaisDto): Promise<UpdateResult> {
    const pais = await this.paisRepository.findOne({ where: { idPais } })
    if (!pais) throw new NotFoundException(`El país con el id ${idPais} no se encuentra en la base de datos`)
    const paisExists = await this.paisRepository.findOne({ where: { nombre: updatePaisDto.nombre, idPais: Not(idPais) } })
    if (paisExists) throw new ConflictException('El nombre de este país ya esta en la base de datos')
    return this.paisRepository.update(idPais, updatePaisDto)
  }

  async delete (idPais: number) {
    const pais = await this.paisRepository.findOne({ where: { idPais } })
    if (!pais) throw new NotFoundException(`El país con el id ${idPais} no se encuentra en la base de datos`)
    return this.paisRepository.delete(idPais)
  }
}
