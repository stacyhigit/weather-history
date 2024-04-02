import { useState } from "react";
import { pointer as d3pointer } from "d3";

import Tooltip from "./Tooltip";

export default function Bars({ data, chartBottomY, xScale, yScale }) {
  const [tooltipPosition, setTooltipPosition] = useState([0, 0]);
  const [tooltipData, setTooltipData] = useState({});
  const [tooltipDisplay, setTooltipDisplay] = useState("hidden");

  return (
    <>
      <g className="pointer-events-none">
        {data.map((d) => {
          return (
            <rect
              key={d.year}
              x={xScale(d.year)}
              y={yScale(d.temperature_2m_display)}
              height={chartBottomY - yScale(d.temperature_2m_display)}
              width={xScale.bandwidth()}
              fill={`url(#barGradient)`}
              rx={2}
              ry={2}
            />
          );
        })}
      </g>
      <g className="pointer-events-none">
        {data.map((d) => (
          <g key={d.year}>
            <text
              x={xScale(d.year) + xScale.bandwidth() / 2 + 1.5}
              y={yScale(d.temperature_2m_display) + 40}
              textAnchor="middle"
              className="text-2xl fill-black font-bold"
            >
              {Number(Math.round(d.temperature_2m_display))}°
            </text>
            <text
              x={xScale(d.year) + xScale.bandwidth() / 2}
              y={yScale(d.temperature_2m_display) + 39}
              textAnchor="middle"
              className="text-2xl fill-white font-bold"
            >
              {Number(Math.round(d.temperature_2m_display))}°
            </text>
          </g>
        ))}
      </g>
      <g className="pointer-events-none">
        {data.map((d) => {
          const width = 100;
          const offset = (width - xScale.bandwidth()) / 2;
          return (
            <image
              key={d.year}
              href={`/assets/${d.image}`}
              width={width}
              x={xScale(d.year) - offset}
              y={yScale(d.temperature_2m_display) - 100}
            ></image>
          );
        })}
      </g>
      <g className="select-none">
        {data.map((d) => {
          return (
            <rect
              key={d.year}
              x={xScale(d.year)}
              y={yScale(d.temperature_2m_display) - 100}
              height={chartBottomY - yScale(d.temperature_2m_display) + 100}
              width={xScale.bandwidth()}
              fill="rgba(0, 0, 0, 0)"
              onTouchStart={(event) => {
                event.preventDefault();
              }}
              onPointerEnter={(event) => {
                event.preventDefault();
                setTooltipData(d);
                setTooltipDisplay("block");
                setTooltipPosition(d3pointer(event));
              }}
              onPointerMove={(event) => setTooltipPosition(d3pointer(event))}
              onPointerOut={() => {
                setTooltipDisplay("hidden");
                setTooltipData({});
              }}
            />
          );
        })}
      </g>
      <Tooltip
        tooltipPosition={tooltipPosition}
        data={tooltipData}
        display={tooltipDisplay}
      />
    </>
  );
}
