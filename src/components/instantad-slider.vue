<template>
  <div style="position:relative;">
    <div v-show="property" v-for="(index,value) in items">
      <instantad-image :item-data="value.componentItem" :preview="true"></instantad-image>
    </div>
    <div v-show="!property">
      <instantad-image :item-data="items[0].componentItem" :preview=true v-on:selectitem="selectItem"></instantad-image>
    </div>
    <div v-show="!isThumb" class="slider_wrapper">
      <span class="slide_point current"></span><span class="slide_point"></span>
      <span class="slide_point"></span><span class="slide_point"></span>
    </div>
    <div class="addfile" v-show="property" @click="uploadfile">+</div>
  </div>
</template>

<script>
import Lib from 'assets/Lib.js'
import instantadImage from 'components/instantad-image'

module.exports = {
  components: {
    instantadImage
  },
  mounted: function() {
    console.log(this);
  },
  data: function() {
    // console.log(this.item_data);
    return {
      items: this.itemData.componentGroupList.componentGroup,
      pureImageUrl: Lib.C.basepath + this.itemData.pureImageUrl,
      styleObject: {
        width: this.preview ? '100%' : this.itemData.imageWidth +
          'px',
        height: this.preview ? 'auto' : this.itemData.imageHeight +
          'px'
      },
      show: false
    };
  },
  methods: {
    tellDataManager: function(item_id, data) {
      // DataManager.setCurrItem(item_id, data);
    },
    selectItem: function(item_id) {
      // console.log(item_id);
      // this.tellDataManager(item_id);
      this.$emit('selectitem',item_id);
    },
    uploadfile: function() {
      Lib.$('#upload-file-image')
        .trigger('click');
    }
  },
  props: ['itemData', 'preview', 'isThumb', 'property'],
}
</script>

<style scoped>

</style>
