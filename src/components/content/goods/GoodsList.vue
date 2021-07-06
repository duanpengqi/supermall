<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goods" :key="index" :item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "goodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>