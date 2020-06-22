<template>
  <div>
    <el-row type="flex" justify="center" align="middle" style="margin: 200px">
      <el-col :span="4">
        <!-- <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>-->
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input type="email" v-model="email" placeholder="请输入邮箱"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col :span="16">
            <el-button type="primary" style="display: block;
    width: 100%;" @click="login">登录</el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              style="display: inline-block;
    margin-left: 12px;"
              @click="register"
            >注册</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Background from '../components/Background';
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      animation: false,
      email: "",
      password: ""
      // email: ""
    };
  },
  methods: {
    register() {
      this.$router.push({ path: "/register" });
    },
    login() {
      if (this.validate()) {
        axios
          .post(`api/user/login`, {
            email: this.email,
            password: this.password
            // email: this.email
          })
          .then(({ data }) => {
            console.log(data, "datadatadatadata");
            if (data) {
              this.$notify({
                title: "成功",
                message: "登录成功",
                type: "success"
              });
              localStorage.setItem("email", this.email);
              localStorage.setItem("user", JSON.stringify(data));
              //document.cookie = `userName=${this.userName}`;
              this.$router.push({ path: "/game" });
            } else {
              this.$notify.error({ title: "错误", message: "登录失败" });
            }
          })
          .catch(function(error) {});
      }
    },
    // validateEmail(email) {
    //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(email);
    // },
    validate() {
      console.log(this.email, this.password);
      if (!this.email) {
        return this.warning("用户名不能为空");
      } else if (!this.password) {
        return this.warning("密码不能为空");
      } else if (this.password && this.password.length < 6) {
        return this.warning("密码的长度不能少于6个字符");
      } else {
        return true;
      }
    },
    warning(message) {
      this.$message({ message: message, type: "warning" });
      return false;
    }
  },
  components: {
    // Background
  },
  mounted() {
    // this.init();
  }
};
</script>

<style>
.loginInput {
  width: 200px;
}
</style>
