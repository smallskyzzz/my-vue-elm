<template>
  <transition name="fade">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">${{food.price}}</span><span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0" transition="faded">
          加入购物车
        </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect v-on:childSelectType="childST" v-on:childOnlyContent="childOC" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue'
  import BScroll from "better-scroll"
  import cartcontrol from "../../components/cartcontrol/cartcontrol"
  import split from "../../components/split/split"
  import ratingselect from "../../components/ratingselect/ratingselect"

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props:{
      food:{}
    },
    data(){
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc:{
          all:'全部',
          positive:'推荐',
          negative: '吐槽'
        }
      }
    },
    methods:{
      show(){//可被外部调用的方法，私有方法取名时前面带下划线
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {//当该页面出现时，首先判断这个scroll是否被初始化了，如果已经创建则只需要refresh，可以借鉴这种写法
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.food,{
              click:true
            })
          }else{
            this.scroll.refresh()
          }
        })
      },
      hide(){
        this.showFlag = false
      },
      addFirst(event){
        if(!event._constructed){
          return
        }
        //console.log(event.target)
        this.$emit('cart-add', event.target)
        Vue.set(this.food,'count',1)
      },
      childST:function (somedata) {
        this.selectType = somedata
      },
      childOC:function (somedata) {
        this.onlyContent = somedata
      }
    },
    components:{
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fade-enter-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 30
  width 100%
  background white
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 10px
      left 0
      .icon-arrow_lift
        display block
        padding 10px
        font-size 20px
        color white

  .content
    position relative
    padding 18px
    .title
      line-height 14px
      margin-bottom 8px
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
    .detail
      margin-bottom 18px
      line-height 10px
      height 10px
      font-size 0
      .sell-count,.rating
        font-size 10px
        color 147,153,159
      .sell-count
        margin-right 12px
    .price
      font-weight 700
      line-height 24px
      .now
        margin-right 8px
        font-size 14px
        color rgb(240,20,20)
      .old
        text-decoration line-through
        font-size 10px
        color rgb(147,153,159)
    .cartcontrol-wrapper
      position: absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color white
      background rgb(0,160,220)
      &.faded-transition
        transition all 0.2s
        opacity 1
      &.faded-enter,&.faded-leave
        opacity 0

  .info
    padding 18px
    .title
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7,17,27)
    .text
      line-height 24px
      padding 0 8px
      font-size 12px
      color rgb(77,85,93)
  .rating
    padding-top 18px
    .title
      line-height 14px
      margin-left 18px
      font-size 14px
      color rgb(7,17,27)
</style>
