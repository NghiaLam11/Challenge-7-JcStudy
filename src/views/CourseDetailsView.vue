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
            <div class="chapter-collapse">
              <button>
                <span>Chapter 1</span>
                <i class="fas fa-angle-down"></i>
              </button>
              <ul class="lesson-list">
                <li class="lesson-item">
                  <router-link to="/">What's it?</router-link>
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
<script setup lang="ts"></script>

<style scoped lang="scss">
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
      padding-right: 1.5rem;
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
      }

      button {
        width: 100%;
        text-align: start;
        border: 1px solid !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
