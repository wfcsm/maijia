<template>
     <!-- <div class="js-image-swiper
  custom-image-swiper  custom-image-swiper-single" data-images="1"> -->
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swp-page swiper-slide" v-for="(list,index) of lists" :key="index">
                <a class="js-no-follow" :href="list.clickUrl">
                  <img class="goods-main-photo fadeIn" :src="list.img">
                </a>
              </div>
            </div>
          </div>
        <!-- </div> -->
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name:"swiper",
    props:{
        lists:{
            type:Array,
            required:true
        }
    },
    mounted(){
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }
}
</script>
<style>
.swiper-slide img{
  width: 100%;
  height: 100%;
}
</style>
