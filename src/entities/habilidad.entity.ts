import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Usuario } from './usuario.entity'

@Entity()
export class Habilidad {
    @PrimaryGeneratedColumn()
      idHabilidad: number

    @Column({ unique: true, nullable: false, length: 100 })
      nombre: string

    @ManyToMany(() => Usuario, (usuario) => usuario.habilidades, { cascade: true })
    @JoinTable(
      {
        name: 'usuario_habilidad',
        joinColumn: {
          name: 'idHabilidad',
          referencedColumnName: 'idHabilidad'
        },
        inverseJoinColumn: {
          name: 'idUsuario',
          referencedColumnName: 'idUsuario'
        }
      }
    )
      usuarios: Usuario[]
}
