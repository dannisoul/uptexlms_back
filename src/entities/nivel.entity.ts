import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Nivel {
    @PrimaryGeneratedColumn()
      idNivel: number

    @Column({ length: 100, unique: true, nullable: false })
      nombre: string
}
