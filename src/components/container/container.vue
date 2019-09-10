
<template>
  <div class="container">
    <div class=" mainRow">
      <app-viewer class="middleBar-dataView-display"></app-viewer>
    </div>
  </div>
</template>

<script>
import appViewer from "../viewer/viewer.vue";

export default {
  name: "MainContainer",
  props: ["collapsed", "floorSelected", "rooms", "equipments", "allData"],
  components: {
    "app-viewer": appViewer
  },
  computed: {
    getStyle() {
      if (this.collapsed) {
        return {};
      } else {
        return {
          width: "calc(100% - 350px)",
          background: "black"
        };
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  float: right;
  width: calc(100% - 200px);
}

.middleBar-dataView-display {
  margin-left: 10px;
}

.mainRow {
  margin: 0px;
  height: calc(109vh - 40px);
}
</style>
