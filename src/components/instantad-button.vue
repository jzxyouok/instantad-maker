<template lang="html">
  <img :src=pureImageUrl :style=styleObject class="preview" @load="load($event)" @click="selectFocus" />
</template>

<script>
export default {
  data: function() {
      // console.log(this.item_data);
      return {
          styleObject: {
              width: this.preview ? '100%' : this.item_data.imageWidth +
                  'px',
              height: this.preview ? 'auto' : this.item_data.imageHeight +
                  'px'
          }
      };
  },
  computed: {
      pureImageUrl: function() {
          return this.item_data.localfile ||
              (Component.basepath + this.item_data.pureImageUrl);
      }
  },
  methods: {
      selectFocus: function() {
          // alert(1);
          this.$emit('selectFocus', this.item_data.id);
      },
      load: function(evt) {
          var rect = $(evt.target)[0].getBoundingClientRect();
          // console.log(rect.height);
          this.$emit('imageload', this.item_data.id, rect.width,
              rect.height);
      }
  },
  props: ['item_data', 'preview']
}
</script>

<style lang="css">
</style>
