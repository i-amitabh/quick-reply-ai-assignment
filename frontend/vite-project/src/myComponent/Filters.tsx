import { useState } from "react";
import { Button } from "../components/ui/button";
import type { APIParam } from "../types/type";

export function Filters({
  handleAPICall,
}: {
  handleAPICall: (body: APIParam) => Promise<void>;
}) {
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");

  return (
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">View Expenses</h1>

      {/* Time Range Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleAPICall({ time: "All Time" })}
          variant="outline"
        >
          All Time
        </Button>
        <Button
          onClick={() => handleAPICall({ time: "Last 7 days" })}
          variant="outline"
        >
          Last 7 days
        </Button>
        <Button
          onClick={() => handleAPICall({ time: "Last 30 days" })}
          variant="outline"
        >
          Last 30 days
        </Button>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-col gap-2">
        <h2>Category</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleAPICall({ category: "All" })}
            variant="outline"
          >
            All
          </Button>
          <Button
            onClick={() => handleAPICall({ category: "Rental" })}
            variant="outline"
          >
            Rental
          </Button>
          <Button
            onClick={() => handleAPICall({ category: "Groceries" })}
            variant="outline"
          >
            Groceries
          </Button>
          <Button
            onClick={() => handleAPICall({ category: "Travel" })}
            variant="outline"
          >
            Travel
          </Button>
          <Button
            onClick={() => handleAPICall({ category: "Entertainment" })}
            variant="outline"
          >
            Entertainment
          </Button>
          <Button
            onClick={() => handleAPICall({ category: "Other" })}
            variant="outline"
          >
            Other
          </Button>
        </div>
      </div>

      {/* Payment Method Buttons */}
      <div className="flex flex-col gap-2">
        <h2>Payment Method</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleAPICall({ payment: "Credit Card" })}
            variant="outline"
          >
            Credit Card
          </Button>
          <Button
            onClick={() => handleAPICall({ payment: "Net Banking" })}
            variant="outline"
          >
            Net Banking
          </Button>
          <Button
            onClick={() => handleAPICall({ payment: "UPI" })}
            variant="outline"
          >
            UPI
          </Button>
          <Button
            onClick={() => handleAPICall({ payment: "Cash" })}
            variant="outline"
          >
            Cash
          </Button>
        </div>
      </div>
    </div>
  );
}
