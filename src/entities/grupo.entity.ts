import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";

@Entity()
export class Grupo {
    @PrimaryGeneratedColumn()
    idGrupo: number

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string

    @Column({ type: 'varchar', length: 10, nullable: true })
    codigo?: string

    @Column({ type: 'date', nullable: false })
    inicio: Date

    @Column({ type: 'date', nullable: false })
    cierre: Date

    @Column({ type: 'int', nullable: false })
    idCurso: number

    @ManyToOne(() => Curso, curso => curso.grupos, { nullable: false })
    @JoinColumn({ name: 'idCurso' })
    curso: Curso

    @Column({ type: 'tinyint', nullable: false, default: 1 })
    activo: 0 | 1
}