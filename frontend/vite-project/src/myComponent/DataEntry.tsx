import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
export const DataEntry = () => {
  return (
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">Add Expense</h1>
      {/* Enter Amount */}
      {/* Select Category */}
      <div className="flex gap-3">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Rental</SelectItem>
              <SelectItem value="dark">Groceries</SelectItem>
              <SelectItem value="system">Entertainment</SelectItem>
              <SelectItem value="system">Travel</SelectItem>
              <SelectItem value="system">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Payment Method</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">UPI</SelectItem>
              <SelectItem value="dark">Credit Card</SelectItem>
              <SelectItem value="system">Net Banking</SelectItem>
              <SelectItem value="system">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Amount</Label>
        <Input type="number" placeholder="Amount" />
      </div>
      {/* Enter Notes */}
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Notes</Label>
        <Input type="text" placeholder="Notes" />
      </div>
      {/* Select Payment Method */}

      <Button>Add Expense</Button>
    </div>
  );
};
