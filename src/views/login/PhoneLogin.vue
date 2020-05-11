<template>
  <div class="phoneLogin">
    <Logo :text="'登录'" />
    <van-form @submit="onSubmit" validate-first>
      <!-- 表单隐藏域 -->
      <van-field style="display:none" v-model="form.login_type" name="get_type" type="hidden" />
      <PhoneGroup :get_type="get_type" :form="form" :ready="ready" @checkPhone="checkPhone"></PhoneGroup>
      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#007BFF"
          style="font-size:18px"
          :disabled="empty||!ready/*只要有一个是真,按钮就失效*/"
          text="登录"
        ></van-button>
      </div>
      <div class="u-f-ajc otherEnter" @click="otherEnter">密码登录</div>
    </van-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { hasEmpty } from "../../untils/checkValue.js";
import Logo from "../../components/logo";
import PhoneGroup from "../../components/PhoneGroup";

export default {
  components: {
    Logo,
    PhoneGroup
  },
  data() {
    return {
      ready: false,
      get_type: "1", //验证码类型
      form: {
        mobile_phone: "",
        code: "",
        login_type: "1"
      }
    };
  },
  computed: {
    ...mapState(["mobile_phone"]),
    empty() {
      return hasEmpty(this.form);
    }
  },

  created() {//注意created和mounted的区别
    if (this.mobile_phone != "undefined" && this.mobile_phone) {
      this.ready = true; // 如果已有账号，则发送验证码按钮直接激活
      this.form.mobile_phone = this.mobile_phone; // 如果是注册跳转过来，直接填写手机号
      console.log(this.ready);
    }
  },
  methods: {
    ...mapMutations(["set_token", "set_mobile_phone"]),
    //接受子组件传过来的值，修改ready的值
    checkPhone(val) {
      this.ready = val;
    },

    otherEnter() {
      this.$router.push({ name: "AccLogin" });
    },

    onSubmit(data) {
      this.api.getLogin(data).then(res => {
        if (res.data.result.Code == 200) {
          this.set_token(res.data.result.Response);
          this.set_mobile_phone(data.mobile_phone);
          this.$toast.success(res.data.result.Msg);
          this.$router.push("/");
        } else {
          this.$toast.fail("验证码错误");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-form {
  padding: 0 20px;
}

.otherEnter {
  font-size: 12px;
  color: rgba(196, 196, 196, 1);
}

.phoneLogin {
  background: #252429;
}
</style>