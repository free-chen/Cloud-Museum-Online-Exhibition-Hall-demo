<template>
  <modal name="video-panel" class="video-panel"
         :width="modalWidth"
         :scrollable="true"
         height="auto"
         @closed="$emit('closed')">
    <d-player :options="options" ref="player" @error="errorHandler"></d-player>
  </modal>
</template>

<script>
    import VueDPlayer from 'vue-dplayer'
    import 'vue-dplayer/dist/vue-dplayer.css'
    import {Toast} from 'mint-ui';

    export default {
        name: "VideoPanel",
        props: {
            infoData: {
                type: Object,
                default() {
                    return {}
                },
                required: true
            }
        },
        components: {
            'd-player': VueDPlayer
        },
        data() {
            return {
                modalWidth: document.body.offsetWidth > 768 ? 500 : 300,
                options: {}
            }
        },
        mounted() {
            this.$modal.show('video-panel');

        },
        created() {
            this.options = {
                video: {
                    url: this.infoData.videoPath
                },
                autoplay: true
            }
        },
        methods: {
            errorHandler() {
                Toast({
                    message: '视频加载失败',
                    position: 'middle',
                    duration: 2000
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
