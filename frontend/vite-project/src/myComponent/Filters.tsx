import { useState } from "react";
import { Button } from "../components/ui/button";
import type { APIParam } from "../types/type";

export function Filters({
  handleAPICall,
}: {
  handleAPICall: (body: APIParam) => Promise<void>;
}) {
  const [time, setTime] = useState<String>("All Time");
  const [category, setCategory] = useState<String[]>([]);
  const [payment, setPayment] = useState<String[]>([]);


  const handleTime = (param: String) => {
    setTime(param);
  }

  const handleCategory = (param: String) => {
    if(param === 'All') {
      if(category.includes('All')) {
        setCategory(category.filter((category) => category !== param));
      } else {
        setCategory(['All']);
      }
    }
    else if(category.includes(param)) {
      setCategory(category.filter((category) => category !== param));
    } else {
      setCategory([...category, param]);
    }
  }

  const handlePayment = (param: String) => {
    if(payment.includes(param)) {
      setPayment(payment.filter((payment) => payment !== param));
    } else {
      setPayment([...payment, param]);
    }
  }

  const handleSubmit = () => {
    handleAPICall({
      category: category,
      time: time,
      payment: payment
    });
  }

  return (
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">View Expenses</h1>

      {/* Time Range Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleTime("All Time")}
          disabled={time === 'All Time'}
          variant="outline"
        >
          All Time
        </Button>
        <Button
          onClick={() => handleTime("Last 7 days")}
          disabled={time === 'Last 7 days'}
          variant="outline"
        >
          Last 7 days
        </Button>
        <Button
          onClick={() => handleTime("Last 30 days")}
          disabled={time === 'Last 30 days'}
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
            onClick={() => handleCategory('All')}
            variant={category.includes('All') ? 'default' : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => handleCategory('Rental')}
            disabled={category.includes('All')}
            variant={category.includes('Rental') ? 'default' : "outline"}
          >
            Rental
          </Button>
          <Button
            onClick={() => handleCategory('Groceries')}
            disabled={category.includes('All')}
            variant={category.includes('Groceries') ? 'default' : "outline"}
          >
            Groceries
          </Button>
          <Button
            onClick={() => handleCategory('Travel')}
            disabled={category.includes('All')}
            variant={category.includes('Travel') ? 'default' : "outline"}
          >
            Travel
          </Button>
          <Button
            onClick={() => handleCategory('Entertainment')}
            disabled={category.includes('All')}
            variant={category.includes('Entertainment') ? 'default' : "outline"}
          >
            Entertainment
          </Button>
          <Button
            onClick={() => handleCategory('Other')}
            disabled={category.includes('All')}
            variant={category.includes('Other') ? 'default' : "outline"}
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
            onClick={() => handlePayment("Credit Card")}
            variant={payment.includes('Credit Card') ? 'default' : "outline"}
          >
            Credit Card
          </Button>
          <Button
            onClick={() => handlePayment("Net Banking")}
            variant={payment.includes('Net Banking') ? 'default' : "outline"}
          >
            Net Banking
          </Button>
          <Button
            onClick={() => handlePayment("UPI")}
            variant={payment.includes('UPI') ? 'default' : "outline"}
          >
            UPI
          </Button>
          <Button
            onClick={() => handlePayment("Cash")}
            variant={payment.includes('Cash') ? 'default' : "outline"}
          >
            Cash
          </Button>
        </div>
      </div>

      <Button onClick={handleSubmit}>Apply Filter</Button>
    </div>
  );
}
