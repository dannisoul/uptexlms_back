import { IsInt, IsString, Length, isInt } from "class-validator";

export class CreateUnidadDto{
    @IsInt()
    np: number;

    @IsString()
    @Length(4, 100)
    nombre: string;

    @IsInt()
    idCurso: number;
}