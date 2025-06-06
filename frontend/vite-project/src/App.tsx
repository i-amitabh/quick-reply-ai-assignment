import { Chart } from "./myComponent/Chart";
import { DataEntry } from "./myComponent/DataEntry";
import { CurrentExpense } from "./myComponent/CurrentExpense";
import { Filters } from "./myComponent/Filters";
import { useEffect, useState } from "react";
import { ExpenseArraySchema, type APIParam, type Expense, type ParaExpense } from "./types/type";

function App() {

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/get-expenses`);
      const jsonResponse = await response.json();
      if(jsonResponse.success) {
        const parsedResponse = await ExpenseArraySchema.parseAsync(jsonResponse.data);
        setExpenses([...parsedResponse]);
      }
    }
    fetchData();
  }, [])

  const addExpenses = async (state: ParaExpense) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/add-expenses`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    });
    const jsonResponse = await response.json();
    let parsedResponse;
    if(jsonResponse.success) {
      parsedResponse = await ExpenseArraySchema.parseAsync(jsonResponse.data);
      setExpenses(parsedResponse);
    }
  };

  const handleAPICall = async (body: APIParam) => {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/filter-expenses`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const jsonResponse = await response.json();
    if(jsonResponse.success) {
      const parsedResponse = await ExpenseArraySchema.parseAsync(jsonResponse.data);
      setExpenses(parsedResponse);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="h-full w-full flex flex-col lg:flex-row">
        <div className="flex p-6 flex-col justify-center w-full lg:w-1/3 gap-3">
          <DataEntry addExpenses={addExpenses} />
          <Filters handleAPICall={handleAPICall} />
        </div>
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