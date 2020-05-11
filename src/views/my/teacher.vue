<template>
  <div class="teacher">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="22" color="#ffffff" />我的专属讲师
    </div>
    <div class="box">
      <div class="name">
        讲师：
        <span>{{obj.true_name}}</span>
      </div>
      <div class="u-f-ac u-f-jsb" style="font-size:2.5vh">
        <div class="phone">手机号</div>
        <div>{{obj.mobile_phone}}</div>
      </div>
      <div class="u-f-ac u-f-jsb" style="font-size:2.5vh">
        <div class="acc">账户</div>
        <div>{{obj.user_name}}</div>
      </div>
      <div class="u-f-ajc">
        <div class="two_code">
          <img :src="obj.wechat_img" alt />
        </div>
      </div>
      <div class="u-f-ajc" style="font-size:2vh;padding-top:2vh">
        微信二维码
      </div>
    </div>
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
  computed: {
    ...mapState(["mobile_phone"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getTeacher(data).then(res => {
        this.obj=res.data.result.Response
      });
    }
  }
};
</script>
<style lang="less" scoped>
.teacher {
  position: relative;
  background: url("../../assets/img/专属讲师 拷贝.png");
  background-size: 100% 100%;
  height: 100vh;
}
.head {
  position: relative;
  padding: 10px 0px;
  color: #ffffff;
  font-size: 18px;
}
.left_icon {
  position: absolute;
  left: 8px;
}
.box {
  height: 20vh;
  width: 78%;
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
  color: #ffffff;
  padding: 0 40px;
}
.name {
  font-size: 4vh;
  padding: 20px 0;
}
.phone {
  padding: 10px 0;
}
.acc {
  padding: 10px 0;
}
.two_code {
  margin-top: 3vh;
  background: #ffffff;
  width: 24vh;
  height: 24vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>