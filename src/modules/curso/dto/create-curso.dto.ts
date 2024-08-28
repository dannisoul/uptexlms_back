import { IsInt, IsString, Length, MaxLength, MinLength } from 'class-validator'

export class CreateCursoDto {
    @IsString()
    @Length(3, 100)
      nombre: string

    @IsString()
    @Length(30, 1000)
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
