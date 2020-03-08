<template>
  <v-container id="done-task-list">
    <template v-if="isDisplayList">
      <v-list>
        <v-list-item
          v-for="(doneItem, index) in doneItems"
          :key="index"
          @click="onCickItem(doneItem)"
        >
          <v-list-item-avatar>
            <template>
              <template v-if="doneItem.isSelected">
                <v-icon color="green">{{ checkIcon(doneItem) }}</v-icon>
              </template>
              <template v-else>
                <v-icon color="">{{ checkIcon(doneItem) }}</v-icon>
              </template>
            </template>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ doneItem.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn @click.stop="deleteItem(doneItem)"
              ><v-icon color="error">delete</v-icon></v-btn
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <div style="text-align: right;">
        <v-btn color="success" :disabled="isAnyCheck" @click="onClickToList"
          >TO LIST<v-icon>mdi-replay</v-icon></v-btn
        >
      </div>
    </template>
    <template v-else>
      <p class="subtitle text-center">No Tasks</p>
    </template>
  </v-container>
</template>

<script>
import { db } from "../plugins/firebase.js";

export default {
  name: "done-task-list",
  data() {
    return {
      checkbox: true,
      doneItems: []
    };
  },
  mounted() {
    const that = this;
    db.collection("tasks").onSnapshot(snapshot => {
      that.doneItems = [];
      snapshot.docs.map(doc => {
        if (doc.data().isDone) {
          that.setTask(doc.data(), doc.id);
        }
      });
    });
  },
  methods: {
    onCickItem: function(doneItem) {
      doneItem.isSelected = !doneItem.isSelected;
    },
    deleteItem: function(doneItem) {
      debugger;
      db.collection("tasks")
        .doc(doneItem.doc_id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    onClickToList: function() {
      this.doneItems.map(doneItem => {
        if (doneItem.isSelected) {
          db.collection("tasks")
            .doc(doneItem.doc_id)
            .update({
              isDone: false
            });
        }
      });
    },
    setTask(task, doc_id) {
      if (task.isDone) {
        const doneTask = {
          doc_id: doc_id,
          name: task.name,
          isSelected: false,
          checkColor: ""
        };
        this.doneItems.push(doneTask);
      }
    }
  },
  computed: {
    checkIcon: function() {
      return function(doneItem) {
        return doneItem.isSelected
          ? "mdi-checkbox-marked-circle"
          : "mdi-checkbox-blank-circle-outline";
      };
    },
    isAnyCheck: function() {
      //1つでもチェックが(trueが)あればdisabed -> falseにする
      return !this.doneItems.some(function(doneItem) {
        return doneItem.isSelected == true;
      });
    },
    isDisplayList: function() {
      return !!this.doneItems.length;
    }
  }
};
</script>

<style scoped></style>
