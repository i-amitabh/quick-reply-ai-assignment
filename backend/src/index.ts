import express, { Request, Response } from "express";
import { data } from "./data";
import cors from "cors";
import pool from "./db";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

app.get("/get-expenses", async (req: Request, res: Response) => {
  try {
    const expenses = await pool.query(`SELECT * FROM expenses`);
    res.json({
      success: true,
      data: expenses.rows,
    });
  } catch (e) {
    console.log("error", e);
    res.json({
      success: false,
      message: "Something went wrong while getting expenses",
    });
  }
});

app.post("/add-expenses", async (req: Request, res: Response) => {
  const { category, payment, amount, note } = req.body;
  const date = formatDate(new Date());

  try {
    await pool.query(
      `INSERT INTO expenses (Date, Category, Payment, Amount, Note)
      VALUES ($1, $2, $3, $4, $5)`,
      [date, category, payment, amount, note]
    );
  } catch (e) {
    res.json({
      success: false,
      message: "Something went wrong while entering expenses",
    });
  }

  try {
    const expenses = await pool.query(`SELECT * FROM expenses`);
    res.json({
      success: true,
      data: expenses?.rows,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Something went wrong while getting expenses",
    });
  }
});

app.post("/filter-expenses", async (req: Request, res: Response) => {
  const { time, category, payment } = req.body;

  let startTime = "1900-01-01";
  let endTime = formatDate(new Date());

  const daysAgo = new Date();
  if (time === "Last 7 days") {
    daysAgo.setDate(new Date().getDate() - 6);
    startTime = formatDate(daysAgo);
  } else if (time === "Last 30 days") {
    daysAgo.setDate(new Date().getDate() - 30);
    startTime = formatDate(daysAgo);
  }

  try {
    let query = `SELECT *
      FROM expenses
      WHERE TO_DATE(Date, 'YYYY-MM-DD') BETWEEN $1 AND $2`;
    const params = [startTime, endTime];
  
    if (Array.isArray(category) && category.length > 0 && !category.includes('All')) {
      const categoryPlaceholders = category.map((_, i) => `$${params.length + 1 + i}`).join(',');
      query += ` AND category IN (${categoryPlaceholders})`;
      params.push(...category);
    }

    if (Array.isArray(payment) && payment.length > 0) {
      const paymentPlaceholders = payment.map((_, i) => `$${params.length + 1 + i}`).join(',');
      query += ` AND payment IN (${paymentPlaceholders})`;
      params.push(...payment);
    }
  
    const response = await pool.query(query, params);
    res.json({ success: true, data: response.rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong while querying data"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
