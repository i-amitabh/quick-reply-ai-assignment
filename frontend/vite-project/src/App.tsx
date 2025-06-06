import { Chart } from "./myComponent/Chart";
import { DataEntry } from "./myComponent/DataEntry";
import { CurrentExpense } from "./myComponent/CurrentExpense";
import { Filters } from "./myComponent/Filters";
function App() {
  return (
    <div className="flex flex-col">
  <div className="h-full w-full flex flex-col lg:flex-row"> {/* Responsive direction */}
    {/* Left Column */}
    <div className="flex p-6 flex-col justify-center w-full lg:w-1/3 gap-3"> {/* Responsive width */}
      <DataEntry />
      <Filters />
    </div>
    
    {/* Current Expense - Stacks on mobile */}
    <div className="flex flex-col p-6 justify-center gap-3 w-full lg:w-2/3"> {/* Responsive width */}
      <CurrentExpense />
    </div>
  </div>
  
  <div className="flex justify-center p-6">
    <Chart />
  </div>
</div>
  );
}

export default App;
