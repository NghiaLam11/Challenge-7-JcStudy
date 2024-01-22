<template>
  <div class="chart" v-if="data.length !== 0">
    <LineChart v-bind="lineChartProps" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Chart, registerables } from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";
import { useUserStore } from "../../composable/useUser";
const userStore = useUserStore();
// import { useRouter } from "vue-router";
Chart.register(...registerables);
const data = computed(() => {
  return userStore.studyTime;
});
const date = new Date();
const fiveDaysAgo = new Date(
  date.setDate(date.getDate() - 5)
).toLocaleDateString();
// console.log(fiveDaysAgo);
const fourDaysAgo = new Date(
  date.setDate(date.getDate() + 1)
).toLocaleDateString();
// console.log(fourDaysAgo);
const threeDaysAgo = new Date(
  date.setDate(date.getDate() + 1)
).toLocaleDateString();
// console.log(threeDaysAgo);
const twoDaysAgo = new Date(
  date.setDate(date.getDate() + 1)
).toLocaleDateString();
// console.log(twoDaysAgo);
const oneDaysAgo = new Date(
  date.setDate(date.getDate() + 1)
).toLocaleDateString();
// console.log(oneDaysAgo);
const chartData = computed(() => ({
  labels: [fiveDaysAgo, fourDaysAgo, threeDaysAgo, twoDaysAgo, oneDaysAgo],
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
</script>

<style lang="scss">
.chart {
  padding: 1rem 2rem;
  margin: 2rem 0;
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .chart {
    padding: 0.5rem 1rem !important;
    margin: 1rem 0 !important;
  }
}

@media screen and (max-width: 534px) {
  .chart {
    padding: 0.1rem 0.3rem !important;
    margin: 0.5rem 0 !important;
    transform: translateX(-10px);
  }
}
</style>
