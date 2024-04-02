import { useContext, useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  scaleLinear,
  descending,
  axisBottom,
  min,
  max,
} from "d3";

import { SelectionsContext } from "@/app/context/SelectionsContext";
import Defs from "./Defs";
import Bars from "./Bars";
import NoData from "./NoData";

export default function BarChart() {
  const { weather, selectedUnits, searchWeather } =
    useContext(SelectionsContext);

  weather.data.sort(function (a, b) {
    return descending(a.year, b.year);
  });

  const endRef = useRef();

  const width = 700;
  const height = 500;
  const marginTop = 100;
  const marginBottom = 50;
  const marginLeft = 25;
  const marginRight = 25;
  const chartBottomY = height - marginBottom;

  const widthTotal = (width * weather.data.length) / 6;
  const cssWidth = `w-${widthTotal}px`;

  const xScale = scaleBand()
    .domain(weather.data.map((d) => d.year))
    .range([marginLeft, widthTotal - marginRight])
    .padding(0.1);

  const xAxis = axisBottom(xScale).tickSizeOuter(0).tickSize(0).tickPadding(12);

  const yScale = scaleLinear()
    .domain([
      min(weather.data, (d) => d.temperature_2m_display - 36),
      max(weather.data, (d) => d.temperature_2m_display),
    ])
    .nice()
    .range([chartBottomY, marginTop]);

  searchWeather && endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .classed("text-lg text-white font-bold", true);
  }, [xAxis]);

  return (
    <div className="mt-4 mb-2 overflow-x-auto">
      <div className={`${cssWidth} h-[500px] mx-auto relative`}>
        <Defs />
        <svg
          width={widthTotal}
          height={height}
          className="block mx-auto bg-gradient-dark"
        >
          <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>

          {selectedUnits.Temperature.value && selectedUnits.Wind.value && (
            <>
              <Bars
                data={weather.data.filter((year) => year.index >= 0)}
                chartBottomY={chartBottomY}
                xScale={xScale}
                yScale={yScale}
              />
              <NoData
                data={weather.data.filter((year) => year.index < 0)}
                xScale={xScale}
                height={height}
              />
            </>
          )}
        </svg>
      </div>
      <div ref={endRef}></div>
    </div>
  );
}
