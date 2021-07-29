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
  props: {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  // 不能写在created里面， 因为created还没有加载dom元素
  // 不能写在updated里面， 以为只有
  mounted () { 
    // 1. 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probe -- 探查
      probeType: this.probeType, // 在向上滑动时持续获取当前y坐标的值 0(默认值)为不获取 1确定不获取 2只在手指按住上滑时获取 3不管手指有没有按住，只要上滑就获取 
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // this.scroll.on 用来监听事件 （）中写入事件名和参数
    // 2. 监听scroll滚动位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll',position)
    })
    // 3. 监听上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>