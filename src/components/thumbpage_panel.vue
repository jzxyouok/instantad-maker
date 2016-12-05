<template lang="html">
  <div>
    <div class="scalepage_wrapper" v-for="(index,value) in pageList" v-bind:class="{current:curPage==index}" @click="setcurrent(index)">
    <span style="font-size: 14px;">{{index+1}}</span>
    <instantad-page :is-thumb=true :page-data=value></instantad-page>
    <div class="close" @click.stop="deletePage(index)">X</div>
    </div>
    <div class="operation addpage" @click="addPage()">加一页</div>
  </div>
</template>

<script>
import instantadPage from 'components/instantad-page'
export default {
  props: {
    'pageList': {
      type: Array
    },
    'curPage':0
  },
  data: function() {
    return {};
  },
  components: {
    instantadPage
  },
  methods: {
    tellDataManager: function() {
      // console.log(this.page_list);
      // DataManager.setAllPage(this.page_list, this.cur_page);
    },
    setcurrent: function(key) {
      // console.log(key);
      this.curPage = key;
      this.$emit('setpage',key);
    },
    deletePage: function(key) {
      this.$emit('deletepage',key);
      // console.log(key);
      if (this.pageList.length === 1) {
        alert('最后一页不能删除');
        return;
      }
      if(key <= this.curPage) {
        this.curPage = this.curPage - 1;
      }
      // console.log(this.curPage);
      this.pageList.splice(key, 1);
      // this.forceUpdate();
      // this.tellDataManager();
    },
    addPage: function() {
      this.$emit('addpage');
    }
  },
  created: function() {
    console.log(this.pageList);
  },
  mounted: function() {
    // _.each(this.page_list, function(val, index) {
    //   console.log(index);
    // });
    // this.tellDataManager();
  }
}
</script>

<style lang="css">
</style>
