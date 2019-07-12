<template>
  <div>
    <ul>
      <li>
        <Edit-By-Click tag="input" nullable="false" v-model="currenttask.title"></Edit-By-Click>
      </li>
      <li>
        Steps:
        <ol>
          <li v-for="item in currenttask.subTodo" v-bind:key="item._id">
            <b-checkbox class="d-inline-block" v-model="item.completed" />
            <Edit-By-Click class="d-inline-block" nullable="false" tag="input" v-model="item.title"></Edit-By-Click>
            <b-link v-if="item._id !== undefined" @click="$emit('delete-subtask', item._id)">
              <span>
                <font-awesome-icon icon="backspace" />
              </span>
            </b-link>
          </li>
          <li>
            <AddSubtask
              v-on:save-subtask="$emit('save-subtask', $event)"
              placeholder="Title of step"
              nullable="false"
              eventname="save-subtask"
            />
          </li>
        </ol>
      </li>
      <li>
        <Edit-By-Click tag="textarea" nullable="true" v-model="currenttask.description"></Edit-By-Click>
      </li>
      <li>
        Expiration:
        <Date-Time-Select type="datetime" v-model="currenttask.expireDate" />
      </li>
      <li>
        Remind time:
        <Date-Time-Select type="datetime" v-model="currenttask.remindTime"></Date-Time-Select>
      </li>
      <li>
        <Edit-By-Click tag="textarea" nullable="true" v-model="currenttask.note"></Edit-By-Click>
      </li>
    </ul>
  </div>
</template>

<script>
import editByClick from "../../global-component/edit-by-click";
import addSubtask from "../../global-component/add-subtask";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  name: "task-details",
  components: {
    "Edit-By-Click": editByClick,
    "Date-Time-Select": Datetime,
    AddSubtask: addSubtask
  },
  props: ["currenttask"]
};
</script>

<style scoped>
</style>
