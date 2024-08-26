import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // Elimina las propiedades en el body que no esten definidos en el DTO
  }))
  await app.listen(3000)
}
bootstrap()
