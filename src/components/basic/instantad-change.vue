<template lang="html">
  <div v-show="isShow">111<select @change="transformComp" >
  <option v-for="(value,key) in options" :value=key :selected="type==key">{{value}}</option>
  </select></div>
</template>

<script>
import Lib from 'assets/Lib.js'
export default {
  props: ['options', 'type'],
  created: function() {
    console.log(Lib);
  },
  computed: {
    isShow: function() {
      return !Lib._.isEmpty(this.options)
    }
  },
  methods: {
    transformComp: function(evt) {
      // console.log('from change');
      var val = $(evt.target)
        .val();
      // console.log(val);
      this.$emit('transformComp', val);
    }
  }
}
</script>

<style lang="css">
</style>
