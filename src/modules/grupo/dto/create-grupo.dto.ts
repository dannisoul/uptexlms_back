import { IsInt, IsOptional, IsString, Length } from "class-validator"

export class CreateGrupoDto{
    @IsString()
    @Length(3, 100)
    nombre: string

    @IsOptional()
    @IsString()
    @Length(10)
    codigo?:string | null

    @IsString()
    inicio: string

    @IsString()
    cierre: string

    @IsInt()
    idCurso: number
}