const isFree = true
export default [
    {
        path: '/users/login',
        name: 'login',
        component: require('@/pages/users/Login').default,
        meta: {
            title: '注册授信',
            isFree
        }
    },
]