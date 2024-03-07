<template>
  <div class="utilities">
    <div class="utilities-container container">
      <div class="utilities-list">
        <div class="utilities-item" @click="onToggleCreateNote('')">
          <div class="item">
            <span class="text">Notes</span>
            <i class="fa-solid fa-clipboard"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item" @click="onToggleCreateTimetable('')">
          <div class="item">
            <span class="text">Timetable</span>
            <i class="far fa-calendar-alt"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item" @click="onToggleCreateTask('')">
          <div class="item">
            <span class="text">Task</span>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item" @click="onToggleCreateFlashcard('')">
          <div class="item">
            <span class="text">Flashcard</span>
            <i class="fas fa-dice-d6"></i>
          </div>
          <span>+</span>
        </div>
      </div>
      <div class="utilities-group">
        <div class="utilities-notes">
          <h3>Notes</h3>
          <div
            v-if="Object.keys(userStore.user?.notes).length > 0"
            class="notes-list"
          >
            <div
              v-for="note in userStore.user?.notes"
              :key="note.id"
              class="notes-item"
              @click="onToggleCreateNote(note)"
            >
              <h4 class="multiline-ellipsis-3">{{ note.title }}</h4>
              <p class="multiline-ellipsis-10">
                {{ note.text }}
              </p>
            </div>
          </div>
          <div v-else>
            <i
              ><sup><small>No items!</small></sup>
            </i>
          </div>
        </div>
        <div class="utilities-timetable">
          <h3>Timetables</h3>
          <div
            v-if="Object.keys(userStore.user?.timetables).length > 0"
            class="timetable-list"
          >
            <div
              v-for="(timetable, key) in userStore.user.timetables"
              :key="key"
              class="timetable-item"
              @click="onToggleCreateTimetable(timetable)"
            >
              <h4 class="multiline-ellipsis-3">{{ timetable.title }}</h4>
            </div>
          </div>
          <div v-else>
            <i
              ><sup><small>No items!</small></sup>
            </i>
          </div>
        </div>
        <div class="utilities-task">
          <h3>Task</h3>
          <div
            v-if="Object.keys(userStore.user?.tasks).length > 0"
            class="task-list"
          >
            <div
              v-show="Object.keys(userStore.user.tasks).length > 0"
              v-for="(task, key) in userStore.user.tasks"
              :key="key"
              class="task-item"
              @click="onToggleCreateTask(task)"
            >
              <div class="completed-task multiline-ellipsis-1">
                Completed
                <span>{{ Object.keys(task.tasks["completed"]).length }}</span
                >/<span>{{
                  Object.keys(task.tasks["uncompleted"]).length +
                  Object.keys(task.tasks["completed"]).length
                }}</span>
              </div>
              <h4 class="multiline-ellipsis-3">{{ task.title }}</h4>

              <div class="task-group"></div>
              <div
                v-for="(taskChild, keyChild) in task.tasks['uncompleted']"
                :key="keyChild"
                class="task-check"
              >
                <input
                  class="checkbox"
                  type="checkbox"
                  :checked="taskChild.isDone"
                />
                <label>{{ taskChild.name }}</label>
              </div>
              <div
                v-for="(taskChild, keyChild) in task.tasks['completed']"
                :key="keyChild"
                class="task-check"
              >
                <input
                  class="checkbox"
                  type="checkbox"
                  :checked="taskChild.isDone"
                />
                <label class="completed">{{ taskChild.name }}</label>
              </div>
            </div>
          </div>
          <div v-else>
            <i
              ><sup><small>No items!</small></sup>
            </i>
          </div>
        </div>
        <div class="utilities-flashcard">
          <h3>Flashcards</h3>
          <div
            class="flashcard-list"
            v-if="Object.keys(userStore.user?.flashcards).length > 0"
          >
            <div
              v-for="(flashcard, key) in userStore.user.flashcards"
              :key="key"
              class="flashcard-item"
              @click="onToggleCreateFlashcard(flashcard)"
            >
              <h4 class="multiline-ellipsis-3">{{ flashcard.title }}</h4>
              <div class="count-card">
                <span>{{ Object.keys(flashcard?.cards).length }} cards</span>
              </div>
            </div>
          </div>
          <div v-else>
            <i
              ><sup><small>No items!</small></sup>
            </i>
          </div>
        </div>
      </div>
    </div>
    <CreateNoteSection
      v-if="isToggleCreateNote"
      :note="noteSelected"
      @on-cancel="onToggleCreateNote"
    />
    <CreateTaskSection
      v-if="isToggleCreateTask"
      :task="taskSelected"
      @on-cancel="onToggleCreateTask"
    />
    <CreateTimetableSection
      v-if="isToggleCreateTimetable"
      :timetable="timetableSelected"
      @on-cancel="onToggleCreateTimetable"
    />
    <CreateFlashcardSection
      v-if="isToggleCreateFlashcard"
      :flashcard="flashcardSelected"
      @on-cancel="onToggleCreateFlashcard"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CreateFlashcardSection from "./UtilitiesSections/CreateFlashcardSection.vue";
