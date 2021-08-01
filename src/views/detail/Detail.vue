<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";
import Scroll from "../../components/common/scroll/Scroll.vue";

import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  created() {
    // console.log(this.$route.params.iid);
    // 1. 保存iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求对应的数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      let data = res.result;
      // 1. 获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2. 获取商品信息的数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3. 获取店铺信息数据
      this.shop = new Shop(data.shopInfo);
      // 4. 获取商品详情信息
      this.detailInfo = data.detailInfo;
      // 5. 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    });
  },
  methods: {
    //等图片加载完成后刷新better-scroll
    imageLoad() {
      console.log(111);
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>