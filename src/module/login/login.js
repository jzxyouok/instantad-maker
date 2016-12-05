import Vue from 'vue'
import Vuex from 'vuex'
import App from './app'


Vue.use(Vuex);

import Lib from 'assets/Lib';

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
  // created:function() {
  //   Lib.$.ajax({
  //     url:'http://x.addev.com/api/userinfo',
  //     type:'get',
  //     data:findGetParameter('ticket')?'ticket='+findGetParameter('ticket'):'',
  //     crossdomain:true,
  //     success:function(ret) {
  //       if(ret.user) {
  //         console.log(ret.user);
  //       }
  //     },failed:function() {
  //       console.log('Get UserInfo Error');
  //     }
  //   });
  //   console.log('created App');
  // }
});
