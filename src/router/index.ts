import { UserController } from '../controller/UserController'

export const Routes = [
    {
        method: 'post',
        route: '/createUser',
        controller: UserController,
        action: 'createUser',
    },
    {
        method: 'post',
        route: '/deleteUser',
        controller: UserController,
        action: 'deleteUser',
    },
    {
        method: 'post',
        route: '/updateUser',
        controller: UserController,
        action: 'updateUser',
    },
    {
        method: 'post',
        route: '/findUser',
        controller: UserController,
        action: 'findUser',
    },
]
