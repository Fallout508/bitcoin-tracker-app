
import { useEffect, useMemo } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AssetHistory } from "@/lib/api";

interface PriceChartProps {
  data: AssetHistory[];
}

export const PriceChart = ({ data }: PriceChartProps) => {
  const chartData = useMemo(() => {
    return data.map((point) => ({
      date: new Date(point.time).toLocaleDateString(),
      price: parseFloat(point.priceUsd),
    }));
  }, [data]);

  return (
    <div className="h-[400px] w-full neo-card p-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="date" 
            stroke="#E5E7EB"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#E5E7EB"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2A2F3C",
              border: "2px solid #3A3F4C",
              borderRadius: "8px",
              color: "#E5E7EB",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#FF5733"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
