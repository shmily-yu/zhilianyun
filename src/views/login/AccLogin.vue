<template>
  <div>
    <Logo :text="'登录'" />
    <van-form @submit="onSubmit" validate-first>
      <!-- 表单隐藏域 -->
      <van-field style="display:none" v-model="form.get_type" name="get_type" type="hidden" />
      <van-field
        v-model="form.mobile_phone"
        name="mobile_phone"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' },
        { pattern:phoneReg, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="forgetLink" @click="forgetPwd">忘记密码</div>

      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#007BFF"
          style="font-size:18px"
          :disabled="empty"
          text="登录"
        ></van-button>
      </div>
      <div class="u-f-ajc otherEnter" @click="otherEnter">验证码登录</div>
      <router-link to="/Signup">
        <div class="u-f-ajc noSign otherEnter">还未注册？</div>
      </router-link>
    </van-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { hasEmpty } from "../../untils/checkValue.js";
import Logo from "../../components/logo";
export default {
  components: {
    Logo
  },
  data() {
    return {
      form: {
        mobile_phone: "",
        password: "",
        get_type: 0
      }
    };
  },
  computed: {
    ...mapState(["mobile_phone", "phoneReg"]),
    empty() {
      return hasEmpty(this.form);
    }
  },
  mounted() {
    if (this.$route.query.info == "exit") {
      this.clear_user_info();
    }
  },
  // 如果是注册跳转过来，直接填写手机号
  created() {
    this.form.mobile_phone = this.mobile_phone;
  },
  methods: {
    ...mapMutations(["set_token", "set_mobile_phone"]),
    //退出登录跳转过来则清除token和手机号
    clear_user_info() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("mobile_phone");
      this.form.mobile_phone = "";
    },
    otherEnter() {
      this.$router.push({ name: "PhoneLogin" });
    },
    forgetPwd() {
      this.$router.push({ name: "ForgetPwdOne" });
    },

    onSubmit(data) {
      this.api.getLogin(data).then(res => {
        console.log(res);
        if (res.data.result.Code == 200) {
          this.set_token(res.data.result.Response);
          this.set_mobile_phone(data.mobile_phone);
          this.$toast.success("登录成功");
          this.$router.push("/");
        } else {
          this.$toast(res.data.result.Msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.noSign {
  margin-top: 23vh;
  // position: absolute;
  // bottom: 0;
  // left: 50%;
  // transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
}
.van-form {
  padding: 0 20px;
}
.van-cell {
  padding-top: 30px;
}
.van-cell:not(:last-child)::after {
  right: 16px;
  border-bottom: 1px solid #c4c4c4;
}
.otherEnter {
  font-size: 12px;
  color: rgba(196, 196, 196, 1);
}
.forgetLink {
  text-align: right;
  padding: 4px 16px 0;
  font-size: 10px;
  color: rgba(196, 196, 196, 1);
}
.van-cell {
  background: #252429;
}
/deep/.van-field__label {
  color: #ffffff;
}
/deep/.van-field__control {
  color: #ffffff;
}
</style>