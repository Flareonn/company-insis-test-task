<script setup lang="ts">
import type { IChart } from "@/components/charts/Chart";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import BarChart from "@/components/charts/BarChart.vue";
import { RouterLink } from "vue-router";
import { onMounted, computed } from "vue";
import { routesDivisions } from "@/plugins/router";
import useStoreDivisions from "@/store/divisions";
import htmlLegend from "@/plugins/chart/legend";

const storeDivisions = useStoreDivisions();

const divisionsStats = [
  {
    text: "ФМС",
    type: "0",
  },
  {
    text: "ГУВД или МВД",
    type: "1",
  },
  {
    text: "УВД или ОВД",
    type: "2",
  },
  {
    text: "Отделений полиции",
    type: "3",
  },
];

const barChartOptions: IChart<"bar"> = {
  data: {
    labels: routesDivisions.map((route) => route.name),
    datasets: [
      {
        data: storeDivisions.getDivisionsCount,
        barThickness: 24,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          tickLength: 25.5,
        },
      },
      x: {
        grid: {
          drawTicks: false,
          offset: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  class: "chart chart-bar",
};
const doughnutChartOptions: IChart<"doughnut"> = {
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 35,
  },
  plugins: [htmlLegend],
  class: "chart chart-doughnut",
};

const chartData = computed(() => ({
  labels: routesDivisions.map((route) => route.name),
  datasets: [
    {
      data: storeDivisions.getDivisionsCount,
      backgroundColor: ["#92CC6D", "#70B4E3", "#5264FF", "#FF5A45"],
    },
  ],
}));

onMounted(async () => await storeDivisions.fetchAll());
</script>

<template>
  <div class="home-page">
    <div class="summary">
      <h2 class="summary__title">Общие данные</h2>
      <ul class="summary-list">
        <li
          class="summary-list__item"
          v-for="(item, idx) in divisionsStats"
          :key="item.type"
        >
          <div>
            <h3>{{ storeDivisions.getDivisionsCount[idx] || 0 }}</h3>
            <span>{{ item.text }}</span>
          </div>
          <router-link :to="routesDivisions[idx].path">
            <i class="pi pi-arrow-right" />
            <span>Перейти</span>
          </router-link>
        </li>
      </ul>
    </div>
    <bar-chart v-bind="barChartOptions" :data="chartData" />
    <doughnut-chart v-bind="doughnutChartOptions" :data="chartData" />
  </div>
</template>

<style lang="less">
.summary {
  padding: 33px 45px 36px;
  background-color: @g-secondary;

  color: @g-secondary900;
  &__title {
    margin-bottom: 11px;
  }
  &-list {
    display: flex;
    justify-content: space-between;
    gap: 90px;
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      max-width: 240px;

      h3 {
        .heading();
        margin-bottom: 4px;
      }
      span {
        .label();
        color: @g-secondary900;
        display: block;
      }
      > a {
        display: flex;
        align-items: center;

        margin-top: 1em;

        .label();
        text-decoration: none;
        i {
          color: @g-primary-active;
          margin-right: 1em;
        }
      }
    }
  }
}
.chart-bar {
  height: 430px;
}
.chart-doughnut {
  height: 365px;
}
</style>
