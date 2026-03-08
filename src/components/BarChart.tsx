import {
  Bar,
  BarChart as BarCharRecharts,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import type { TrendingData } from "../types/Trend";

interface BarChartProps {
  data: TrendingData[];
}

const margin = {
  top: 0,
  right: 0,
  left: 10,
  bottom: 120,
};

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >{`${value}`}</text>
  );
};

export default function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarCharRecharts height={500} data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="repositoryName"
          interval={0}
          label={{
            position: "insideBottomRight",
            value: "Trending Repositories",
          }}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          label={{
            position: "insideTopLeft",
            value: "Score",
            angle: -90,
            dy: 60,
          }}
        />

        <Tooltip
          content={({ payload }) => {
            if (!payload?.length) return null;
            const { repositoryName, score } = payload[0].payload;
            return (
              <div className="tool-tip">
                <div className="font-semibold">
                  repositoryName:{repositoryName}
                </div>
                <div>Score: {score}</div>
              </div>
            );
          }}
        />
        <Bar dataKey="score" fill="#6366f1" label={renderCustomBarLabel} />
      </BarCharRecharts>
    </ResponsiveContainer>
  );
}
