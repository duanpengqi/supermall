<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="start-square"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end-square"></div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  methods: {
    imageLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    },
  },
};
</script>

<style scoped>

.goods-info {
  margin-top: 10px;
  padding-top: 5px;
  border-bottom: 5px solid #f2f5f8;
}

.clear-fix:after {
   content:""; 
   display: block; 
   clear:both; 
}


.info-key {
  padding: 15px 0 10px 15px;
  color: #333;
}

.info-desc {
  position: relative;
}

.info-desc .start {
  margin-left: 15px;
  width: 110px;
  height: 2px;
  background: #c7c6c6;
}

.info-desc .start-square {
  margin-top: -2px;
  margin-left: 15px;
  width: 5px;
  height: 5px;
  background-color: #000;
}

.info-desc .desc {
  padding: 15px;
  font-size: 14px;
}

.info-desc .end-square {
  position: absolute;
  right: 15px;
  bottom: -3px;
  z-index: 2;
  width: 5px;
  height: 5px;
  background-color: #000;
}

.info-desc .end {
  position: absolute;
  right: 15px;
  width: 110px;
  height: 3px;
  background: #c7c6c6;
}

.info-list img {
  width: 100%;
}
</style>