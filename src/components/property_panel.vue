<template lang="html">
  <div v-show=seen>
      <div v-show="itemData && itemData.type">
    <instantad-change  v-on:transformcomp="transformComp" :type=itemData.type :options=options></instantad-change>
    <!--<div class="" v-show="1" v-for="(value,key) in itemData">{{key}}:{{value}}</div>-->
  <instantad-image :item-data=itemData :preview=true v-if="itemData.type=='41'"></instantad-image>
  <div v-if="itemData.type=='21'">
    <div>按钮背景色：<input type="text" v-model=itemData.btnBgColorTheme /></div>
    <div>跳转地址：<input type="text" v-model=itemData.btnJumpUrl /></div>
  </div>
  <instantad-button :item_data=item_data :preview=true v-if="itemData.type=='21'"></instantad-button>
  <instantad-video ref="property_video" :item-data=itemData :preview=true property=1 v-if="itemData.type=='62'"></instantad-video>
  <div v-if="itemData.type=='62'">
    <div>面包vid:<input type="text" v-model=itemData.videoVid /></div>
  </div>
  <instantad-slider :item-data=itemData :preview=true property=1 v-if="itemData.type=='101'"></instantad-slider>
    </div>
    <div v-show="itemData && itemData.componentItemList">
    <div style="display:none;">{{itemData}}</div>
    <div>背景色：<input type="text" v-model="itemData.backgroundColor" /></div>
    </div>
  </div>
</template>

<script>
import instantadChange from './basic/instantad-change';
import instantadImage from 'components/instantad-image'
import instantadButton from 'components/instantad-button'
import instantadVideo from 'components/instantad-video'
import instantadSlider from 'components/instantad-slider'
import Lib from 'assets/Lib';
export default {
  components:{
    instantadChange,
    instantadImage,
    instantadVideo,
    instantadSlider,
    instantadButton
  },
  props:{
    'itemData':Object,
    'options':Object
  },
  data: function() {
    return {
      seen: true
    }
  },
  updated: function() {
    console.log('property_panel updated');
    // console.log(this.item_data);
    if (!Lib._.isEmpty(this.item_data)) {
      console.log(this.item_data.btnJumpUrl);
      if (this.item_data.btnJumpUrl && this.item_data.btnJumpUrl.indexOf('tad_canvas') === 0) {
        this.item_data.btnJumpUrl = decodeURIComponent(this.item_data.btnJumpUrl.substr(18));
      }
      console.log('mounted:', this.item_data.type);
    }
  },
  mounted: function() {
    if (!_.isEmpty(this.item_data)) {
      console.log(this.item_data.btnJumpUrl);
      if (this.item_data.btnJumpUrl && this.item_data.btnJumpUrl.indexOf('tad_canvas') === 0) {
        this.item_data.btnJumpUrl = this.item_data.btnJumpUrl.substr(18);
      }
      console.log('mounted:', this.item_data.type);
    }
  },
  computed: {
    // btnJumpUrl:function() {
    //   if(this.item_data.btnJumpUrl && this.item_data.btnJumpUrl.indexOf('tad_canvas') === 0) {
    //       this.item_data.btnJumpUrl = this.item_data.btnJumpUrl.substr(18);
    //   }
    // }
  },
  // props: ['item_data', 'options'],
  methods: {
    tellDataManager: function(item_id, data) {
      // DataManager.setCurrItem(item_id, data);
    },
    transformComp: function(type) {
      console.log('from panel', type);
      console.log(this.itemData);
      // this.item_data.type = type;
      // Component.transformComp(this.item_data.id, type);
      if (type === '101') {
        var data = Lib.$.extend({}, this.itemData);
        var item_data = {
          id: data.id,
          type: type,
          componentGroupList: {
            componentGroup: [{
              componentItem: data
            }]
          },
          imageHeight:data.imageHeight
        };
      } else {
        var property = {
          type: type
        };
        if (type === '21') {
          property.btnJumpUrl = '';
          property.btnBgColorTheme = '#ffffff';
        } else if (type === '62') {
          property.videoVid = '';
        }
        var item_data = Lib.$.extend({}, this.itemData, property);
      }
      // this.item_data = item_data;
      this.$emit('itemchange',item_data.id,item_data);
    },
    clear: function() {
      this.seen = false;
    }
  }
}
</script>
<style lang="css">



</style>
