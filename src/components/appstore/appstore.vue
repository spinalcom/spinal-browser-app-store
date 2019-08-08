
<template>
  <v-container grid-list-md
               class="containerSize">
    <v-layout wrap
              column>
      <v-container v-for="(browser, index) in browserLst"
                   :key="index">
        <div class="inlineblockTitle">
          <h3>{{browser.title}}</h3>
        </div>
        <v-layout justify-space-between
                  wrap
                  row
                  md12>
          <v-flex v-for="(app,index) in browser.apps"
                  :key="index"
                  md4
                  class="siezFlexBox">
            <v-card min-height="160px">
              <a :href="formatUrl(browser, app)">
                <v-img :src="app.image.imageUrl"
                       height="100"></v-img>
              </a>
              <h3 class="alignTitle">{{app.title}}</h3>
              <v-btn style="display: inline-block;"
                     icon
                     @click="app.show = !app.show">
                <v-icon>
                  {{ app.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                </v-icon>
              </v-btn>
              <v-expand-transition>
                <div v-show="app.show">
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

export default {
  name: "appstore",
  data() {
    return {
      show: false,
      appsLst: [],
      browserLst: [
        {
          title: "Group",
          type: "RoomsGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=6df1273a26ebd872396a2da1563791c0f3095918a58d721d",
          apps: []
        },
        {
          title: "Equipment",
          type: "EquipmentGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=6df1273a26ebd872396a2da1563791c0f3095918a58d721d",
          apps: []
        }
      ],
      urlFake:
        "https://media.licdn.com/dms/image/C4E0BAQF992P7GC7fiA/company-logo_400_400/0?e=1573084800&v=beta&t=rlVtBdsasBH2HAe33QreRyuzU4oaf7ozagA-sDZBCiI"
    };
  },
  props: [],
  components: {},
  methods: {
    formatApps(appsLst) {
      for (let i = 0; i < appsLst.length; i++) {
        const nodeInfo = appsLst[i];
        nodeInfo.element.ptr.load(apps => {
          let node = SpinalGraphService.getNode(apps.selectedScene.get());
          for (let j = 0; j < this.browserLst.length; j++) {
            let browser = this.browserLst[j];
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
                console.log(browser);
              });
            }
          }
        });
      }
    },
    formatUrl(browser, app) {
      let url = browser.url + "&node=" + app.context.id.get();
      return url;
    }
  },
  mounted() {
    appService.getAllApps().then(res => {
      this.formatApps(res);
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
  margin-left: 13px;
}
.containerSize {
  width: 100%;
}
.breakText {
  word-break: break-word;
}
@media screen and (min-width: 960px) {
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
}
</style>
