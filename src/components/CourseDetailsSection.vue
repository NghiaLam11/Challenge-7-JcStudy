<template>
  <section class="course-detail">
    <div class="container course-detail-wrapper">
      <div class="lesson-left">
        <div>
          <div class="course-text">
            <h3 class="title multiline-ellipsis-1">
              Lorem dielsius akinsai olse
            </h3>
            <p class="multiline-ellipsis-1">
              Lorem isep djukse iudu olsedi kohiri delore!
            </p>
            <div class="lesson-progress">
              <progress class="accent-color" value="32" max="100"></progress>
              <span class="percent">32%</span>
            </div>
          </div>

          <hr />
          <div class="course-lesson">
            <div class="overview">
              <button>Overview</button>
            </div>
            <div v-for="num in 3" class="chapter-collapse">
              <button @click="onToggleCollapse(num)">
                <span>Chapter {{ num }}</span>
                <i
                  ref="collapseIconElementUp"
                  class="fas fa-angle-up icon-up"
                ></i>
                <i ref="collapseIconElementDown" class="fas fa-angle-down"></i>
              </button>
              <ul
                class="lesson-list"
                ref="collapseListElement"
                :style="num === 1 ? 'display:block' : 'display: none'"
              >
                <li class="lesson-item">
                  <router-link class="lesson-link" to="/"
                    ><span>What's it? {{ num }}</span>
                    <i class="far fa-play-circle"></i
                  ></router-link>
                </li>
                <li class="lesson-item">
                  <router-link class="lesson-link" to="/"
                    ><span>What's that?</span> <i class="far fa-play-circle"></i
                  ></router-link>
                </li>
                <li class="lesson-item">
                  <router-link class="lesson-link" to="/"
                    ><span>What's it? {{ num }}</span>
                    <i class="far fa-play-circle"></i
                  ></router-link>
                </li>
                <li class="lesson-item">
                  <router-link class="lesson-link" to="/"
                    ><span>What's that?</span> <i class="far fa-play-circle"></i
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
            <video controls>
              <source src="../videos/video-1645947165.mp4" type="video/mp4" />
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
              Overview ipsum dolor sit amet consectetur adipisicing elit.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              sequi, distinctio cupiditate repudiandae dolor corporis possimus
              doloribus hic iusto. Soluta rerum vero eius error earum fugit fuga
              ad saepe perspiciatis.
            </p>
            <div class="course-related">
              <CoursesRelatedSection />
            </div>
          </div>
          <div style="display: none" id="quiz" class="tabcontent lesson-detail">
            <div class="quiz">
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
            </div>
          </div>
          <div
            style="display: none"
            id="comments"
            class="tabcontent lesson-detail"
          >
            <form class="form-comment">
              <input placeholder="Write your comment..." type="text" />
              <button><i class="fas fa-paper-plane"></i></button>
            </form>
            <div class="comment-group">
              <div class="comment-item">
                <div class="comment-top">
                  <div class="comment-auth">
                    <h4>JcLahi</h4>
                  </div>
                  <span class="comment-time">10/11/2003</span>
                </div>

                <div class="comment-text">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Animi excepturi neque voluptatibus eaque nostrum eveniet
                    ipsa doloribus.
                  </p>
                </div>
                <div class="comment-react">
                  <div><i class="fa-solid fa-heart"></i><span>1</span></div>
                  <span>Reply</span>
                </div>
                <div class="comment-reply">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import CoursesRelatedSection from "../components/ChildSections/CoursesRelatedSection.vue";

const isToggleCollapse = ref(false);
const collapseIconElementDown = ref();
const collapseIconElementUp = ref();
const collapseListElement = ref();
const onToggleCollapse = (num: number) => {
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
onMounted(() => {
  let isMobile = window.matchMedia("screen and (max-width: 768px)").matches;

  if (isMobile) {
    collapseListElement.value[0].style.display = "none";
  }
});
</script>

<style scoped lang="scss">
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
      border-right: 2px solid;
      padding: 0 1rem;
      .course-text {
        padding: 0.5rem 0;
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
                color: inherit !important;
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
              .lesson-link:visited {
                color: #38e54d;
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
  }
}
</style>
