<template>
    <div style="position:relative;">
        <div v-show="property" v-for="(value,key) in items">
            <instantad-image :item_data=value.componentItem :preview=true></instantad-image>
        </div>
        <div v-show="!property">
            <instantad-image :item_data=items[0].componentItem :preview=true v-on:selectFocus="selectItem"></instantad-image>
        </div>
        <div v-show="!isThumb" class="slider_wrapper">
            <span class="slide_point current"></span>
            <span class="slide_point"></span>
            <span class="slide_point"></span>
            <span class="slide_point"></span>
        </div>
        <div class="addfile" v-show="property" @click="uploadfile">+</div>
    </div>
</template>

<script>
    import Lib from 'assets/Lib.js'
    import instantadImage from 'components/instantad-image'

    module.exports = {
        components: {
            instantadImage
        },
        props: ['item_data', 'preview', 'isThumb', 'property'],
        data: function() {
            // console.log(this.item_data);
            return {
                items: this.item_data.componentGroupList.componentGroup,
                pureImageUrl: Lib.C.basepath + this.item_data.pureImageUrl,
                styleObject: {
                    width: this.preview ? '100%' : this.item_data.imageWidth +
                        'px',
                    height: this.preview ? 'auto' : this.item_data.imageHeight +
                        'px'
                },
                show: false
            };
        },
        methods: {
            tellDataManager: function(item_id, data) {
                DataManager.setCurrItem(item_id, data);
            },
            selectItem: function(item_id) {
                // console.log(item_id);
                this.tellDataManager(item_id);
            },
            uploadfile: function() {
                Lib.C.upload_id = this.item_data.id;
                $('#upload-file-image').trigger('click');
            }
        }
    }
</script>

<style scoped>

</style>
