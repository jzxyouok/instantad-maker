<template lang="html">
	<div class="wrapper">
        <div class="header">
            <div class="logo">
                InstantAD_v0.1.0 <br> alpha
            </div>
            <div class="operation">
                <div>
                    <button id="save" class="btn small" style="display:none;">保存</button>
                    <button id="downloadzip" class="btn small">zip下载</button>
                    <button id="publish" class="btn small">在线预览</button>
                    <button id="setting" class="setting btn"></button>
                </div>
            </div>
            <div class="login"></div>
        </div>
        <div class="middle">
            <div class="leftside">
                <div class="tabs">
                    <div class="tab current" data-tab="tabpage">
                        <span>页面</span>
                    </div>
                    <div class="tab tabproj" data-tab="tabproj">
                        <span>项目列表</span>
					</div>
                </div>
                <div class="tab-content current" id="thumb_panel" data-tab="tabpage">
                </div>
                <div class="tab-content" data-tab="tabproj">
					<div id="proj_panel"></div>
				</div>
            </div>
            <div class="uploadfile_wrapper">
                <input type="file" id="upload-file-image" class="uploadfile" accept="image/gif, image/jpeg,image/png">
                <input type="file" id="upload-file-video" class="uploadfile" accept="video/mp4">
            </div>
            <div class="content" id="content">
                <div>页面编辑</div>
                <div id="editpage_panel"></div>
            </div>
            <div class="rightside">
                <div id="property">
                    <!-- 属性栏面板-->
                    <property-panel :item_data=item_data :options=options :seen=true></property-panel>
                </div>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
	<div id="proj_setting_wrapper" class="panel setting_panel">
		<div id="proj_setting"></div>
	</div>
	<div id="qrcode" class="setting_panel" style="width:160px;height:160px;">
	</div>
</template>

<script>
import propertyPanel from 'components/property_panel';

export default {
	data: function() {
		return {

		}
	},
	mounted: function() {
		console.log('app.vue');
	},
	created: function() {
		console.log('app.vue created');
	},
	components: {
		propertyPanel
	}
}
</script>

<style lang="css">
</style>
