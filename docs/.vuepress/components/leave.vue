<!-- //留言板
<template>
<div class="msg">
    <h1>评论留言：</h1>
   <emalipush></emalipush>
   <p v-if="dataList.allCount">共<strong style="font-size:23px">{{dataList.allCount}}</strong>条评论</p>
   <div class="footer-box" v-if="dataList.allCount">
       <discuss :dataList='dataList'></discuss>
   </div>
</div>
</template>

<script>
// import { getblog,addMsg } from '../public/https/api.js';
import discuss from '../plugins/components/discuss.vue';
import emalipush from '../plugins/components/emalipush.vue';
export default {
components:{discuss,emalipush},
  data(){
      return {
          dataList:{},
          getblogs:null
      }
  },
  mounted(){
            import('../public/https/api.js').then(module => {
                console.log(module)
            this.getblogs=module.getblog
             this.getblog()
            })
  },
  methods: {
        getblog(){
            this.getblogs(this.$page.path).then((res)=>{
                if(res.data.err!==0) return console.log(res.data)
               this.dataList=res.data.list
            })
        },
    }
}
</script>

<style lang='scss' scoped>
li{
    list-style: none;
}
.msg_box{
    width:calc(100% - 24px);
    padding:24px;
    height:auto;
    margin:0 auto;
    box-shadow:0px 4px 12px 0px;
    .title_box{
        height:48px;
        border-bottom:1px solid rgba(0,0,0,0.3);
        display:flex;
    }
    .fllter{
        height:48px;
        display: flex;
        align-items: center;
        justify-content: flex-end; 
    }
}
.footer-box{
    width:calc(100% -24px);
    padding:24px;
    height:auto;
    box-shadow:0px 2px 6px 0px;
}
</style> -->

<!-- <template>
  <div>
    <a href="https://github.com/Kehan1120/Kehan1120.github.io/issues">对本篇的内容有任何疑问吗？请来这里发表issue吧！</a>
  </div>
</template> -->