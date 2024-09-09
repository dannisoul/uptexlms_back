import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Grupo } from "src/entities/grupo.entity";
import { Not, Repository, UpdateResult } from "typeorm";
import { CreateGrupoDto } from "./dto/create-grupo.dto";
import { CodeGenerator } from "src/common/utils/code-generator";
import { UpdateGrupoDto } from "./dto/update-grupo.dto";

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(Grupo) private grupoRepository: Repository<Grupo>,
    private readonly configService: ConfigService
    // en las variables de entorno tengo definido BASE_URL = 'http://localhost:3000/'
    // y lo utilizo para cuando hago la paginacion y calcular la siguiente URL
  ) {}

  async create(
    createGrupoDto: CreateGrupoDto
  ): Promise<CreateGrupoDto & Grupo> {
    let grupoExists: Grupo;
    do {
      createGrupoDto.codigo = CodeGenerator.generateCode(10);
      grupoExists = await this.grupoRepository.findOne({
        where: { codigo: createGrupoDto.codigo },
      });
    } while (grupoExists);

    return this.grupoRepository.save(createGrupoDto);
  }

  async activate(idGrupo: number, operation: number): Promise<UpdateResult> {
    const grupo = await this.grupoRepository.findOne({ where: { idGrupo } });
    if (!grupo)
      throw new NotFoundException("No existe ningun grupo con ese id");
    if (operation !== 0 && operation !== 1)
      throw new ConflictException(
        "Operacion no reconocida: 0 desactivar, 1 activar"
      );
    return this.grupoRepository.update(idGrupo, { activo: operation });
  }

  async update(
    idGrupo: number,
    updateGrupoDto: UpdateGrupoDto
  ): Promise<UpdateResult> {
    if (updateGrupoDto.activo >= 0)
      throw new ConflictException(
        "No se puede cambiar el estado del curso desde aqui"
      );
    if (updateGrupoDto.codigo)
      throw new ConflictException("No se puede cambiar el codigo del grupo");
    const grupo = await this.grupoRepository.findOne({ where: { idGrupo } });
    if (!grupo)
      throw new NotFoundException("No existe ningun grupo con ese id");
    return this.grupoRepository.update(idGrupo, updateGrupoDto);
  }
  /*
  async common(idCurso: number, idCategoria: number): Promise<Grupo[]> {
    return this.grupoRepository
      .createQueryBuilder("grupo")
      .leftJoinAndSelect("grupo.curso", "curso")
      .leftJoin("curso.usuario", "usuario")
      .addSelect(["usuario.idUsuario", "usuario.avatar"])
      .where("grupo.idCurso != :idCurso", { idCurso })
      .andWhere("curso.idCategoria = :idCategoria", { idCategoria })
      .take(5)
      .orderBy("grupo.inicio", "ASC")
      .getMany();
  }
*/
  async common(idCurso: number, idCategoria: number): Promise<Grupo[]>{
    return this.grupoRepository.find({
      relations: ["curso", "curso.usuario"],
      select: {
        idGrupo: true,
        nombre: true,
        codigo: true,
        inicio: true,
        cierre: true,
        activo: true,
        curso: {
          idCurso: true,
          nombre: true,
          descripcion: true,
          idCategoria: true,
          idNivel: true,
          cursoInterno: true,
          fechaCreacion: true,
          activo: true,
          imagen: true,
          usuario: {
            idUsuario: true,
            nombre: true,
            paterno: true,
            materno: true,
            avatar: true
          }
        }
      },
      where: {
        curso: {
          idCurso: Not(idCurso),
          idCategoria: idCategoria,
        },
      },
      take: 5,
      order: { inicio: "ASC" },
    })
  }
}
