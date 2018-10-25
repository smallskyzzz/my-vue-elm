<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header><!--这里用v-bind绑定,可以传递，具体查看header.vue中的props-->
    <div class="tab">
      <div class="tab-item">
        <!--2.0路由指向，其中active-class="active"为激活的a标签添加class-->
        <router-link :to="{path:'/goods'}" active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}" active-class="active">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}" active-class="active">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import header from  './components/header/header.vue'

  const ERR_OK = 0;//定义一个全局状态码，代表返回数据的质量
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('api/seller').then((response) => {//箭头函数（箭头前后）前后需要加空格
        response = response.body;
        //console.log(response)
        if(response.errno === ERR_OK){//判断返回状态码是否正确
          this.seller = response.data;
          //alert(this.seller);
        }
      });
    },
    components:{
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin"
body{
  margin:0
  padding:0
}
#app .tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7,17,27,0.1));
  //调用了mixin中的方法，生成1像素底边框，具体实现可查看代码
}
#app .tab .tab-item{
  text-align: center;
  flex: 1;
}
.tab-item a{
  display: block;
  text-decoration: none;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.tab-item a.active{
  color: rgb(240, 20, 20);
}
</style>
