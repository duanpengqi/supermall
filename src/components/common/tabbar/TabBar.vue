<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "TabBar",
};
</script>

<style>
#tabbar {
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 2px rgba(100, 100, 100, 0.3);
}
</style>