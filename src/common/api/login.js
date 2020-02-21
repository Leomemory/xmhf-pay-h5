import axios from 'axios'

var urls = {
    post_sms: '/rest/anon/sms',     //请求短信验证码
    post_login: '/rest/anon/login',    //请求短信验证码登录
}

var postSmsRequest = function (data) {
    return axios.post(urls.post_sms, data);
}

var postLoginRequest = function (data) {
    return axios.post(urls.post_login, data);
}

export default {
    postSmsRequest,
    postLoginRequest
}
