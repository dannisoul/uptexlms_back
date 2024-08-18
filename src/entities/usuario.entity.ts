import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Especialidad } from './especialidad.entity'

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
      idUsuario: number

    @Column({ length: 100, nullable: false })
      paterno: string

    @Column({ length: 100, nullable: false })
      materno: string

    @Column({ length: 100, nullable: false })
      nombre: string

    @Column({ nullable: false })
      fechaNacimiento: Date

    @Column({ length: 1, nullable: false })
      genero: 'M' | 'F'

    @Column({ length: 100, unique: true, nullable: false })
      correo: string

    @Column({ length: 50, nullable: false })
      password: string

    @Column({ nullable: false })
      rol: 1 | 2 | 3

    @Column({ length: 10, nullable: true })
      telefono: string | null

    @Column({ length: 200, nullable: true })
      avatar: string | null

    @Column({ length: 500, nullable: true })
      descripcion: string | null

    @Column({ length: 250, nullable: true })
      direccion: string | null

    //  TODO: ¿Crear una nueva entidad con todas las nacionalidades, o tener un json en el proyecto de frontend?
    @Column({ nullable: true })
      nacionalidad: number | null

    @Column({ nullable: true })
      idEspecialidad: number | null

    @ManyToOne(() => Especialidad, { nullable: true })
    @JoinColumn({ name: 'idEspecialidad' })
      especialidad: Especialidad | null

    @Column({ length: 100, nullable: true })
      instagram: string | null

    @Column({ length: 100, nullable: true })
      twitter: string | null

    @Column({ length: 100, nullable: true })
      facebook: string | null
}
