<script setup lang="ts">
import lodashMerge from "lodash.merge";
import type { ChartData, ChartOptions, Plugin } from "chart.js";
import PChart from "primevue/chart";

interface IProps {
  class?: string;
  options?: ChartOptions<"doughnut">;
  plugins?: Plugin[];
  data: ChartData<"doughnut">;
}

const { options } = withDefaults(defineProps<IProps>(), {
  options: () => ({}),
  plugins: () => [],
  class: "",
});

const defaultChartOptions: ChartOptions<"doughnut"> = {
  layout: {
    padding: {
      left: 65,
      right: 65,
      top: 35,
      bottom: 40,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

const mergedWithDefaultsOptions = lodashMerge(options, defaultChartOptions);
</script>

<template>
  <PChart
    type="doughnut"
    :data="data"
    :options="mergedWithDefaultsOptions"
    :class="class"
    :plugins="plugins"
  />
</template>
