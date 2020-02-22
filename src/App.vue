<template>
  <div id="app">
    <router-view/>
    <mt-tabbar :fixed="true" :value="$route.name" @input="$router.push({name: arguments[0]})"
                class="vux-1px-t" v-show="isShowTab">
        <mt-tab-item id="xmhf">
            <span slot="icon" class="tabicon xmhf"></span>
            仙买后付
        </mt-tab-item>
        <mt-tab-item id="bill">
            <span slot="icon" class="tabicon bill"></span>
            账单
        </mt-tab-item>
         <mt-tab-item id="my">
            <span slot="icon" class="tabicon my"></span>
            我的
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
const shouldShowTabRoutes = ['xmhf', 'bill', 'my']
export default {
  name: 'App',
  computed:{
    isShowTab() {
        return shouldShowTabRoutes.indexOf(this.$route.name) !== -1
    }
  }
}
</script>

<style lang="scss">
.tabicon{
  background-size: 28px 28px;
  &.xmhf {
      background: url(~@/assets/images/ic_tab1_n@2x.png) no-repeat;
      background-size: 100% 100%;
  }
  &.bill {
      background: url(~@/assets/images/ic_tab2_n@2x.png) no-repeat;
      background-size: 100% 100%;
  }
  &.my {
      background: url(~@/assets/images/ic_tab3_n@2x.png) no-repeat;
      background-size: 100% 100%;
  }
}
.mint-tab-item.is-selected .tabicon {
    &.xmhf {
        background: url(~@/assets/images/ic_tab1_s@2x.png) no-repeat;
        background-size: 100% 100%;
    }
    &.bill {
        background: url(~@/assets/images/ic_tab2_s@2x.png) no-repeat;
        background-size: 100% 100%;
    }
    &.my {
        background: url(~@/assets/images/ic_tab3_s@2x.png) no-repeat;
        background-size: 100% 100%;
    }
}
</style>
