<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-img"></slot>
    </div>
    <div v-else>
      <slot name="item-img-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#d81e06",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1; //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      // this.$router.push("/location").catch((err) => console.log(err)); // 连续点击首页有报错解决
      console.log(this.path);
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>