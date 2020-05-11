<template>
  <div class="pwd">
    <div class="u-f-ajc forget_title">修改密码</div>
    <van-form @submit="onSubmit" validate-first>
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.password_two"
        name="password_two"
        type="password"
        placeholder="请确认密码"
        :rules="[{ required: true, message: '请填写密码' },
        {validator:checkPwd,message:'两次密码不一致'}
        ]"
      />

      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#007BFF"
          style="font-size:18px"
          :disabled="empty"
          text="完成"
        ></van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { hasEmpty } from "../../untils/checkValue.js";
export default {
  data() {
    return {
      form: {
        password: "",
        password_two: ""
      }
    };
  },
  computed: {
    empty() {
      return hasEmpty(this.form);
    }
  },
  methods: {
    checkPwd(val) {
      return this.form.password === val;
    },
    otherEnter() {
      this.$router.push({ name: "AccLogin" });
    },

    onSubmit(data) {
      let obj = Object.assign(data, JSON.parse(window.atob(this.$route.query))); //解码后将字符串转回对象
      this.api.getPwd(obj).then(res => {
        if (res.data.result.Code == 200) {
          this.$toast.success("修改成功");
          this.$router.push("/My");
        } else {
          this.$toast.fail("验证码错误");
          this.$router.push('/password')
        }
      });
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
/deep/.van-field__control {
  color: #ffffff;
}
.pwd {
  height: 100vh;
  background: #252429;
}
.van-cell {
  background: #252429;
}
</style>