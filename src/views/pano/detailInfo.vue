<template>
  <modal name="detail-info" class="detail-info"
         :width="modalWidth"
         :scrollable="true"
         height="auto"
         @closed="$emit('closed')"
         @opened="opened">
    <div class="dialog">
      <div v-viewer="viewerOptions" v-if="infoData.imgPath.length" class="dialog-imgs" ref="dialogImgs"
           :style="dialogImgsStyle">
        <swiper :options="swiperOption" ref="picSwiper">
          <swiper-slide v-for="item in infoData.imgPath" :key="item">
            <img :src="item"/>
          </swiper-slide>
        </swiper>
      </div>
      <div class="dialog-audio" v-if="infoData.audiopath.length">
        <aplayer autoplay
                 :music="{
                  title: infoData.org,
                  artist: ' ',
                  src:infoData.audiopath,
                  pic: ''
                }"/>
      </div>
      <div class="dialog-title" v-if="infoData.org.length">
        {{infoData.org}}
      </div>
      <div class="dialog-subtitle" v-if="infoData.nd.length">
        {{infoData.nd}}
      </div>
      <div class="dialog-info" v-if="infoData.info">
        <div class="info-wrapper" ref="infoWrapper">
          <div class="info-content" ref="infoContent" v-html="infoData.info">
<!--            {{infoData.info}}-->
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
    import Aplayer from 'vue-aplayer'
    import BScroll from '@better-scroll/core'

    export default {
        name: "detailInfo",
        data() {
            return {
                swiperOption: {},
                dialogImgsStyle: {
                    width: '100%',
                    height: '300px'
                },
                infoBS: null,
                viewerOptions: {
                    toolbar: false,
                    title: false
                },
                modalWidth: document.body.offsetWidth > 768 ? 500 : 300
            }
        },
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
            Aplayer
        },
        mounted() {
            this.$modal.show('detail-info');
        },
        methods: {
            opened() {
                if (this.infoData.imgPath.length) {
                    this.dialogImgsStyle = {
                        width: '100%',
                        height: this.$refs.dialogImgs.offsetWidth / 16 * 9 + "px"
                    }
                }
                this.infoBS = new BScroll(this.$refs.infoWrapper, {
                    scrollX: true
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
  .detail-info {

     .v--modal-box {
      box-shadow: none;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }

    &.scrollable {
       .v--modal-box {
        margin-bottom: 0px;
      }
    }

    .dialog {
      .dialog-imgs {
        overflow: hidden;

        .swiper-container {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }

      .dialog-title, .dialog-subtitle {
        color: white;
        padding-left: 15px;
        font-weight: bold;
      }

      .dialog-title {
        font-size: 15px;
        margin: 10px 0px;
        display: flex;
        align-items: center;
      }

      .dialog-subtitle {
        font-size: 13px;
      }

      .dialog-audio {
        .aplayer {
          margin: 0px;
        }
      }

      .dialog-info {
        padding: 15px;
        color: white;
        font-size: 12px;
        line-height: 2em;
        height: 200px;
        overflow: hidden;

        .info-wrapper {
          width: 100%;
          height: 100%;

          .info-content {
            text-align: justify;
            text-indent: 2em;
          }
        }
      }
    }
  }
</style>
