import { IsString, Length } from 'class-validator'

export class CreateNivelDto {
    @IsString()
    @Length(3, 100)
      nombre: string
}
