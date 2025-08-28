import { Inject, Injectable } from '@nestjs/common'
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm'

@Injectable()
export class UserSyncService<T extends ObjectLiteral> {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly repository: Repository<T>,
    ) {}

    async syncUser(userId: string, data: DeepPartial<T>): Promise<T> {
        console.log(userId, data)
        const user = await this.repository.findOne({
            where: { id: userId } as any,
        })

        if (user) {
            return user
        }

        const newUser = this.repository.create(data)
        await this.repository.save(newUser)

        return newUser
    }
}
