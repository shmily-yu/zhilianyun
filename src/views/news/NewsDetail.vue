<template>
  <div style="position:relation" class="box">
    <van-nav-bar title="资讯详情" :border="false">
      <template #left>
        <van-icon name="arrow-left" size="22" color="#F3F3F7" @click="goback" />
      </template>
      <template #right>
        <van-icon name="ellipsis" size="22" color="#F3F3F7" @click="share"/>
      </template>
    </van-nav-bar>

    <div class="title u-f-ajc">{{obj.title}}</div>
    <div class="look_time u-f u-f-jsb">
      <div class="u-f-ac">
        <van-icon name="eye-o" style="margin-right:6px" color="#6A6A6A" />
        {{obj.read_nums}}
      </div>
      <div class="u-f-ac">{{addtime(obj.add_time)}}</div>
    </div>
    <div class="img_box">
      <img :src="obj.imgurl" style="width:100%;height:100%" />
    </div>
    <div class="text" v-html="obj.content"></div>
    <div class="u-f-ajc" style="color:#C4C4C4">END</div>
    <div class="u-f-ajc">
      <img src="../../assets/img/gungxian2.png" style="width:220px;margin-left:20px" />
    </div>
    <div class="news_title">
      <div class="news_head_title u-f-ajc">相关资讯</div>
      <img src="../../assets/img/kuang.png" />
    </div>
    <div class="list_box">
      <van-pull-refresh v-model="refreshing" style="margin-bottom:60px">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, index) in list" :key="index">
            <router-link
              :to="{name:'NewsDetail', params: {id:item.id,createcode:$route.params.createcode,mobile_phone:$route.params.mobile_phone}}/*此处不再解密，因为跳进去时还会再解密*/"
            >
              <NewsList :item="item"></NewsList>
            </router-link>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="float" v-if="flag">
      <div class="float_item u-f u-f-jsb">
        <div class="u-f-ajc">
          <img src="../../assets/img/logo (1).png" alt />
        </div>
        <div style="padding:0 4px;margin-right:14vh">
          <div class="u-f-ac" style="height:50%;font-size:18px;color:#0081FA">智联云</div>
          <div
            class="u-f-ac"
            style="height:50%;color:rgba(196,196,196,1);font-size:14px"
          >引领科技未来</div>
        </div>
        <div class="u-f-ajc">
          <router-link :to="{name:'Signup', query: {createcode:this.$route.params.createcode}}">
            <div class="join u-f-ajc" style="margin-right:2vh">加入</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NewsList from "../../components/NewsList";
export default {
  data() {
    return {
      flag: true, //浮窗标志
      loading: false,
      finished: false,
      refreshing: false,
      obj: {},
      list: []
    };
  },
  components: {
    NewsList
  },
  computed: {
    ...mapState(["mobile_phone", "createcode"]),
    mobile() {
      return window.atob(this.$route.params.mobile_phone); //base64解密
    }
  },
  methods: {
    // 分享
    share(){
       this.$toast('点击右上方分享');
    },
    // 时间转换
    addtime(val) {
      return this.$time(val);
    },
    goback() {
      this.$router.push("/News");
    },
    onLoad() {
      console.log(this.$route);
      // 判断是否登录
      if (this.mobile_phone) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      let data = {
        id: this.$route.params.id,
        mobile_phone: this.mobile, //base64解密
        createcode: this.$route.params.createcode
      };
      this.api.getDetailData(data).then(res => {
        // console.log(res);
        res = res.data.result;
        this.obj = res.Response.news_info;
        this.list = res.Response.rand_news;
        this.loading = false;
        this.finished = true;
      });
    }
  }
};
</script>
<style scoped lang="less">
.float_item {
  background: #1e1d21;
}
.box {
  background: #252429;
}
.van-nav-bar {
  background: #252429;
}
/deep/ .van-nav-bar__title {
  font-weight: bold;
  font-size: 18px;
  color: #f3f3f7;
}
.van-notice-bar {
  padding: 0;
  font-size: 16px;
}
.title {
  color: #ffffff;
  line-height: 4.5vh;
  font-weight: bold;
  font-size: 3.2vh;
  padding: 4px 20px;
}
.look_time {
  font-size: 13px;
  color: #6a6a6a;
  padding: 4px 20px;
}
.img_box {
  padding: 10px 10px;
  height: 28vh;
}
/deep/.text {
  color: #ffffff;
  font-size: 16px;
  line-height: 32px;
  padding: 4px 20px;
  text-indent: 2rem;
  // 修改v-html样式
  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.float {
  z-index: 999;
  height: 70px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -2px 6px 0.5px rgba(192, 192, 192, 0.35);
}
.float_item {
  padding: 10px 10px;
}
.join {
  width: 50px;
  height: 24px;
  border-radius: 10px;
  background: #007bff;
  color: #fff;
  font-size: 14px;
}
.news_title {
  margin: 10px 0 20px;
  position: relative;
  .news_head_title {
    position: absolute;
    top: 1px;
    left: 22px;
    font-size: 20px;
  }
  img {
    width: 150px;
    height: 30px;
  }
}
</style>