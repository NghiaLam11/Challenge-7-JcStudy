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
                style="display: none"
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
      <div class="lesson-right"></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
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
</script>

<style scoped lang="scss">
@import "../styles/variable";
.course-detail {
  .course-detail-wrapper {
    display: flex;
    height: calc(100vh - 79.25px);
    .lesson-right {
      width: 78%;
      height: 100%;
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
          }
        }
        .chapter-collapse {
          border-radius: 3px;
          margin: 0.5rem 0;
          box-shadow: -1px 3px 5px 1px rgba(0, 0, 0, 0.2);
          button {
            margin-top: 0;
            width: 100%;
            text-align: start;
            border: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem 1rem;
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
                color: $primary-color-hover !important;
              }
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
</style>
