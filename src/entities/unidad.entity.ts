import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";

@Entity()
export class Unidad {
    @PrimaryGeneratedColumn()
    idUnidad: number;

    @Column({ type: 'int', nullable: false })
    np: number;

    @Column({ length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'int', nullable: false })
    idCurso: number;

    @ManyToOne(() => Curso, { nullable: false })
    @JoinColumn({ name: 'idCurso' })
    curso: Curso;
}