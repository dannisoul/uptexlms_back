import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './modules/usuario/usuario.module'
import { AuthModule } from './modules/auth/auth.module'
import { CursoModule } from './modules/curso/curso.module'
import { EspecialidadModule } from './modules/especialidad/especialidad.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UnidadModule } from './modules/unidad/unidad.module'
import { TemaModule } from './modules/tema/tema.module'
import { NivelModule } from './modules/nivel/nivel.module'
import { CategoriaModule } from './modules/categoria/categoria.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsuarioModule,
    AuthModule,
    CursoModule,
    EspecialidadModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true //  TODO: Deshabilitar cuando este en producción
      }),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    UnidadModule,
    TemaModule,
    NivelModule,
    CategoriaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
