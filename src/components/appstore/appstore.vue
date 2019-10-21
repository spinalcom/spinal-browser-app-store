
<template>
  <v-container grid-list-md
               class="containerSize">
    <v-layout wrap
              column>
      <div id="test12">
        <div class="triButtonId" v-for="btn in listTri">
          <v-btn small>{{ btn }}</v-btn>
        <!-- <p>{{btn}}</p> -->
        </div>
      </div>
      <v-container v-for="(browser, index) in browserLst"
                   :key="index">
        <!-- <div class="inlineblockTitle">
          <h3>{{browser.title}}</h3>
        </div> -->
        <v-layout justify-space-between
                  wrap
                  row
                  md12>
          <v-flex v-for="(app,index) in browser.apps"
                  :key="index"
                  md4
                  class="siezFlexBox">
            <v-card height="220px">
              <a :href="formatUrl(browser, app)">
                <v-img :src="app.image.imageUrl"
                       height="100"></v-img>
              </a>
              <h3 class="alignTitle">{{app.title}}</h3>
              <!-- <v-btn style="display: inline-block;"
                     icon
                     @click="app.show = !app.show">
                <v-icon>
                  {{ app.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                </v-icon>
              </v-btn> -->
              <v-expand-transition>
                <!-- <div v-show="app.show"> -->
                  <div>
                  <v-card-text class="breakText">
                    {{ app.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import { appService } from "spinal-env-viewer-plugin-apps-generator/service/appsService";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { spinalIO } from "../../config/spinal-io";
import GetAppService from "../../config/getAppService";

export default {
  name: "appstore",
  data() {
    return {
      show: false,
      appsLst: [],
      browserLst: [],
      listTri: []
    };
  },
  props: [],
  components: {},
  methods: {
    formatApps(appsLst) {
      for (let i = 0; i < appsLst.length; i++) {
        const nodeInfo = appsLst[i];
        nodeInfo.element.ptr.load(apps => {
          console.log("nodeinfo.elem.ptr ==", apps);
          let node = SpinalGraphService.getNode(apps.selectedScene.get());
          for (let j = 0; j < this.browserLst.length; j++) {
            let browser = this.browserLst[j];
            console.log("browser type ====", browser.type, "and apps =", apps.context.type.get());
            if (browser.type == apps.context.type.get()) {
              let obj = {
                context: apps.context,
                description: apps.description,
                image: apps.image,
                roleLst: apps.role,
                selectedScene: node,
                title: apps.title,
                userLst: apps.userLst,
                show: false
              };
              appService.getFileByElement(obj.image).then(imageLoaded => {
                obj.image.imageUrl = imageLoaded.imageUrl;
                browser.apps.push(obj);
              });
            }
          }
        });
      }
    },
    formatUrl(browser, app) {
      let url = browser.url + "&node=" + app.context.id.get();
      console.log("URL ====", url);
      return url;
    },
    tryLst(list) {
      let self = this;
      return new Promise(function(res) {
      let nameList = [];

       for (var i in list) {
        list[i].element.ptr.load(apps => {
         if (nameList.includes(apps.context.type.get()) !== true) {
            nameList.push(apps.context.type.get())
            self.listTri.push(apps.context.name.get());
          }
        })
       }
       setTimeout(function() {
         self.browserLst = GetAppService.GetList(nameList);
         res(true);
        }, 1000);
      })
    }
  },
  mounted() {
   appService.getAllApps().then(res => {
     this.tryLst(res).then(k => {
       console.log("then k =");
        this.formatApps(res) 
        });
   });
    let user = spinalIO.getauth();
    appService.getAppsByUser(user.username).then(res => {
      console.log("resultat getappByUser");
      console.log(res);
    });
  },
  computed: {
    getStyle() {}
  }
};
</script>

<style >
.sizecard {
  margin: 10px !important;
}
.inlineblockTitle {
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
}
.alignTitle {
  width: calc(100% - 70px);
  display: inline-block;
  font-size: calc(90%);
  padding-top: 10px;
  padding-bottom: 6px;
  margin-left: 13px;
}
.containerSize {
  width: 100%;
}
#test12 {
  text-align: left;
}
.breakText {
  word-break: break-word;
}
  .siezFlexBox {
    height: 10%;
    width: 25%;
  }

.triButtonId {
  display: inline;
}
.v-card__text {
  overflow: hidden;
  padding: 0px !important;
  padding-bottom: 3px;
  padding-left: 12px !important;
}

/* @media screen and (min-width: 960px) {
  .siezFlexBox {
    max-width: 200px !important;
    min-width: 200px !important;
  }
}
@media screen and (max-width: 960px) {
  .siezFlexBox {
    max-width: 200px !important;
    min-width: 200px !important;
  }
} */
</style>
