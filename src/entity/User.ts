import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({ name: 'Id' })
    id: number

    @Column({ name: 'Name' })
    name: string
}
