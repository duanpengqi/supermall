<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners" class="home-swiper" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" class="home-control" @tabClick="tabClick" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/BScroll";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        //如果对象里的属性名是以数字开头的，就要将属性名用引号引起来，并且只能通过中括号的方式取,不能用 . 的方式取。
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
  },
  created() {
    // 请求轮播图，推荐等数据
    this.getHomeMultidata();
    // console.log(this.list);// 这里验证数据时还没获取到， 因为上面的函数时异步请求
    // 请求商品的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件想换的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}
.home-swiper {

}
.home-control {
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>