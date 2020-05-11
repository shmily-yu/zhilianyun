<template>
  <div class="aboutus">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="22" color="#ffffff" />关于我们
    </div>
    <div class="u-f-ajc imgBox">
      <img class="img" src="../../assets/img/LOGO.png" />
    </div>
    <div class="textBox" v-html="text"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
   computed: {
    ...mapState(["mobile_phone"])
  },
  methods: {
     onClickLeft() {
      this.$router.push("/my");
    },
    getData(){
       let data = { mobile_phone: this.mobile_phone };
      this.api.getAboutUs(data).then(res=>{
        res = res.data.result;
        this.text=res.Response;
      })
    }

  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      text: ''
    };
  }
};
</script>
<style lang="less" scoped>
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
.title {
  padding: 14px 0;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}
.img {
  width: 20vh;
  height: 20vh;
}
.imgBox {
  padding: 50px 0 20px;
}
.textBox {
  color: #ffffff;
  line-height: 4vh;
  text-indent: 2em;
  padding: 10px 30px 30px;
  font-size: 2.5vh;
}
.aboutus {
  height: 100vh;
  background: #252429;
}
</style>