import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Pais {
    @PrimaryGeneratedColumn()
      idPais: number

    @Column({ unique: true, nullable: false })
      nombre: string
}
