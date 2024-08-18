import { IsString, MaxLength } from 'class-validator'

export class CreateEspecialidadDto {
    @IsString()
    @MaxLength(100)
      nombre: string
}
