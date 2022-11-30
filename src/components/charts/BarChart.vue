<script setup lang="ts">
import lodashMerge from "lodash.merge";
import type { ChartData, ChartOptions } from "chart.js";
import PChart from "primevue/chart";
import { externalTooltipHandler } from "@/plugins/chart/tooltip";

interface IProps {
  class?: string;
  options?: ChartOptions<"bar">;
  data: ChartData<"bar">;
}

const { options } = withDefaults(defineProps<IProps>(), {
  options: () => ({}),
  class: "",
});

const defaultScale = {
  ticks: {
    padding: 16,
    font: {
      size: 12,
      weight: "600",
      lineHeight: "16px",
      family: "Proxima Nova",
    },
  },
  grid: {
    color: "#E0EDFC",
    borderColor: "#E0EDFC",
    offset: false,
  },
};
const defaultChartOptions: ChartOptions<"bar"> = {
  plugins: {
    tooltip: {
      enabled: false,
      external: externalTooltipHandler,
    },
  },
  onHover(event, elements) {
    const bar = event.native?.target as HTMLElement;
    if (elements.length === 1) {
      bar.style.cursor = "pointer";
    } else {
      bar.style.cursor = "default";
    }
  },
  color: "#2F353D",
  scales: {
    y: defaultScale,
    x: defaultScale,
  },
  layout: {
    padding: {
      top: 80,
      right: 35,
      bottom: 23,
      left: 40,
    },
  },
};
const mergedWithDefaultsOptions = lodashMerge(options, defaultChartOptions);
</script>

<template>
  <PChart
    type="bar"
    :data="data"
    :options="mergedWithDefaultsOptions"
    :class="class"
  />
</template>
