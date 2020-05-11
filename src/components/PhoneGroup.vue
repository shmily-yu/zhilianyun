<template>
  <div class="PhoneGroup">
    <van-field
      @input="checkPhone"
      v-model="form.mobile_phone"
      type="tel"
      name="mobile_phone"
      placeholder="手机号"
      label="+86"
      label-width="40px"
      :rules="[{ required: true, message: '请填写手机号' },{ pattern:phoneReg, message: '请输入正确手机号' }]"
    />
    <van-field
      :disabled="codeFlag"
      v-model="form.code"
      name="code"
      placeholder="请输入验证码"
      :rules="[{ required: true, message: '请填写验证码' }]"
    >
      <template #button>
        <PhoneCode :get_type="get_type_" :ready="ready_" :form="form" @openInput="openInput"></PhoneCode>
      </template>
    </van-field>
  </div>
</template>
<script>
import { mapState } from "vuex";
import PhoneCode from "./PhoneCode";
export default {
  name: "PhoneGroup",
  components: {
    PhoneCode
  },
  props: {
    get_type: String, //父组件传递过来的验证码类型
    form: Object,
    ready: Boolean
  },
   mounted() {
    console.log(this.ready);
  },
  data() {
    return {
      get_type_: this.get_type, //接受父组件传过来的值，并重新赋值再传给子组件
      ready_: this.ready, //接受父组件传过来的值，并重新赋值再传给子组件
      codeFlag: true //验证码输入框是否禁用
    };
  },
  methods: {
    // input事件检测手机号码输入状态,如果正确则发送验证码按钮激活
    checkPhone(val) {
      this.phoneReg.test(val) ? (this.ready_ = true) : (this.ready_ = false);
      //   ready的值发生了修改，将正确的值再传给父组件
      this.$emit("checkPhone", this.ready_);
    },
    // 解禁验证码输入框
    openInput() {
      this.codeFlag = false;
    }
  },
  computed: {
    ...mapState(["phoneReg"])
  }
};
</script>
<style lang="less" scoped>
.van-cell {
  padding-top: 30px;
}

/deep/.van-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0px;
  left: 16px;
  right: 16px;
  border-bottom: 1px solid #c4c4c4;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
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