<template>
  <div class="registration">
    <div class="container">
      <div class="btn-regis">
        <router-link to="/create-course">
          <p class="plus">+</p>
          <p>Register your course!</p>
        </router-link>
      </div>
      <div
        class="regis-moderate"
        v-if="Object.keys(coursesStore.coursesRegister).length > 0"
      >
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Courses Moderation</div>
            <Carousel :breakpoints="breakpoints">
              <Slide
                v-for="(course, key) in coursesStore.coursesRegister"
                :key="key"
              >
                <div class="card-item">
                  
                  <div class="thumbnail">
                    <img :src="course.imgUrl" :alt="course.title" />
                  </div>
                  <div class="card-right bg-primary">
                    <h3 class="multiline-ellipsis-1">
                      {{ course.title }}
                    </h3>
                    <p class="multiline-ellipsis-4">
                      {{ course.desc }}
                    </p>
                    <div class="checking">
                      <b
                        ><span v-if="course.isApproved === false"
                          >Censoring...</span
                        ><span v-else>Approved</span></b
                      >
                      <span @click="onToggleUnlock(course)">
                        | <u><small>More details...</small></u>
                      </span>
                    </div>
                  </div>
                </div>
              </Slide>

              <template #addons>
                <Navigation />
                <Pagination />
              </template>
            </Carousel>
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
<script lang="ts" setup>
import { ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import MoreDetailsForm from "../ChildSections/MoreDetailsForm.vue";
import { useCoursesStore } from "../../composable/useCourses";
import { Course } from "../../types/types";
import { useSound } from "../../composable/useSound";
const coursesStore = useCoursesStore();
const soundStore = useSound();
const isToggleUnlock = ref(false);
const courseSelected = ref<any>();
const onToggleUnlock = (course: Course) => {
  isToggleUnlock.value = !isToggleUnlock.value;
  courseSelected.value = course;
  soundStore.playSound();
};
const onUnlock = () => {
  alert("Sorry, you are not allowed to unlock it because it's your course!");
};
// breakpoint of slide vue-carousel
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  768: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
</script>
<style lang="scss" scoped>
.registration {
  .btn-regis {
    margin-top: 3rem;
    padding: 2rem 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 50px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      p {
        font-size: 1.1rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      .plus {
        margin-left: 2rem;
        margin-right: 1rem;
        transform: scale(1.5);
        font-weight: 400;
        transition: all 0.2s ease;
      }
    }
  }
  .btn-regis:hover {
    cursor: pointer;
    color: var(--primary-color);

    .plus {
      transform: scale(2);
      font-weight: 200;
    }
    p:last-child {
      transform: translateX(10px);
      font-weight: 500;
    }
  }
  .regis-moderate {
    margin: 3rem 0;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 40px;
    .topic {
      margin: 0.7rem 1rem;
    }

    .courses {
      margin-bottom: 0.5rem;
      margin-top: 0;
      .topic {
        margin-left: 1rem;
        font-weight: 500;
      }
      .card-item {
        display: flex;
        cursor: pointer;
        .thumbnail {
          width: 50%;
          height: 100%;
          padding: 0.5rem;
          transition: all 0.35s ease;
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
          width: 50%;
          text-align: start;
          transition: all 0.35s ease;
          padding: 1rem;
          padding-left: 0.2rem;
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
          .checking {
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--primary-color);
          }
        }
      }
      .card-item:hover .card-right {
        transform: translateX(-1rem);
        padding-left: 1rem;
        border-radius: 5px;
      }
      .card-item:hover .thumbnail {
        filter: grayscale(0);
      }
    }
  }
}
@media screen and (max-width: 738px) {
  .btn-regis {
    margin-top: 1rem !important;

    padding: 0.5rem !important;
    a {
      p {
        font-size: 0.8rem !important;
      }
    }
  }
}
@media screen and (max-width: 538px) {
  .card-item {
    flex-direction: column;
    .thumbnail,
    .card-right {
      width: 100% !important;
    }
  }
  .regis-moderate {
    margin: 1rem 0 !important;
  }
}
</style>
../../types/Course