<template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="$store.state.topicList" :bordered="true">
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
      <!-- <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px" />
          {{ text }}
        </span>
      </template> -->

      <a-list-item-meta :description="item.user_name">
          <router-link :to="{ name: 'content', params: {contentId: item.topic_id }}" class="text-lg" slot="title" >{{ item.title }} </router-link>
      </a-list-item-meta>
      <div class="flex flex-row justify-between w-full ">
        {{ item.content }} <span>最新回复：{{ moment(item.updateAt,'YYYY-MM-DD HH:mm:ss').add(8, 'h').fromNow()}}</span>
      </div>
    </a-list-item>
  </a-list>
</template>
<script>
import moment from 'moment'
export default {
  name: 'ContentList',
  data () {
    return {
      moment,
      pagination: {
        onChange: page => {
          // console.log(page)
        },
        pageSize: 10
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ]
    }
  }
}
</script>
<style>
</style>
