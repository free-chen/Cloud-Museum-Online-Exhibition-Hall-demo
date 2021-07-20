<template>
  <div class="toolbar">
    <transition name="scene-slide">
      <div>
        <!-- 室内 S -->
        <div class="toobar-scenes" v-show="isShowScenes">
          <div class="scenes-wrapper" ref="scenesWrapper">
            <div class="scenes-content" ref="scenesContent">
              <div :class="[
                  'scenes-item',
                  { active: currentScene === pathResolve(item.path) }
                ]" v-for="item in scenes" :key="item.name" @click="swtichCurrentScene(item)">
                <!-- <div class="thumb" :style="{backgroundImage:`url(${pathResolve(item.thumbUrl)})`}"></div> -->
                <div class="thumb">
                  <img :src="`${pathResolve(item.thumbUrl)}`" :alt="item.alias" :title="item.alias" />
                </div>
                <div class="title">{{ item.alias }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 室内 E -->
        <!-- </transition> -->
        <!-- <transition name="scene-slide"> -->
        <!-- 空中 S -->
        <div class="toobar-scenes" v-show="isShowScenesKZ">
          <div class="scenes-wrapper" ref="scenesWrapperKZ">
            <div class="scenes-content" ref="scenesContentKZ">
              <div :class="[
                  'scenes-item',
                  { active: currentScene === pathResolve(item.path) }
                ]" v-for="item in scenesKZ" :key="item.name" @click="swtichCurrentScene(item)">
                <div class="thumb" :style="{
                    backgroundImage: `url(${pathResolve(item.thumbUrl)})`
                  }"></div>
                <div class="title">{{ item.alias }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 空中 E -->
      </div>
    </transition>
    <transition name="group-slide">
      <div>
        <!-- 加载 室内组 S -->
        <div class="toobar-groups" v-show="isShow_three_dir">
          <div class="groups-wrapper" ref="groupsWrapper">
            <div class="groups-content" ref="groupsContent">
              <!-- zyx 重写加载显示样式 start -->
              <!-- <div :class="['groups-item', { active: currentGroup == item.name }]" v-for="item in groupsZU"
                @click="switchScenes(item, 1)" :key="item.id">
                <div class="thumb">
                  <img :src="`${pathResolve(item.thumbUrl)}`" :alt="item.alias" :title="item.alias" />
                </div>
                <div class="title">{{ item.alias }}</div>
              </div> -->

              <div :class="['groups-item', { active: currentGroup == item.name }]" v-for="item in panos_data_list"
                @click="swtichCurrentScene(item)" :key="item.id">
                <div class="thumb">
                  <img :src="`${pathResolve(item.thumbUrl)}`" :alt="item.alias" :title="item.alias" />
                </div>
                <div class="title">{{ item.alias }}</div>
              </div>

              <!-- zyx 重写加载显示样式 end -->
            </div>
          </div>
        </div>
        <!-- 室内组 E -->

        <!-- zyx 盘点是否还存在二级场景 start-->
        <div class="two_leve_scene_class" v-if="isShow_two_dir">
          <div class="groups-two-module">
            <span :class="{active: currentArr[1] === item.name}" v-for="(item,index) in two_leve_scene_panos" :key="index" @click="click_two_module(item)">
              {{item.alias}}
            </span>
          </div>
        </div>
        <!-- zyx 盘点是否还存在二级场景 end-->

        <!-- 空中组 S -->
        <div class="toobar-groups" v-show="isShowGroupsKZ">
          <div class="groups-wrapper" ref="groupsWrapperKZ">
            <div class="groups-content" ref="groupsContentKZ">
              <div :class="['groups-item']" v-for="item in groupsKZ"
                @click="switchScenes(item, 3)" :key="item.id">
                <div class="thumb" :style="{
                    backgroundImage: `url(${pathResolve(item.thumbUrl)})`
                  }"></div>
                <div class="title">{{ item.alias }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 空中组 E -->
      </div>
    </transition>

    <transition name="btns-slide" mode="out-in">
      <div class="toobar-bd" v-if="isShow_one_dir" key="bd">
        <div class="btn-group-l">
          <span class="btn-group-item btn-yejing" @click="showNightView" v-if="isnight"></span>
          <span class="btn-group-item btn-kongzhong" @click="showSkyView" v-if="issky"></span>
          <span class="btn-group-item btn-map" @click="showMapView" v-if="ismap"></span>
          <!-- <span class="btn-group-item btn-groups" @click="showGroups" v-if="isgroups"></span> -->
          <span class="btn-group-item btn-liuyan" @click="$emit('toggleRemark')" v-if="isleavemsg"></span>
          <span class="btn-group-item btn-danm" @click="$emit('toggleBarrage')" v-if="isbarrage"></span>
        </div>

        <!-- zyx 加载模块场景 start -->
        <div class="groups-one-module" v-if="isgroups">
          <span :class="{active: currentArr[0] === item.name}" v-for="(item,index) in groupsZU" :key="index" @click="click_one_module(item)">
            {{item.alias}}
          </span>
        </div>
        <!-- zyx 加载模块场景 end -->

        <div class="btn-group-c"></div>
        <div class="btn-group-r">
          <!--          <span class="btn-group-item btn-fullscreen"></span>-->
          <span class="btn-group-item btn-close" @click="closeAll"></span>
        </div>
      </div>

    </transition>

    <!-- zyx  优化场景选择 -->
    <div class="open-sence" @click="open_sence_event">
      <div class="open-sence-icon"></div>
      选择场景
    </div>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core';
  import _ from 'lodash';
import Swiper from 'swiper';    
import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'toolbar',
    props: {
      groups: {
        type: Array,
        default () {
          return [];
        }
      },
      currentGroup: {
        type: String,
        default () {
          return '';
        }
      },
      currentScene: {
        type: String,
        default () {
          return '';
        }
      },
      pathResolve: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        scenes: [],
        isShow_three_dir: false,
        isShowScenes: false,
        groupsBS: null,
        scenesBS: null,
        isShow_one_dir: false,

        flattenList: [],

        scenesYJ: [],
        isShowGroupsYJ: false,
        isShowScenesYJ: false,
        groupsYJBS: null,
        scenesYJBS: null,

        scenesKZ: [],
        isShowGroupsKZ: false,
        isShowScenesKZ: false,
        groupsKZBS: null,
        scenesKZBS: null,

        isnight: window.isnight,
        issky: window.issky,
        ismap: window.ismap,
        isgroups: window.isgroups,
        isleavemsg: window.isleavemsg,
        isbarrage: window.isbarrage,

        //张玉祥定义的参数
        currentArr: [],
        isShow_two_dir: false, //是否存在二级场景选项
        two_leve_scene_panos: [], // 二级场景模块数据
        panos_data_list: [], //显示的全景;
        click_sence_event_flg: false, //判断是否第一次点击选择场景
      };
    },
    computed: {
      groupsZU() {
        const zu = this.groups.filter(
          i =>
          decodeURIComponent(i.alias) !== '夜景' &&
          decodeURIComponent(i.alias) !== '空中' &&
          i
        );
        return zu;
      },
      // groupsYJ() {
      //   const yj = this.groups.filter(i => decodeURIComponent(i.alias) === '夜景' && i)
      //   return yj
      // },
      groupsKZ() {
        const kz = this.groups.filter(
          i => decodeURIComponent(i.alias) === '空中' && i
        );
        return kz;
      },
      
    },
    mounted() {
      this.initGroupBS();
      this.initSceneBS();
      let refreshBSDebounce = _.debounce(this.refreshBS, 500);
      window.addEventListener('resize', refreshBSDebounce);
      this.$once('hook:beforeDestroy', () => {
        this.groupsBS && this.groupsBS.destroy();
        this.scenesBS && this.scenesBS.destroy();
        // this.groupsYJBS && this.groupsYJBS.destroy();
        // this.scenesYJBS && this.scenesYJBS.destroy();
        this.groupsKZBS && this.groupsKZBS.destroy();
        this.scenesKZBS && this.scenesKZBS.destroy();
        window.removeEventListener('resize', refreshBSDebounce);
      });

      var mySwiper = new Swiper('.swiper-container', { /* ... */ });
    },
    watch: {
      groupsZU() {
        this.groupsBS && this.groupsBS.refresh();
      },
      groupsKZ() {
        this.groupsKZBS && this.groupsKZBS.refresh();
      },
      scenes() {
        this.scenesBS && this.scenesBS.refresh();
      },
      scenesKZ() {
        this.scenesKZBS && this.scenesKZBS.refresh();
      },
    },
    methods: {
      initGroupBS() {
        this.groupsBS = new BScroll(this.$refs.groupsWrapper, {
          scrollX: true,
          click: true
        });
        this.groupsKZBS = new BScroll(this.$refs.groupsWrapperKZ, {
          scrollX: true,
          click: true
        });
      },
      initSceneBS() {
        this.scenesBS = new BScroll(this.$refs.scenesWrapper, {
          scrollX: true,
          click: true
        });
        // this.scenesYJBS = new BScroll(this.$refs.scenesWrapperYJ, {
        //     scrollX: true,
        //     click: true
        // });
        this.scenesKZBS = new BScroll(this.$refs.scenesWrapperKZ, {
          scrollX: true,
          click: true
        });
      },
      showNightView() {
        this.isShow_three_dir = false;
        this.isShowScenes = false;
        this.isShowGroupsKZ = false;
        this.isShowScenesKZ = false;
        this.$emit('showNightView');
      },
      showSkyView() {
        this.isShow_three_dir = false;
        this.isShowScenes = false;
        this.isShowGroupsYJ = false;
        this.isShowScenesYJ = false;
        this.$emit('showSkyView');
      },
      showMapView() {
        this.$emit('showMapView');
      },
      switchScenes(group, type) {
        this.$emit('update:currentGroup', group.name);
        this.scenes = group.panos;
        this.scenesYJ = group.panos;
        if (type === 1) {
          this.isShowScenes = true;
          // this.isShowScenesYJ = false
          this.isShowScenesKZ = false;
        }
        if (type === 2) {
          // this.isShowScenesYJ = true
          this.isShowScenes = false;
          this.isShowScenesKZ = false;
        }
        if (type === 3) {
          this.isShowScenesKZ = true;
          // this.isShowScenesYJ = false
          this.isShowScenes = false;
        }
        this.$nextTick(() => {
          this.scenesBS && this.scenesBS.refresh();
        });
      },
      closeAll() {
        // zyx 收起toolbar start
        this.isShow_one_dir = false;
        this.isShow_two_dir = false;
        this.isShow_three_dir = false;
        // zyx 收起toolbar end
      },
      //更换场景
      swtichCurrentScene(item) {
        let path = this.pathResolve(item.path);
        this.$emit('update:currentScene', path);
        //更新当前的名字场景名称
        this.$emit('update:currentGroup', item.name);
      },
      refreshBS() {
        this.groupsBS && this.groupsBS.refresh();
        this.scenesBS && this.scenesBS.refresh();
        this.groupsYJBS && this.groupsYJBS.refresh();
        this.scenesYJBS && this.scenesYJBS.refresh();
        this.groupsKZBS && this.groupsKZBS.refresh();
        this.scenesKZBS && this.scenesKZBS.refresh();
      },

      //zyx 点击第一层模块
      click_one_module(item) {
        //如果对象为空，则默认显示第一个场景
        if (!item) {
          item = this.groupsZU[0];
        }
        this.currentArr = []
        this.currentArr[0] = item.name

        let panos = item.panos;
        if (panos && panos.length > 0) {
          //判断是否存在二级场景，如果不存在二级，直接显示三级全景数据
          let two_pano_item = panos[0];
          if (two_pano_item.path) {
            this.isShow_two_dir = false;
            this.isShow_three_dir = true;
            this.panos_data_list = panos;
          } else {
            this.two_leve_scene_panos = panos;
            this.isShow_two_dir = true;
            this.click_two_module(panos[0])
          }
        } else {
          this.isShow_two_dir = false;
          this.isShow_three_dir = false;
        }
      },
      //zyx 点击二级模块
      click_two_module(item) {
        if (!item) {
          item = this.two_leve_scene_panos[0]
        }
        this.currentArr[1] = item.name
        if (item.panos != null && item.panos.length > 0) {
          this.isShow_three_dir = true;
          this.panos_data_list = item.panos;
        } else {
          this.isShow_three_dir = false;
        }
      },
      //打开场景选择
      open_sence_event() {
        this.isShow_one_dir = true;

        if (!this.click_sence_event_flg) {
          //第一次 默认加载初始的场景
          this.click_one_module();
        } else {
          this.isShow_three_dir = true;
          this.isShow_two_dir = true;
        }

        this.click_sence_event_flg = true;
      }
    },
  };

