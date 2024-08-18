import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
      idCategoria: number

    @Column({ length: 100, unique: true, nullable: false })
      nombre: string
}
