<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="titleName()"
      @back="() => $router.go(-1)"
    />
    <a-list
      size="large"
      :pagination="pagination"
      :data-source="messageList"
      :bordered="true"
    >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-comment :author="item.user_name" >
        <a-avatar slot="avatar" :size="64" :src="item.avatar ||'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" />
        <div slot="content">
          <p class="p-3 text-xl">{{ item.content }}</p>
          <div class="p-3" v-for="file in item.files" :key="file.path ||file">
            <img  :src="file.path ||file" v-if="!file.type || file.type.match(/image\/*/)" />
            <PlayVideo :videoPath="file.path" v-if="file.type && file.type.match(/video\/*/)"></PlayVideo>
          </div>
        </div>
        <a-tooltip slot="datetime" :title="moment(item.createdAt,'YYYY-MM-DD HH:mm:ss').add(8, 'h').format('YYYY-MM-DD HH:mm')">
          <span>{{ moment(item.createdAt,'YYYY-MM-DD HH:mm:ss').add(8, 'h').fromNow()}}</span>
        </a-tooltip>
      </a-comment>

    </a-list-item>
    </a-list>
    <!-- 评论 -->
    <a-alert
      v-if="visible"
      message="请输入内容"
      type="warning"
      closable
      :after-close="handleClose"
    />
    <a-textarea
      v-model="value"
      placeholder="Controlled autosize"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    <UploadImg
    :fileLength="8"
    :fileList="fileList"
    :uploadUrl="uploadUrl"
    :handleChange="handleChange"
    :label="'上传图片或者视频'">

    ></UploadImg>
    <a-button class="float-right border" @click="sendMessage">评论 </a-button>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import PlayVideo from '@/components/PlayVideo.vue'
import UploadImg from '@/components/UploadImg.vue'

export default {
  components: { PlayVideo, UploadImg },
  props: ['title', 'contentId'],
  data () {
    return {
      moment,
      uploadUrl: process.env.VUE_APP_APIPATH + process.env.VUE_APP_UPLOADFILES,
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 50
      },
      messageList: [],
      visible: false,
      value: '',
      fileList: [
      ]
    }
  },

  met: {
    // contentData () {
    //   return this.$store.getters.getItemForIndex(this.$route.params.contentId)
    //     .content
    // },
  },
  watch: {
    $route: function () {
      console.log('router is change')
    }
  },
  methods: {
    titleName () {
      return this.$store.getters.getTitleName(this.$route.params.contentId)
    },

    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    handleClose () {
      this.visible = false
    },
    sendMessage () {
      console.log(this.$store.getters.getUserId)
      if (this.value === '' && this.fileList.length === 0) {
        this.visible = true
        return
      }
      const fileList = this.fileList.map((val) => {
        return {
          path: val.response.filePath,
          type: val.response.type
        }
      })
      axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_SENDMESSAGE, {
        content: this.value,
        topicId: this.$route.params.contentId,
        userId: this.$store.getters.getUserId,
        fileList: fileList
      }).then((response) => {
        console.log(response)
        if (response.data.sendMessage === true) {
          this.value = ''
          this.fileList = []
          this.getMessage()
        } else {
          alert('评论失败')
        }
      })
    },
    getMessage () {
      axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_GETMESSAGE, {
        topicId: this.$route.params.contentId
      }).then((response) => {
        this.messageList = response.data
        this.messageList.forEach((val) => {
          val.files = JSON.parse(val.files)
        })
      })
    }
  },
  mounted () { /* 请求数据，操作dom , 放在这个里面  mounted */
    this.getMessage()
  }
}
</script>

<style>
.ant-comment-avatar img{
    width: 100% !important;
    height: 100% !important;
    border-radius: 50%;
}
</style>
