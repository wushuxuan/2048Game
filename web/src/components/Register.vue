<template>
  <div>
    <el-row type="flex" justify="center" align="middle" style="margin: 200px">
      <el-col :span="4">
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col>
            <el-input type="email" v-model="email" placeholder="请输入邮箱"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput">
          <el-col :span="12">
            <el-button type="primary" style="display: block;
    width: 100%;" @click="register">确定</el-button>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              style="display: inline-block;
    margin-left: 12px;"
              @click="login"
            >返回登录</el-button>
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
  name: "Register",
  data() {
    return {
      animation: false,
      userName: "",
      password: "",
      email: ""
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/" });
    },
    register() {
      if (this.validate()) {
        axios
          .post(`api/user/register`, {
            username: this.userName,
            password: this.password,
            email: this.email
          })
          .then(({ data }) => {
            console.log(data, "datadatadatadata");
            if (data) {
              this.$notify({
                title: "成功",
                message: "注册成功",
                type: "success"
              });
              // sessionStorage.setItem("userName", this.userName);
              //document.cookie = `userName=${this.userName}`;
              this.$router.push({ path: "/" });
            } else {
              this.$notify.error({ title: "错误", message: "注册失败" });
            }
          })
          .catch(function(error) {});
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validate() {
      console.log(this.userName, this.password);
      if (!this.userName) {
        return this.warning("用户名不能为空");
      } else if (!this.password) {
        return this.warning("密码不能为空");
      } else if (this.password && this.password.length < 6) {
        return this.warning("密码的长度不能少于6个字符");
      } else if (!this.email) {
        return this.warning("邮箱不能为空");
      } else if (this.email && !this.validateEmail(this.email)) {
        return this.warning("请检查邮箱格式是否正确");
      } else{
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
