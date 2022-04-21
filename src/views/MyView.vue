<template>
    <div class="w-full flex flex-col justify-center items-center">
    <!-- <a-input :value="userName"/> -->
    <UploadImg
    :fileLength="1"
    :label="'上传头像'"
    :uploadUrl="uploadUrl"
    :fileList="fileList"
    :handleChange="handleChange"
    />
    <a-button type="primary" @click="onSubmit" style="background-color: #1890ff !important;">
      更新
    </a-button>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg.vue'
import axios from 'axios'
export default {
  components: { UploadImg },
  data () {
    return {
      uploadUrl: process.env.VUE_APP_APIPATH + process.env.VUE_APP_UPLOADAVATAR,
      fileList: [],
      userName: this.$store.getters.getUserName
    }
  },
  methods: {
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    onSubmit () {
      if (this.fileList.length !== 1) {
        alert('请正确上传头像')
      } else {
        axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_UPDATAUSER, {
          avatar: this.fileList[0].response.filePath,
          user_id: this.$store.getters.getUserId
        }).then((response) => {
          if (response.data.update) {
            this.$store.commit('setUserAvatat', this.fileList[0].response.filePath)
          }
        }).catch(function (error) {
          alert(error)
        })
      }
    }
  }

}
</script>

<style>

</style>
