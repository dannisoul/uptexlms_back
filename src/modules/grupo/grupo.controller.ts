import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth/auth.guard";
import { GrupoService } from "./grupo.service";
import { CreateGrupoDto } from "./dto/create-grupo.dto";
import { UpdateGrupoDto } from "./dto/update-grupo.dto";

@Controller("grupo")
@UseGuards(AuthGuard)
export class GrupoController {
  constructor(private grupoService: GrupoService) {}

  //Falta implementar
  @Get("many/bystudent/:id")
  async findAllByStudent(@Param("id", ParseIntPipe) idUsuario: number) {
    return "devuelve todos los grupos por id del estudiante";
  }

  //Falta implementar
  @Get("single/bystudent/:id")
  async findOneByStudent(@Param("id", ParseIntPipe) idUsuario: number) {
    return "devuelve un grupo por su id del estudiante";
  }

  //Falta implementar
  @Get("many/byteacher/:id")
  async findAllByTeacher(@Param("id", ParseIntPipe) idUsuario: number) {
    return "devuelve todos los grupos por id del docente";
  }

  //Falta implementar
  @Get("single/byteacher/:id")
  async findOneByTeacher(@Param("id", ParseIntPipe) idUsuario: number) {
    return "devuelve un grupo por su id del docente";
  }

  //Crea un grupo, el estado por defecto de un grupo es 1 (activo) y se genera un codigo automaticamente
  //grupo -> recibe un body
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.create(createGrupoDto);
  }

  //Actualiza un grupo por su id, no cambia codigo de grupo y estado(activo o no activo)
  //grupo -> recibe un body
  @HttpCode(HttpStatus.OK)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) idGrupo: number,
    @Body() updateGrupoDto: UpdateGrupoDto
  ) {
    return this.grupoService.update(idGrupo, updateGrupoDto);
  }

  //Activa o desactiva un grupo segun la operacion pasada por parametro(1: activar, 0: desactivar)
  //grupo/{idGrupo}/activate/{op}
  @Patch(":id/activate/:op")
  async activate(
    @Param("id", ParseIntPipe) idGrupo: number,
    @Param("op", ParseIntPipe) op: number
  ) {
    return this.grupoService.activate(idGrupo, op);
  }

  //Retorna los grupos en comun segun la categoria
  //grupo/common/{idCurso}/category/{idCategory}
  @Get("common/curso/:idCurso/category/:idCategory")
  async findCommon(
    @Param("idCurso", ParseIntPipe) idCurso: number,
    @Param("idCategory", ParseIntPipe) idCategoria: number
  ) {
    return this.grupoService.common(idCurso, idCategoria);
  }
}
