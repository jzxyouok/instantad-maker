<template lang="html">
  <div v-show=seen>
      <div v-show="item_data && item_data.type">
    <instantad-change  @transformComp="transformComp" :type=item_data.type :options=options></instantad-change>
    <!--<div class="" v-show="1" v-for="(value,key) in item_data">{{key}}:{{value}}</div>-->
  <instantad-image :item_data=item_data :preview=true v-if="item_data.type=='41'"></instantad-image>
  <div v-if="item_data.type=='21'">
    <div>按钮背景色：<input type="text" v-model=item_data.btnBgColorTheme /></div>
    <div>跳转地址：<input type="text" v-model=item_data.btnJumpUrl /></div>
  </div>
  <instantad-button :item_data=item_data :preview=true v-if="item_data.type=='21'"></instantad-button>
  <instantad-video ref="property_video" :item_data=item_data :preview=true property=1 v-if="item_data.type=='62'"></instantad-video>
  <div v-if="item_data.type=='62'">
    <div>面包vid:<input type="text" v-model=item_data.videoVid /></div>
  </div>
  <instantad-slider :item_data=item_data :preview=true property=1 v-if="item_data.type=='101'"></instantad-slider>
    </div>
    <div v-show="item_data && item_data.componentItemList">
    <div style="display:none;">{{item_data}}</div>
    <div>背景色：<input type="text" v-model="item_data.backgroundColor" /></div>
    </div>
  </div>
</template>

<script>
import instantadChange from './basic/instantad-change';
export default {
  components:{
    instantadChange
  },
  data: function() {
    return {
      item_data: {},
      options: [],
      seen: true
    }
  },
  updated: function() {
    console.log('property_panel updated');
    // console.log(this.item_data);
    if (!_.isEmpty(this.item_data)) {
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
      DataManager.setCurrItem(item_id, data);
    },
    transformComp: function(type) {
      console.log('from panel', type);
      console.log(this.item_data);
      // this.item_data.type = type;
      // Component.transformComp(this.item_data.id, type);
      if (type === '101') {
        var data = $.extend({}, this.item_data);
        var item_data = {
          id: data.id,
          type: type,
          componentGroupList: {
            componentGroup: [{
              componentItem: data
            }]
          }
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
        var item_data = $.extend({}, this.item_data, property);
      }
      // this.item_data = item_data;
      this.tellDataManager(item_data.id, item_data);
    },
    clear: function() {
      this.seen = false;
    }
  }
}
</script>
<style lang="css">



</style>
