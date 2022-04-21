<template>
      <div class="clearfix">
      <a-upload
        :action="uploadUrl"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < fileLength">
          <a-icon type="plus" />
          <div class="ant-upload-text">{{label}}</div>
        </div>
      </a-upload>

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
</template>

<script>
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {

  data () {
    return {
      previewVisible: false,
      previewImage: ''
    }
  },
  props: {
    fileLength: Number,
    fileList: Array,
    handleChange: Function,
    uploadUrl: String,
    label: String
  },
  methods: {
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    }
  }

}
</script>

<style>

</style>
