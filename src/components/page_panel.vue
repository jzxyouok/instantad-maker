<template lang="html">
  <div>
      <div class="editpage" v-bind:class="{current:curPage==index}" v-for="(index,value) in pageList">
        <instantad-page :is-thumb=false :page-data=value v-on:caltop="caltop" v-on:imageload="imageLoad"></instantad-page>
        <div class="operate" @click="uploadImage" v-bind:style="styleObject">
          <span class="addcomponent">+</span>添加组件
          <div style="display:inline-block;position:absolute;" @mouseover="showExtend" @mouseout="hideExtend">
            <span style="display:block;">图片</span>
            <span style="display:block;background:#fff;" @click.prevent.stop="addEmptyComponent">视频</span>
          </div>
      </div>
      </div>
    </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import instantadPage from 'components/instantad-page'
export default {
  props: {
    'pageList': {
      type: Array
    },
    'curPage': 0
  },
  components: {
    instantadPage
  },
  data: function() {
    var self = this;
    return {
      top:0,
      isCurrent: true,
      extendFlag: false
    }
  },

  created: function() {
    console.log('page_panel created', this.pageList);
    // console.log(Lib.$('#upload-file-image'));
  },
  mounted: function() {
    console.log('page_panel mounted');
  },
  updated: function() {
    console.log('page_panel updated');
  },
  activated: function() {
    console.log('page_panel activeted');
  },
  computed: {
    styleObject: function() {
      var self = this;
      var top = 0;
      if (!_.isEmpty(self.pageList[0])) {
        var item_list = self.pageList[self.curPage].componentItemList
          .componentItem;
        for (var i = 0; i < item_list.length; i++) {
          console.log(item_list[i].imageHeight, item_list[
            i].videoHeight);
          if (!isNaN(parseInt(item_list[i].videoHeight))) {
            var videoHeight = parseInt(item_list[i].videoHeight);
          } else {
            var videoHeight = 0;
          }
          top += item_list[i].imageHeight || videoHeight * 2;
        }
      }
      console.log(top);
      return {
        top: top / 2 + 'px',
        opacity: (top > 1320 ? 0 : 1),
        overflow: self.extendFlag ? 'visible' : 'hidden'
      }
    }
  },
  methods: {
    caltop: function(height) {
      this.top = height;
      // console.log(this.top);
      this.$emit('caltop',this.top);
    },
    showExtend: function() {
      this.extendFlag = true;
    },
    hideExtend: function() {
      this.extendFlag = false;
    },
    uploadImage: function() {
      //上传图片
      Lib.$('#upload-file-image')
        .trigger('click');
    },
    addEmptyComponent: function() {
      //添加一个空组件
      // console.log(this.top);
      var item_data = {
        id: 'comp_' + Lib.C.geneId(),
        paddingBottom: '0',
        paddingLeft: '0',
        paddingTop: '0',
        paddingRight: '0'
      };
      item_data = Lib.$.extend(item_data, {
        videoWidth: 750 + '',
        videoHeight: 'auto',
        videoUrl: '',
        localfile: '',
        videoVid: '',
        type: '62'
      });
    },
    imageLoad:function(id,width,height) {
      console.log(id,width,height);
      this.$emit('propertychange',id,width,height);
    }
  }
}
</script>

<style lang="css">
</style>
