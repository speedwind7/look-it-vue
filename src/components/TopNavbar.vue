<template>
  <div class="flex flex-row justify-start h-20 w-full mb-4">
      <div class="h-full mx-2">
          <slot name="Icon"></slot>
      </div>
      <div v-if="$store.getters.getLoginState" class="flex flex-row justify-between w-full h-full items-end" >
        <a-menu mode="horizontal">
          <a-menu-item >
            <router-link to="/">主页</router-link>
          </a-menu-item>
          <a-menu-item >
            <router-link to="/about/aaaa">About</router-link>
          </a-menu-item>
        </a-menu>
        <a-menu   mode="horizontal">
          <!-- <a-input-search placeholder="input search text" enter-button @search="onSearch" /> -->
          <a-menu-item >
              <router-link style="color:black !important" to='/my'><a-avatar size="large" :src=" $store.getters.getUserAvatat || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" /> {{$store.getters.getUserName}}</router-link>
          </a-menu-item>
          <a-menu-item>
            <button @click="quit"> 退出</button>
          </a-menu-item>
        </a-menu>
      </div>

  </div>
</template>

<script>
export default {
  name: 'TopNavBar',
  methods: {
    onSearch () {

    },
    quit () {
      this.$store.commit('quit')
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
