<template>
    <div class="login">
        <mt-header title="happy pay" fixed>
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>

        <div class="form_custom">            
            <mt-field placeholder="请输入手机号" type="tel" v-model="userLogin.phone" :attr="{maxlength: 11}"></mt-field>
            
            <mt-field placeholder="请输入验证码" type="tel" v-model="userLogin.otpCode" :attr="{maxlength: maxlength}">
                <mt-button type="primary" size="small"
                    :disabled="reSend"
                    @click="sendCaptcha()">{{captchaText}}</mt-button>
            </mt-field>

            <div style="margin:20px 0 0">
                <mt-button type="primary" size="large" :disabled="!isFill" @click="toLogIn()">登录</mt-button>
            </div>

            <div class="check" @click="agree = !agree">
                <span class="checkbox" :class="{'checked': agree}"></span>已阅读并同意
                <a href="#" @click.stop target="_blank">《用户注册协议》</a>
            </div>
        </div>

        <!-- 图片验证码 -->
        <pic-captcha :isShow="isShowPicCaptcha" :picCaptcha="captchaInfo" @altcode="submitCaptcha"></pic-captcha>
    </div>
</template>

<script>
import {countDownMixin} from 'common/mixin'
import {cnmobileCheck, smsCodeCheck}  from 'common/validator'
import loginApi from 'common/api/login'
import picCaptcha from '@/components/pic-captcha'
export default {
    mixins: [countDownMixin],
    data(){
        return{
            userLogin:{
                phone: null,
                otpCode: '',
            },
            isFill:false,
            agree: true,
            isShowPicCaptcha: false,
            captchaInfo: {}
        }
    },
    props:{
        maxlength:{
            type: Number,
            default: 6
        }
    },
    components:{
        picCaptcha
    },
    watch:{
        userLogin:{
            handler(newValue, oldValue){
                if (newValue.phone && newValue.otpCode) {
                    this.isFill = true
                } else {
                    this.isFill = false
                }
            },
            deep: true
        },
        // 'userLogin.phone': function(newValue, oldValue) {
        //     // this.userLogin.phone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.userLogin.phone.trim()
        // }
    },
    methods:{
        sendCaptcha(){
            if(!this.reSend){
                if (!cnmobileCheck(this.userLogin.phone)) {
                    this.$toast('请输入正确的手机号')
                    return
                }
                let data = {
                    phone: this.userLogin.phone
                }
                loginApi.postSmsRequest(data).then(resp => {
                    if (resp.needAltCaptcha) {
                        this.isShowPicCaptcha = true
                        this.getPicCaptcha()
                    } else {
                        this.smsCountdown()
                        this.$toast('验证码发送成功')
                        this.userLogin.otpCodeToken = resp.otpCodeToken
                    }
                })
            }
        },
        getPicCaptcha () {
            this.captchaInfo = {
                api: '/rest/anon/alt',
                params: {
                    phone: this.userLogin.phone
                }
            }
        },
        submitCaptcha(value){
            let data = {
                phone: this.userLogin.phone,
                otpCode: value
            }
            loginApi.postSmsRequest(data).then(resp => {
                this.isShowPicCaptcha = false
                this.userLogin.otpCodeToken = resp.otpCodeToken
                this.$toast('验证码发送成功')
                this.smsCountdown()
            })
        },
        toLogIn(){
            const {phone, otpCode} = this.userLogin

            if (!cnmobileCheck(phone)) {
                this.$toast('请输入合法的手机号')
                return
            }

            if (!smsCodeCheck(otpCode)) {
                this.$toast('请输入合法的验证码')
                return
            }

            if (!this.agree) {
                this.$toast('请阅读并同意《用户注册协议》')
                return
            }
            
            let data = {
                phone: this.userLogin.phone,
                otpCode: this.userLogin.otpCode,
                otpCodeToken: this.userLogin.otpCodeToken
            }
            loginApi.postLoginRequest(data).then(resp => {
                this.$toast('登录成功')
                this.$router.push('/test')
            })
        },
    }
}
</script>

<style scoped lang="scss">
.mint-cell-wrapper{
    background-image: none;
}
.login{
    .form_custom{
        padding: 50px 20px 0;
        .check{
            line-height: 30px;
            font-size: 12px;
            color: #4A4A4A;
            position: relative;
            margin: 10px 20px 0;
            text-align: center;
            .checkbox{
                width: 18px;
                height: 19px;
                background-image: url(~@/assets/images/ic_check_no@2x.png);
                background-size: 100% 100%;
                display: block;
                position: absolute;
                top: 5px;
                left: 20px;
            }
            .checkbox.checked {
                background-image: url(~@/assets/images/ic_check_yes@2x.png);
            }
            a{
                color:orange;
                text-decoration: none;
            }
        }
    }
}
</style>