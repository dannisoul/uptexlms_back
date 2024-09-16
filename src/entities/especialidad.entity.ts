import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Especialidad {
    @PrimaryGeneratedColumn()
      idEspecialidad: number

    @Column({ unique: true, nullable: false, length: 100 })
      nombre: string
}
