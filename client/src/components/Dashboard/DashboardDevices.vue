<template>
  <div class="chart-wrapper">
    <PolarArea id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { PolarArea } from "vue-chartjs";

import {
  Chart as ChartJS,
  RadialLinearScale,
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
  RadialLinearScale,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const store = useStore();
const dbData = computed(() => store.getters.getDbData);

const chartData = {
  labels: ["Servers", "Desktops", "Laptops", "Tablets", "Cellphones"],
  datasets: [
    {
      data: [
        dbData.value.servers,
        dbData.value.desktops,
        dbData.value.laptops,
        dbData.value.tablets,
        dbData.value.cellphones,
      ],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
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
      text: "Devices",
    },
    legend: {
      display: false, //This will do the task
    },
  },
};

// const handleClick = (ev) => {};
</script>
