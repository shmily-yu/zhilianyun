<template>
  <div class="index">
    <div class="box">
      <van-search v-model="value" show-action left-icon placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch" class="u-f-ajc">
            <van-icon name="search" size="24" color="#F3F3F7" />
          </div>
        </template>
      </van-search>
      <!-- 轮播图 -->
      <div style="padding:10px;">
        <van-swipe :autoplay="3000" class="my-swipe">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <router-link
              :to="{name:'NewsDetail', params: {id:getImgId(image.content),createcode:createcode,mobile_phone:mobile}}"
            >
              <img v-lazy="image.imgurl" class="swipe_img" />
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 公告 -->
      <van-notice-bar @click="showNotice" :text="text" color="#FFFFFF" background="#1E1D21" left-icon="volume-o">
        </van-notice-bar>

      <div class="news_head u-f u-f-jsb">
        <div style="position:relative">
          <div class="news_head_title">热点资讯</div>
          <div class="blueline">
            <img src="../../assets/img/kuang.png" alt />
          </div>
        </div>
        <router-link to="/News">
          <div class="moreNews u-f-ajc">更多</div>
        </router-link>
      </div>
    </div>

    <div class="list_box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class v-for="(item, index) in list" :key="index">
            <router-link
              :to="{name:'NewsDetail', params: {id:item.id,createcode:createcode,mobile_phone:mobile}}"
            >
              <NewsList :item="item"></NewsList>
            </router-link>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NewsList from "../../components/NewsList";

export default {
  name: "index",
  data() {
    return {
      value: "",
      images: [],
      text: "",
      list: [],
      notice_id:'',
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  components: {
    NewsList
  },
  mounted() {
    this.getData();
    this.get_share();
  },
  computed: {
    ...mapState(["mobile_phone", "createcode"]),
    mobile() {
      return window.btoa(this.mobile_phone); //base64加密
    }
  },
  methods: {
    showNotice(){
      this.$router.push({name:'noticeDetail',query:{id:this.notice_id}})
    },
    //轮播图id处理
    getImgId(val) {
      return val.split("/").pop();
    },

    //获取邀请码
    get_share() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getShare(data).then(res => {
        this.$store.commit(
          "set_createcode",
          res.data.result.Response.createcode
        );
      });
    },
    //获取轮播图和公告
    getData() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getHome(data).then(res => {
        let obj = res.data.result.Response;
        console.log(obj);
        this.images = obj.lunbos;
        this.text = obj.content_text;
        this.notice_id=obj.notice_id
      });
    },
    onSearch(val) {
      console.log(val);
      this.$router.push({ name: "search", query: val });
    },
    //获取图文列表
    onLoad() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getHome(data).then(res => {
        //如果下拉刷新开启，数组清空后，下拉刷新关闭
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        this.list = res.data.result.Response.news; //将数组一次性全部赋值
        this.loading = false; // 加载状态结束
        this.finished = true; //加载完成后不再触发load事件，同时出现'没有更多了'文字提示
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-field__control {
  color: #fff;
}
/deep/.van-pull-refresh__head {
  background: #252429;
}
.van-pull-refresh {
  background: #252429;
}
.van-search__content {
  background: #32303c;
}
.van-search__action {
  background: #32303c;
}
.my-swipe {
  height: 23vh;
  border-radius: 8px;
}

.swipe_img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
}
.van-swipe-item {
  border-radius: 8px;
}
.news_head {
  padding: 12px 14px;
}
.news_head_title {
  z-index: 999;
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  width: 250px;
}
.moreNews {
  font-size: 14px;
  color: #c4c4c4;
}
.blueline {
  width: 40vh;
  height: 5vh;
  border-radius: 2px;
  position: absolute;
  top: 74%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
  }
}
.box {
  background: #252429;
  z-index: 1;
}

.list_box {
  margin-bottom: 50px;
}
.van-search__action {
  border-radius: 4px;
  padding: 5px 8px;
}
.van-search {
  background: #252429;
  padding: 14px 12px 10px;
}
/deep/.van-list__error-text {
  background: #252429;
}
/deep/.van-list__finished-text {
  background: #252429;
}
/deep/.van-list__loading {
  background: #252429;
}
</style>