<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'bSroll',
  data() {
    return {
      scroll: null
    }
  },
  updated () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true,
      pullUpLoad: true
    })
    this.scroll.on('scroll', position => {
      // console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('加载更多！');
      // 在次下拉时能够 下拉加载更多
      setTimeout(() => {
        this.scroll.finishPullUp()
      },2000)
    })
  }
}
</script>

<style>

</style>