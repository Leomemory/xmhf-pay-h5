import axios from 'axios'
import { Indicator, MessageBox } from 'mint-ui'
import router from '../router/index'
import {cookieApi} from 'common/cookies'

MessageBox.setDefaults({
    title: '',
    zIndex: 5000,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
}) 

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url === '/rest/anon/refercode/check') {
        Indicator.close()
    } else {
        Indicator.open()
    }
    return config
}, function (error) {
    // Do something with request error
    Indicator.close()
    MessageBox.alert('网络异常，请检查后重试')
    return Promise.reject(error)
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    Indicator.close()
    let status = response.status
    if (response.headers['user-session']) {
        cookieApi.set('USER-SESSION', response.headers['user-session'])
    }
    switch (status) {
        case 200:
            return response.data
            break
    }
}, function (error) {
    // Do something with response error
    Indicator.close()
    console.log('error.response', error.response)
    let status = error.response.status
    let msg = (error.response.data || {}).msg
    let message = (error.response.data || {}).message
    let reqId = error.response.headers.wh_reqid || ''
    let prefix = !!reqId ? ('错误ID: ' + reqId + '-') : (status + ': ')

    switch (status) {
        case 400:
            MessageBox.alert(prefix + (msg || message || '请求失败'))
            break
        case 401:
            router.push('/')
            break
        case 500:
            MessageBox.alert(prefix + (msg || message || '服务器内部错误'))
            break
        default:
            MessageBox.alert(prefix + '数据响应有误')
            break
    }
    return Promise.reject(error)
});