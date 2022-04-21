
<template>
  <div>
    <!-- <h1>{{ $route.params.message}}</h1>
    <h1>{{ $store.state.isLogin}}</h1>
    <h1>{{ $store.getters.getLoginState}}</h1> -->
    <!-- <button @click="login">login</button> -->
    <h1>建设中...</h1>
    <PlayVideo :videoPath="path"></PlayVideo>
    <!-- <form action="http://localhost:3000/uploadImg" method="post" enctype="multipart/form-data">
      <input type="file" name="file" id="file" value="" multiple="multiple" />
      <input type="submit" value="提交"/>
    </form> -->
  </div>
</template>

<script>
import PlayVideo from '@/components/PlayVideo.vue'
export default {
  components: { PlayVideo },
  data () {
    return {
      path: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    }
  },
  methods: {
    login () {
      this.$store.commit('login')
    }
  }
}
</script>

<style>

</style>
