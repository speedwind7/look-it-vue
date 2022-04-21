<template>

  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="创建主题"
      @back="() => $router.go(-1)"
    />
    <div class="p-6">
      <a-form
        ref="ruleForm"
        :form="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-item label="标题">
          <a-input v-model="form.title"/>
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model="form.content" type="textarea" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit" style="background-color: #1890ff !important;">
          发帖
        </a-button>
        <a-button style="margin-left: 10px;" @click="() => $router.go(-1)">
          取消
        </a-button>
      </a-form-item>
    </a-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input Activity title', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Please input Content', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_CREATETOPIC, { ...this.form, userId: this.$store.getters.getUserId })
        .then((response) => {
          console.log(response.data)
          if (response.data.cerateTopic) {
            this.$router.push('/')
          } else {
            alert('发帖失败，请检查内容是否为空')
          }
        }).catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style>

</style>
