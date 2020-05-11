<template>
  <div class="logo">
    <div class="head_bg">
      <van-row>
        <van-col span="16">
          <img src="@/assets/img/LOGO123.png" alt class="logo" />
        </van-col>
      </van-row>
      <div class="head_word">
        <div>Hello,</div>
        <div>欢迎{{text}}至联云</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Logo",
  props:['text']
};
</script>
<style lang="less" scoped>
.head_bg {
  padding: 20px 20px 0px;
  position: relative;
}
.logo {
  width: 100%;
  height: 100%;
}
.head_word {
  position: absolute;
  z-index: 999;
  top: 40px;
  left: 36px;
}
.head_word > div {
  padding: 5px 0;
  font-size: 30px;
  font-weight: bold;
  font-family: PingFang SC;
  color: #ffffff;
}
</style>