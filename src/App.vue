<template>
  <div id="app">
    <keep-alive include="share">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <Loading v-show="LOADING"></Loading>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "./components/Loading";
export default {
  computed: {
    ...mapState(["LOADING"])
  },
  name: "App",
  components: {
    Loading
  }
};
</script>

<style lang="less">
</style>
