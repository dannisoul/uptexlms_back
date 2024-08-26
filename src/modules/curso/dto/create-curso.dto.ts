import { IsInt, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCursoDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
      nombre: string

    @IsString()
    @MinLength(30)
    @MaxLength(1000)
      descripcion: string

    @IsInt()
      idCategoria: number

    @IsInt()
      idNivel: number

    @IsInt()
      cursoInterno: 0 | 1

    @IsInt()
      idUsuario: number
}
