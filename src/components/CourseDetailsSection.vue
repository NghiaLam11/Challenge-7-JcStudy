<template>
  <section class="course-detail">
    <div class="container course-detail-wrapper">
      <div class="lesson-left">
        <div>
          <div class="course-text">
            <h3 class="title multiline-ellipsis-1">
              {{ course?.title }}
            </h3>
            <p class="multiline-ellipsis-1">
              {{ course?.desc }}
            </p>
          </div>

          <hr />
          <div class="course-lesson">
            <div class="overview">
              <button>
                <router-link active-class="active" to="overview"
                  >Overview</router-link
                >
              </button>
            </div>
            <div
              v-for="(chapter, key) in course?.chapters"
              :key="key"
              class="chapter-collapse"
            >
              <button @click="onToggleCollapse(Number(key) + 1)">
                <span>Chapter {{ Number(key) + 1 }}</span>
                <i
                  ref="collapseIconElementUp"
                  class="fas fa-angle-up icon-up"
                ></i>
                <i ref="collapseIconElementDown" class="fas fa-angle-down"></i>
              </button>
              <ul
                class="lesson-list"
                ref="collapseListElement"
                :style="
                  Number(key) + 1 == 1 ? 'display:block' : 'display: none'
                "
              >
                <li class="lesson-item" v-for="(lesson, index) in chapter">
                  <router-link
                    class="lesson-link"
                    active-class="active"
                    :to="`/courses/${course?.id}/${Number(key) + 1}/${index}`"
                    ><span class="multiline-ellipsis-1">{{
                      lesson.title
                    }}</span>
                    <i class="far fa-play-circle"></i
                  ></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="lesson-right">
        <div>
          <div class="band">
            <video ref="videoElement" controls :poster="lessonSelected?.imgUrl">
              <source
                ref="sourceElement"
                :src="lessonSelected?.videoUrl"
                type="video/mp4"
              />
            </video>
          </div>
          <div class="lesson-category tab">
            <button
              class="tablinks bg-primary active"
              @click="openCategory($event, 'overview')"
            >
              Overview
            </button>
            <button
              class="tablinks bg-primary"
              @click="openCategory($event, 'comments')"
            >
              Comments
            </button>
            <button
              class="tablinks bg-primary"
              @click="openCategory($event, 'quiz')"
            >
              Quiz
            </button>
          </div>
          <div class="lesson-detail tabcontent" id="overview">
            <h3 class="detail-title">
              {{ lessonSelected?.title }}
            </h3>
            <p>
              {{ lessonSelected?.desc }}
            </p>
            <div class="course-related">
              <CoursesRelatedSection
                :courses-related="coursesRelated"
                v-if="coursesRelated.length > 0"
              />
            </div>
          </div>
          <div style="display: none" id="quiz" class="tabcontent lesson-detail">
            <h4>Coming soon!</h4>
            <!-- <div class="quiz">
              <h3 class="detail-title">
                Quiz ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
              <div v-for="q in 5" :key="q" class="question">
                <h4 class="question-title">
                  {{ q }}.Which game do you playing?
                </h4>
                <div class="question-answer">
                  <div class="answer" v-for="n in 4" :key="n">
                    <input type="radio" name="answer" /><span
                      >Answer {{ n }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="question-submit"><button>Submit</button></div>
            </div> -->
          </div>
          <div
            style="display: none"
            id="comments"
            class="tabcontent lesson-detail"
          >
            <form @submit.prevent="onComment" class="form-comment">
              <input
                v-model="comment"
                placeholder="Write your comment..."
                type="text"
              />
              <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
            <div class="comment-group">
              <div
                class="comment-item"
                v-for="(comment, key) in lessonSelected?.comments"
                :key="key"
              >
                <div class="comment-top">
                  <div class="comment-auth">
                    <h4>{{ comment?.auth }}</h4>
                  </div>
                  <span class="comment-time">{{ comment?.createdAt }}</span>
                </div>

                <div class="comment-text">
                  <p>
                    {{ comment?.comment }}
                  </p>
                </div>
                <div class="comment-react">
                  <div>
                    <i class="fa-solid fa-heart" @click="onReaction(key)"></i
                    ><span>{{ comment?.reaction }}</span>
                  </div>
                  <!-- <span>Reply</span> -->
                </div>
                <!-- <div class="comment-reply">
                  <div class="comment-item">
                    <div class="comment-top">
                      <div class="comment-auth">
                        <h4>JcLahi</h4>
                      </div>
                      <span class="comment-time">10/11/2003</span>
                    </div>

                    <div class="comment-text">
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Animi excepturi neque voluptatibus eaque nostrum
                        eveniet ipsa doloribus.
                      </p>
                    </div>
                    <div class="comment-react">
                      <div><i class="fa-solid fa-heart"></i><span>1</span></div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import CoursesRelatedSection from "../components/ChildSections/CoursesRelatedSection.vue";
import { useRoute } from "vue-router";
import { useCoursesStore } from "../composable/useCourses";
import {
  useGetImageUrlStorage,
  useGetVideoUrlStorage,
} from "../composable/useFirebaseStorage";
import { useUserStore } from "../composable/useUser";
import { useUpdateCourseStore } from "../composable/useFirebaseStore";
import { Comment } from "../types/Course";
const isToggleCollapse = ref(false);
const collapseIconElementDown = ref();
const collapseIconElementUp = ref();
const collapseListElement = ref();
// OPEN CHAPTER'S LESSONS
const onToggleCollapse = (num: number) => {
  console.log(num);
  isToggleCollapse.value = !isToggleCollapse.value;
  if (collapseListElement.value[num - 1].style.display === "none") {
    collapseListElement.value[num - 1].style.display = "block";
    collapseIconElementUp.value[num - 1].style.display = "inline-block";
    collapseIconElementDown.value[num - 1].style.display = "none";
    console.log("open");
  } else {
    collapseListElement.value[num - 1].style.display = "none";
    collapseIconElementUp.value[num - 1].style.display = "none";
    collapseIconElementDown.value[num - 1].style.display = "inline-block";
    console.log("close");
  }
};
// OPEN TAB( RIGHT TAB DETAILS )
function openCategory(evt: any, tabName: string) {
  var i, tablinks;
  const tabcontent: any = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  const tab: any = document.getElementById(tabName);
  tab.style.display = "block";
  evt.currentTarget.className += " active";
}
const coursesStore = useCoursesStore();
const route: any = useRoute();

const course = computed(() => {
  return coursesStore.courses[route.params.idCourse];
});
const userStore = useUserStore();
const comment = ref();
const lessonSelected = ref();
const onReaction = (key: any) => {
  const chapters = coursesStore.courses[route.params.idCourse].chapters;

  chapters[Number(route.params.idChapter) - 1][route.params.idLesson].comments[
    key
  ].reaction++;

  // chapters[Number(route.params.idChapter) - 1][route.params.idLesson]
  //   .reaction++;
  useUpdateCourseStore(
    {
      chapters: chapters,
    },
    route.params.idCourse
  );
};
const onComment = () => {
  const data = ref<Comment>({
    createdAt: new Date().toLocaleDateString("en-US"),
    auth: userStore.user.name,
    reaction: 0,
    comment: comment.value,
    id: new Date().getTime() + userStore.user.name,
  });
  if (route.params.idLesson === "overview") {
    lessonSelected.value.comments[data.value.id] = data.value;
    useUpdateCourseStore(
      {
        comments: lessonSelected.value.comments,
      },
      route.params.idCourse
    );
  } else if (course) {
    const chapters = coursesStore.courses[route.params.idCourse].chapters;
    chapters[Number(route.params.idChapter) - 1][
      route.params.idLesson
    ].comments[data.value.id] = data.value;
    useUpdateCourseStore(
      {
        chapters: chapters,
      },
      route.params.idCourse
    );
  }
  comment.value = "";
};
const coursesRelated = ref<any>([]);
const videoElement = ref();
const sourceElement = ref();
const getLesson = async (course: any) => {
  console.log(course);
  if (route.params.idLesson === "overview") {
    lessonSelected.value = course;
    console.log("Overview");
  } else if (course) {
    console.log("Unoverview");
    const idChapter = Number(route.params.idChapter) - 1;
    // FETCH URL VIDEO THUMBNAIL
    const videoUrl = await useGetVideoUrlStorage(
      `videos-${course.idUser}/${
        course.chapters[idChapter][route.params.idLesson].videoName
      }`
    );
    const imgUrl = await useGetImageUrlStorage(
      `images-${course.idUser}/${
        course.chapters[idChapter][route.params.idLesson].imageName
      }`
    );
    sourceElement.value.src = videoUrl;
    lessonSelected.value = {
      ...course.chapters[idChapter][route.params.idLesson],
      videoUrl: videoUrl,
      imgUrl,
    };
  }
  coursesRelated.value = coursesStore.coursesArray.filter(
    (courseRelated: any) => {
      const industry = courseRelated.industry;
      console.log(industry);
      if (industry.toLowerCase().includes(course?.industry.toLowerCase())) {
        return courseRelated;
      }
    }
  );
  console.log(coursesRelated.value, "courses related");
  videoElement.value.load();
};
// FETCH URL WHEN COURSE CHANGE

watch(coursesStore, async (newCourse) => {
  await getLesson(newCourse.courses[route.params.idCourse]);
});
// FETCH URL WHEN ROUTE CHANGE
watch(
  () => route.fullPath,
  () => {
    getLesson(coursesStore.courses[route.params.idCourse]);
  }
);

onMounted(() => {
  // WHEN URL WHEN FIRST ACCESS
  getLesson(coursesStore.courses[route.params.idCourse]);

  let isMobile = window.matchMedia("screen and (max-width: 768px)").matches;

  if (isMobile) {
    collapseListElement.value[0].style.display = "none";
  }
});
</script>

<style scoped lang="scss">
a {
  color: inherit;
  text-decoration: none;
}
.course-detail {
  .course-detail-wrapper {
    display: flex;
    height: calc(110vh);
    .lesson-right {
      width: 78%;
      height: 100%;
      padding: 1rem;
      overflow-y: scroll;
      .band {
        video {
          width: 100%;
          max-height: 450px;
          background-color: black;
        }
      }
      /* Style the tab content */
      .tabcontent {
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-top: none;
      }
      #quiz {
        .question {
          margin: 1rem 0;
          .question-title {
            letter-spacing: 0.03rem;
          }
          .question-answer {
            margin-top: 0.5rem;
            margin-left: 1rem;
            .answer {
              padding: 0.1rem;
              display: flex;
              align-items: center;
              font-weight: 400;
              span {
                letter-spacing: 0.04rem;
                font-size: 0.9rem;
                margin-left: 0.3rem;
                font-weight: 500;
              }
            }
          }
        }
        .question-submit {
          display: flex;
          justify-content: center;
          button {
            border-left: 1px solid;
            width: 100px;
            padding: 0.5rem;
          }
        }
      }
      #comments {
        .form-comment {
          border: 1px solid;
          border-left: 1px solid;
          border-bottom: 3px solid;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0.6rem 0.2rem;
          margin-top: 1rem;
          border-radius: 5px;
          input {
            background-color: transparent;
            border: none;
            outline: none;
            width: 90%;
            color: inherit;
            padding-left: 0.5rem;
            font-size: 0.8rem;
          }
          button {
            margin: 0;
            background-color: transparent;
            border: none;
            i {
              font-size: 1rem;
            }
          }
        }
        .comment-group {
          .comment-item {
            background-color: var(--bg-secondary);
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
            .comment-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .comment-time {
                font-size: 0.6rem;
                opacity: 0.8;
              }
            }
            .comment-text {
              margin: 0.3rem 0;
              padding: 1rem;
              border-radius: 5px;
              border: 1px solid;
              p {
                font-size: 0.8rem;
              }
            }
            .comment-react {
              margin-left: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              div {
                display: flex;
                align-items: center;
              }
              i {
                color: red;
                margin-right: 0.2rem;
              }
              span {
                font-size: 0.8rem;
                font-weight: bold;
                margin-right: 0.4rem;
                opacity: 0.7;
              }
              span:hover {
                opacity: 1;
                cursor: pointer;
              }
            }
            .comment-reply {
              margin-left: 1rem;
              .comment-item {
                background-color: var(--bg-reply);
                padding: 0.5rem 1rem;
              }
            }
          }
        }
      }
      .lesson-category {
        margin-top: 1rem;
        button {
          border: none;
          background-color: transparent;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          font-weight: bold;
          width: 150px;
          padding: 0.5rem 0;
        }
        .active {
          transform: scaleY(1.1) !important;
          border: 2px solid var(--primary-color);
          border-bottom: 0;
          text-transform: uppercase;
        }
      }
      .lesson-detail {
        border: none;
        border-top: 2px solid;
        margin-left: 0.2rem;
        padding: 0.5rem;
        h3 {
          font-size: 1.5rem;
          letter-spacing: 0.05rem;
        }
        p {
          opacity: 0.8;
          line-height: 1.3rem;
          font-size: 0.9rem;
        }
      }
    }
    .lesson-left {
      width: 22%;
      height: 100%;
      overflow-y: scroll;
      border-right: 0.5px solid;
      padding: 0 1rem;
      hr {
        margin: 1rem 0;
      }
      .course-text {
        padding: 0.5rem 0;
        margin-top: 1rem;
        h3 {
          letter-spacing: 0.05rem;
          font-size: 1.5rem;
        }
        p {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        .lesson-progress {
          margin-left: 0.2rem;
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
      .course-lesson {
        padding: 0.5rem 0;
        margin-top: 1rem;

        .overview {
          button {
            width: 100%;
            text-align: start;
            border: none;
            padding: 0.4rem 1rem;
            box-shadow: -1px 2px 5px 1px rgba(0, 0, 0, 0.2);
            border-left: 3px solid;
            font-weight: bold;
          }
        }
        .chapter-collapse {
          border-radius: 3px;
          margin: 0.5rem 0;
          box-shadow: -1px 3px 5px 1px rgba(0, 0, 0, 0.2);
          border-left: 3px solid;
          button {
            margin-top: 0;
            width: 100%;
            text-align: start;
            border: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem 1rem;
            font-weight: bold;
            i {
              opacity: 0.6;
            }
            .icon-up {
              display: none;
              opacity: 1;
            }
          }
          .lesson-list {
            padding-left: 0;
            padding: 0.5rem;
            border-top: none;
            list-style: none;
            animation: fadeIn 0.3s ease-in-out forwards;
            .lesson-item {
              padding: 0.1rem;
              border-bottom: 1px solid;
              margin: 0.5rem 0;

              .lesson-link {
                text-decoration: none;
                font-size: 0.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                opacity: 0.8;
                transition: all 0.2s ease;
                font-family: monospace;

                i {
                  margin-right: 0.3rem;
                }
              }
            }
            .lesson-item:hover {
              .lesson-link {
                opacity: 1;
                color: var(--primary-color) !important;
              }
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scaleY(0) translateY(-100%);
            }
            to {
              opacity: 1;
              transform: scaleY(1) translateY(0%);
            }
          }
        }
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .course-detail {
    .course-detail-wrapper {
      flex-direction: column;
      .lesson-left,
      .lesson-right {
        width: 100%;
      }
      .lesson-left {
        overflow-y: unset;
        height: unset;
        border: none;
        .course-lesson {
          display: flex;
          .overview {
            width: 25%;
            margin: 0 0.2rem;
            button {
              margin-top: 0;
            }
          }
          .chapter-collapse {
            height: 100%;
            width: 25%;
            margin: 0 0.2rem;
            position: relative;
            .lesson-list {
              position: absolute;
              z-index: 3;
              left: -2px;
              right: 0;
              background-color: var(--bg-secondary);
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .course-lesson {
    flex-wrap: wrap;
    gap: 0.2rem;
    .overview {
      width: calc(50% - 0.5rem) !important;
    }
    .chapter-collapse {
      width: calc(50% - 0.5rem) !important;
    }
  }
  .lesson-right,
  .lesson-left {
    padding: 0.5rem !important;
  }
  .lesson-right {
    .lesson-category {
      display: flex;
    }
    .lesson-detail {
      h3 {
        font-size: 1rem !important;
      }
      p {
        font-size: 0.8rem !important;
      }
    }
  }
}
</style>
