<template>
  <div class="censorship">
    <div class="container">
      <div class="censorship-moderate">
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Courses Moderation</div>
            <Carousel
              :items-to-show="2"
              :snap-align="'start'"
              :breakpoints="breakpoints"
            >
              <Slide v-for="(course, key) in courseUnapproved" :key="key">
                <div class="card-item">
                  <div class="remove" @click="onToggleRemove(course)">
                    &#128465;
                  </div>
                  <div class="thumbnail">
                    <img :src="course.imgUrl" alt="" />
                  </div>
                  <div class="card-right bg-primary">
                    <div>
                      <h3 class="multiline-ellipsis-1">
                        {{ course.title }}
                      </h3>
                      <p class="multiline-ellipsis-4">
                        {{ course.desc }}
                      </p>
                    </div>
                    <div class="btn-group">
                      <button @click="onApprove(course)">Approve</button>
                      <span @click="onMoreDetails(course)">
                        More details...
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
            <ConfirmRemoveSection
              v-if="isToggleRemove"
              :course="courseSelected"
              @on-toggle-remove="onToggleRemove"
              @on-remove="onRemove"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import ConfirmRemoveSection from "./ConfirmRemoveSection.vue";
import { useCoursesStore } from "../../composable/useCourses";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useRouter } from "vue-router";
import { Course } from "../../types/Course";
import {
  useDeleteCourseStore,
  useUpdateCourseStore,
  useUpdateUserStore,
} from "../../composable/useFirebaseStore";
import { useUserStore } from "../../composable/useUser";
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
const onApprove = (course: any) => {
  console.log(course);
  const data = ref({
    isApproved: true,
  });
  useUpdateCourseStore(data.value, course.id);
};
const router = useRouter();
const coursesStore = useCoursesStore();
const courseUnapproved = computed(() => {
  return coursesStore.unApprovedCourses;
});
const onMoreDetails = (course: Course) => {
  router.push(`/courses/${course.id}/0/overview`);
};

const isToggleRemove = ref(false);
const courseSelected = ref<any>();
const onToggleRemove = (course: Course) => {
  isToggleRemove.value = !isToggleRemove.value;
  courseSelected.value = course;
  console.log(course);
};
const userStore = useUserStore();
const onRemove = (notificationText: any, course: any) => {
  if (confirm("Are you sure!") == true) {
    const key = new Date().getTime() + Math.random() * 10;
    userStore.users[course.idUser].notifications[key] = {
      notificationText: notificationText,
      courseTitle: course.title,
      isApproved: false,
      createAt: new Date().toLocaleDateString("en-US"),
      isRead: false,
    };
    useUpdateUserStore(
      {
        notifications: userStore.users[course.idUser].notifications,
      },
      course.idUser
    );
    useDeleteCourseStore(course.id);
  } else {
    return "";
  }
};
</script>
<style lang="scss" scoped>
.censorship {
  .btn-censorship {
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
  .btn-censorship:hover {
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
  .censorship-moderate {
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
        width: 100%;
        height: 100%;
        position: relative;
        .remove {
          position: absolute;
          top: 10px;
          left: 15px;
          z-index: 10;
          font-size: 1.3rem;
        }
        .remove:hover {
          color: red;
        }
        .thumbnail {
          width: 40%;
          height: 100%;
          padding: 0.5rem;
          transition: all 0.35s ease;
          filter: grayscale(1);
          img {
            object-fit: cover;
            width: 100%;
            height: 150px;
            border-radius: 5px;
          }
        }
        .card-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 60%;
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
          .btn-group {
            display: flex;
            align-items: center;
            button {
              font-size: 0.7rem !important;
              margin-top: 0 !important;
            }
            span {
              margin-left: 0.5rem;
              font-size: 0.8rem;
              opacity: 0.6;
            }
            span:hover {
              color: var(--primary-color);
              opacity: 1 !important;
            }
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
</style>
../../types/Course
