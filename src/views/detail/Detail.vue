<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import { getDetail } from "network/detail";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
export default {
  name: "Detail",
  components: { DetailNavBar, DetailSwiper },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    // console.log(this.$route.params.iid);
    // 1. 保存iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求对应的数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    });
  },
  methods: {},
};
</script>

<style>
</style>