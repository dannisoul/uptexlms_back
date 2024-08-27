import { PartialType } from '@nestjs/mapped-types'
import { CreateUsuarioDto } from './create-usuario.dto'
import { IsInt, IsOptional, IsString, Length, MaxLength } from 'class-validator'

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsOptional()
    @IsString()
    @Length(10, 10)
      telefono?: string

    @IsOptional()
    @IsString()
    @MaxLength(200)
      avatar?: string

    @IsOptional()
    @IsString()
    @MaxLength(500)
      descripcion?: string

    @IsOptional()
    @IsString()
    @MaxLength(250)
      direccion?: string

    @IsOptional()
    @IsInt()
      idPais?: number

    @IsOptional()
    @IsInt()
      idEspecialidad?: number

    @IsOptional()
    @IsString()
    @MaxLength(100)
      instagram?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
      twitter?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
      facebook?: string
}
