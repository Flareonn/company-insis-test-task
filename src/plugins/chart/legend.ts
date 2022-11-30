import type { LegendPluginOptions } from "./legend.d";
import type {
  BubbleDataPoint,
  Chart,
  Plugin,
  ScatterDataPoint,
} from "chart.js";

const CLASS_PLUGIN_ITEM = "chart-legend";
const PLUGIN_ID = "htmlLegend";

const getOrCreateLegendContainer = (chart: Chart) => {
  let legendContainer = chart.canvas.parentNode?.querySelector(
    "." + CLASS_PLUGIN_ITEM
  );

  if (!legendContainer) {
    legendContainer = document.createElement("div");
    legendContainer.className = CLASS_PLUGIN_ITEM;

    chart.canvas.parentNode?.appendChild(legendContainer);
  }

  return legendContainer;
};

const createLegendTableHead = (totalData: number) => {
  const tHead = document.createElement("thead");
  const tRow = document.createElement("tr");

  const totalDataEl = document.createElement("th");
  totalDataEl.setAttribute("colspan", "3");
  totalDataEl.className = CLASS_PLUGIN_ITEM + "-total";
  totalDataEl.textContent = `Всего ${totalData}`;

  tRow.appendChild(totalDataEl);
  tHead.appendChild(tRow);
  return tHead;
};

const createLegendTableBody = (totalData: number, chart: Chart) => {
  const tBody = document.createElement("tbody");
  tBody.className = CLASS_PLUGIN_ITEM + "-list";

  // @ts-ignore
  // Встроенный метод от chart.js для генерации меток
  const labels = chart.options.plugins.legend.labels.generateLabels(chart);

  const createBoxSpan = (
    background: string,
    borderColor: string,
    borderWidth: string
  ) => {
    const boxSpan = document.createElement("span");
    boxSpan.style.background = background;
    boxSpan.style.borderColor = borderColor;
    boxSpan.style.borderWidth = borderWidth;
    boxSpan.style.display = "inline-block";
    boxSpan.style.height = "15px";
    boxSpan.style.width = "15px";
    boxSpan.style.marginRight = "10px";
    return boxSpan;
  };
  // @ts-ignore
  // Получение ключа-парсера для парсинга модели
  const parsingKey = chart.options.plugins[PLUGIN_ID]?.parsing
    ?.key as keyof ScatterDataPoint;

  labels.forEach((item) => {
    const tr = document.createElement("tr");
    tr.style.color = item.fontColor as string;
    tr.style.textDecoration = item.hidden ? "line-through" : "";

    tr.onclick = () => {
      // @ts-ignore
      const { type } = chart.config;
      if (type === "pie" || type === "doughnut") {
        // Pie and doughnut charts only have a single dataset and visibility is per item
        chart.toggleDataVisibility(item.index as number);
      } else {
        chart.setDatasetVisibility(
          item.datasetIndex as number,
          !chart.isDatasetVisible(item.datasetIndex as number)
        );
      }
      chart.update();
    };

    // Текст метки
    const text = document.createElement("span");
    text.textContent = item.text;
    const boxSpan = createBoxSpan(
      `${item.fillStyle}`,
      `${item.strokeStyle}`,
      `${item.lineWidth}`
    );

    const label = document.createElement("td");
    label.append(boxSpan, text);

    if (item.index !== undefined) {
      const dataItem = chart.data.datasets[0].data[item.index];
      const normalizedDataItem =
        typeof dataItem === "number"
          ? dataItem
          : dataItem
          ? dataItem[parsingKey]
          : 0;

      const dataByLabelEl = document.createElement("td");
      dataByLabelEl.textContent = `${normalizedDataItem}`;

      const percentDataByLabelEl = document.createElement("td");
      percentDataByLabelEl.textContent = totalData
        ? `${((normalizedDataItem / totalData) * 100).toFixed(0)}%`
        : "0%";
      tr.append(label, percentDataByLabelEl, dataByLabelEl);
    }

    tBody.appendChild(tr);
  });

  return tBody;
};

export default {
  id: PLUGIN_ID,
  afterUpdate(chart, mode, pluginOptions: LegendPluginOptions) {
    const container = getOrCreateLegendContainer(chart);
    // Очистка предыдущего результата
    container.innerHTML = "";

    const parsingKey = pluginOptions.parsing?.key || "y";
    // Сумма всех чисел меток
    const totalData = chart.data.datasets.reduce((totalData, dataset) => {
      return (
        totalData +
        dataset.data.reduce(
          (
            sum: number,
            data: number | ScatterDataPoint | BubbleDataPoint | null
          ) => {
            if (data === null) return sum;

            return typeof data === "number"
              ? sum + data
              : sum + data[parsingKey as keyof ScatterDataPoint];
          },
          0
        )
      );
    }, 0);

    const table = document.createElement("table");
    table.append(
      createLegendTableHead(totalData),
      createLegendTableBody(totalData, chart)
    );

    container.appendChild(table);
  },
} as Plugin;
