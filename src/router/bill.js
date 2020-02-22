const isFree = true
export default [
    {
        path: '/bill',
        name: 'bill',
        component: require('@/pages/bill/index').default,
        meta: {
            title: '账单',
        }
    },
]