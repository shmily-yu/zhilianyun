<template>
  <div class="pwd">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="22" color="#ffffff" />修改密码
    </div>
    <van-form @submit="onSubmit" validate-first>
      <!-- 表单隐藏域 -->
      <van-field style="display:none" v-model="form.get_type" name="get_type" type="hidden" />

      <PhoneGroup :get_type="get_type" :form="form" :ready="ready" @checkPhone="checkPhone"></PhoneGroup>

      <div style="margin: 40px 16px 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#0081FA"
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
      get_type: "2",

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
    onClickLeft() {
      this.$router.push("/my");
    },
    //接受子组件传过来的值，修改ready的值
    checkPhone(val) {
      this.ready = val;
    },

    onSubmit(data) {
      this.$router.push({
        name: "pwdconfirm",
        query: window.btoa(JSON.stringify(data)) //将对象转成字符串后再编码
      });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  font-weight: bold;
  padding: 20px 0 0;
  position: relative;
  color: #ffffff;
  font-size: 18px;
}
.left_icon {
  position: absolute;
  left: 8px;
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
.title {
  color: #ffffff;
  font-size: 20px;
  padding: 16px 0;
}
.pwd {
  height: 100vh;
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