<template>
  <div class="auth">
    <div class="container auth-container">
      <div class="auth-top">
        <div class="auth-text">
          <h4>Jcstudy-er</h4>
          <p>This is my bio!</p>
        </div>
        <div class="auth-avatar">
          <img src="../images/peep-54.png" alt="" />
        </div>
      </div>
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
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";
Chart.register(...registerables);

const data = ref([30, 40, 60, 70, 5]);

const chartData = computed(() => ({
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      label: "HAAH",
      data: data.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
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
</script>
<style lang="scss">
.auth {
  padding: 2rem;
  .auth-container {
    .auth-top {
      display: flex;
      align-items: center;
      padding: 5rem 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
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
      margin: 5rem 0;
      padding: 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
      .statistic {
        padding-top: 2rem;
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
    }
  }
}
</style>
