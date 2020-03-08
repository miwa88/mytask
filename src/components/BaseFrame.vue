<template>
  <div id="base-frame">
    <!-- <v-card> -->
    <v-tabs
      v-model="tab"
      background-color="teal lighten-3"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#1">
        List
      </v-tab>

      <v-tab href="#2">
        Done
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="i in 2" :key="i" :value="String(i)">
        <component :is="prefix.component"></component>
      </v-tab-item>
    </v-tabs-items>
    <div @task-selected="onclickTask($event, index)"></div>
    <!-- <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Task"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea solo name="input-7-4" label="Detail"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import DoneTaskList from "./DoneTaskList";
import TaskList from "./TaskList";

export default {
  name: "base-frame",

  data() {
    return {
      tab: null,
      tabs: [
        { id: 0, name: "List", compo: "TaskList" },
        { id: 1, name: "Done", compo: "DoneTaskList" }
      ],
      prefix: {
        component: TaskList
      },
      dialog: false
    };
  },
  methods: {
    onclickTask() {
      debugger;
    },
    tabChange(id) {
      debugger;
      if (id == 0) {
        this.prefix.component = TaskList;
      } else {
        this.prefix.component = DoneTaskList;
      }
    }
  },
  watch: {
    tab: function(val) {
      if (val == 1) {
        this.prefix.component = TaskList;
      } else {
        this.prefix.component = DoneTaskList;
      }
    }
  }
};
</script>

<style scoped>
#base-frame {
  /* overflow-y: hidden; */
}
</style>