</script>

<style lang="scss" scoped>
  .toolbar {
    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;
    z-index: 3001;
    text-align: center;
    padding: 0px 5% 10px 5%;

    .toobar-bd {
      height: 40px;
      background-color: rgba(45, 62, 80, 0.8);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 10px 0px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      transform: translateZ(0);
      z-index: 3000;

      .btn-group-item {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin: 4px 5px;
      }

      .btn-yejing {
        background: url('~@/assets/yejing.png') center center no-repeat;
        background-size: 30px 30px;
      }

      .btn-kongzhong {
        background: url('~@/assets/kongzhong.png') center center no-repeat;
        background-size: 30px 30px;
      }

      .btn-map {
        background: url('~@/assets/map.png') center center no-repeat;
        background-size: 28px 28px;
      }

      .btn-groups {
        background: url('~@/assets/menu.png') center center no-repeat;
        background-size: 28px 28px;
      }

      .btn-liuyan {
        background: url('~@/assets/liuyan.png') 0px 0px;
        background-size: 32px 32px;
      }

      .btn-danm {
        background: url('~@/assets/danm.png') 0px 0px;
        background-size: 32px 32px;
      }

      .btn-fullscreen {
        background: url('~@/assets/btns.png') 0px -288px;
        background-size: 64px 384px;
      }

      .btn-close {
        background: url('~@/assets/btns.png') 0px -224px;
        background-size: 64px 384px;
      }

      .groups-one-module {
        width: 100%;

        span {
          color: #ffffff;
          margin: 0px 20px;

          &:hover {
            cursor: pointer;
            border-bottom: 2px solid #ffffff;
            padding-bottom: 2px;
          }

          &.active {
            // color: #C7782E;
            padding-bottom: 2px;
            border-bottom: 2px solid #ffffff;
            // &:hover {
            //   // border-color: #C7782E;
            // }
          }
        }
      }
    }

    .toobar-groups,
    .toobar-scenes {
      height: 100px;
      background-color: rgba(45, 62, 80, 0.8);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 10px 0px;

      .groups-wrapper,
      .scenes-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .groups-content,
        .scenes-content {
          display: inline-block;
          white-space: nowrap;
          height: 100%;

          .groups-item,
          .scenes-item {
            width: 140px;
            height: 100%;
            margin: 0px 10px;
            display: inline-block;
            padding-top: 5px;

            &.active {
              .thumb {
                border-color: #C7782E;
              }
            }

            .thumb {
              width: 100%;
              height: 70px;
              border: 3px solid transparent;
              overflow: hidden;

              img {
                width: 100%;
                height: 70px;
                object-fit: cover;
                object-position: center;
              }
            }

            .title {
              width: 100%;
              color: white;
              font-size: 12px;
              padding-top: 5px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }

    .toobar-groups {
      margin-bottom: 2px;
    }

    .open-sence {
      width: 60px;
      height: 60px;
      background-color: rgba(68, 68, 68, 0.5);
      position: absolute;
      bottom: 7px;
      left: 19px;
      cursor: pointer;
      color: #ffffff;
      font-size: 12px;
      border-radius: 5px;

      .open-sence-icon {
        width: 28px;
        height: 28px;
        background: url('~@/assets/menu.png');
        background-size: cover;
        margin: auto;
        margin-top: 8px;
        margin-bottom: 4px;
      }

    }

    .two_leve_scene_class {
      width: 100%;
      height: 40px;
      background-color: rgba(45, 62, 80, 0.8);
      margin-bottom: 2px;
      padding: 12px;

      .groups-two-module {
        width: 100%;

        span {
          color: #ffffff;
          margin: 0px 20px;

          &:hover {
            cursor: pointer;
            border-bottom: 2px solid #ffffff;
            padding-bottom: 2px;
          }

          &.active {
            // color: #C7782E;
            padding-bottom: 2px;
            border-bottom: 2px solid #ffffff;
            // &:hover {
            //   // border-color: #C7782E;
            // }
          }
        }
      }
    }
  }

</style>
