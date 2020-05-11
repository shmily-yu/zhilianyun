<template>
  <div>
    <div class="u-f-ajc forget_title">忘记密码</div>
    <van-form @submit="onSubmit" validate-first>
      <PhoneGroup :get_type="get_type" :form="form" :ready="ready" @checkPhone="checkPhone"></PhoneGroup>

      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#007BFF"
          style="font-size:18px"
          :disabled="empty||!ready"
          text="下一步"
        ></van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { hasEmpty } from "../../untils/checkValue.js";
import PhoneGroup from "../../components/PhoneGroup";

export default {
  components: {
    PhoneGroup
  },
  data() {
    return {
      ready: false,
      get_type: "2", //验证码类型

      form: {
        mobile_phone: "",
        code: ""
      }
    };
  },
  computed: {
    ...mapState(["mobile_phone"]),
    empty() {
      return hasEmpty(this.form);
    }
  },
  created() {
    if (this.mobile_phone != "undefined" && this.mobile_phone) {
      this.ready = true; // 如果已有账号，则发送验证码按钮直接激活
      this.form.mobile_phone = this.mobile_phone;
    }
  },
  methods: {
    //接受子组件传过来的值，修改ready的值
    checkPhone(val) {
      this.ready = val;
    },

    otherEnter() {
      this.$router.push({ name: "AccLogin" });
    },

    onSubmit(data) {
      this.$router.push({ name: "ForgetPwdTwo", params: data });
    }
  }
};
</script>
<style lang="less" scoped>
.forget_title {
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  padding: 20px 0 0;
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
.van-button--default {
  border: none;
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