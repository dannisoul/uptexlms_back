import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Categoria } from 'src/entities/categoria.entity'
import { Repository, UpdateResult } from 'typeorm'
import { CreateCategoriaDto } from './dto/create-categoria.dto'
import { UpdateCategoriaDto } from './dto/update-categoria.dto'

@Injectable()
export class CategoriaService {
  constructor (
        @InjectRepository(Categoria) private categoriaRepository: Repository<Categoria>
  ) {}

  async findOne (idCategoria: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { idCategoria } })
    if (!categoria) throw new NotFoundException(`La categoría con el id ${idCategoria} no existe en la base de datos`)
    return categoria
  }

  async findAll () {
    return this.categoriaRepository.find()
  }

  async create (createCategoriaDto: CreateCategoriaDto): Promise<CreateCategoriaDto & Categoria> {
    const categoriaExists = await this.categoriaRepository.findOne({ where: { nombre: createCategoriaDto.nombre } })
    if (categoriaExists) throw new ConflictException('Esta categoria ya esta en la base de datos')
    return this.categoriaRepository.save(createCategoriaDto)
  }

  async update (idCategoria: number, updateCategoriaDto: UpdateCategoriaDto): Promise<UpdateResult> {
    const categoria = await this.categoriaRepository.findOne({ where: { idCategoria } })
    if (!categoria) throw new NotFoundException(`La categoría con el id ${idCategoria} no existe en la base de datos`)
    const categoriaExists = await this.categoriaRepository.findOne({ where: { nombre: updateCategoriaDto.nombre } })
    if (categoriaExists) throw new ConflictException('Esta categoria ya esta en la base de datos')
    return this.categoriaRepository.update(idCategoria, updateCategoriaDto)
  }
}
