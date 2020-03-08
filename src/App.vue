<template>
  <v-app>
    <v-content>
      <BaseFrame />
    </v-content>
  </v-app>
</template>

<script>
import BaseFrame from "./components/BaseFrame";
import "./scss/common.scss";

export default {
  name: "App",

  components: {
    BaseFrame
  },

  data: () => ({
    //
  })
};
</script>
