<template>
  <v-container id="task-list">
    <v-text-field
      label="New Task"
      @keydown.enter="addDoItem"
      v-model="inputTask"
      clearable
    ></v-text-field>
    <v-list>
      <v-list-item
        v-for="(doItem, index) in doItems"
        :key="index"
        @click="onCickItem(doItem)"
      >
        <v-list-item-avatar @click.stop="onClickCheck(doItem)">
          <template>
            <v-icon :color="checkIconColer(doItem)">{{
              checkIcon(doItem)
            }}</v-icon>
          </template>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ doItem.name }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn @click.stop="deleteItem(doItem)"
            ><v-icon color="error">delete</v-icon></v-btn
          >
        </v-list-item-icon>
        <!-- ダイアログ -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Task"
                      :value="selectItem.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      solo
                      name="input-7-4"
                      label="Detail"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="dialog = false"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--  -->
      </v-list-item>
    </v-list>
    <!-- <div style="text-align: right;">
      <v-btn color="success" :disabled="isAnyCheck" @click="onClickDone"
        >Done</v-btn
      >
    </div> -->
    <v-btn class="test-button"></v-btn>
  </v-container>
</template>

<script>
import { db } from "../plugins/firebase.js";

export default {
  name: "task-list",
  mounted() {
    const that = this;
    //firestoreのデータ更新を監視する
    db.collection("tasks")
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        that.doItems = [];

        snapshot.docs.map(doc => {
          if (!doc.data().isDone) {
            that.setTask(doc.data(), doc.id);
          }
        });
      });
  },
  data() {
    return {
      snaps: [],
      checkbox: true,
      doItems: [],
      inputTask: "",
      snap: null,
      isRecordableTask: true,
      dialog: false,
      selectItem: { name: "" }
    };
  },
  methods: {
    onCickItem: function(item) {
      this.selectItem = item;
      this.dialog = true;
    },
    addDoItem: function() {
      if (this.inputTask.length == 0) return;
      if (event.keyCode !== 13) return;
      if (!this.isRecordableTask) return;
      this.isRecordableTask = false;
      const that = this;
      debugger;
      db.collection("tasks")
        .add({
          name: this.inputTask,
          isDone: false,
          createdAt: new Date().getTime()
        })
        .then(function(docRef) {
          debugger;
          that.inputTask = "";
          that.isRecordableTask = true;
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          debugger;
          console.error("Error adding document: ", error);
        });
    },
    setTask(task, doc_id) {
      if (!task.isDone) {
        const newTask = {
          doc_id: doc_id,
          name: task.name,
          isSelected: false,
          checkColor: ""
        };
        this.doItems.push(newTask);
      }
    },
    deleteItem: function(doItem) {
      db.collection("tasks")
        .doc(doItem.doc_id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    onClickCheck: function(doItem) {
      //チェックマークをつけてdoneに更新する
      doItem.isSelected = !doItem.isSelected;
      debugger;

      var hoge = setInterval(function() {
        db.collection("tasks")
          .doc(doItem.doc_id)
          .update({
            isDone: true
          });
      }, 150);
      this.testButton();
    },
    testButton: function() {
      console.log("test押された");
    }
  },
  computed: {
    checkIcon: function() {
      return function(doItem) {
        return doItem.isSelected
          ? "mdi-checkbox-marked-circle"
          : "mdi-checkbox-blank-circle-outline";
      };
    },
    checkIconColer: function() {
      return function(doItem) {
        return doItem.isSelected ? "green" : "grey lighten-2";
      };
    }
    // isAnyCheck: function() {
    //   //1つでもチェックが(trueが)あればdisabed -> falseにする
    //   return !this.doItems.some(function(doItem) {
    //     return doItem.isSelected == true;
    //   });
    // }
  }
};
</script>

<style scoped lang="scss">
$test-color: green;
.test {
  color: $test-color;
}

.test-button {
  opacity: 0;
}
</style>
