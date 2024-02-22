<template>
  <div class="create-timetable">
    <div class="create-timetable-container">
      <div class="blur"></div>
      <form class="form-create">
        <table style="width: 100%">
          <tr>
            <th>SCHEDULE</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>PRI</th>
            <th>SAT</th>
            <th>SUN</th>
          </tr>
          <tr v-for="(row, index) in dataTest" :key="index" class="table-row">
            <td
              class="table-item"
              v-for="(item, keyItem) in row['items']"
              :key="keyItem"
            >
              <p>{{ item }}</p>
              <input
                class="table-edit"
                v-model="editText"
                @mouseover="onToggleEdit(keyItem, index)"
                @mouseout="onEdit(keyItem)"
              />
            </td>
            <span class="row-remove" @click="onRemoveRow(index)">-</span>
            <span class="row-add" @click="onAddRow(index)">+</span>
          </tr>
        </table>
        <div class="btn-group">
          <button type="button" @click="onComplete">Complete</button>
          <button @click="onCancel" type="button">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(["onCancel"]);
const props = defineProps<{ timetable: any }>();
const dataTest = ref<any>([
  {
    items: {
      schedule: "4:00 - 5:00",
      mon: "Happy Day",
      tue: "Happy Day 2",
      wed: "Boring Day",
      thu: "Sad Day",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
  {
    items: {
      schedule: "6:00 - 7:00",
      mon: "Happy Day",
      tue: "Sad Day 2",
      wed: "Boring Day",
      thu: "Sad Day",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
  {
    items: {
      schedule: "6:00 - 7:00",
      mon: "Happy Day",
      tue: "Sad Day 2",
      wed: "Boring Day",
      thu: "Sad Day",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
  {
    items: {
      schedule: "6:00 - 7:00",
      mon: "Happy Day",
      tue: "",
      wed: "Boring Day",
      thu: "Sad Day",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
  {
    items: {
      schedule: "6:00 - 7:00",
      mon: "Happy Day",
      tue: "Sad Day 2",
      wed: "Boring Day",
      thu: "Sad Day",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
  {
    items: {
      schedule: "6:00 - 7:00",
      mon: "Happy Day",
      tue: "Sad Day 2",
      wed: "Boring Day Boring Day Boring Day Boring Day",
      thu: "",
      pri: "Crazy Day",
      sat: "Last Day",
      Sun: "Mercy Day",
    },
  },
]);
const editText = ref();
const editItem = ref();
const onToggleEdit = (keyItem: any, key: any) => {
  const item = dataTest.value[key].items;
  editText.value = item[keyItem];
  editItem.value = item;
};

const onEdit = (keyItem: any) => {
  if (editText.value !== editItem.value[keyItem]) {
    editItem.value[keyItem] = editText.value;
    console.log("HAHA");
  }
};
const onAddRow = (position: number) => {
  const newRow = {
    items: {
      schedule: "0:00 - 0:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      pri: "",
      sat: "",
      Sun: "",
    },
  };
  dataTest.value.splice(position + 1, 0, newRow);
};
const onRemoveRow = (position: number) => {
  dataTest.value.splice(position, 1);
};
const onCancel = () => {
  emit("onCancel", props.timetable);
};
const onComplete = async () => {};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.create-timetable {
  .create-timetable-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: -1;
    }
    .form-create {
      // background-color: var(--bg-secondary);
      display: flex;
      justify-content: center;
      flex-direction: column;
      min-width: 80%;
      overflow-x: scroll;
      transform: translateY(-10px);
      padding: 2rem;

      table,
      th,
      td {
        border: 0.6px solid var(--border-color);
        border-collapse: collapse;
        padding: 0.4rem;
        position: relative;
        .table-row {
          position: relative;
          .row-add,
          .row-remove {
            position: absolute;
            font-size: 1.5rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            top: 0;
            display: none;
          }
          .row-remove {
            right: -70px;
          }
          .table-item:hover {
            .table-edit {
              display: flex;
            }
          }
          .table-edit {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: var(--bg-secondary);
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
            font-weight: 500;
            display: none;
          }
          .table-edit:hover {
            color: var(--primary-color);
          }
        }
        .table-row:hover {
          .row-add,
          .row-remove {
            display: inline;
            cursor: pointer;
          }
        }
      }

      table {
        td:first-child {
          p {
            font-weight: 600;
            color: var(--primary-color);
          }
        }
      }
      p {
        border: none;
        background-color: transparent;
        color: var(--text-color);
        width: 100px;
        font-size: 0.9rem;
        overflow: hidden;
      }
      input {
        border: none;
        outline: none;
      }
      table {
        th {
          color: var(--primary-color);
        }
      }


      .btn-group {
        margin-right: auto;
        button {
          margin-right: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .form-create {
    min-width: 90% !important;
  }
}
</style>
