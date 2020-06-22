<template>
  <el-container>
    <el-header>
      <el-dropdown style="position: absolute;right: 24px;" @command="handleClick">
        <span>{{user.username}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <div style="display:flex;flex-flow:row">
        <div style="flex:1">
          <Scene :action="initActions">
            <button
              style="width:200px;text-align:center;line-height:40px;"
              @click="action('init')"
            >START</button>
          </Scene>
        </div>
        <div style="width:400px;margin-right:5%">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>积分排行</span>
            </div>
            <el-table :data="list">
              <el-table-column prop="index" label="名次"></el-table-column>
              <el-table-column prop="creatorUser" label="名字"></el-table-column>
              <el-table-column prop="score" label="分数"></el-table-column>
            </el-table>
            <p style="font-size: 14px;
    text-align: right;
    margin-top: 24px;
    color: #4bb7e9;
    cursor:pointer" @click="more">更多 >></p>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Scene from "./Scene.vue";
import axios from "axios";
let dispatch;
export default {
  name: "home",
  methods: {
    action(a) {
      console.log(this.$store.state.score);
      console.log(localStorage.getItem("email"));
      if (this.$store.state.score) {
        axios
          .post(`api/tasks`, {
            score: this.$store.state.score,
            email: localStorage.getItem("email")
          })
          .then(({ data }) => {
            console.log(data);
            this.getData();
          })
          .catch(function(error) {});
      }
      if (dispatch) dispatch(a);
    },
    handleClick(command) {
      if (command == "logout") {
        this.$router.push({ path: "/" });
      }
    },
    more(){
      this.$router.push({ path: "/more" });
    },
    getData() {
      axios
        .get(`api/tasks`, {
          // score: this.$store.state.score,
          email: localStorage.getItem("email")
        })
        .then(({ data }) => {
          if (data) {
            var list = [];
            data.forEach((element, index) => {
              if (index <= 2) {
                element.index = index + 1;
                list.push(element)
              }
            });
            this.list = list
          }
        });
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")).data;
    console.log(localStorage.getItem("email"));
    this.getData();
  },
  data() {
    let methods = this.methods;
    return {
      initActions: function(x) {
        console.log("x:");
        console.log(x);
        dispatch = x;
      },
      user: {
        username: "",
        uid: ""
      },
      list: []
    };
  },
  components: {
    Scene
  }
};
</script>

<style lang="scss">
.el-header,
.el-footer {
  // background-color: #b3c0d1;
  // color: #333;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #e9e9e9;
}
button {
  color: #fff;
  border-radius: 5px;
  // width: 200px;
  border: 0;
  background: #4bb7e9;
  opacity: 0.8;
  transition: 0.2s;
  box-shadow: rgba(0, 0, 0, 0.14) 1px 2px 4px;
  // width: 80%;
  // line-height: 40px;
  text-align: center;
  margin: 10px auto 30px;
  outline: none;
  &:hover {
    opacity: 1;
  }
}
</style>
