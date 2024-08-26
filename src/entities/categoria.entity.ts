import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Curso } from './curso.entity'

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
      idCategoria: number

    @Column({ length: 100, unique: true, nullable: false })
      nombre: string
}
