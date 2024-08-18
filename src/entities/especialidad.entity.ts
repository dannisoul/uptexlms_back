import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Especialidad {
    @PrimaryGeneratedColumn()
      idEspecialidad: number

    @Column({ length: 100 })
      nombre: string
}
