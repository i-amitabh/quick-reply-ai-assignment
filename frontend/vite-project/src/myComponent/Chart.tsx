import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Chart = () => {
  const [chartDimensions, setChartDimensions] = useState({ 
    width: 800, 
    height: 500 
  });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('chart-container');
      if (container) {
        setChartDimensions({
          width: Math.min(window.innerWidth * 0.6, 1000),
          height: Math.min(window.innerHeight * 0.6, 500)
        });
      }
    };

    updateDimensions();
    
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div id="chart-container" className="flex flex-col gap-2 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">Analytics of your Spending</h1>
      
      <div className="w-full overflow-x-auto">
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

