import { IsString } from 'class-validator'

export class LoginDto {
    @IsString()
      correo: string

    @IsString()
      password: string
}
