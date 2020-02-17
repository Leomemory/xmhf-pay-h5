<template>
    <div>
        <div class="con">
            <p>我是测试字节</p>
        </div>
        <div class="test">
            sass内容测试
        </div>
        <div style="margin:20px;">
            <mt-button type="primary" size="large">danger</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang="scss">
.con{
    width: 700px;
    height: 200px;
    background: pink;
    border: 1px solid #ccc;
    font-size: 16px;
}
$bac:red;
@mixin box-border{
    border: 1px solid #ccc;
    border-radius: 5px;
}
.test{
  color: $bac;
  width: 700px;
  height: 200px;
  background: green;
  margin-bottom: 20px;
  @include box-border
}
</style>