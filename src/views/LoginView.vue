<template>
<div class="w-full flex flex-col justify-center items-center">
  <h1 class="text-4xl font-bold mb-10">Look!</h1>

  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form "
    @submit="handleSubmit"
  >
    <a-alert type="error" message="账号或密码错误" banner v-if="passwordError" closable
    @close="handleClose"/>
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        记住我
      </a-checkbox>
      <a class="login-form-forgot" href="">
        忘记密码？
      </a>
      <a-button type="primary" :loading="loginInloading" html-type="submit" class="login-form-button">
        登录
      </a-button>
      Or
      <router-link to="/signup" class="text-blue-500">注册！</router-link>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      passwordError: false,
      loginInloading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleClose () {
      this.passwordError = false
    },
    handleSubmit (e) {
      this.loginInloading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.login(values)
        } else {
          this.loginInloading = false
        }
      })
    },
    login (values) {
      axios.post(process.env.VUE_APP_APIPATH + process.env.VUE_APP_LOGINAPI, {
        user_id: values.userName,
        password: values.password
      }).then((response) => {
        this.loginInloading = false
        const data = response.data
        if (data.login) {
          this.$store.commit('login', data)
          this.$router.push('/')
          if (values.remember) {
            localStorage.setItem('userName', JSON.stringify(values))
          } else {
            localStorage.removeItem('userName')
          }
        } else {
          this.passwordError = true
        }
      }).catch(function (error) {
        alert(error)
      })
    }
  },
  mounted () {
    const userData = JSON.parse(localStorage.getItem('userName'))
    if (userData !== null) {
      this.login(userData)
    }
  }
}
</script>
<style>
.login-form {
  max-width: 400px;
}
 .login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
  background-color: #1890ff !important;
}
</style>
