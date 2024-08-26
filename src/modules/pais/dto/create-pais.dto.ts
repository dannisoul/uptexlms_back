import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePaisDto {
    @IsString()
    @IsNotEmpty()
      nombre: string
}
