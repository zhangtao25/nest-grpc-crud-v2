function removeEmptyField(obj: any) {
    let newObj: any = {}
    if (typeof obj == 'string') {
        obj = JSON.parse(obj)
    }
    if (obj instanceof Array) {
        newObj = []
    }
    if (obj instanceof Object) {
        for (const attr in obj) {
            if (
                obj.hasOwnProperty(attr) &&
                obj[attr] !== '' &&
                obj[attr] !== null &&
                obj[attr] !== undefined
            ) {
                if (obj[attr] instanceof Object) {
                    newObj[attr] = removeEmptyField(obj[attr])
                } else if (
                    typeof obj[attr] == 'string' &&
                    ((obj[attr].indexOf('{') > -1 &&
                        obj[attr].indexOf('}') > -1) ||
                        (obj[attr].indexOf('[') > -1 &&
                            obj[attr].indexOf(']') > -1))
                ) {
                    try {
                        const attrObj = JSON.parse(obj[attr])
                        if (attrObj instanceof Object) {
                            newObj[attr] = removeEmptyField(attrObj)
                        }
                    } catch (e) {
                        newObj[attr] = obj[attr]
                    }
                } else {
                    newObj[attr] = obj[attr]
                }
            }
        }
    }
    return newObj
}

function deleteUndefinedAttribute(obj: any) {
    for (const i in obj) {
        if (obj[i]) {
        } else {
            delete obj[i]
        }
    }
    return obj
}

function isUndefineOrNull(obj: any) {
    return obj === undefined || obj === null
}

function isBlankStr(obj: string) {
    return isUndefineOrNull(obj) || obj.trim() === ''
}

function convertObject(obj: any, toObj: any) {
    // return Object.assign({ ...obj});
    for (const i in toObj) {
        for (const j in obj) {
            if (i === j) {
                toObj[i] = obj[j]
                break
            }
        }
    }
    return toObj
}

function getPageContext(
    pageIndex: any,
    findAndCount: [any, number],
    pageSize: any,
) {
    const pageEntity = new PageEntity()
    pageEntity.pageIndex = pageIndex
    pageEntity.pageTotal = Math.ceil(findAndCount[1] / pageSize)
    pageEntity.total = findAndCount[1]
    return pageEntity
}

function getPageIndexAndSize(commonField: any) {
    let pageIndex = null
    let pageSize = null
    if (commonField != null) {
        pageIndex = commonField.pageIndex
        pageSize = commonField.pageSize
    }
    if (pageIndex === null) {
        pageIndex = 1
    }
    if (pageSize === null) {
        pageSize = Number.MAX_SAFE_INTEGER
    }
    return { pageIndex, pageSize }
}

export function reflectField() {
    return (target: any, key: string) => {
        console.log(target)
        console.log(key)
        const type = Reflect.getMetadata('design:type', target, key)
        console.log(`${key} type: ${type.name}`)
    }
}

function getIPAdress() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const interfaces = require('os').networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (
                alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal
            ) {
                return alias.address
            }
        }
    }
}

export default {
    deleteUndefinedAttribute,
    isUndefineOrNull,
    isBlankStr,
    convertObject,
    reflectField,
    getPageContext,
    getPageEntity: getPageIndexAndSize,
    getIPAdress,
    removeEmptyField,
}

class PageEntity {
    public pageTotal: number
    public total: number
    public pageIndex: number
}
