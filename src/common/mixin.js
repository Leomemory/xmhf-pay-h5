export const countDownMixin = {
	data () {
		return {
			captchaText: '获取验证码',
			reSend: false
		}
	},
	methods: {
		smsCountdown () {
		    let countdown = 60;
		    this.smsTimer = setInterval(() => {
		        countdown--;
		        this.reSend = true
		        this.captchaText = '重新获取' + countdown + 's'
		        if (countdown <= 0) {
		            this.resetCountDown()
		        }
		    }, 1000);
		},
		resetCountDown () {
		    clearInterval(this.smsTimer)
		    this.captchaText = '获取验证码'
		    this.reSend = false
		}
	}
}
