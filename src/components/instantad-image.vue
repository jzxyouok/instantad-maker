<template>
    <img :src=pureImageUrl :style=styleObject class="preview" @load="load($event)" @click="selectFocus" />
</template>

<script>
    import Lib from 'assets/Lib.js'

    module.exports = {
        props: ['itemData', 'preview'],
        data: function() {
            // console.log(this.itemData);
            return {
                styleObject: {
                    width: this.preview ? '100%' : this.itemData.imageWidth + 'px',
                    height: this.preview ? 'auto' : this.itemData.imageHeight + 'px'
                }
            };
        },
        computed: {
            pureImageUrl: function() {
                return this.itemData.localfile || (Lib.C.basepath + this.itemData.pureImageUrl);
            }
        },
        methods: {
            selectFocus: function() {
                this.$emit('selectitem', this.itemData.id);
            },
            load: function(evt) {
                var rect = Lib.$(evt.target)[0].getBoundingClientRect();
                // console.log(rect.height);
                this.$emit('imageload', this.itemData.id, rect.width, rect.height);
            }
        }
    }
</script>


<style scoped>

</style>
