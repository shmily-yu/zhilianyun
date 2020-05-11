<template>
  <div>
      <div class="news_item u-f u-f-jsb" style="height: 15vh; padding: 10px;">
        <div style="padding:0 10px 0 0;height:100%;width:60%">
          <div style="height:80%;font-size:2.5vh;color:#ffffff">{{item.title}}</div>
          <div class="u-f u-f-jsb" style="height:20%">
            <div class="u-f-ac" style="font-size:2vh;color:#6A6A6A">
              <van-icon name="eye-o" style="margin-right:6px" color="#6A6A6A" />
              {{item.look}}
            </div>
            <div class="u-f-ajc" style="font-size:2vh;color:#6A6A6A">{{addtime(item.add_time)}}</div>
          </div>
        </div>
        <div class="u-f-ajc" style="width:40%">
          <img :src="item.imgurl" style="width:100%;height:100%;border-radius:10px;" />
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "NewsList",
  data() {
    return {};
  },
  props: {
    item: Object
  },
  methods: {
    // 时间转换
    addtime(val) {
      return this.$time(val);
    }
  }
};
</script>
<style lang="less" scoped>
.news_item {
  background: #252429;
  border-bottom: 1px solid #252429;
}
</style>