<template>
  <div class="course-search container">
    <div class="search">
      <form class="form-search">
        <input
          @input="onSearch"
          placeholder="Ex: Software"
          type="text"
          v-model="textSearch"
        />
        <button @click="onSearch">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div class="search-result" v-if="coursesSearch.length > 0">
        <h5>Results</h5>
        <div class="results">
          <div
            class="card-item"
            v-for="course in coursesSearch"
            :key="course?.id"
          >
            <div class="thumbnail">
              <img :src="course?.imgUrl" alt="" />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">{{ course?.title }}</h3>
              <p class="multiline-ellipsis-3">
                {{ course?.desc }}
              </p>

              <button @click="onToggleUnlock(course)">Unlock (Free) ...</button>
            </div>
          </div>
        </div>
      </div>
      <MoreDetailsForm
        v-if="isToggleUnlock"
        :course="courseSelected"
        @on-toggle-unlock="onToggleUnlock"
        @on-unlock="onUnlock"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MoreDetailsForm from "./MoreDetailsForm.vue";
import { useSound } from "../../../src/composable/useSound.ts";
import { useCoursesStore } from "../../composable/useCourses";
import { useUserStore } from "../../composable/useUser";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
import { Course } from "../../types/Course.ts";
const coursesStore = useCoursesStore();
const textSearch = ref();
const coursesSearch = ref<any>([]);
const onSearch = () => {
  if (textSearch.value.length > 0) {
    coursesSearch.value = coursesStore.coursesArray.filter((course: any) => {
      const tags = course.tags + " " + course.title + " " + course.industry;
      if (tags.toLowerCase().includes(textSearch.value.toLowerCase())) {
        return course;
      }
    });
  } else {
    coursesSearch.value = [];
  }
};
const soundStore = useSound();
const isToggleUnlock = ref(false);
const courseSelected = ref<any>();
const onToggleUnlock = (course: Course) => {
  isToggleUnlock.value = !isToggleUnlock.value;
  courseSelected.value = course;
  soundStore.playSound();
};
const userStore = useUserStore();
const onUnlock = () => {
  const idUser = localStorage.getItem("idUser");

  userStore.user.coursesUnlocked[courseSelected.value?.id] =
    courseSelected.value;
  // add to unlocked course array in database
  useUpdateUserStore({
    coursesUnlocked: userStore.user.coursesUnlocked,
  }, idUser);
  isToggleUnlock.value = !isToggleUnlock.value;
};
</script>

<style lang="scss" scoped>
.course-search {
  .search {
    margin: 0 0.5rem;
    margin-bottom: 2rem;
    .form-search {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      padding: 0.5rem;
      border-right: 0.5px solid var(--border-color);
      border-top: 1px solid var(--border-color);
      border-left: 2px solid var(--border-color);
      border-bottom: 5px solid var(--border-color);
      border-radius: 5px;
      input {
        width: 90%;
        max-width: 95%;
        background-color: transparent;
        outline: none;
        border: none;
        color: var(--text-color);
      }
      button {
        margin: 0;
        border: none;
        background-color: transparent;
        i {
          font-size: 1.05rem;
        }
      }
    }
    .search-result {
      h5 {
        margin-top: 1rem;
        margin-left: 1rem;
        font-size: 1.2rem;
      }
      .results {
        display: flex;
        flex-wrap: wrap;
        .card-item {
          width: 25%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .thumbnail {
            width: 100%;
            height: 100%;
            padding: 0.7rem;
            transition: all 0.9s ease;
            filter: grayscale(1);
            img {
              object-fit: cover;
              width: 100%;
              min-height: 180px;
              height: 100%;
              border-radius: 5px;
            }
          }
          .card-right {
            width: 100%;
            text-align: start;
            transition: all 0.35s ease;
            padding: 0 1rem;
            h3 {
              font-size: 1.3rem;
              line-height: 1.8rem;
              margin-bottom: 0.2rem;
            }
            p {
              font-size: 0.8rem;
              line-height: 1.2rem;
              opacity: 0.7;
            }

            .percent {
              font-size: 0.6rem;
              opacity: 0.7;
              margin-left: 2px;
            }
            progress {
              height: 10px;
              margin-bottom: 1.5px;
              outline: none;
              opacity: 0.7;
            }
          }
        }
        .card-item:hover .card-right {
          transform: translateY(-50%);
          padding-left: 1.5rem;
          border-radius: 5px;
        }
        .card-item:hover .thumbnail {
          filter: grayscale(0);
          transform: rotateY(360deg);
        }
      }
    }
  }
}
@media screen and (min-width: 734px) and (max-width: 889px) {
  .course-search {
    .search {
      .search-result {
        .results {
          .card-item {
            width: calc(100% / 3);
          }
        }
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .course-search {
    .search {
      .search-result {
        .results {
          .card-item {
            width: calc(100% / 2);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .course-search {
    .search {
      .search-result {
        .results {
          .card-item {
            flex-direction: row;
            width: calc(100% / 1);
            .card-right {
              padding-left: 0;
              padding-top: 1rem;
              button {
                font-size: 0.6rem !important;
              }
            }
          }
          .card-item:hover .card-right {
            transform: translateY(0);
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
../../types/Course.ts