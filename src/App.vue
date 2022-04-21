<template>
  <div id="app">
    <TopNavBar>
      <img src="./assets/logo.png" slot="Icon" class="h-full object-contain"/>
    </TopNavBar>

    <router-view/>
    <!-- <router-view class="view one"></router-view> -->
    <!-- <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view> -->
  </div>
</template>
<script lang="ts">
import TopNavBar from './components/TopNavbar.vue'
export default {
  components: { TopNavBar }

}
</script>

<style lang="css" src="./styles.css"/>
<style>
</style>
