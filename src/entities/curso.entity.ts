import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Categoria } from "./categoria.entity";
import { Nivel } from "./nivel.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
      idCurso: number

    @Column({ length: 100, unique: true, nullable: false })
      nombre: string

    @Column({ type: 'longtext', nullable: false })
    descripcion: string

    @Column({ type: 'int', nullable: false })
    idCategoria: number

    @ManyToOne(() => Categoria, { nullable: false })
    @JoinColumn({ name: 'idCategoria' })
    categoria: Categoria

    @Column({ type: 'int', nullable: false })
    idNivel: number

    @ManyToOne(() => Nivel, { nullable: false })
    @JoinColumn({ name: 'idNivel' })
    nivel: Nivel

    @Column({ type: 'tinyint', nullable: false, width: 1 })
    cursoInterno: 0 | 1

    @Column({ type: 'varchar', length: 200, nullable: true })
    imagen?: string

    @Column({ type: 'int', nullable: false })
    idUsuario: number

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'idUsuario' })
    usuario: Usuario

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;

    @Column({ type: 'tinyint', default: 1, width: 1, nullable: true })
    activo?: 0 | 1
}