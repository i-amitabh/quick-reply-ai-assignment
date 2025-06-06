import { Chart } from "./myComponent/Chart";
import { DataEntry } from "./myComponent/DataEntry";
import { CurrentExpense } from "./myComponent/CurrentExpense";
import { Filters } from "./myComponent/Filters";
import { useState } from "react";

export type CategoryType =
  | "Rental"
  | "Groceries"
  | "Entertainment"
  | "Travel"
  | "Others";
export type PaymentMethodType = "UPI" | "Credit Card" | "Net Banking" | "Cash";
export type Expense = {
  key: number;
  Category: CategoryType;
  PaymentMethod: PaymentMethodType;
  Amount: number;
  Date: String;
  Note: String;
};
export type ParaExpense = {
  Category: CategoryType;
  PaymentMethod: PaymentMethodType;
  Amount: number;
  Note: String;
};

const getRandomDate = (startYear = 2025, endYear = 2025): string => {
  // Generate random date within year range
  const start = new Date(startYear, 0, 1).getTime(); // Jan 1 of start year
  const end = new Date(endYear, 11, 31).getTime(); // Dec 31 of end year
  const randomTime = start + Math.random() * (end - start);

  const randomDate = new Date(randomTime);

  // Format as YYYY-MM-DD
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const sampleNotes = [
  "Monthly rent payment",
  "Grocery shopping",
  "Movie tickets",
  "Flight to New York",
  "Restaurant dinner",
  "Office supplies",
  "Monthly subscription",
  "Coffee with friends",
  "Weekend getaway",
  "Online course",
  "Gym membership",
  "Book purchase",
  "Taxi fare",
  "Charity donation",
  "Phone bill",
  "Internet bill",
  "Medical expenses",
];

const data: Expense[] = Array.from({ length: 100 }, (_, i) => {
  const categories: Expense["Category"][] = [
    "Rental",
    "Groceries",
    "Entertainment",
    "Travel",
    "Others",
  ];
  const methods: Expense["PaymentMethod"][] = [
    "UPI",
    "Credit Card",
    "Net Banking",
    "Cash",
  ];

  return {
    key: i,
    Category: categories[Math.floor(Math.random() * categories.length)],
    PaymentMethod: methods[Math.floor(Math.random() * methods.length)],
    Date: getRandomDate(),
    Note: sampleNotes[Math.floor(Math.random() * sampleNotes.length)],
    Amount: Math.floor(Math.random() * 500) + 20, // Random amount $20-$520
  };
});


function App() {

  const [expenses, setExpenses] = useState<Expense[]>(data);

  function addExpenses(state: ParaExpense) {
    const newItem = {
      key: expenses.length,
      Category: state.Category,
      PaymentMethod: state.PaymentMethod,
      Date: `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
      Note: state.Note,
      Amount: state.Amount,
    };
    setExpenses([...expenses, newItem]);
  };

  return (
    <div className="flex flex-col">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="flex p-6 flex-col justify-center w-full lg:w-1/3 gap-3">
          <DataEntry addExpenses={addExpenses} />
          <Filters />
        </div>
        {/* Current Expense - Stacks on mobile */}
        <div className="flex flex-col p-6 justify-center gap-3 w-full lg:w-2/3">
          <CurrentExpense expenses={expenses} />
        </div>
      </div>

      <div className="flex justify-center p-6">
        <Chart expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
