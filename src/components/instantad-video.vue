<template lang="html">
  <div style="position:relative;background:#c0a0a0;"><video class="preview" :src=videoUrl alt="preview" @click="selectFocus" ></video><div v-show="0">高度：<input type="text" v-model="item_data.videoHeight" /></div>
  <div class="process" :style="processObject" v-show="property">{{process>10?Math.floor(process)+"%":""}}</div>
  <div class="addfile" style="position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;" v-show="property && (!item_data.videoUrl)" @click="uploadfile">+</div></div>
</template>

<script>
export default {


  data: function() {
      // console.log(this.item_data);
      return {
          process:0,
          styleObject: {
              width: this.preview ? '100%' : this.item_data.videoWidth +
                  'px',
              height: this.preview ? 'auto' : this.item_data.videoHeight +
                  'px'
          }
      };
  },
  computed: {
      videoUrl: function() {
          // console.log(Component.basepath+this.item_data.videoUrl);
          return this.item_data.localfile ||
              (Component.basepath + this.item_data.videoUrl);
      },
      processObject:function() {
        return {
          'width':this.process+'%',
          'color':'#fff',
          'height':'16px',
          'text-align':'center',
          'line-height':'16px'
        };
      }
  },
  mounted: function() {
      // console.log('video mounted');
      var self = this;
      _.delay(function() {
          var rect = self.$el.getBoundingClientRect();
          // console.log(rect.height);
          self.$emit('imageload', self.item_data.id, rect
              .width,
              rect.height);
      }, 1000);
  },
  updated:function() {
    var self = this;
    console.log('update video component');
    _.delay(function() {
        var rect = self.$el.getBoundingClientRect();
        console.log(rect.width,rect.height);
        self.$emit('imageload', self.item_data.id, rect
            .width,
            rect.height);
    }, 1000);
  },
  methods: {
      selectFocus: function() {
          // alert(1);
          this.$emit('selectFocus', this.item_data.id);
      },
      uploadfile: function() {
          console.log(this.item_data.id);
          globalData.upload_id = this.item_data.id;
          $('#upload-file-video')
              .trigger('click');
      }
  },
  props: ['item_data', 'preview','property']
}
</script>

<style lang="css">
</style>
