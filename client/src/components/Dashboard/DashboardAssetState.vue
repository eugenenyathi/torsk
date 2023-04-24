<template>
  <div class="chart-wrapper">
    <Doughnut id="my-chart-id-4" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const store = useStore();
const dbData = computed(() => store.getters.getDbData);

const chartData = {
  labels: ["Faulty", "Decommissioned"],
  datasets: [
    {
      data: [dbData.value.faulty, dbData.value.decommissioned],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
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
      text: "Malfunctioning",
    },
    legend: {
      display: false, //This will do the task
    },
  },
};
</script>
