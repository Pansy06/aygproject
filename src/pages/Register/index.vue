<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label for="phone">手机号:</label>
        <input name="phone" type="text" placeholder="请输入你的手机号" v-model="phone">
      </div>
      <div class="content">
        <label for="code">验证码:</label>
        <input name='code' type="text" placeholder="请输入验证码" v-model="code">
        <button style="height:38px;width:100px" @click="getCode">获取验证码</button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1">
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree">
        <span>同意协议并注册《爱艺购用户协议》</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机爱艺购</li>
        <li>销售联盟</li>
        <li>爱艺购社区</li>
      </ul>
      <div class="address">地址：浙江省杭州市三墩镇紫金港工地</div>
      <div class="beian">浙CPU备19990601号
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true
    }
  },
  computed: {
  },
  methods: {
    async getCode() {
      try {
        const { phone } = this;
        phone && (await this.$store.dispatch('getCode', phone))
        this.code = this.$store.state.user.code
      } catch (error) {}
    },
    async userRegister(){
      try {
        const {phone,code,password,password1} = this;
      (phone&&code&&password1==password) && await this.$store.dispatch('userRegister',{phone,code,password})
      this.$router.push('/login')
      } catch (error) {
        
      }

    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>