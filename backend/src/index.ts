import express, { Request, Response } from "express";
import { data } from "./data";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/get-expenses", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: data,
  });
});

app.post("/add-expenses", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    success: true,
    data: req.body,
  });
});

app.post("/filter-expenses", (req: Request, res: Response) => {
  const { time, category, payment } = req.body;
  let resultData = [...data]; // Start with all data

  // Helper function to format dates as YYYY-MM-DD (local time)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Apply category filter if present and not "All"
  if (category && category !== "All") {
    resultData = resultData.filter(expense => expense.Category === category);
  }

  // Apply time filter if present and not "All Time"
  if (time && time !== "All Time") {
    const today = new Date();
    let startDate: string;

    if (time === "Last 7 days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 6);
      startDate = formatDate(sevenDaysAgo);
    } else if (time === "Last 30 days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 29);
      startDate = formatDate(thirtyDaysAgo);
    } else {
      // Handle unknown time values or fallback to no filtering
      startDate = formatDate(new Date(0)); // Very old date
    }

    const endDate = formatDate(today);
    resultData = resultData.filter(item => 
      item.Date >= startDate && item.Date <= endDate
    );
  }

  // Apply payment method filter if present
  if (payment) {
    resultData = resultData.filter(expense => 
      expense.PaymentMethod === payment
    );
  }

  // Return filtered results
  res.json({
    success: true,
    data: resultData
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
