import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'
import fs from 'fs'
import { User } from '../entity/User'

let config: any = fs.readFileSync('./config.json', 'utf-8')
config = JSON.parse(config)

console.log(config)

export const dbconfig: ConnectionOptions = {
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: false,
    logging: false,
    entities: [User],
}
