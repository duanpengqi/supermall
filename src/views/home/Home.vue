<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control 
        class="fixed"
        :titles="titles" 
        @tabClick="tabClick"
        ref="tab_control1" 
        v-show="isFixedTabControl"/>     
    <scroll
      class="content"
      ref="scroll"
      :prob-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control 
        :titles="titles" 
        @tabClick="tabClick"
        ref="tab_control2" />     
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTopBtn" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { debounce } from "common/utils";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/BScroll";
import BackTop from "components/content/backTop/BackTop";

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixedTabControl: false,
      scrollY: 0
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
    BackTop,
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
  mounted() {
    // 在图片刷新完成后重新计算可滚动区域
    const refresh = debounce(this.$refs.scroll.refresh, 100); // 千万不要加小括号，会出问题， 加小括号相当于在这执行这个函数
    // 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      // 每张图片加载完成进行刷新
      refresh();
    });
  },
  activated() {
    // 2. 回来时直接滚动到离开时的位置
    this.$refs.scroll.scrollTo(0, this.scrollY, 0)    
    // 3. 为了防止来回切换时better-scroll不能滚动所以切换回来时刷新一下
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1. 离开的时候获取scroll滚动的位置
    // console.log("离开",this.$refs.scroll.scroll.y);
    this.scrollY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件相关的方法
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
      this.$refs.tab_control1.currentIndex = index
      this.$refs.tab_control2.currentIndex = index
    },
    backTopBtn() {
      this.$refs["scroll"].scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 1. 决定backTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000 ? true : false;
      // 2. 决定tabcontrol是否吸顶
      this.isFixedTabControl = Math.abs(position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 等轮播图加载完成后在计算tab_control的offsetTop
    swiperImageLoad() {
      // 获取到tabcontrol的offsettop值
     // 所有的组件都有$el 用来获取组件中的所有元素
      this.tabOffsetTop = this.$refs['tab_control2'].$el.offsetTop // Top要大写
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 获取到轮播图
        this.banners = res.data.banner.list;
        // 获取到推荐信息
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品详情列表
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;

        // 在获取到数据之后，执行结束本次上拉加载更多， 以便可以执行下次加拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* viewport height 视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器的原生滚动时需要固定定位， 要不然“购物街”会跑上去， 但better-scroll时局部滚动， 滚动时不影响“购物街” */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 不起效果 因为better-scroll中的traslate的值可以改变fixed的位置  */
/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */

.fixed {
  position: relative;
  /* z-index只在定位中起效果 */
  z-index: 9;
  background-color: #fff;
}
</style>