import type { Chart, Plugin, ChartOptions, ChartData } from "chart.js";

interface IChart<TType> extends Partial<Chart> {
  class?: string;
  options?: ChartOptions<TType>;
  plugins?: Plugin[];
  data?: ChartData<TType>;
}
