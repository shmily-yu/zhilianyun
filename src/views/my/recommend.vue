<template>
  <div class="recommend" style="height:100vh">
    <div class="u-f-ajc head">
      <van-icon class="left_icon" name="arrow-left" @click="onClickLeft" size="22" color="#ffffff" />我的推荐
    </div>
    <div class="box">
      <div class="people">
        <div class="u-f-ac">
          总人数:
          <span>{{nums_all}}</span>
        </div>
        <div class="u-f-ac">
          初步沟通人数:
          <span>{{talk_nums_all}}</span>
        </div>
      </div>
      <div class="u-f-ac u-f-jsb communicate">
        <div
          class="u-f-ajc"
          v-for="(item, index) in btnType"
          :key="index"
          @click="tabCge(index)"
          :class="{'active':index==tabIndex}"
        >{{item.type}}</div>
      </div>
    </div>
    <div class="list" style="height:100vh">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, index) in list" :key="index">
            <div class="item" @click="jump(item)">
              <div style="font-size:2.5vh">
                客户姓名:
                <span>{{item.true_name}}</span>
              </div>
              <div style="font-size:2.5vh">
                联系电话:
                <span>{{item.mobile_phone}}</span>
              </div>
              <div class="type" @click.stop="changeStatus(item.user_id)">
                <div style="font-size:2.2vh" class="type_word">{{commit_type[item.is_talk]}}</div>
                <img :src="commit_bg[item.is_talk]" />
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      commit_type: ["未沟通", "已沟通"],
      commit_bg: [
        require("../../assets/img/weigoutong.png"),
        require("../../assets/img/lanse.png")
      ],
      nums_all: "",
      talk_nums_all: "",
      page: 1,
      loading: false,
      finished: false,
      refreshing: false,
      tabIndex: 0,
      btnType: [
        { id: "all_infos", type: "全部" },
        { id: "in_talk_infos", type: "已沟通" },
        { id: "no_talk_infos", type: "未沟通" }
      ],
      list: []
    };
  },
  computed: {
    ...mapState(["mobile_phone"])
  },
  methods: {
    // 更改沟通状态
    changeStatus(i) {
      let data = { mobile_phone: this.mobile_phone, user_id: i };
      this.api.get_status(data).then(res => {
        if (res.data.result.Code == 200) {
          this.$toast.success("已沟通");
          this.page = 1;
          this.list = [];
        }
      });
      this.onLoad();
    },

    jump(data) {
      this.$router.push({ name: "customer", query: { user_id: data.user_id } });
    },
    //tab切换
    tabCge(index) {
      this.loading = true;
      this.finished = false;
      this.tabIndex = index;
      this.list = [];
      this.page = 1;
      this.onLoad();
    },
    onClickLeft() {
      this.$router.push("/my");
    },
    onLoad() {
      let data = { mobile_phone: this.mobile_phone, page: this.page };
      console.log(data);
      this.api.getMyInvite(data).then(res => {
        //如果下拉刷新开启，数组清空后，下拉刷新关闭
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        res = res.data.result;
        this.nums_all = res.Response.nums_all;
        this.talk_nums_all = res.Response.nums_all;
        // 判断当前点在哪一项
        if (this.tabIndex == 0) {
          // this.list=res.Response.all_infos
          this.list.push(...res.Response.all_infos);
          // this.page += 1; //参数page+1
          this.loading = false;
          this.finished = true;
          // if (res.Response.all_infos.length == 0) {
          //   this.finished = true;
          // }
        } else if (this.tabIndex == 1) {
          // this.list=res.Response.in_talk_infos
          this.list.push(...res.Response.in_talk_infos);
          // this.page += 1; //参数page+1
          this.loading = false;
          this.finished = true;
          // if (res.Response.in_talk_infos.length == 0) {
          //   this.finished = true;
          // }
        } else if (this.tabIndex == 2) {
          // this.list=res.Response.no_talk_infos
          this.list.push(...res.Response.no_talk_infos);
          // this.page += 1; //参数page+1
          this.loading = false;
          this.finished = true;
          // if (res.Response.no_talk_infos.length == 0) {
          //   this.finished = true;
          // }
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
.active {
  background: url("../../assets/img/矩形 2 拷贝 12.png");
  background-size: 100% 100%;
  color: #252429 !important;
}
.recommend {
  background: url("../../assets/img/我的推荐 拷贝.png") no-repeat;
}
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

.people {
  padding: 10px 30px 20px;
  div {
    color: #ffffff;
    font-size: 3vh;
    line-height: 20px;
    padding: 5px 0;
    span {
      margin-left: 4px;
      margin-top: 1px;
    }
  }
}

.communicate {
  padding: 10px 36px 20px;
  div {
    width: 100px;
    height: 30px;
    color: #ffffff;
    font-size: 2.5vh;
  }
}
.list {
  padding: 10px 10px 10px 10px;
}
.item {
  margin-right: 10px;
  position: relative;
  padding: 1vh 10px;
  color: #ffffff;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 8px solid #2379d03b;
  border-image-slice: 10;
  div {
    padding: 10px 0;
    span {
      margin-left: 4px;
    }
  }
}
.type {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(30%, -50%); /* 50%为自身尺寸的一半 */
  img {
    width: 60px;
    height: 30px;
  }
}
.type_word {
  font-size: 14px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-18%, -50%); /* 50%为自身尺寸的一半 */
}
</style>