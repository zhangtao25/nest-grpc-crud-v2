// let { employees } = require('./data.js')
import { employees } from './data'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ = require('lodash')
// import _ from 'lodash'

export function paySalary(call: any) {
    const employeeIdList = call.request.employeeIdList

    _.each(employeeIdList, function (employeeId: string) {
        const employee = _.find(employees, { id: employeeId })
        if (employee != null) {
            const responseMessage = 'Salary paid for '.concat(
                employee.firstName,
                ', ',
                employee.lastName,
            )
            call.write({ message: responseMessage })
        } else {
            call.write({
                message:
                    'Employee with Id ' + employeeId + ' not found in record',
            })
        }
    })
    call.end()
}
// exports.paySalary = paySalary
