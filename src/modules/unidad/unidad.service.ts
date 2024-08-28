import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from 'src/entities/unidad.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-curso.dto';

@Injectable()
export class UnidadService {
    constructor(
        @InjectRepository(Unidad) private unidadRepository: Repository<Unidad>
    ) {}

    async findAllByCurso(idCurso: number): Promise<Unidad[]>{
        const unidades = await this.unidadRepository.find({where: {idCurso}})
        if(!unidades || unidades.length === 0) throw new NotFoundException(`No existen unidades registradas en este curso`)
        return unidades
    } 

    async create(createUnidadDto: CreateUnidadDto): Promise<CreateUnidadDto & Unidad>{
        return this.unidadRepository.save(createUnidadDto)
    }

    async update(idUnidad: number, updateUnidadDto: UpdateUnidadDto): Promise<UpdateResult>{
        const unidad = await this.unidadRepository.findOne({where: {idUnidad}})
        if(!unidad) throw new NotFoundException(`No existe ninguna unidad con el id ${idUnidad} en la base de datos`)
        return this.unidadRepository.update({idUnidad}, updateUnidadDto)
    }

    async delete(idUnidad: number): Promise<DeleteResult>{
        const unidad = await this.unidadRepository.findOne({where: {idUnidad}})
        if(!unidad) throw new NotFoundException(`No existe ninguna unidad con el id ${idUnidad} en la base de datos`)
        return this.unidadRepository.delete({idUnidad})
    }
}
