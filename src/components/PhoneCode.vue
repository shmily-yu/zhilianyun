<template>
  <div>
    <van-button
      size="small"
      color="#0081FA"
      :style="[{fontSize:(fontFlag?'16px':'8px')}]"
      native-type="button"
      :disabled="wait||!ready/*只要有一个是真,按钮就失效*/"
      @click="getCode"
    >{{msg}}</van-button>
  </div>
</template>
<script>
export default {
  name: "PhoneCode",
  props: {
    ready: Boolean,
    form: Object,
    get_type: String
  },
  mounted() {
    console.log(this.ready);
  },
  data() {
    return {
      fontFlag: true,

      msg: "获取",
      wait: false,
      clock: 30
    };
  },
  methods: {
    //获取验证码
    getCode() {
      this.$emit("openInput", ""); //触发父组件的事件，使输入框解禁
      let data = {
        mobile_phone: this.form.mobile_phone,
        get_type: this.get_type
      };
      console.log(data);
      this.api.getPhoneCode(data).then(res => {
        this.wait = true; //验证码按钮失效，开始倒计时

        this.countdown();

        this.$toast.success(res.data.result.Msg);
      });
    },
    // 重置倒计时
    countdown() {
      this.clock = 30;
      setInterval(() => {
        this.clock -= 1;
        this.msg = `${this.clock}秒后获取`;
        this.fontFlag = false; //按钮字体变小
        if (this.clock <= 0) {
          clearInterval(this.timer);
          this.wait = false;
          this.fontFlag = true; //按钮字体恢复
          this.msg = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.van-button--default {
  border: none;
}
</style>