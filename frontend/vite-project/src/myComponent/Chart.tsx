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
import type { Expense } from "../App";

type ResultData = {
  currMonth: String;
  Rental: number;
  Groceries: number;
  Entertainment: number;
  Travel: number;
  Others: number;
};

function chartData(expenses: Expense[]) {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let result: ResultData[] = [];
  for (let month of months) {
    result.push({
      currMonth: month,
      Rental: 0,
      Groceries: 0,
      Entertainment: 0,
      Travel: 0,
      Others: 0,
    });
  }

  for (let expense of expenses) {
    const date = new Date(expense.Date as unknown as Date);
    const monthNumber = date.getMonth();

    const categories = expense.Category;

    if (categories == "Entertainment") {
      result[monthNumber].Entertainment++;
    } else if (categories == "Groceries") {
      result[monthNumber].Groceries++;
    } else if (categories == "Others") {
      result[monthNumber].Others++;
    } else if (categories == "Rental") {
      result[monthNumber].Rental++;
    } else if (categories == "Travel") {
      result[monthNumber].Travel++;
    }
  }

  return result;
}

export const Chart = ({ expenses }: { expenses: Expense[] }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 800,
    height: 500,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("chart-container");
      if (container) {
        setChartDimensions({
          width: Math.min(window.innerWidth * 0.6, 1000),
          height: Math.min(window.innerHeight * 0.6, 500),
        });
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const datas = chartData(expenses);

  return (
    <div
      id="chart-container"
      className="flex flex-col gap-2 bg-gray-100 rounded-lg p-4"
    >
      <h1 className="text-xl font-medium">Analytics of your Spending</h1>

      <div className="w-full overflow-x-auto">
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={datas}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currMonth" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Rental" stackId="a" fill="#ff876a" />
          <Bar dataKey="Groceries" stackId="a" fill="#a3e78e" />
          <Bar dataKey="Entertainment" stackId="a" fill="#de8ee7" />
          <Bar dataKey="Travel" stackId="a" fill="#83baf9" />
          <Bar dataKey="Others" stackId="a" fill="#e7fa45" />
        </BarChart>
      </div>
    </div>
  );
};
