<template lang="html">
  <div v-show="isShow"><select @change="transformComp" >
  <option v-for="(index,value) in options" :value=index :selected="type==index">{{value}}</option>
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
      var val = Lib.$(evt.target)
        .val();
      // console.log(val);
      this.$emit('transformcomp', val);
    }
  }
}
</script>

<style lang="css">
</style>
