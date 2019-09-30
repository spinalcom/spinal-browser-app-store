<template>
  <div v-if="data"
       class="container-fluid">
    <app-header></app-header>
    <v-container grid-list-md
                 text-center
                 class="mainContent">
      <v-layout wrap
                class="sizeMainContent">
        <v-flex md6
                sm12
                class="dataViewDisplay">
          <app-viewer class="forge_viewer"></app-viewer>
        </v-flex>
        <v-flex sm12
                md6
                class="dataViewDisplay"
                style="overflow-y: auto;">
          <appstore></appstore>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "./config/event";
import Vue from "vue";
import appViewer from "./components/viewer/viewer.vue";
import appHeader from "./components/header/header.vue";
import MainContainer from "./components/container/container.vue";
import dataService from "./config/data";
import appstore from "./components/appstore/appstore.vue";
export default Vue.extend({
  data() {
    return {
      collapseMenu: false,
      data: null,
      floorSelected: null,
      test: {},
      bindObj: []
    };
  },
  components: {
    "app-main": MainContainer,
    appstore,
    appViewer,
    appHeader
  },
  created() {
    let self = this;
    dataService.getAllData().then(allData => {
      self.data = allData;
    });

    setTimeout(function() {
      self.bindAllData();
    }, 3000);
  },
  methods: {
    mounted() {
      console.log(this.data);
    },
    bindAllData() {
      let self = this;
      // console.log("binding", dataService.ContextNode, dataService.ProcessNodes, dataService.StepsNodes);

      this.bindObj.push(dataService.ContextNode);
      this.bindObj.push(
        dataService.ContextNode.bind(function() {
          self.refreshBind();
          dataService.getAllData().then(allData => {
            self.updateData(allData);
            //self.data = allData;
          });
        }, false)
      );

      for (var ProcessNode in dataService.ProcessNodes) {
        this.bindObj.push(dataService.ProcessNodes[ProcessNode]);
        this.bindObj.push(
          dataService.ProcessNodes[ProcessNode].bind(function() {
            self.refreshBind();
            dataService.getAllData().then(allData => {
              self.updateData(allData);
              //self.data = allData;
            });
          }, false)
        );
      }

      for (var Node in dataService.StepsNodes) {
        this.bindObj.push(dataService.StepsNodes[Node]);
        this.bindObj.push(
          dataService.StepsNodes[Node].bind(function() {
            self.refreshBind();
            dataService.getAllData().then(allData => {
              self.updateData(allData);
              //self.data = allData;
            });
          }, false)
        );
      }

      setTimeout(function() {
        //     console.log("binobj = ", self.bindObj);
      }, 2000);
    },
    refreshBind() {
      let iterator = 0;

      while (iterator > this.bindObj.length) {
        this.bindObj[iterator].unbind(this.bindObj[iterator + 1]);
        iterator = iterator + 2;
      }
    },
    updateData(data) {
      let self = this;
      setTimeout(function() {
        self.data = data;
        self.bindAllData();
      }, 500);
      //EventBus.$emit("test", data);
    },
    onCollapsed(value) {
      this.collapseMenu = value;
    },
    selecFloor(id) {
      let self = this;
      this.data.floors.forEach(function(el) {
        if (el.id === id) self.floorSelected = el.name;
      });
      //console.log(id, "== id, data", this.data);
      //this.floorSelected = id;
    }
  }
});
</script>

<style scoped>
padding .roomcontext {
  position: absolute;
  /*min-height: calc(100%);*/
  margin-left: 11%;
  width: calc(16%);
}
.container-fluid {
  width: calc(100%);
  height: calc(100%);
  font-family: sans-serif;
}
/* .dataViewDisplay {
  margin-left: calc(51.4%);
  height: calc(100% - 70px);
  background-color: rgba(1, 2, 1, 0);
}*/
@media screen and (max-width: 960px) {
  .dataViewDisplay {
    transition: 500ms all cubic-bezier(0.075, 0.82, 0.165, 1);
    height: 50%;
  }
}
@media screen and (min-width: 960px) {
  .dataViewDisplay {
    transition: 500ms all cubic-bezier(0.075, 0.82, 0.165, 1);
    height: 100%;
  }
}
.forge_viewer {
  width: 100%;
  height: 100%;
  position: relative;
  float: left;
}

/* @media screen and (max-width: 992px) {
  .forge_viewer {
    width: 100%;
    height: 470px !important;
    position: relative;
    float: left;
  }
} */
.mainContent {
  position: relative;
  padding: unset;
  height: calc(100% - 70px);
  width: 100%;
  max-width: unset;
}
.sizeMainContent {
  height: 100%;
  width: 100%;
}

.container-data {
}

.sidebarContext-display {
  position: absolute;
  display: block;
}
</style>
