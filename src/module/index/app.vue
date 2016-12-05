<template lang="html">
	<div class="wrapper">
			<div class="header">
					<div class="logo">
							InstantAD_v0.2.0
							<br> alpha
					</div>
					<div class="operation">
							<div>
									<button id="save" class="btn small" @click="saveProject">保存</button>
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
								<thumbpage-panel :page-list="proj_data.adCanvasInfo.PageList.Page" :cur-page="global_config.cur_page" v-on:addpage="addPage" v-on:setpage="setPage" v-on:deletepage="deletePage"></thumbpage-panel>
							</div>
							<div class="tab-content" data-tab="tabproj"><div id="proj_panel"></div></div>
					</div>
					<div class="content" id="content" @click="clearProperty">
							<div id="editpage_panel">
								<page-panel :page-list="proj_data.adCanvasInfo.PageList.Page" :cur-page="global_config.cur_page" v-on:propertychange="propertyChange" v-on:selectitem="selectItem" v-on:deleteitem="deleteItem" v-on:addvideo="addVideo"></page-panel>
							</div>
					</div>
					<div class="rightside">
							<div id="property">
									<!-- 属性栏面板-->
									<div id="property_panel">
											<property-panel :item-data="global_config.cur_item" :options="global_config.options" v-on:itemchange="itemChange"></property-panel>
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
			global_config: {
				cur_page: 0,
				cur_item: {},
				options: {}
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
		this.$data.global_config.cur_item = this.$data.proj_data.adCanvasInfo.PageList.Page[0];
		//初始化上传组件
		Lib.$('#upload-file-image').on('change', function(evt) {
			var file = evt.target.files[0];
			var upinput = Lib.$(evt.target);
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
						if (self.$data.global_config.cur_item && self.$data.global_config.cur_item.type === '101') {
							if (item_data.type === '41') {
								self.addItem(item_data, self.$data.global_config.cur_item.id);
							}
							//       item_data.id = globalData.upload_id;
							//       DataManager.setCurrItem(globalData.upload_id,item_data);
							//     }
						} else {
							self.addItem(item_data);
							// this.$emit('addItem', item_data);
						}
						// upinput.file = '';
						// console.log(upinput);
						// $(upinput).val('');
						upinput.replaceWith(upinput.val('').clone(true));
						// UploadManager.upload(file, arg);
					}

				}
			}
		});


		Lib.$('#upload-file-video').on('change',function(evt) {
		  var file = evt.target.files[0];
			var upinput = Lib.$(evt.target);
		  // var compEl = $('#' + globalData.cur_compId);
		  if (file) {
		    console.log(file);
		    //TODO:校验 图片大小是否符合要求
		    if (file.size > 3000000) alert('上传的文件过大');
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
		            videoWidth: 750 + '',
		            videoHeight: 'auto',
		            videoUrl: './resource/' + file.name,
		            localfile: src,
		            videoVid:'',
		            type: '62'
		        });
						if (self.$data.global_config.cur_item && self.$data.global_config.cur_item.type === '62') {
								self.replaceItem(self.$data.global_config.cur_item.id,item_data);
						}
						upinput.replaceWith(upinput.val('').clone(true));
		        // UploadManager.upload(file, arg);
		      }

		    }
		  }
		});
	},
	methods: {
		addPage: function() {
			var self = this;
			var pages = this.$data.proj_data.adCanvasInfo.PageList.Page;
			pages.push({
				backgroundColor: '#ffffff',
				backgroundCover: null,
				componentItemList: {
					componentItem: []
				}
			});
			this.$data.global_config.cur_page += 1;
			//改变数据后，不能马上切换坐标
			Lib._.delay(function() {
				Lib.$('#content').scrollTop(self.$data.global_config.cur_page * (667 + 10) + 20);
			}, 200);
			this.clearProperty();
		},
		setPage: function(key) {
			this.$data.global_config.cur_page = key;
			Lib.$('#content').scrollTop(key * (667 + 10) + 20);
			this.clearProperty();
		},
		deletePage: function(key) {
			var curPage = this.$data.global_config.cur_page;
			if (key <= curPage) {
				curPage = curPage - 1;
			}
			this.$data.global_config.cur_page = curPage;
			this.$data.proj_data.adCanvasInfo.PageList.Page.splice(key, 1);
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
		saveProject: function() {
			var fetchData = function(data) {
				//删除所有local_file字段
				var ret = data;
				var self = this;
				_.each(ret, function(val, key) {
					// console.log(key, val);
					if (_.isObject(val)) {
						ret[key] = fetchData(val);
					}
					if (key === 'localfile') {
						delete ret[key];
					}
					if (key === 'type' && val === '21') {
						ret['btnHeight'] = ret['imageHeight'];
						ret['btnWidth'] = ret['imageWidth'];
						ret['btnSrc'] = ret['pureImageUrl'];
						console.log(ret['btnJumpUrl']);
						ret['btnJumpUrl'] = ret['btnJumpUrl'].indexOf('tad_canvas') === 0 ? ret['btnJumpUrl'].substr(0, 18) + encodeURIComponent(ret['btnJumpUrl'].substr(18)) : "tad_canvas://jump?" + encodeURIComponent(ret['btnJumpUrl']);
					}
				});
				return ret;
			}
			console.log(JSON.stringify(fetchData(this.$data.proj_data)));
		},
		getPageData: function(page_num) {
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
		},
		getItem: function(item_id) {
			var data = this.$data.proj_data.adCanvasInfo.PageList.Page;
			var ret = null;
			for (var i = 0; i < data.length; i++) {
				var cur_page_data = data[i].componentItemList.componentItem;
				// console.log(cur_page_data);
				ret = Lib._.filter(cur_page_data, function(val, key) {
					// console.log(val.id === item_id);
					return val.id === item_id;
				});
				if (!Lib._.isEmpty(ret)) {
					console.log(ret);
					break;
				}
				// console.log(ret);
			}
			if (ret) {
				return ret[0];
			}
			return ret;
		},
		replaceItem: function(item_id, item_data) {
			var data = this.$data.proj_data.adCanvasInfo.PageList.Page;
			for (var i = 0; i < data.length; i++) {
				var cur_page_data = data[i].componentItemList.componentItem;
				// console.log(cur_page_data);
				for (var j = cur_page_data.length - 1; j >= 0; j--) {
					if (cur_page_data[j].id === item_id) {
						if (item_data) {
							cur_page_data.splice(j, 1, item_data);
						} else {
							cur_page_data.splice(j, 1);
						}
						break;
					}
				}
			}
		},
		propertyChange: function(item_id, width, height) {
			// console.log(item_id,width,height);
			var item_data = this.getItem(item_id);
			if (item_data && item_data.type === '41') {
				item_data.imageWidth = width * 2;
				item_data.imageHeight = height * 2;
			} else if(item_data && item_data.type === '62') {
				item_data.videoWidth = width * 2;
				item_data.videoHeight = height * 2;
			}
		},
		itemChange: function(item_id, item_data) {
			this.replaceItem(item_id, item_data);
			this.selectItem(item_id);
		},
		deleteItem: function(item_id) {
			this.replaceItem(item_id, null);
		},
		clearProperty: function() {
			this.$data.global_config.cur_item = this.$data.proj_data.adCanvasInfo.PageList.Page[this.$data.global_config.cur_page];
		},
		selectItem: function(item_id) {
			// alert(item_id);
			var data = this.getItem(item_id);
			console.log(data);
			if (data) {
				console.log(data);
				this.$data.global_config.cur_item = data;
				this.$data.global_config.options = Lib._.pick(Lib.C.items, Lib.C
					.availChangeList[
						data.type])
			}
		},
		addVideo:function(item_data) {
			this.addItem(item_data);
		}
	}

}
</script>

<style lang="css">
</style>
