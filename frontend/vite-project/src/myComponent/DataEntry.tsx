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
import type { CategoryType, ParaExpense, PaymentMethodType } from "../App";
import { useState } from "react";

export const DataEntry = ({
  addExpenses,
}: {
  addExpenses: (expense: ParaExpense) => void;
}) => {
  // Use primitive string type instead of String object wrapper
  const [category, setCategory] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Use parseFloat to handle decimals
    setAmount(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = () => {
    // Ensure both category and payment are selected
    if (!category || !payment) {
      alert("Please select both category and payment method");
      return;
    }

    // Create new expense object
    const newExpense: ParaExpense = {
      Category: category as CategoryType,
      PaymentMethod: payment as PaymentMethodType,
      Note: note,
      Amount: amount,// Add current date
    };

    // Add to expenses
    addExpenses(newExpense);
    
    // Reset form
    setCategory("");
    setPayment("");
    setAmount(0);
    setNote("");
  };

  return (
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">Add Expense</h1>
      
      <div className="flex gap-3">
        {/* Category Select */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Rental">Rental</SelectItem>
              <SelectItem value="Groceries">Groceries</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method Select */}
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Payment Method</Label>
          <Select value={payment} onValueChange={setPayment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Amount Input */}
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Amount</Label>
        <Input
          value={amount || ""}
          onChange={handleAmountChange}
          type="number"
          placeholder="Amount"
        />
      </div>

      {/* Notes Input */}
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Notes</Label>
        <Input 
          value={note}
          onChange={handleNoteChange} 
          type="text" 
          placeholder="Notes" 
        />
      </div>

      <Button onClick={handleSubmit}>Add Expense</Button>
    </div>
  );
};
