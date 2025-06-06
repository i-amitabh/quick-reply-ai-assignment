import { Button } from "../components/ui/button";

export function Filters() {
    return (
      <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
        <h1 className="text-xl font-medium">View Expenses</h1>
        
        {/* Time Range Buttons */}
        <div className="flex flex-wrap gap-3"> {/* Added flex-wrap */}
          <Button variant="outline">Last 7 days</Button>
          <Button variant="outline">Last 30 days</Button>
          <Button variant="outline">All Time</Button>
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-col gap-2">
          <h2>Category</h2>
          <div className="flex flex-wrap gap-3"> {/* Added flex-wrap */}
            <Button variant="outline">All</Button>
            <Button variant="outline">Rental</Button>
            <Button variant="outline">Groceries</Button>
            <Button variant="outline">Travel</Button>
            <Button variant="outline">Entertainment</Button>
            <Button variant="outline">Other</Button>
          </div>
        </div>
        
        {/* Payment Method Buttons */}
        <div className="flex flex-col gap-2">
          <h2>Payment Method</h2>
          <div className="flex flex-wrap gap-3"> {/* Added flex-wrap */}
            <Button variant="outline">All</Button>
            <Button variant="outline">Credit Card</Button>
            <Button variant="outline">Net Banking</Button>
            <Button variant="outline">UPI</Button>
            <Button variant="outline">Cash</Button>
          </div>
        </div>
      </div>
    );
  }