import CreateNoteSection from "./UtilitiesSections/CreateNoteSection.vue";
import CreateTimetableSection from "./UtilitiesSections/CreateTimetableSection.vue";
import { useUserStore } from "../composable/useUser";
import CreateTaskSection from "./UtilitiesSections/CreateTaskSection.vue";
const userStore = useUserStore();

const isToggleCreateFlashcard = ref(false);
const flashcardSelected = ref();
const onToggleCreateFlashcard = (flashcard: any) => {
  isToggleCreateFlashcard.value = !isToggleCreateFlashcard.value;
  flashcardSelected.value = flashcard;
  console.log(flashcard);
};

const isToggleCreateTimetable = ref(false);
const timetableSelected = ref();
const onToggleCreateTimetable = (timetable: any) => {
  isToggleCreateTimetable.value = !isToggleCreateTimetable.value;
  timetableSelected.value = timetable;
  console.log(timetable);
};

const isToggleCreateNote = ref(false);
const noteSelected = ref();
const onToggleCreateNote = (note: any) => {
  isToggleCreateNote.value = !isToggleCreateNote.value;
  noteSelected.value = note;
  console.log(note);
};

const isToggleCreateTask = ref(false);
const taskSelected = ref();
const onToggleCreateTask = (task: any) => {
  isToggleCreateTask.value = !isToggleCreateTask.value;
  taskSelected.value = task;
  console.log(task);
};
</script>

