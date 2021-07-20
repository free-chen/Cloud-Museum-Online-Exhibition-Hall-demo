<template>
  <div class="pano-wrapper">
    <div id="pano-bd" @click="click_body"></div>
    <tool-bar :groups="groups" @toggleBarrage="isShowBarrage = !isShowBarrage" @showMapView="showMapView"
      @showNightView="showNightView" @showSkyView="showSkyView" :current-group.sync="currentGroup"
      :current-scene.sync="currentScene" :path-resolve="resolve" ref="toolBar_item"></tool-bar>
    <!-- <barrage style="position: absolute;top:0px;" v-if="isShowBarrage"></barrage> -->
    <detail-info v-if="isShowDetailInfo" @closed="isShowDetailInfo = false" :info-data="detailInfoData"></detail-info>
    <relic-info v-if="isShowRelicInfo" @closed="isShowRelicInfo = false" :info-data="relicInfoData"></relic-info>
    <video-panel v-if="isShowVideoPanel" @closed="isShowVideoPanel = false" :info-data="videoInfoData"></video-panel>
    <sound ref="sound"></sound>
    <div class="mask" v-if="showMask" @click="showMask=false"
      style="overflow:hidden;position: fixed;top:0px;left:0px;right:0px;bottom:0px;background: rgba(0,0,0,0.2);display: flex;justify-content: center;align-items: center;">
      <div class="cnt" style="width: 1700px;height:890px;">
        <iframe :src="cntSRC" width="100%" height="100%" frameborder="0" seamless allowfullscreen="true" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    fetchScenes
  } from '@/api/pano';
  import _ from 'lodash';
  import ToolBar from './toolbar';
  import DetailInfo from './detailInfo';
  import VideoPanel from './videoPanel';
  import RelicInfo from './relicInfo';
  import sound from './sound'

  export default {
    name: 'PANO',
    data() {
      return {
        krpano: null,
        groups: [],
        currentGroup: '',
        scene: "",
        currentScene: '',
        isShowBarrage: false,
        isShowDetailInfo: false,
        detailInfoData: {},
        hlookat: '0',
        vlookat: '0',
        fov: '0',
        distortion: '0',
        isShowVideoPanel: false,
        videoInfoData: {},
        isShowRelicInfo: false,
        relicInfoData: {},
        cntSRC: '',
        showMask: false,
        panos_data: {}, //zyx 全部的全景数据
        gd_scene: [], //过渡动画场景
        dh_flg: false, //过渡动画效果
      };
    },
    components: {
      ToolBar,
      DetailInfo,
      VideoPanel,
      RelicInfo,
      sound
    },
    mounted() {
      // embedpano({
      //   id: 'pano',
      //   swf: 'panos/krpano.swf',
      //   xml: 'panos/krpano.xml',
      //   target: 'pano-bd',
      //   html5: 'auto',
      //   mobilescale: 1.0,
      //   passQueryParameters: true,
      //   consolelog: true,
      //   onready: this.init
      // });
      window.addEventListener("message", (d) => {
        if (d.data && d.data.msg && d.data.msg === 'close') {
          this.showMask = false
        }
      }, false);
    },
    beforeDestroy() {
      removepano('pano');
    },
    watch: {
      groups() {
        this.loadFirstScene();
      },
      krpano() {
        this.loadFirstScene();
      },
      currentScene(n, o) {
        this.loadScene(n);
      }
    },
    computed: {
      flatGroups() {
        if (this.groups.length) {
          let tmp = {};
          for (let i = 0; i < this.groups.length; i++) {
            let g = this.groups[i];
            if (g.panos) {
              for (let k = 0; k < g.panos.length; k++) {
                tmp[g.panos[k].name] = {
                  group: g.name,
                  path: g.panos[k].path
                };
              }
            }
          }
          return tmp;
        }
      }
    },
    created() {
      this.loadScenesData();
    },
    methods: {
      init(krpano) {
        this.krpano = krpano;
        this.krpano.hooks = {
          loadXml: this.loadXml,
          showModalInfo: this.showModalInfo,
          xmlLoaded: this.xmlLoaded,
          showVideoInfo: this.showVideoInfo,
          showRelicInfo: this.showRelicInfo,
          resumeAudio: this.resumeaudio,
          openPage: this.openPage,
          zlloading: this.zlloading
        };
      },
      loadXml(group, scene, hlookat, vlookat, fov, distortion, dh) {
        this.currentGroup = group;
        this.scene = scene;
        this.hlookat = hlookat;
        this.vlookat = vlookat;
        this.fov = fov;
        this.distortion = distortion;

        //zyx 场景切换是否经过一个走廊
        if (dh && dh != "null") {
          this.dh_flg = true;

          let dh_path = "";
          for (const index in this.gd_scene) {
            const element = this.gd_scene[index];
            if (element.id == dh) {
              dh_path = element.path;
            }
          }

          this.loadScene(this.resolve(dh_path));
        } else {
          this.currentScene = `${window.frontpathurl}panos/${group}/${scene}/pano.xml`;
        }
      },
      xmlLoaded() {
        if (
          (this.hlookat !== '0' && this.hlookat !== 'null') ||
          (this.vlookat !== '0' && this.vlookat !== 'null') ||
          (this.fov !== '0' && this.fov !== 'null') ||
          (this.distortion !== '0' && this.distortion !== 'null')
        ) {
          this.krpano.set('view.hlookat', parseFloat(this.hlookat));
          this.krpano.set('view.vlookat', parseFloat(this.vlookat));
          this.krpano.set('view.fov', parseFloat(this.fov));
          this.krpano.set('view.distortion', parseFloat(this.distortion));
        }
      },
      openPage(url) {
        this.showMask = true;
        this.cntSRC = url
      },
      resolve(path) {
        return `${window.frontpathurl}panos/${path}`;
      },
      loadScenesData() {
        // zyx 从服务取数据结构 start 
        fetchScenes().then(response => {
          this.panos_data = response;
          this.groups = response.data;
          this.gd_scene = response.gd_scene;
        });
        // zyx 从服务取数据结构 end
      },
      loadFirstScene() {
        //zyx 加载第一个场景 start
        if (this.groups.length && this.krpano) {
          let queryName = this.$route.query.name;
          if (queryName && this.flatGroups[queryName]) {
            this.currentGroup = this.flatGroups[queryName].group;
            this.currentScene = this.resolve(this.flatGroups[queryName].path);
          } else {
            // this.currentGroup = this.groups[0].name;
            // this.currentScene = this.resolve(this.groups[0].panos[0].path);

            let first_t_Scene = this.panos_data.index;
            this.currentGroup = first_t_Scene.name;

            //获取场景路径
            this.currentScene = this.resolve(first_t_Scene.path);
          }
        }
        //zyx 加载第一个场景 end
      },

      loadScene(scenePath) {
        this.krpano.call(
          'loadpano(' + scenePath + ', null, MERGE, get(blendmodes[simple crossblending].blend));'
        );
      },
      showMapView() {
        const v = this.krpano.get('layer[map].x');
        if (Number(v) === 0) {
          this.krpano.call('closeMapList');
        } else {
          this.krpano.call('openMapList');
        }
      },
      showNightView() {
        this.showSingleView('夜景');
      },
      showSkyView() {
        this.showSingleView('空中');
      },
      showSingleView(name) {
        const view = this.groups.find(i => decodeURIComponent(i.name) === name);
        this.loadScene(view.panos[0].path);
      },
      showModalInfo(imgpath, audiopath, info, org, nd) {
        this.detailInfoData = {
          imgPath: imgpath.length && imgpath !== 'null' ?
            imgpath
            .split(',')
            .map(item => `${window.frontpathurl}panos${item}`) : [],
          audiopath: audiopath.length && audiopath !== 'null' ?
            `${window.frontpathurl}panos${audiopath}` : '',
          info: info.length && info !== 'null' ? info : '',
          org: org.length && org !== 'null' ? org : ' ',
          nd: nd.length && nd !== 'null' ? nd : ''
        };
        this.isShowDetailInfo = true;
      },
      showVideoInfo(videoPath) {
        this.videoInfoData = {
          videoPath: `${window.frontpathurl}panos${videoPath}`
        };
        this.isShowVideoPanel = true;
      },
      showRelicInfo(imgpath, title, years, info, music) {
        this.relicInfoData = {
          imgPath: imgpath.length && imgpath !== 'null' ?
            imgpath
            .split(',')
            .map(item => `${window.frontpathurl}panos${item}`) : [],
          title: title.length && title !== 'null' ? title : ' ',
          nd: years.length && years !== 'null' ? years : '',
          info: info.length && info !== 'null' ? info : '',
          audiopath: music.length && music !== 'null' ?
            `${window.frontpathurl}panos${music}` : ''
        };
        this.isShowRelicInfo = true;
      },
      resumeaudio() {
        this.$refs.sound.playBgm()
      },
      //zyx 鼠标移动场景，关闭toolbar栏
      click_body() {
        this.$refs.toolBar_item.closeAll()
      },
      //过渡走廊动画 持续四秒钟
      zlloading() {
        if (this.dh_flg) {
          this.krpano.call("zoomto(1, linear(50))");
          setTimeout(() => {
            this.end_zlloading();
          }, 2000);
        }
      },
      end_zlloading() {
        this.dh_flg = false;
        this.krpano.set("fov_moveforce", 0);
        this.currentScene = `${window.frontpathurl}panos/${this.currentGroup}/${this.scene}/pano.xml`;
      }
    }
  };

</script>

<style lang="scss" scoped>
  .pano-wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;

    #pano-bd {
      height: 100%;
    }
  }

</style>
