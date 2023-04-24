<template>
  <div class="chart-wrapper">
    <Pie id="my-chart-id-3" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { Pie } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const store = useStore();
const dbData = computed(() => store.getters.getDbData);

const chartData = {
  labels: ["routers", "switches", "converters"],
  datasets: [
    {
      data: [
        dbData.value.routers,
        dbData.value.switches,
        dbData.value.converters,
      ],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Networking Devices",
    },
    legend: {
      display: false, //This will do the task
    },
  },
};
</script>
