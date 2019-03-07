<template>
	<div class="site-wrapper site-page-login" :style="{ 'min-height': documentClientHeight + 'px' }">
		<div class="header-login row-center">
			<img src="~@/assets/img/logo.png" /><span>联茵图像智能监控平台</span>
		</div>
		<div class="center-back">
			<div class="login-form-row row-center">
				<div class="login-form-container">
					<div class="login-title">登录</div>
					<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="邮箱帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <el-checkbox v-model="dataForm.checked">记住密码</el-checkbox>
            </el-form-item>
           <!--  <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="">
                </el-col>
              </el-row>
            </el-form-item> -->
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
            </el-form-item>
          </el-form>
				</div>
			</div>
		</div>
		<div class="site-info">联茵信息<br/>地址：上海市青浦区高光亮215弄99号三号楼&emsp;    联系电话：021-398856993   </div>
		<div class="legal-info">Copyright 联茵信息2018 ALL Rights Reserved</div>
	</div>
</template>

<script>
  // import { getUUID } from '@/utils'
  export default {
    data () {
      return {
      	documentClientHeight: 500,
        dataForm: {
          userName: '',
          password: ''
          // uuid: '',
          // captcha: '',
          // checked: false,
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
          // captcha: [
          //   { required: true, message: '验证码不能为空', trigger: 'blur' }
          // ]
        },
        captchaPath: ''
      }
    },
    // created () {
    //   this.getCaptcha()
    // },
    mounted () {
      this.resetDocumentClientHeight()
    },
    methods: {
    	resetDocumentClientHeight () {
        this.documentClientHeight = document.documentElement['clientHeight']
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight']
        }
      },
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/user/login' + '/' + navigator.appName ),
              method: 'post',
              data: this.$http.adornData({
                'email': this.dataForm.userName,
                'password': this.dataForm.password
                // 'uuid': this.dataForm.uuid,
                // 'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code == 1014) {
              	sessionStorage.setItem('token', data.data.userInfo.credentials);
                console.log(data);
                sessionStorage.setItem('loginData', JSON.stringify(data) );
                // this.$cookie.set('token', data.credentials)
                this.$router.replace({ name: 'home' })
              } else {
                // this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
      // 获取验证码
      // getCaptcha () {
      //   this.dataForm.uuid = getUUID()
      //   this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      // }
    }
  }
</script>

<style lang="scss">
	.row-center {
		min-width: 1100px;
		max-width: 1200px;
		margin: 0px auto;
	}
	.site-wrapper.site-page-login {
		width: 100%;
		position: relative;
		background-color: #F0F0F0;
	}
	.header-login {
		height: 106px;
		font-weight: bold;
		font-size: 40px;
		color: #417FC5;
		span {
			display: inline-block;
			vertical-align: middle;
		}
		img {
			display: inline-block;
			vertical-align: middle;
		}
		&:after {
			content: '';
			width: 0;
			height: 100%;
			display: inline-block;
			vertical-align: middle;
		}
	}
	.center-back {
		height: 600px;
		position: relative;
		background: url(~@/assets/img/u2.jpeg) center no-repeat;
		background-size: cover;
		margin-bottom: 48px;
		.login-form-row {
			position: relative;
			.login-form-container {
				position: absolute;
				top: 195px;
				right: 100px;
				width: 260px;
				padding: 10px 24px 0px 24px;
				background-color: #F0F0F0;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				.login-title {
					line-height: 40px;
					height: 40px;
					text-align: center;
					font-size: 16px;
					margin-bottom: 16px;
				}
			}
		}
		.el-form-item {
			margin-bottom: 16px;
		}
	}

	.site-info {
		text-align: center;
		font-size: 20px;
		margin-bottom: 42px;
		line-height: 1.5em;
	}
	.legal-info {
		text-align: center;
		height: 48px;
		line-height: 48px;
		font-size: 20px;
		/*background-color: #C5C5C5;*/
	}

</style>