<template lang="html">
	<div class="wrapper">
			<div class="header">
					<div class="logo">
							InstantAD_v0.2.0
							<br> alpha
					</div>
					<div class="operation">
							<div>
									<button id="save" class="btn small" style="display:none;">保存</button>
									<button id="downloadzip" class="btn small">zip下载</button>
									<button id="publish" class="btn small">在线预览</button>
									<button id="setting" class="setting btn">
									</button>
							</div>
					</div>
					<div class="login">
						<!-- <div id="qrcode" style="margin-top:4px;"></div> -->
					</div>
			</div>
			<div class="middle">
					<div class="leftside">
							<div class="tabs">
									<div class="tab current" data-tab="tabpage">
											<span>页面</span>
									</div>
									<!-- <div class="tab tabproj" data-tab="tabproj">
											<span>项目列表</span></div> -->
							</div>
							<div class="tab-content current" id="thumb_panel" data-tab="tabpage">
								<thumbpage-panel :page-list="proj_data.adCanvasInfo.PageList.Page" :cur-page="global_config.cur_page" v-on:addpage="addPage" v-on:setpage="setPage"></thumbpage-panel>
							</div>
							<div class="tab-content" data-tab="tabproj"><div id="proj_panel"></div></div>
					</div>
					<div class="content" id="content">
							<div>页面编辑</div>
							<div id="editpage_panel">
								<page-panel :page-list="proj_data.adCanvasInfo.PageList.Page" :cur-page="global_config.cur_page"></page-panel>
							</div>
					</div>
					<div class="rightside">
							<div id="property">
									<!-- 属性栏面板-->
									<div id="property_panel">
											<property-panel></property-panel>
									</div>
							</div>
					</div>
			</div>
			<div class="footer">

			</div>
	</div>
	<style media="screen">
		.form_field {
			display:inline-block;
			width:120px;
			margin-bottom:10px;
		}
	</style>
	<div id="proj_setting_wrapper" class="panel setting_panel"><div id="proj_setting"></div></div>
	<div id="qrcode" class="setting_panel" style="width:160px;height:160px;"></div>
</template>

<script>
import propertyPanel from 'components/property_panel';
import thumbpagePanel from 'components/thumbpage_panel';
import pagePanel from 'components/page_panel';
import Lib from 'assets/Lib'
export default {
	components: {
		propertyPanel,
		thumbpagePanel,
		pagePanel
	},
	data: function() {
		return {

		}
	},
	mounted: function() {
		console.log('app.vue mounted');
	},
	created: function() {
		console.log('app.vue created');
		var self = this;
		//load remote data
		this.$data = {
			global_config:{
				cur_page:0
			},
			proj_data: {
				adCanvasInfo: {
					PageList: {
						Page: [{
							backgroundColor: '#ffffff',
							backgroundCover: null,
							componentItemList: {
								componentItem: []
							}
						}]
					},
					basicRootFontSize: '1',
					basicWidth: '750',
					canvasName: 'instantad',
					id: '001',
					pageID: '1001',
					shareDesc: '',
					shareThumbUrl: '',
					shareTitle: '',
					shareWebUrl: '',
					pageType: '1'
				},
				aid: '',
				app_id: '',
				app_img: '',
				appuin: '',
				auto: '',
				data: {
					app_img: ''
				},
				engine: '',
				source: '',
				verify: 0
			},
			proj_setting: {}
		}
		//初始化上传组件
		Lib.$('#upload-file-image').on('change', function(evt) {
      var file = evt.target.files[0];
      // var compEl = $('#' + globalData.cur_compId);
      if (file) {
        console.log(file);
        //TODO:校验 图片大小是否符合要求
        if (file.size > 360000) alert('上传的文件过大');
        else {
          var reader = new FileReader();
          reader.readAsDataURL(file); // 读取文件

          // 渲染文件
          reader.onload = function(arg) {
            var src = arg.target.result;
            var item_data = {
              id: 'comp_' + Lib.C.geneId(),
              paddingBottom: '0',
              paddingLeft: '0',
              paddingTop: '0',
              paddingRight: '0'
            };
            item_data = Lib.$.extend(item_data, {
              imageHeight: 'auto',
              imageWidth: 750 + '',
              pureImageUrl: './resource/' + file.name,
              localfile: src,
              type: '41'
            });
            // if (globalData.upload_id) {
            //     if(item_data.type === '41') {
            //       DataManager.addItem(item_data, globalData.upload_id);
            //     } else {
            //       item_data.id = globalData.upload_id;
            //       DataManager.setCurrItem(globalData.upload_id,item_data);
            //     }
            // } else {
            console.log(item_data);
						self.addItem(item_data);
            // this.$emit('addItem', item_data);
            // }
            // UploadManager.upload(file, arg);
          }
        }
      }
    });

	},
	methods: {
		addPage:function() {
			var self = this;
			var pages = this.$data.proj_data.adCanvasInfo.PageList.Page;
			pages.push({
				backgroundColor: '#ffffff',
				backgroundCover: null,
				componentItemList: {
					componentItem: []
				}
			});
			this.$data.global_config.cur_page +=1;
			//改变数据后，不能马上切换坐标
			Lib._.delay(function() {
				Lib.$('#content').scrollTop(self.$data.global_config.cur_page * (667+10)+20);
			},200);
		},
		setPage:function(key) {
			this.$data.global_config.cur_page = key;
			Lib.$('#content').scrollTop(key * (667+10)+20);
		},
		addItem: function(item, parent_id) {
				// console.log(addItem);
				// var p_data = this.getPageData(globalData.cur_page);
				// p_data.push(item);
				// console.log(inst_thumbpage.$data.page_list === inst_pagepanel.$data
				//     .page_list);
				// console.log(inst_pagepanel.$data);
				if (parent_id) {
						var item_data = this.getItemFromPage(parent_id);
						item_data.componentGroupList.componentGroup.push({
								'componentItem': item
						});
						console.log(item_data);
						//属性栏添加组件时没有更新其他关联组件
				} else {
						var page_data = this.getPageData(this.$data.global_config.cur_page);
						page_data.push(item);
				}
				// console.log(inst_thumbpage.$data.page_list === inst_pagepanel.$data
				//     .page_list);
		},
		getPageData:function(page_num) {
			var data = this.$data.proj_data.adCanvasInfo.PageList.Page[page_num];
			return data.componentItemList.componentItem;
		},
		//获取当前页指定id数据
		getItemFromPage: function(item_id) {
				var data = this.$data.proj_data.adCanvasInfo.PageList.Page;
				var cur_page_data = data[this.$data.global_config.cur_page].componentItemList.componentItem;
				// console.log(cur_page_data);
				var ret = Lib._.filter(cur_page_data, function(val, key) {
						// console.log(val.id === item_id);
						return val.id === item_id;
				});
				return ret[0];
		}
	}

}
</script>

<style lang="css">
</style>
