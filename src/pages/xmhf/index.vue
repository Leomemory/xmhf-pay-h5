<template>
    <div class="xmhf">
        <mt-header title="happy pay" fixed>
            <router-link to="" slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>

        <div class="loanLimit" v-show="toShow">
            <p class="mini_title">最高可借额度（元）</p>
            <h2>1000.00</h2>
            <button>前往激活额度</button>
        </div>
        <div class="loanLimit" v-show="!toShow">
            <p class="mini_title">可用额度（元）</p>
            <h2>500.00</h2>
            <button>前往提高额度</button>
        </div>

        <div class="payByScan">
            <img src="@/assets/images/ic_code_n@2x.png" alt="">
            <span>扫码付款</span>
        </div>

        <div class="product_des">
            <div>
                <h4><img src="@/assets/images/ic_product1_n@2x.png" alt=""></h4>
                <p>产品介绍</p>
            </div>
            <div>
                <h4><img src="@/assets/images/ic_product2_n@2x.png" alt=""></h4>
                <p>免息介绍</p>
            </div>
            <div>
                <h4><img src="@/assets/images/ic_product3_n@2x.png" alt=""></h4>
                <p>使用攻略</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            toShow:true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "styles/var.scss";
$width:335px;
.xmhf{
    .loanLimit{
        width: $width;
        height: 267px;
        background: linear-gradient(to left,$color-grad1,$color-grad2);
        border-radius: 8px;
        margin: 20px auto;
        .mini_title{
            font-size:14px;
            font-weight:400;
            color:#FFFFFF;
            line-height:20px;
            letter-spacing:1px;
            text-align: center;
            padding: 40px 0 12px;
        }
        h2{
            font-size:60px;
            font-weight:500;
            color:#FFFFFF;
            line-height:60px;
            text-shadow:0px 2px 9px #148DE1;
            text-align: center;
            margin-bottom: 40px;
        }
        button{
            display: block;
            width:255px;
            height:55px;
            background:#FFFFFF;
            border: none;
            border-radius:29px;
            margin: 0 auto;
            font-size:18px;
            font-weight:600;
            color:#0083E0;
            line-height:22px;
            letter-spacing:2px;
        }
    }
    .payByScan{
        position: relative;
        width:$width;
        height:80px;
        background:#FFFFFF;
        border-radius:8px;
        margin: 0 auto 41px;
        img{
            width: 41px;
            height: 41px;
            margin: 20px 20px 19px 44px;
            vertical-align: middle;
        }
        span{
            font-size:18px;
            font-weight:400;
            color:#4D4D4D;
            line-height:18px;
            letter-spacing:1px;
        }
        &::after{
            content: '';
            position: absolute;
            top: 29px;
            right: 20px;
            width: 23px;
            height: 22px;
            background: url(~@/assets/images/ic_nav_to_n@2x.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .product_des{
        display: flex;
        justify-content: space-evenly;
        h4{
            text-align: center;
            height: 47px;
            margin-bottom: 10px;
            img{
                width: 47px;
                height: 47px;
            }
        }
        p{
            font-size:12px;
            font-weight:400;
            color:#7F7F7F;
            line-height:14px;
            text-align: center;
        }
    }
}
</style>