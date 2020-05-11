<template>
  <div class="user">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <div class="box">
      <div style="padding:10px 0">
        <van-uploader
          style="width:100%"
          :after-read="afterRead"
          v-model="fileList"
          :preview-image="false"
        >
          <div class="u-f-ac u-f-jsb" style="width:100%">
            <div class="u-f-ajc" style="margin-left:30px">头像</div>
            <div class="u-f" style="margin-right:20px">
              <div
                style="width:4rem; height:4rem;border-radius:50%; border: 2px solid #3392FC;margin-right:10px"
              >
                <img
                  @error="imgError"
                  :src="obj.imgurl"
                  style="width:100%; height:100%;border-radius:50%"
                />
              </div>
              <div class="u-f-ajc">
                <van-icon name="arrow" size="18" />
              </div>
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="u-f-ac u-f-jsb" style="padding:10px 0">
        <div class="u-f-ajc" style="margin-left:30px">姓名</div>
        <div class="u-f" style="margin-right:20px">
          <div style="margin-right:10px">{{obj.true_name}}</div>
          <div class="u-f-ajc">
            <van-icon name="arrow" size="18" />
          </div>
        </div>
      </div>
      <div class="u-f-ac u-f-jsb" style="padding:10px 0">
        <div class="u-f-ajc" style="margin-left:30px">手机号</div>
        <div class="u-f" style="margin-right:20px">
          <div style="margin-right:10px">{{obj.mobile_phone}}</div>
          <div class="u-f-ajc">
            <van-icon name="arrow" size="18" />
          </div>
        </div>
      </div>
      <div class="u-f-ac u-f-jsb" style="padding:10px 0">
        <div class="u-f-ajc" style="margin-left:30px">子公司</div>
        <div class="u-f" style="margin-right:20px">
          <div style="margin-right:10px">{{obj.comp_name}}</div>
          <div class="u-f-ajc">
            <van-icon name="arrow" size="18" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["mobile_phone"])
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getMyInfo(data).then(res => {
        console.log(res);
        res = res.data.result.Response;
        this.obj = res;
      });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let data = new FormData();
      data.append("mobile_phone", this.mobile_phone);
      data.append("file", file.file);
      this.api.getPic(data).then(res => {
        if (res.data.result.Code == 200) {
          this.$toast.success("上传成功");
          this.obj.imgurl = res.data.result.Response;
          window.location.reload(); //直接刷新解决/my图片缓存不更新问题
        } else {
          this.$toast(res.data.result.Response);
        }
      });
    },
    onClickLeft() {
      this.$router.push("/my");
    },
    jump(i) {
      console.log(i);
    },
    imgError() {
      this.obj.imgurl = this.pic;
    }
  },
  data() {
    return {
      pic: require("../../assets/img/头像 (1).png"),
      fileList: [],
      obj: {}
    };
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background: #252429;
}
/deep/.van-nav-bar .van-icon {
  font-size: 22px;
  color: #6c6c6c;
}
/deep/.van-nav-bar__title {
  color: #312f32;
  font-weight: bold;
}
.van-hairline--bottom::after {
  border: none;
}
.user {
  height: 100vh;
  background: #252429;
}
.box {
  margin-top: 10px;
  background: #252429;
  color: #ffffff;
}
.box > div {
  height: 68px;
}
/deep/.van-uploader__input-wrapper {
  width: 100%;
}
/deep/.van-nav-bar__title {
  color: #ffffff;
  font-size: 20px;
}
</style>