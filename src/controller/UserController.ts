import { UserService } from '../service/UserService'
import { ResultUtil } from '../utils/result.util'
import { Request } from 'express'
import { Result } from '../utils/result'

export class UserController {
    private userService = new UserService()

    async createUser(req: Request): Promise<Result> {
        const r = await this.userService.create(req.body.entity)
        return ResultUtil.success(r)
    }

    async deleteUser(req: Request): Promise<Result> {
        const r = await this.userService.delete(req.body.id)
        return ResultUtil.success(r)
    }

    async updateUser(req: Request): Promise<Result> {
        const r = await this.userService.update(req.body.id, req.body.entity)
        return ResultUtil.success(r)
    }

    async findUser(req: Request): Promise<Result> {
        const r = await this.userService.find(
            req.body.entity,
            req.body.commonField,
        )
        return ResultUtil.success(r)
    }
}
