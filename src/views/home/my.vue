<template>
  <div class="box">
    <div class="container">
      <div class="u-f-ajc" style="color:#ffffff;font-size:3vh;padding:10px 0 10px">我</div>
      <div class="user u-f-ac">
        <div style="padding:10px 5px;width:100%" class="u-f-ac u-f-jsb">
          <div class="u-f-ac">
            <div style="width:4rem; height:4rem;border-radius:50%; flex-shrink:0">
              <img
                @error="imgError"
                :src="obj.imgurl"
                style="width:100%; height:100%;border-radius:50%;border: 4px solid #339AFA;"
              />
            </div>
            <div style="padding: 0 0 0 16px">
              <div class="u-f-ac" style="padding:8px 0;">
                <div
                  style="padding:0 8px 0 0;font-size:3vh;color:#ffffff"
                  class="u-f-ajc"
                >{{obj.true_name}}</div>
                <div class="u-f-ajc" style="font-size:2vh;color:#ffffff">{{obj.mobile_phone}}</div>
              </div>
              <div style="padding:8px 0;font-size:2vh;height:3vh;color:#ffffff">{{obj.intro}}</div>
            </div>
          </div>
          <div>
            <router-link to="/user">
              <div class="editor u-f-ajc">编辑</div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <router-link :to="{path:item.path,query:{info:item.info}}">
          <div class="sheet u-f-ac u-f-jsb">
            <div class="u-f-ac" style="padding:0 18px">
              <div class="u-f-ajc">
                <img :src="item.img" style="width20px;height:20px" />
              </div>
              <div style="margin-left:10px;">{{item.part}}</div>
            </div>
            <div class="u-f-ac" style="padding:0 18px">
              <div class="u-f-ajc" v-if="item.info=='count'" style="color:#C4C4C4">{{obj.count}}</div>
              <div class="u-f-ajc dot" v-if="item.info=='dot'"></div>
              <div class="u-f-ajc" style="margin-left:10px">
                <van-icon name="arrow" size="18" color="#C4C4C4" />
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(["mobile_phone"])
  },
  methods: {
    imgError() {
      this.obj.imgurl = this.pic;
    },
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getMyInfo(data).then(res => {
        console.log(res);
        res = res.data.result.Response;
        this.obj = res;
      });
    }
  },
  data() {
    return {
      pic: require("../../assets/img/头像 (1).png"),
      list: [
        {
          img: require("../../assets/img/tuijian.png"),
          part: "我的推荐",
          info: "count",
          path: "/recommend"
        },
        {
          img: require("../../assets/img/jiangshi.png"),
          part: "我的专属讲师",
          info: "",
          path: "/teacher"
        },
        {
          img: require("../../assets/img/fenxiang.png"),
          part: "分享",
          info: "dot",
          path: "/share"
        },
        {
          img: require("../../assets/img/mima.png"),
          part: "密码",
          info: "",
          path: "/password"
        },
        {
          img: require("../../assets/img/guanyuwomen.png"),
          part: "关于我们",
          info: "",
          path: "/aboutus"
        },
        {
          img: require("../../assets/img/exit.png"),
          part: "退出账户",
          info: "exit",
          path: "/AccLogin"
        }
      ],
      obj: {}
    };
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100vh;
  background: #1e1d21;
  margin-bottom: 60px;
}
.container {
  padding: 10px 10px 0 10px;
}
.user {
  // border-radius: 10px;
  border: 0.5px dashed #995454;
  height: 16vh;
  background: no-repeat center url("../../assets/img/bg.png");
}
.editor {
  margin-right: 4px;
  border-radius: 4px;
  font-size: 12px;
  width: 6vh;
  height: 3.8vh;
  color: #007bff;
  background: #fff;
}
.sheet {
  height: 11vh;
  border-radius: 10px;
  background: #1e1d21;
  margin: 10px 0;
  color: #ffffff;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
}
</style>