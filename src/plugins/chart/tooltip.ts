import type { Chart, ChartTypeRegistry, TooltipModel } from "chart.js";

const CLASS_PLUGIN_ITEM = "chart-tooltip";

const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector(
    "." + CLASS_PLUGIN_ITEM
  ) as HTMLDivElement;

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.classList.add(CLASS_PLUGIN_ITEM);
    tooltipEl.style.opacity = "1";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";

    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = <TType extends keyof ChartTypeRegistry>({
  chart,
  tooltip,
}: {
  chart: Chart;
  tooltip: TooltipModel<TType>;
}) => {
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  if (tooltip.body) {
    // Очистка тултипа от прошлых данных
    tooltipEl.innerHTML = "";
    // Получение загаоловка и тела тултипа
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    // Создание контейнера
    const container = document.createElement("div");
    container.classList.add(CLASS_PLUGIN_ITEM + "-container");

    // Создание заголовка
    const title = document.createElement("span");
    title.textContent = titleLines.toString() + ":";

    // Создание тела
    const count = document.createElement("b");
    count.textContent = bodyLines.toString();

    // Вставка в контейнер
    container.append(title, " ", count);

    tooltipEl.appendChild(container);
  }

  tooltipEl.style.opacity = "1";
  // Позиционирование тултипа
  tooltipEl.style.left = chart.canvas.offsetLeft + tooltip.caretX + "px";
  tooltipEl.style.top =
    chart.canvas.offsetTop + tooltip.caretY - tooltip.height + "px";
};
