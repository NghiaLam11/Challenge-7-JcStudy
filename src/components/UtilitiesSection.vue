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
        <div class="utilities-item">
          <div class="item">
            <span class="text">Timetable</span>
            <i class="far fa-calendar-alt"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item">
          <div class="item">
            <span class="text">Task</span>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item">
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
          <div class="notes-list">
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
        </div>
        <div class="utilities-timetable">
          <h3>Timetable</h3>
          <div class="timetable-list">
            <div v-for="n in 6" :key="n" class="timetable-item">
              <h4 class="multiline-ellipsis-3">Lorem iplem litsto elit.</h4>
            </div>
          </div>
        </div>
        <div class="utilities-task">
          <h3>Task</h3>
          <div class="task-list">
            <div v-for="n in 6" :key="n" class="task-item">
              <div class="completed-task multiline-ellipsis-1">
                Completed <span>{{ n }}</span
                >/<span>10 tasks</span>
              </div>
              <h4 class="multiline-ellipsis-3">Lorem iplem litsto elit.</h4>

              <div class="task-group">
                <div v-for="num in 6" :key="num" class="task-check">
                  <input class="checkbox" type="checkbox" />
                  <label>Tasking to do {{ num }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="utilities-flashcard">
          <h3>Flashcard</h3>
          <div class="flashcard-list">
            <div v-for="n in 6" :key="n" class="flashcard-item">
              <h4 class="multiline-ellipsis-3">Lorem iplem litsto elit.</h4>
              <div class="count-card">
                <span>{{ n }} cards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateNoteSection
      v-if="isToggleCreateNote"
      :note="noteSelected"
      @on-cancel="onToggleCreateNote"
    />
    <!-- <CreateTaskSection /> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CreateNoteSection from "./UtilitiesSections/CreateNoteSection.vue";
import { useUserStore } from "../composable/useUser";
// import CreateTaskSection from "./UtilitiesSections/CreateTaskSection.vue";
const userStore = useUserStore();

const isToggleCreateNote = ref(false);
const noteSelected = ref();
const onToggleCreateNote = (n: any) => {
  isToggleCreateNote.value = !isToggleCreateNote.value;
  noteSelected.value = n;
  console.log(n);
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
                label {
                  cursor: pointer;
                  margin-left: 0.2rem;
                  font-size: 0.8rem;
                  font-weight: 500;
                }
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
