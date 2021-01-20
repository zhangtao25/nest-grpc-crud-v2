import { Repository } from 'typeorm/index'
import { ResponseType } from './ResponseType'
import Util from './../utils/util'

export class CrudService<Entity> {
    protected repo: Repository<Entity>
    constructor(repo: Repository<Entity>) {
        this.repo = repo
    }

    async create(entity: any): Promise<any> {
        const result = await this.repo.save(entity)

        const responseType = new ResponseType()
        responseType.responseCode = 200
        responseType.responseDesc = 'create success'
        responseType.ResponseStatus = null
        return responseType
    }

    async delete(id: any): Promise<any> {
        const result = await this.repo.delete(id)

        const responseType = new ResponseType()
        responseType.responseCode = 200
        responseType.responseDesc = 'delete success'
        responseType.ResponseStatus = null
        return responseType
    }

    async update(id: any, entity: any): Promise<any> {
        const result = await this.repo.update(id, entity)

        const responseType = new ResponseType()
        responseType.responseCode = 200
        responseType.responseDesc = 'update success'
        responseType.ResponseStatus = null
        return responseType
    }

    async find(entity: any, commonField: any): Promise<any> {
        const { pageIndex, pageSize } = Util.getPageEntity(commonField)
        const findAndCount = await this.repo.findAndCount({
            where: {
                ...entity,
            },
            skip: (pageIndex - 1) * pageSize,
            take: pageSize,
            cache: false,
        })

        const responseType = new ResponseType()
        responseType.data = findAndCount[0].map((item: any) => {
            return item
        })
        responseType.responseCode = 200
        responseType.responseDesc = 'find success'
        responseType.ResponseStatus = null
        const pageEntity = Util.getPageContext(
            pageIndex,
            findAndCount,
            pageSize,
        )
        responseType.pageContext = pageEntity
        return responseType
    }
}
