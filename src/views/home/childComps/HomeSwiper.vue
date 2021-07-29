<template>
  <div>
    <swiper >
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "homeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      typeof: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      // 有多张轮播图， 但只需要执行一次就够了   
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
      // console.log("this.isLoad>>>",this.isLoad);     
    }
  }
};
</script>

<style>
</style>