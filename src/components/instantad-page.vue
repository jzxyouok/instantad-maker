<template lang="html">
  <div :class={scalepage:isThumb}>
  <template v-if="isShow">
  <template v-for="item in pageData.componentItemList.componentItem">
  <template v-if="item.type=='41'">
  <div style="position:relative;line-height:1px;">
    <instantad-image :item-data=item :preview=true v-on:imageload="imageload" v-on:selectitem="selectItem"></instantad-image>
  <div v-show="!isThumb" class="close" @click="deleteItem(item.id)">X</div></div>
  </template>
  <template v-if="item.type=='21'">
<div style="position:relative;line-height:1px;">
  <instantad-button :item-data=item :preview=true v-on:imageload="imageload" v-on:selectitem="selectItem"></instantad-button>
  <div v-show="!isThumb" class="close" @click="deleteItem(item.id)">X</div>
</div>
</template>
  <template v-if="item.type=='62'">
<div style="position:relative;line-height:1px;">
  <instantad-video :item-data=item v-on:videoload="imageload" v-on:selectitem="selectItem" :is-thumb="isThumb"></instantad-video>
  <div v-show="!isThumb" class="close" @click="deleteItem(item.id)">X</div>
</div>
</template>
  <template v-if="item.type=='101'">
<div style="position:relative;line-height:1px;">
  <instantad-slider :item-data=item :preview=true v-on:imageload="imageload" :is-thumb=isThumb v-on:selectitem="selectItem"></instantad-slider>
  <div v-show="!isThumb" class="close" @click="deleteItem(item.id)">X</div>
</div>
</template>
  </template>
  </template>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js';
import instantadImage from 'components/instantad-image'
import instantadButton from 'components/instantad-button'
import instantadVideo from 'components/instantad-video'
import instantadSlider from 'components/instantad-slider'

export default {
  components: {
    instantadImage,
    instantadVideo,
    instantadSlider,
    instantadButton
  },
  props: ['pageData','isThumb'],
  data: function() {
    return {
      top: 0
    }
  },
  computed: {
    isShow: function() {
      return !Lib._.isEmpty(this.pageData)
    }
  },
  updated: function() {
    console.log('instantad-page updated');
    // console.log(this.page_data);
  },
  created: function() {
    // console.log(this.pageData);
  },
  methods: {
    tellDataManager: function(item_id, data) {
      // DataManager.setCurrItem(item_id, data);
    },
    selectItem: function(item_id) {
      // alert(item_id);
      // this.tellDataManager(item_id);
      this.$emit('selectitem',item_id);
    },
    deleteItem: function(item_id) {
      // DataManager.removeItem(item_id);
      this.$emit('deleteitem',item_id);
    },
    //图片加载好
    imageload: function(item_id, width, height) {
      // console.log(item_id, width, height);
      if (!this.isThumb) {
        // this.tellDataManager(item_id, {
        //   imageWidth: width * 2,
        //   imageHeight: height * 2,
        //   videoWidth: width * 2,
        //   videoHeight: height * 2
        // });
        // this.top = parseInt(height, 10) * 2;
        // console.log(item_id, width,height);
        this.$emit('imageload', item_id,width,height);
      }
    }
  }
}
</script>

<style lang="css">
</style>
