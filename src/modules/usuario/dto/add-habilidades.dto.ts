import { IsArray } from 'class-validator'

export class AddHabilidadesDto {
    @IsArray()
      ids: number[]
}
