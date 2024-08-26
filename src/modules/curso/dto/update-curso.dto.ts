import { PartialType } from '@nestjs/mapped-types'
import { CreateCursoDto } from './create-curso.dto'
import { IsInt, IsOptional, IsString, Length } from 'class-validator'

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @IsOptional()
    @IsString()
    @Length(3, 200)
      imagen?: string

    @IsOptional()
    @IsInt()
      activo?: 0 | 1
}
