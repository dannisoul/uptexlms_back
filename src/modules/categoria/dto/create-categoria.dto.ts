import { IsString, Length } from 'class-validator'

export class CreateCategoriaDto {
    @IsString()
    @Length(3, 100)
      nombre: string
}
