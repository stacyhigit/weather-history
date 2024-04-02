import { SelectionsContext } from "@/app/context/SelectionsContext";
import { useContext } from "react";

export default function Tooltip({ tooltipPosition: [tx, ty], data, display }) {
  const { selectedUnits } = useContext(SelectionsContext);

  const width = 128;
  const widthClass = `w-[${width}px]`; //w-[128px]

  return (
    <foreignObject
      width={width}
      height={1}
      x={tx - width / 2}
      y={ty - 150}
      overflow="visible"
      className={`${display} pointer-events-none select-none z-50`}
    >
      <div
        className={`${widthClass} animate-slidein opacity-0 absolute block box-border text-xs p-3 rounded-md border-2 border-gray-300 bg-white cursor-pointer pointer-events-none`}
      >
        <div className="mb-1.5 pb-1 font-semibold uppercase border-b-2 border-gray-300">
          {data.description}
        </div>
        <div className="flex mt-0.5">
          <span>Feels like</span>
          <span className=" ml-auto">
            {Number(Math.round(data.apparent_temperature_display))}°
          </span>
        </div>
        <div className="flex mt-0.5">
          <span>Wind</span>
          <span className=" ml-auto">
            {Number(Math.round(data.wind_speed_10m_display))}{" "}
            {selectedUnits.Wind.tooltip}
          </span>
        </div>
        <div className="flex mt-0.5">
          <span>Humidity</span>
          <span className=" ml-auto">{data.relative_humidity_2m}%</span>
        </div>
        <div className="flex mt-0.5">
          <span>Dew Point</span>
          <span className=" ml-auto">
            {Number(Math.round(data.dew_point_2m_display))}°
          </span>
        </div>
      </div>
    </foreignObject>
  );
}
