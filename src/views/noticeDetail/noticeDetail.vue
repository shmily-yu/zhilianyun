<template>
  <div style="position:relation" class="box">
    <van-nav-bar title="公告内容" :border="false">
      <template #left>
        <van-icon name="arrow-left" size="22" color="#F3F3F7" @click="goback" />
      </template>
      <!-- <template #right>
        <van-icon name="ellipsis" size="22" color="#F3F3F7" @click="share" />
      </template>-->
    </van-nav-bar>

    <div class="title u-f-ajc">{{obj.title}}</div>
    <div class="look_time">作者：{{obj.author}}</div>
    <div class="look_time u-f u-f-jsb">
      <div class="u-f-ac">
        <van-icon name="eye-o" style="margin-right:6px" color="#6A6A6A" />
        {{obj.is_show}}
      </div>

      <div class="u-f-ac">发布于:{{addtime(obj.add_time)}}</div>
    </div>
    <div class="text" v-html="obj.content"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      obj: {}
    };
  },
  mounted() {
    this.onLoad();
  },

  computed: {
    ...mapState(["mobile_phone"])
  },
  methods: {
    // 分享
    share() {
      this.$toast("点击右上方分享");
    },
    // 时间转换
    addtime(val) {
      return this.$time(val);
    },
    goback() {
      this.$router.push("/");
    },
    onLoad() {
      let data = {
        notice_id: this.$route.query.id,
        mobile_phone: this.mobile_phone
      };
      this.api.get_notice_id(data).then(res => {
        this.obj = res.data.result.Response;
        console.log(this.obj);
      });
    }
  }
};
</script>
<style scoped lang="less">
.box {
  background: #252429;
}
.van-nav-bar {
  background: #252429;
}
/deep/ .van-nav-bar__title {
  font-weight: bold;
  font-size: 18px;
  color: #f3f3f7;
}
.van-notice-bar {
  padding: 0;
  font-size: 16px;
}
.title {
  color: #ffffff;
  line-height: 4.5vh;
  font-weight: bold;
  font-size: 3.2vh;
  padding: 4px 20px;
}
.look_time {
  font-size: 13px;
  color: #6a6a6a;
  padding: 4px 20px;
}
.img_box {
  padding: 10px 10px;
  height: 28vh;
}
/deep/.text {
  color: #ffffff;
  font-size: 16px;
  line-height: 32px;
  padding: 4px 20px;
  text-indent: 2rem;
  // 修改v-html样式
  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.float {
  z-index: 999;
  height: 70px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 6px 0.5px rgba(192, 192, 192, 0.35);
}
.float_item {
  padding: 10px 10px;
}

.news_title {
  margin: 10px 0 20px;
  position: relative;
  .news_head_title {
    position: absolute;
    top: 1px;
    left: 22px;
    font-size: 20px;
  }
  img {
    width: 150px;
    height: 30px;
  }
}
</style>
