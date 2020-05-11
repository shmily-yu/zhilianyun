<template>
  <div class="home">
    <keep-alive include="share">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      route
      v-model="active"
      active-color="#1989fa"
      inactive-color="#8E8D8E"
      class="home_bar"
    >
      <van-tabbar-item icon="wap-home" replace to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="manager" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      active: 0
    };
  },
  methods: {}
};
</script>
<style scoped>
.van-tabbar--fixed {
  background: #1e1d21;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}
</style>
