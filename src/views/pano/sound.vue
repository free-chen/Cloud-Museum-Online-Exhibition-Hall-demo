<template>
  <div class="sound">
    <svg-icon v-if="audioUrls.length && playing" icon-class="el-icon-okaysound" @click="swtichOff"></svg-icon>
    <svg-icon v-if="audioUrls.length && !playing" icon-class="el-icon-okaymute" @click="switchResume"></svg-icon>
    <audio ref="bgm" autoplay loop>
      <source :src="`${publicPath}bgm.mp3`" type="audio/mpeg"/>
    </audio>
    <audio ref="audio">
      <source @error="audioError"
              v-for="item in audioUrls"
              :key="item"
              :src="item"
              :type="item.indexOf('mp3')>0 ? 'audio/mpeg' : 'audio/ogg' "/>
    </audio>
  </div>
</template>

<script>
    export default {
        name: "sound",
        data() {
            return {
                publicPath: process.env.BASE_URL,
                audioUrls: [],
                autoplay: true,
                playing: false
            }
        },
        methods: {
            playBgm() {
                if (!this.bgmPlaying) {
                    this.$refs.bgm.load()
                    this.$refs.bgm.volume = 0.3
                    this.$refs.bgm.play().then(resp => {
                        this.bgmPlaying = true
                    }).catch(err => {
                        this.bgmPlaying = false
                    })
                }
            },
            play(audioPaths) {
                this.audioUrls = audioPaths;
                if (!this.playing && this.autoplay) {
                    this.$refs.audio.load();
                    this.$refs.audio.play().then(resp => {
                        this.playing = true;
                    }).catch(err => {
                        this.playing = false;
                    })
                }
            },
            clear() {
                this.audioUrls = [];
                this.$refs.audio.load();
            },
            stop() {
                this.playing = false;
                this.autoplay = !!this.autoplay;
                this.$refs.audio.pause();
            },
            resume() {
                if (!this.playing && this.autoplay) {
                    this.autoplay = true;
                    // this.$refs.audio.load();
                    this.$refs.audio.play().then(resp => {
                        this.playing = true;
                    }).catch(err => {
                        this.playing = false;
                    })
                }
            },
            swtichOff() {
                this.playing = false;
                this.autoplay = false;
                this.$refs.audio.pause();
            },
            switchResume() {
                this.autoplay = true;
                // this.$refs.audio.load();
                this.$refs.audio.play().then(resp => {
                    this.playing = true;
                }).catch(err => {
                    this.playing = false;
                })
            },
            audioError(err) {
                this.autoplay = !!this.autoplay;
                this.playing = false;
                this.audioUrls = [];
            }
        }
    }
</script>
