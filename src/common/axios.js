import axios from 'axios'
import {Indicator, MessageBox} from 'mint-ui'

/**
 * 挂起中的请求数。并发请求后，等待所有请求结束后Indicator再关闭
 */
let pendingCount = 0
/**
 * 标记挂起中的请求
 */
const requestPendingMap = {}
export default function(Vue, injectConfig = {}) {
    axios.defaults.headers.common['Cache-Control'] = 'no-cache'
    axios.defaults.timeout = 30000
    const {responseErrorHandler} = injectConfig

    axios.interceptors.request.use(function(config) {
        const uid = hashConfig(config)
        // 拦截重复请求
        if (requestPendingMap[uid]) {
            const error = new Error('repeat request')
            error.code = 'REPEATREQUEST'
            return Promise.reject(error)
        }
        config.uid = uid
        requestPendingMap[uid] = true

        // 全屏loading
        if (!config.quiet) {
            pendingCount = Math.max(pendingCount, 0)
            ++pendingCount === 1 && openIndicator()
        }
        return config
    }, undefined)

    axios.interceptors.response.use(function(response) {
        const {config} = response
        delete requestPendingMap[config.uid]

        if (!config.quiet) {
            --pendingCount <= 0 && closeIndicator()
        }
        return response
    }, function(error) {
        if (error.code === 'REPEATREQUEST') {
            return Promise.reject(error)
        }
        delete requestPendingMap[error.config && error.config.uid]

        if (!error.config.quiet) {
            --pendingCount <= 0 && closeIndicator()
            responseErrorHandler(error)
        }
        return Promise.reject(error)
    })

    Vue.prototype.$axios = axios
    Vue.prototype.$http = function () {
        return axios.apply(this, arguments).then(successCbHandler)
    }
    Vue.prototype.$post = genHttp('post')
    Vue.prototype.$get = genHttp('get')
    Vue.prototype.$put = genHttp('put')
    Vue.prototype.$delete = genHttp('delete')
}

function genHttp(method) {
    return function() {
        return axios[method].apply(this, arguments).then(successCbHandler)
    }
}

function successCbHandler({data}) {
    return data
}

function openIndicator() {
    Indicator.open()
}

function closeIndicator() {
    Indicator.close()
}

function hashConfig(_config = {}) {
    let config = Object.assign({}, _config);
    ['params', 'data'].forEach(element => {
        if (config[element] && typeof config[element] === 'object') {
            try {
                config[element] = JSON.stringify(config[element])
            } catch (e) {}
        }
    })
    let {url, params, data} = config
    return [url, params, data].join('-')
}