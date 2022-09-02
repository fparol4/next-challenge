import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { unix2Date } from '../core/helpers/unix-2-date';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    protocol: string

    @Column('varchar')
    presentant: string

    @Column('varchar')
    type: string

    @Column('varchar')
    avatar: string

    @Column('date')
    entry_date: Date

    @Column('date')
    due_date: Date
}