import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'profiles' })
export class ProfileEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column({ type: 'varchar', length: 255 })
    firstName: string

    @Column({ type: 'varchar', length: 255 })
    lastName: string

    @Column({ unique: true, type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    phone: string

    @Column({ type: 'date' })
    birthDate: Date

    @Column({ type: 'varchar', length: 255 })
    avatar: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
