<template>
  <div class="create-task">
    <div class="create-task-container">
      <div class="blur"></div>
      <div class="form-create">
        <input
          type="text"
          v-model="title"
          placeholder="Title..."
          class="title"
        />
        <div class="tasks">
          <div class="task-list">
            <div
              class="task-item"
              v-for="(task, key) in tasks['uncompleted']"
              :key="key"
            >
              <div>
                <input
                  type="checkbox"
                  :checked="task.isDone"
                  @change="onChecked(task, key)"
                />
                <p class="task-text uncompleted">{{ task.name }}</p>
              </div>
              <span class="remove" @click="onRemove('uncompleted', key)"
                >&#128465;</span
              >
            </div>
            <div
              class="task-item"
              v-for="(task, key) in tasks['completed']"
              :key="key"
            >
              <div>
                <input
                  type="checkbox"
                  :checked="task.isDone"
                  @change="onChecked(task, key)"
                />
                <p class="task-text completed">{{ task.name }}</p>
              </div>
              <span class="remove" @click="onRemove('completed', key)"
                >&#128465;</span
              >
            </div>
          </div>
          <form @submit.prevent="onAddNewTask" class="add-task">
            <input
              type="text"
              placeholder="New task..."
              v-model="nameTask"
            /><button type="submit">Add</button>
          </form>
        </div>
        <div class="btn-group">
          <button @click="onComplete">Complete</button>
          <button @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { useUserStore } from "../../composable/useUser";
import { Task } from "../../types/Utilities";
const emit = defineEmits(["onCancel"]);
const props = defineProps<{ task: any }>();
const userStore = useUserStore();
const title = ref(props.task.title || "");
const tasks = ref(props.task.tasks || { uncompleted: {}, completed: {} });
const onRemove = (status: any, id: any) => {
  delete tasks.value[status][id];
  console.log(tasks.value);
};
const onChecked = (task: any, id: any) => {
  console.log(task);
  if (task.isDone === true) {
    tasks.value["uncompleted"][id] = {
      ...task,
      isDone: false,
    };
    delete tasks.value["completed"][id];
  } else if (task.isDone === false) {
    tasks.value["completed"][id] = {
      ...task,
      isDone: true,
    };
    delete tasks.value["uncompleted"][id];
  }
};
const nameTask = ref();
const onAddNewTask = () => {
  console.log(nameTask.value);
  const id = new Date().getTime().toString() + Math.random() * 10;
  const newTask = ref({
    name: nameTask.value,
    isDone: false,
  });
  tasks.value["uncompleted"][id] = newTask.value;
  nameTask.value = "";
};
const onCancel = () => {
  emit("onCancel", props.task);
};

const onComplete = async () => {
  const idUser = localStorage.getItem("idUser");
  if (props.task === "") {
    console.log("CREATE");
    const data = ref<Task>({
      title: title.value,
      tasks: tasks.value,
      idUser: idUser,
      createdAt: new Date().toLocaleDateString("en-US"),
      id: new Date().getTime().toString() + Math.random() * 10,
    });
    userStore.user.tasks[data.value.id] = data.value;
    useUpdateUserStore({ tasks: userStore.user.tasks }, idUser);
  } else {
    console.log("UPDATE");
    const data = ref<Task>({
      title: title.value,
      tasks: tasks.value,
      idUser: idUser,
      createdAt: props.task.createdAt,
      id: props.task.id,
    });
    userStore.user.tasks[data.value.id] = data.value;
    useUpdateUserStore({ tasks: userStore.user.tasks }, idUser);
  }
  emit("onCancel", props.task);
};
</script>

<style lang="scss" scoped>
.create-task {
  .create-task-container {
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
      background-color: var(--bg-secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 70%;
      transform: translateY(-10px);
      padding: 2rem;
      .tasks {
        width: 100%;
        min-height: 50vh;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        margin-bottom: 0.8rem;
        border: 1px solid;
        position: relative;
        .task-list {
          .task-item {
            display: flex;
            align-items: center;
            .task-text {
              margin-left: 0.3rem;
              display: inline-block;
              transform: translateY(-1.5px);
              font-size: 0.9rem;
            }
            .task-text.completed {
              text-decoration: line-through;
              opacity: 0.6;
            }
            .task-text.uncompleted {
              font-weight: 500;
            }
            .remove {
              margin-left: auto;
              font-size: 1.2rem;
            }
          }
        }

        .add-task {
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgb(255, 255, 255, 0.1);

          border: 1px solid;

          input {
            width: 100%;
            outline: none;
            border: none;
            color: inherit;
            background: transparent;
            padding-left: 0.4rem;
            border-top: 1px solid;
            font-size: 0.8rem;
          }
          button {
            border: 0 !important;
            margin: 0 !important;
            padding: 0.5rem 1rem;
            background-color: var(--primary-color);
          }
        }
      }
      .title {
        width: 100%;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        margin-bottom: 0.8rem;
        border: 1px solid;
        border-radius: 3px;
        border-bottom: 0.3rem solid;
        font-size: 0.9rem;
        outline: none;
        transition: border 0.35s ease;
      }
      .title:focus {
        border-bottom: 1px solid;
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
    min-width: 95% !important;
  }
}
</style>
