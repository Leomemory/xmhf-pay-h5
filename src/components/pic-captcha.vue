<template>
    <self-dialog v-show="isShow">
        <div class="img-container">
            <img @click="refreshAlt" class="captchaImgUrl" :src="captchaImgUrl" alt="">
            <p>点击图片刷新</p>
        </div>
        <div class="form_group">
            <mt-field placeholder="请输入图片验证码" v-model="altCode"></mt-field>
        </div>
        <div class="dialog_btn">
            <mt-button type="primary" size="large" :disabled="!altCode" @click="submitCaptcha()">登录</mt-button>
        </div>
    </self-dialog>
</template>

<script>
import SelfDialog from '@/components/self-dialog'
import {paramUrl} from 'common/utils'
export default {
    components:{
        SelfDialog
    },
    data() { 
		return {
            altCode: null,
            captchaImgUrl: null
		}
    },
    props:{
        isShow: {
			type: Boolean,
			default: false
		},
        picCaptcha: {
            type: Object,
            default: null
        }
    },
    watch:{
        isShow () {
			this.altCode = null
		},
        picCaptcha: {
            handler (value) {
                if (value && value.api && value.params) {
                    this.getPicCaptcha(value)
                }
            },
            deep: true
        }
    },
    methods:{
        refreshAlt () {
            this.getPicCaptcha(this.currentInfo)
		},
        getPicCaptcha (value) {
            let host = window.location.href.replace(/^((?:http|https):\/\/.+)\/#\/.+$/mg, '$1')
            this.currentInfo = value
            let data = Object.assign({}, value.params, {random: new Date().getTime()})
            this.captchaImgUrl = host + paramUrl(value.api, data)
        },
        submitCaptcha () {
            this.$emit('altcode', this.altCode)
        }
    }

}
</script>

<style lang="scss" scoped>
.img-container{
    margin-bottom: 20px;
    text-align: center;
    img{
        width: 158px;
        height: 58px;
        background: #999;
    }
    p{
        font-size: 12px;
        color: #999;
        line-height: 21px;
    }
}
</style>