<style scoped lang="scss">
.utilities {
  min-height: 100vh;
  padding-top: 3rem;
  padding: 1rem;
  .utilities-container {
    .utilities-list {
      display: flex;
      gap: 1rem;
      .utilities-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% / 4);
        border-radius: 5px;
        padding: 1.5rem 2.5rem;
        background-image: linear-gradient(
          to bottom right,
          var(--utility-color-first) 15%,
          var(--utility-color-second)
        );
        transition: all 0.3s linear;
        overflow: hidden;
        div.item {
          display: flex;
          align-items: center;
          span,
          i {
            font-size: 1.1rem;
            font-weight: 600;
          }
          i {
            margin: 0 0.2rem;
          }
        }
        span:not(.text) {
          transform: translateY(150%);
          font-weight: 300;
          font-size: 2rem;
          scale: 1.2;
          transition: all 0.25s ease-in-out;
        }
      }
      .utilities-item:hover {
        transform: scale(1.02) translateY(-3px);
        cursor: pointer;
        span {
          transform: translateY(0);
        }
      }
    }
    .utilities-group {
      margin: 1rem 0;
      min-height: 100vh;
      .utilities-notes {
        h3 {
          margin-bottom: 0.5rem;
        }
        .notes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .notes-item {
            width: calc(100% / 6 - 1rem);
            border: 1px solid;
            padding: 1rem;
            border-radius: 7px;
            box-shadow: -1px 2px 7px 1px rgba(0, 0, 0, 0.1);
            height: 100%;
            transition: all 0.25s ease;
            h4 {
              font-size: 1.1rem;
              line-height: 1.5rem;
              letter-spacing: 1px;
              margin-top: 0.5rem;
              margin-bottom: 0.7rem;
            }
            p {
              font-size: 0.8rem;
              line-height: 1.1rem;
            }
          }
          .notes-item:hover {
            border: 1px solid var(--primary-color);
            cursor: pointer;
            transform: translateY(-3px);

            h4 {
              color: var(--primary-color);
            }
          }
        }
      }

      .utilities-timetable {
        h3 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .timetable-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          .timetable-item {
            height: 100%;
            padding: 1rem;
            border: 1px solid;
            border-radius: 7px;
            width: calc(100% / 5 - 1rem);
            transition: all 0.25s ease;
            h4 {
              letter-spacing: 0.75px;
              transition: all 0.25s ease;
            }
          }
          .timetable-item:hover {
            border: 1px solid var(--primary-color);
            cursor: pointer;
            h4 {
              color: var(--primary-color);
            }
          }
        }
      }

      .utilities-task {
        h3 {
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        .task-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .task-item {
            width: calc(100% / 6 - 1rem);
            border: 1px solid;
            padding: 1rem;
            border-radius: 7px;
            box-shadow: -1px 2px 7px 1px rgba(0, 0, 0, 0.1);
            height: 100%;
            max-height: 400px;
            transition: all 0.25s ease;

            h4 {
              font-size: 1.1rem;
              line-height: 1.5rem;
              letter-spacing: 1px;
              margin-top: 0.5rem;
              margin-bottom: 0.7rem;
            }
            .completed-task {
              font-size: 0.7rem;
              font-weight: 500;
              color: var(--primary-color);
            }
            .task-group {
              .task-check {
                display: flex;
                align-items: center;
                padding: 0.3rem 0.2rem;
                .checkbox {
                  accent-color: var(--accent-color);
                }
              }
            }
          }
          .task-item:hover {
            border: 1px solid var(--primary-color);
            cursor: pointer;
            transform: translateY(-3px);
            h4 {
              color: var(--primary-color);
            }
          }
        }
      }

      .utilities-flashcard {
        h3 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .flashcard-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          .count-card {
            font-size: 0.8rem;
            font-weight: 500;
          }
          .flashcard-item {
            height: 100%;
            padding: 1rem;
            border: 1px solid;
            border-radius: 7px;
            width: calc(100% / 5 - 1rem);
            transition: all 0.25s ease;
            h4 {
              letter-spacing: 0.75px;
              transition: all 0.25s ease;
            }
          }
          .flashcard-item:hover {
            border: 1px solid var(--primary-color);
            cursor: pointer;
            h4 {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 734px) and (max-width: 1020px) {
  .utilities {
    padding: 1rem;
  }
  .utilities-notes,
  .utilities-task,
  .utilities-flashcard,
  .utilities-timetable {
    padding: 0.5rem;
  }
  .notes-list,
  .flashcard-list,
  .timetable-list,
  .task-list {
    overflow-x: scroll !important;
    flex-wrap: nowrap !important;
    padding: 0.5rem 0;
  }
  .utilities-list {
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .utilities-item {
    min-width: calc(100% / 2 - 0.5rem) !important;
    padding: 0.5rem 1.5rem !important;
  }
  .utilities-item {
    min-width: calc(100% / 3);
    margin-bottom: 0.5rem;
  }
  .flashcard-item,
  .timetable-item {
    min-width: calc(100% / 3);
    margin-bottom: 0.5rem;
  }

  .notes-item,
  .task-item {
    min-width: calc(100% / 4);
    margin-bottom: 0.5rem;
  }
}

@media screen and (min-width: 534px) and (max-width: 734px) {
  .utilities {
    padding: 1rem;
  }
  .utilities-notes,
  .utilities-task,
  .utilities-flashcard,
  .utilities-timetable {
    padding: 0.5rem;
  }
  .notes-list,
  .flashcard-list,
  .timetable-list,
  .task-list {
    overflow-x: scroll !important;
    flex-wrap: nowrap !important;
    padding: 0.5rem 0;
  }
  .utilities-list {
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .utilities-item {
    min-width: calc(100% / 2 - 0.5rem) !important;
    padding: 0.5rem 1.5rem !important;
  }
  .flashcard-item,
  .timetable-item {
    min-width: calc(100% / 2);
    margin-bottom: 0.5rem;
  }

  .notes-item,
  .task-item {
    min-width: calc(100% / 3);
    margin-bottom: 0.5rem;
  }
}

@media screen and (max-width: 534px) {
  .utilities {
    padding-top: 1rem !important;
  }
  .utilities-notes,
  .utilities-task,
  .utilities-flashcard,
  .utilities-timetable {
    padding: 0.5rem;
  }
  .notes-list,
  .flashcard-list,
  .timetable-list,
  .task-list {
    overflow-x: scroll !important;
    flex-wrap: nowrap !important;
    padding: 0.5rem 0;
  }
  .utilities-list {
    padding: 0.5rem;
    flex-wrap: wrap;
  }

  .utilities-item {
    min-width: calc(100% / 2 - 0.5rem) !important;
    padding: 0.8rem 0.5rem !important;
    span,
    i {
      font-size: 0.7rem !important;
    }
  }
  .flashcard-item,
  .timetable-item {
    min-width: calc(100% / 1);
    margin-bottom: 0.5rem;
  }

  .notes-item,
  .task-item {
    min-width: calc(100% / 1.5);
    margin-bottom: 0.5rem;
  }
}
@media screen and (max-width: 738px) {
  .utilities {
    padding: 0.5rem !important;
  }
}
</style>
