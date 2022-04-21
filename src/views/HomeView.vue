<template>
  <div>
    <h1 class="text-4xl font-bold ml-3">Look!</h1>
    <div style="padding:20px">
      <ContentList></ContentList>
      <div class="float-right mt-5">
        <a-button type="primary" style="background-color: #1890ff !important;">
          <router-link to="/createTopic">发帖</router-link>
        </a-button>
      </div>
    </div>

  </div>
</template>

<script>
import ContentList from '@/components/ContentList.vue'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    ContentList
  },
  data () {
    return {
    }
  },
  methods: {

  },
  // 从上到下有顺序要求
  beforeCreate () {
    // console.log('实例刚刚被创建1')
  },
  created () {
    // console.log('实例已经创建完成2')
  },
  beforeMount () {
    // console.log('模板编译之前3')
  },
  mounted () { /* 请求数据，操作dom , 放在这个里面  mounted */
    // console.log('模板编译完成4')
    this.$store.dispatch('updataTopicList')
  }
  // beforeUpdate () {
  //   console.log('数据更新之前')
  // },
  // updated () {
  //   console.log('数据更新完毕')
  // },
  // beforeDestroy () { /* 页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数 */
  //   console.log('实例销毁之前')
  // },
  // destroyed () {
  //   console.log('实例销毁完成')
  // }
}
</script>
