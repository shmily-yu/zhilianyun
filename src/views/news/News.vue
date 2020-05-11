<template>
  <div>
    <div class="u-f-ac u-f-jsb box" style="padding:10px 0 0">
      <div style="padding:0 6px 0 6px">
        <router-link to="/index">
          <van-icon name="arrow-left" size="22" color="#f3f3f7" />
        </router-link>
      </div>
      <van-search v-model="value" left-icon placeholder="请输入搜索关键词" @search="onSearch" />
      <div style="padding:0 6px 0 6px">
        <van-icon name="search" size="20" color="#f3f3f7" />
      </div>
    </div>

    <van-tabs
      title-active-color="#ffffff"
      title-inactive-color="#ffffff"
      background="#252429"
      v-model="active"
      :border="false"
      @click="onClick"
      animated
    >
      <van-tab
        v-for="(item, index) in tabList"
        :title="item.type_name"
        :name="item.id"
        :key="index"
        line-height="6"
        line-width="10"
      >
        <div class="list_box">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
            >
              <div v-for="(item, index) in list" :key="index">
                <router-link
                  :to="{name:'NewsDetail', params: {id:item.id,createcode:createcode,mobile_phone:mobile}}"
                >
                  <NewsList :item="item"></NewsList>
                </router-link>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NewsList from "../../components/NewsList";
export default {
  data() {
    return {
      value: "",
      active: "", //选中的tab
      tabList: [],
      list: [],
      zx_type: "", //资讯类型
      page: 1,
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  components: {
    NewsList
  },
  mounted() {
    this.getType();
  },
  computed: {
    ...mapState(["mobile_phone", "createcode"]),
    mobile() {
      return window.btoa(this.mobile_phone); //base64加密
    }
  },
  methods: {
    // 资讯类型
    getType() {
      let data = { mobile_phone: this.mobile_phone };
      this.api.getNewType(data).then(res => {
        this.tabList = res.data.result.Response;
        this.active = this.tabList[0].type_name;
        this.zx_type = this.tabList[0].id;
        this.onLoad();
      });
    },
    // 点击切换获取资讯列表
    onClick(name) {
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.zx_type = name; //重置参数一:资讯类型
      this.page = 1; //重置参数二:当前页数
      this.onLoad();
    },
    onSearch(val) {
      this.$router.push({ name: "search", query: val });
    },
    // 获取列表
    onLoad() {
      let data = {
        zx_type: this.zx_type,
        page: this.page,
        mobile_phone: this.mobile_phone
      };
      this.api.getListData(data).then(res => {
        console.log(res);
        //如果下拉刷新开启，数组清空后，下拉刷新关闭
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        if (res.data.result.Code == 200) {
          this.list.push(...res.data.result.Response);
          this.page += 1; //参数page+1
          this.loading = false;
          if (res.data.result.Response.length == 0) {
            this.finished = true;
          }
        } else {
          this.$toast.fail(res.data.result.Msg);
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; //重置参数page
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

.van-search {
  background: #252429;
  width: 100%;
  padding: 4px 0px;
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

/deep/ .van-tab--active > span {
  font-size: 22px !important;
  font-weight: 500 !important;
}
.box {
  background: #252429;
  z-index: 1;
}
/deep/.van-tabs__line {
  background: #0081fa;
  // background: url("../../assets/img/guangxian.png") no-repeat;
  // background-size: contain;
}
</style>