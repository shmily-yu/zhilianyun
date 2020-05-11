<template>
  <div class="customer">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="18" color="#ffffff" />客户信息
    </div>
    <div class="box">
      <div class="u-f-ac u-f-jsb name">
        {{obj.true_name}}
        <div class="type">
          <div v-if="obj.is_talk=='是'" class="type_word">已沟通</div>
          <div v-if="obj.is_talk=='否'" class="type_word">未沟通</div>
          <img v-if="obj.is_talk=='是'" src="../../assets/img/lanse.png" />
          <img v-if="obj.is_talk=='否'" src="../../assets/img/weigoutong.png" />
        </div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>手机号</div>
        <div>{{obj.mobile_phone}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>注册时间</div>
        <div>{{obj.reg_time}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>初步沟通</div>
        <div>{{obj.is_talk}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>讲师姓名</div>
        <div>{{obj.teacher_true_name}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>讲师培训</div>
        <div>{{obj.is_teachering}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>讲师成交状态</div>
        <div>{{obj.is_teachering_end}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>踢单员姓名</div>
        <div>{{obj.ti_true_name}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>踢单员成交状态</div>
        <div>{{obj.ti_status_msg}}</div>
      </div>
      <div class="u-f-ac u-f-jsb">
        <div>合同</div>
        <div>{{obj.ht_count}}</div>
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
  mounted() {
    console.log(this.$route.params);
    this.getUser();
  },
  computed: {
     ...mapState(["mobile_phone"])
  },

  methods: {
    getUser() {
      let data = {
        user_id: this.$route.query.user_id,
        mobile_phone: this.mobile_phone
      };
      console.log(data);
      this.api.getUserInfo(data).then(res => {
        console.log(res);
        this.obj = res.data.result.Response;
      });
    },

    onClickLeft() {
      this.$router.push("/recommend");
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  font-size: 14px;
  color: #ffffff;
  margin: 34px 20px 0px;
  padding: 20px 20px 46px;
}
.box > div:not(:first-child) {
  padding: 12px 0;
}
.customer {
  height: 100vh;
  background: url("../../assets/img/客户信息 拷贝.png");
  background-size: 100% 100%;
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
.name {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  padding: 0px 0 20px;
  margin-bottom: 10px;
  border-bottom: 1px dashed #ffffff;
}
.type {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(46%, -50%); /* 50%为自身尺寸的一半 */
  img {
    width: 60px;
    height: 30px;
  }
}
.type_word {
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-18%, -50%); /* 50%为自身尺寸的一半 */
}
</style>