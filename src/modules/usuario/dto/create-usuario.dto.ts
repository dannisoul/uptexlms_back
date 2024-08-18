import { IsDateString, IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
      paterno: string

    @IsString()
    @MinLength(3)
    @MaxLength(100)
      materno: string

    @IsString()
    @MinLength(3)
    @MaxLength(100)
      nombre: string

    @IsDateString()
      fechaNacimiento: Date

    // TODO: Crear un validator personalizado en el modulo common para este tipo de entrada
    @IsString()
      genero: 'M' | 'F'

    @IsEmail()
      correo: string

    @IsString()
      password: string

    // TODO: Crear un validator personalizado en el modulo common para este tipo de entrada
    @IsInt()
      rol: 1 | 2 | 3
}
