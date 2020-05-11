<template>
  <div class="Signup">
    <Logo :text="'注册'" />
    <van-form @submit="onSubmit" validate-first>
      <PhoneGroup :get_type="get_type" :form="form" :ready="ready" @checkPhone="checkPhone"></PhoneGroup>
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.inviter_id"
        name="inviter_id"
        placeholder="邀请码"
        :rules="[{ required: true, message: '请填写邀请码' }]"
      />
      <van-field
        v-model="form.true_name"
        name="true_name"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }/*,{ pattern:nameReg, message: '请输入正确姓名' }*/]"
      />
      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#007BFF"
          style="font-size:18px"
          :disabled="empty||!ready"
          text="注册"
        ></van-button>
      </div>
      <router-link to="/AccLogin">
        <div class="u-f-ajc" style="font-size:14px;color:#C4C4C4">已有帐号？</div>
      </router-link>
    </van-form>
  </div>
</template>
<script>
import Logo from "../../components/logo";
import { hasEmpty } from "../../untils/checkValue.js";
import { mapMutations } from "vuex";
import PhoneGroup from "../../components/PhoneGroup";

export default {
  components: {
    Logo,
    PhoneGroup
  },
  data() {
    return {
      ready: false,
      get_type: "0", //验证码类型
      form: {
        mobile_phone: "",
        code: "",
        password: "",
        inviter_id: "",
        true_name: ""
      }
    };
  },
  computed: {
    empty() {
      return hasEmpty(this.form);
    }
  },
  mounted() {
    this.getInvite();
  },
  methods: {
    ...mapMutations(["set_mobile_phone"]),
    // 缓存邀请码
    getInvite() {
      if (this.$route.query.createcode) {
        this.form.inviter_id = this.$route.query.createcode;
      }
    },
    //接受子组件传过来的值，修改ready的值
    checkPhone(val) {
      this.ready = val;
    },

    onSubmit(data) {
      this.api.getSign(data).then(res => {
        if (res.data.result.Code == 200) {
          this.set_mobile_phone(data.mobile_phone);
          this.$toast.success("注册成功");
          this.$router.push("/AccLogin");
        } else {
          this.$toast(res.data.result.Msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-form {
  padding: 0 20px 20px;
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
.Signup {
  background: #252429;
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