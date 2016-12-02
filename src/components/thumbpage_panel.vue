<template lang="html">
  <div>
    <div class="scalepage_wrapper" v-for="(value,key) in page_list" v-bind:class="{current:cur_page==key}" @click="setcurrent(key)">
    <span style="font-size: 14px;">{{key+1}}</span>
    <instantad-page :isThumb=true :page_data=value></instantad-page>
    <div class="close" @click.stop="deletePage(key)">X</div>
    </div>
    <div class="operation addpage" @click="addPage()">加一页</div>
  </div>
</template>

<script>
import instantadPage from 'components/instantad-page'
export default {

  data: function() {
    return {
      page_list: [],
      cur_page: 0
    };
  },
  components: {
    instantadPage
  },
  methods: {
    tellDataManager: function() {
      // console.log(this.page_list);
      DataManager.setAllPage(this.page_list, this.cur_page);
    },
    setcurrent: function(key) {
      // console.log(key);
      this.cur_page = key;
      this.tellDataManager();
    },
    deletePage: function(key) {
      // console.log(key);
      if (this.page_list.length === 1) {
        alert('最后一页不能删除');
        return;
      }
      this.page_list.splice(key, 1);
      // this.forceUpdate();
      console.log(this.cur_page);
      this.tellDataManager();
    },
    addPage: function() {
      var key = this.page_list.length;
      this.page_list.splice(key, 0, {
        backgroundColor: '#ffffff',
        backgroundCover: null,
        componentItemList: {
          componentItem: []
        }
      });
      this.cur_page = key;

      this.tellDataManager();
    }
  },
  mounted: function() {
    _.each(this.page_list, function(val, index) {
      // console.log(index);
    });
    this.tellDataManager();
  }
}
</script>

<style lang="css">
</style>
