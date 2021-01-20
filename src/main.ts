import express from 'express'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { Routes } from './router'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ = require('lodash')
// var grpc = require('grpc');
// var protoLoader = require('');

// grpc
// const { paySalary } = require('./pay_salary.js')
import { paySalary } from './pay_salary'
const PROTO_PATH = __dirname + '/../proto/employee.proto'

// import grpc from 'gr'
// import protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
})
const employee_proto: any = grpc.loadPackageDefinition(packageDefinition)
console.log(employee_proto, 'employee_proto')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cors = require('cors')

const bootstrap = async () => {
    const { dbconfig } = await import('./db')
    await createConnection(dbconfig)
        .then((res) => {
            // console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

    const app: any = express()
    app.use(cors())
    //form表单需要的中间件。

    // 中间件使用
    app.use(bodyParser.json())

    app.get('/vi/health', function (req: any, res: any) {
        res.send('366ms')
    })

    Routes.forEach((route) => {
        app[route.method](
            route.route,
            async (req: Request, res: Response, next: any) => {
                const result = await new (route.controller as any)()[
                    route.action
                ](req, res, next)
                res.send(result)
            },
        )
    })

    app.listen(8080, function () {
        // ser
        const server = new grpc.Server()
        server.addService(employee_proto.employee.Employee.service, {
            paySalary: paySalary,
        })
        // server.start()
        server.bindAsync(
            '0.0.0.0:4500',
            grpc.ServerCredentials.createInsecure(),
            function (error, port) {
                console.log(error, port)
            },
        )

        const client = new employee_proto.employee.Employee(
            '0.0.0.0:4500',
            grpc.credentials.createInsecure(),
        )

        client.generateReport({ id: 1 }, function (err: any, data: any) {
            if (err) {
                console.error(err)
            }
            console.log(data)
        })

        // server
        console.log('应用已运行~')
    })
}
bootstrap()
