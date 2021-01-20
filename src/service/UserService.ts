import { CrudService } from '../common/CrudService'
import { User } from '../entity/User'
import { getRepository } from 'typeorm'

export class UserService extends CrudService<User> {
    constructor(repo = getRepository(User)) {
        super(repo)
    }
}
