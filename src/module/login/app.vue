<template lang="html">
  Hello
</template>

<script>
import Lib from 'assets/Lib';

export default {
  created: function() {
    try {
      Lib.$.ajax({
        url: '/api/userinfo',
        type: 'get',
        data: findGetParameter('ticket') ? 'ticket=' + findGetParameter('ticket') : '',
        success: function(ret) {
          if (ret.user) {
            var vm = new Vue({
              el: '#app',
              data: {
                message: '开始制作'
              },
              methods: {
                jumpmake: function() {
                  location.href = './dist/module/index.html';
                }
              },
              template: '<div class="enter" @click="jumpmake">{{message}}</div>'
            });
          } else {
            if (ret.err == 1) {
              window.location.href = 'http://passport.oa.com/modules/passport/signin.ashx?url=' + encodeURIComponent('http://x.addev.com/instantad/');
            }
          }
        },
        failed: function() {
          alert('Get UserInfo Error');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="css">
</style>
