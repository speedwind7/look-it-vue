<template>
  <div class="w-2/3 flex flex-col justify-center items-center">
    <a-form :form="form" @submit="handleSubmit" >
      <a-form-item v-bind="formItemLayout" label="账号">
        <a-input
          v-decorator="[
            'account',
            {
              rules: [
                {
                  required: true,
                  message: '请输入账号',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  min:6,
                  max:15,
                  message: '密码请在6-15位之间'
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: '请确认密码',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout">
        <span slot="label">
          昵称&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-input
          v-decorator="[
            'nickname',
            {
              rules: [{ required: true, message: '请输入昵称', whitespace: true }],
            },
          ]"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="手机号">
        <a-input
          v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: '请输入您的手机号!' }],
            },
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '86' }]"
            style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!-- <a-form-item v-bind="formItemLayout" label="Website">
        <a-auto-complete
          v-decorator="['website', { rules: [{ required: true, message: 'Please input website!' }] }]"
          placeholder="website"
          @change="handleWebsiteChange"
        >
          <template slot="dataSource">
            <a-select-option v-for="website in autoCompleteResult" :key="website">
              {{ website }}
            </a-select-option>
          </template>
          <a-input />
        </a-auto-complete>
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
                'captcha',
                { rules: [{ required: true, message: 'Please input the captcha you got!' }] },
              ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button>Get captcha</a-button>
          </a-col>
        </a-row>
      </a-form-item> -->
      <!-- <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          I have read the
          <a href="">
            agreement
          </a>
        </a-checkbox>
      </a-form-item> -->
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" class="signup-form-button">
          注册
        </a-button>
        <a-button style="margin-left: 10px;" @click="() => $router.go(-1)">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.signUp(values)
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error('Two passwords that you enter is inconsistent!'))
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },

    // handleWebsiteChange (value) {
    //   let autoCompleteResult
    //   if (!value) {
    //     autoCompleteResult = []
    //   } else {
    //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
    //   }
    //   this.autoCompleteResult = autoCompleteResult
    // }
    signUp (values) {
      axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_SIGNUPAPI, values)
        .then((response) => {
          const data = response.data
          if (data.cerateUser === true) {
            this.$store.commit('login', data)
            this.$router.push('/')
          }
        })
    }

  }
}
</script>
<style>
.signup-form-button {
  background-color: #1890ff !important;
}
</style>
