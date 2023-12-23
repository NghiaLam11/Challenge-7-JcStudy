<template>
  <div class="auth">
    <div class="container auth-container">
      <div class="auth-top">
        <div class="auth-edit" @click="onOpenFormEdit">
          <i class="fas fa-hammer"></i>
        </div>

        <div class="auth-text">
          <h4>Jcstudy-er</h4>
          <p>This is my bio!</p>
        </div>
        <div class="auth-avatar">
          <img src="../images/peep-54.png" alt="" />
        </div>
      </div>
      <CoursesRegisterSection />
      <CreateBlogSection />
      <div class="auth-bottom">
        <div class="statistic">
          <div class="statistic-group">
            <span class="topic">Streak:</span>
            <span class="number"> 3</span>
          </div>
          <div class="statistic-group">
            <span class="topic">Courses(unclock):</span>
            <span class="number"> 5</span>
          </div>
          <div class="statistic-group">
            <span class="topic">Courses(completed):</span>
            <span class="number"> 1</span>
          </div>
        </div>
        <div class="chart"><LineChart v-bind="lineChartProps" /></div>
        <div class="courses-unclock"><CoursesUnlock /></div>
      </div>
      <div class="btn-signout">
        <button type="button" @click="onSignout">Sign out</button>
      </div>
    </div>
    <EditProfileSection @onOpen="onCloseFormEdit" v-show="isToggleFormEdit" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useSignoutAuth } from "../composable/useFirebaseAuth";
import CoursesUnlock from "./ChildSections/CoursesUnlock.vue";
import EditProfileSection from "./AuthChildSections/EditProfileSection.vue";
import CoursesRegisterSection from "./AuthChildSections/CoursesRegisterSection.vue";
import CreateBlogSection from "./AuthChildSections/BlogsRegisterSection.vue";

import { Chart, registerables } from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";
import { useRouter } from "vue-router";
Chart.register(...registerables);

const data = ref([30, 40, 30, 70, 5]);

const chartData = computed(() => ({
  labels: [
    "12/04/2023",
    "12/05/2023",
    "12/06/2023",
    "12/07/2023",
    "12/08/2023",
  ],
  datasets: [
    {
      label: "Time (minutes)",
      data: data.value,
      backgroundColor: ["#77CEFF", "#77CEFF", "#77CEFF", "#77CEFF", "#77CEFF"],
      borderColor: "#1f2937",
    },
  ],
}));
const options = computed(() => ({
  responsive: true,
}));
const { lineChartProps } = useLineChart({
  chartData,
  options,
});
const isToggleFormEdit = ref(false);
const onCloseFormEdit = () => {
  isToggleFormEdit.value = !isToggleFormEdit.value;
};
const onOpenFormEdit = () => {
  isToggleFormEdit.value = !isToggleFormEdit.value;
};
const router = useRouter();
const onSignout = () => {
  useSignoutAuth();
  setTimeout(() => {
    router.push("/signin");
  }, 500);
};
</script>
<style lang="scss" scoped>
.auth {
  padding: 2rem;
  .auth-container {
    .btn-signout {
      text-align: center;
    }
    .auth-top {
      display: flex;
      align-items: center;
      padding: 5rem 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
      position: relative;
      .auth-edit {
        position: absolute;
        top: 30px;
        right: 35px;
        transform: scaleX(-1);
        font-size: 1.2rem;
        opacity: 0.3;
      }
      .auth-edit:hover {
        opacity: 1;
        cursor: pointer;
        animation: shakeHammer 2s ease;
      }
      @keyframes shakeHammer {
        0% {
          rotate: 0deg;
        }
        30% {
          rotate: 40deg;
        }
        60% {
          rotate: -20deg;
        }
        100% {
          rotate: 0deg;
        }
      }
      .auth-text {
        width: 50%;
        text-align: center;
        h4 {
          font-size: 1.5rem;
          letter-spacing: 1px;
        }
        p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
      .auth-avatar {
        width: 50%;

        img {
          transform: scaleX(-1);
          width: 250px;
          height: 250px;
          max-width: 250px;
          max-height: 250px;
          object-fit: cover;
          margin: 0 auto;
          padding: 1rem;
          border-radius: 50%;
          // border: 0.1px solid;
          //   border-top: 4px solid;
          //   border-left: 2px solid;

          box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
        }
      }
    }
    .auth-bottom {
      margin: 3rem 0;
      padding: 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
      .statistic {
        padding-top: 1rem;
        display: flex;
        margin-left: 2rem;
        .statistic-group {
          padding: 0.5rem 1rem;
          span {
            font-weight: 500;
            letter-spacing: 0.3px;
          }
          .number {
            font-weight: 700;
          }
        }
        .statistic-group:first-child {
          span {
            color: var(--primary-color);
          }
        }
      }
      .chart {
        padding: 1rem 2rem;
        margin: 2rem 0;
      }
      .courses-unclock {
        padding: 1.1rem;
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .auth-top {
    padding: 3rem 1rem !important;
    .auth-text {
      h4 {
        font-size: 1.2rem !important;
      }
      p {
        font-size: 0.7rem !important;
      }
    }
    .auth-avatar {
      img {
        width: 150px !important;
        height: 150px !important;
      }
    }
  }
  .statistic {
    padding: 0.5rem !important;
    margin-left: 0 !important;
    .statistic-group {
      padding: 0.3rem 0.5rem !important;
      span {
        font-size: 0.8rem !important;
      }
    }
  }
  .chart {
    padding: 0.5rem 1rem !important;
    margin: 1rem 0 !important;
  }
  .courses-unclock {
    padding: 0.5rem !important;
  }
}
@media screen and (max-width: 534px) {
  .auth {
    padding: 1rem !important;
  }
  .auth-top {
    padding: 3rem 1rem !important;
    border-radius: 10px !important;
    .auth-edit {
      font-size: 0.9rem !important;
      top: 10px !important;
      right: 14px !important;
    }
    .auth-text {
      h4 {
        font-size: 1rem !important;
      }
      p {
        font-size: 0.6rem !important;
      }
    }
    .auth-avatar {
      img {
        width: 100px !important;
        height: 100px !important;
      }
    }
  }
  .auth-bottom {
    border-radius: 10px !important;
    margin-top: 1rem !important;
    padding: 0.5rem !important;
  }
  .statistic {
    padding: 0.3rem !important;
    margin-left: 0 !important;
    flex-direction: column !important;
    .statistic-group {
      padding: 0rem 0.2rem !important;
      span {
        font-size: 0.8rem !important;
      }
    }
  }
  .chart {
    padding: 0.1rem 0.3rem !important;
    margin: 0.5rem 0 !important;
    transform: translateX(-10px);
  }
  .courses-unclock {
    padding: 0rem !important;
  }
  .regis-moderate {
    margin: 1rem 0 !important;
    padding: 0.5rem !important;
    border-radius: 10px !important;
  }
  .btn-regis {
    padding: 1rem !important;
    margin-top: 1rem !important;
    p {
      font-size: 0.7rem !important;
    }
    .plus {
      margin-left: 0.5rem !important;
    }
  }
}
</style>
