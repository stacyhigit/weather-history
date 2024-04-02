export default function NoData({ data, xScale, height }) {
  return (
    <g>
      {data.map((d) => {
        const x = xScale(d.year) + xScale.bandwidth() / 2 - 2;
        return (
          <g key={d.year}>
            <text
              x={x}
              y={height / 2}
              textAnchor="middle"
              className="text-sm fill-white font-semibold"
            >
              <tspan x={x} dy="1.2em">
                NO DATA
              </tspan>
              <tspan x={x} dy="1.2em">
                AVAILABLE
              </tspan>
            </text>
          </g>
        );
      })}
    </g>
  );
}
