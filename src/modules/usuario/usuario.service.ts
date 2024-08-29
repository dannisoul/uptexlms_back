import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Not, Repository, UpdateResult } from 'typeorm'
import { Usuario } from '../../entities/usuario.entity'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { AddHabilidadesDto } from './dto/add-habilidades.dto'
import { Habilidad } from 'src/entities/habilidad.entity'

@Injectable()
export class UsuarioService {
  constructor (
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Habilidad) private habilidadRepository: Repository<Habilidad>
  ) {}

  async findAll (): Promise<Usuario[]> {
    return this.usuarioRepository.find()
  }

  async findOne (idUsuario: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } })
    if (!usuario) throw new NotFoundException(`El usuario con el id ${idUsuario} no existe en la base de datos`)
    return usuario
  }

  async findOneByCorreo (correo: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } })
    if (!usuario) throw new NotFoundException(`No existe ningún usuario con el correo ${correo}`)
    return usuario
  }

  async create (createUsuarioDto: CreateUsuarioDto): Promise<CreateUsuarioDto & Usuario> {
    const usuarioExists = await this.usuarioRepository.findOne({ where: { correo: createUsuarioDto.correo } })
    if (usuarioExists) throw new ConflictException('Ya hay un usuario registrado con ese correo')
    //  TODO: Hashear la contraseña antes de guardarla
    return this.usuarioRepository.save(createUsuarioDto)
  }

  async update (idUsuario: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UpdateResult> {
    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario } })
    if (!usuario) throw new NotFoundException(`El usuario con el id ${idUsuario} no existe en la base de datos`)
    if (updateUsuarioDto.correo) {
      const usuarioExists = await this.usuarioRepository.findOne({ where: { correo: updateUsuarioDto.correo, idUsuario: Not(idUsuario) } })
      if (usuarioExists) throw new ConflictException('Ya hay un usuario registrado con ese correo')
    }
    return this.usuarioRepository.update(idUsuario, updateUsuarioDto)
  }

  async delete (idUsuario: number) {
    const pais = await this.usuarioRepository.findOne({ where: { idUsuario } })
    if (!pais) throw new NotFoundException(`El usuario con el id ${idUsuario} no se encuentra en la base de datos`)
    return this.usuarioRepository.delete(idUsuario)
  }

  async addHabilidad (idUsuario: number, addHabilidadesDto: AddHabilidadesDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario }, relations: ['habilidades'] })
    if (!usuario) throw new NotFoundException(`El usuario con el id ${idUsuario} no existe en la base de datos`)
    const habilidades = await this.habilidadRepository.findBy({ idHabilidad: In(addHabilidadesDto.ids) })
    if (!habilidades.length) throw new NotFoundException('Las habilidades no existen en la base de datos')
    usuario.habilidades = [...usuario.habilidades, ...habilidades]
    return this.usuarioRepository.save(usuario)
  }
}
