import { IsString, MaxLength } from 'class-validator'

export class CreateHabilidadDto {
    @IsString()
    @MaxLength(100)
      nombre: string
}
