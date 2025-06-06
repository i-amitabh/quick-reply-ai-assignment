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
import { useMemo, useState } from "react";
import type { CategoryType, ParaExpense, PaymentMethodType } from "../types/type";

export const DataEntry = ({
  addExpenses,
}: {
  addExpenses: (expense: ParaExpense) => void;
}) => {
  const [category, setCategory] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const isAvailable = useMemo(() => {
    return category.length > 0 && 
           payment.length > 0 && 
           amount > 0 && 
           note.length > 0;
  }, [category, payment, amount, note]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = () => {
    if (!category || !payment) {
      alert("Please select both category and payment method");
      return;
    }

    const newExpense: ParaExpense = {
      category: category as CategoryType,
      payment: payment as PaymentMethodType,
      note: note,
      amount: amount,
    };

    addExpenses(newExpense);

    setCategory("");
    setPayment("");
    setAmount(0);
    setNote("");
  };

  return (
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-4">
      <h1 className="text-xl font-medium">Add Expense</h1>
      
      <div className="flex gap-3">
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

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Amount</Label>
        <Input
          value={amount || ""}
          onChange={handleAmountChange}
          type="number"
          placeholder="Amount"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>Notes</Label>
        <Input 
          value={note}
          onChange={handleNoteChange} 
          type="text" 
          placeholder="Notes" 
        />
      </div>

      <Button disabled={!isAvailable} onClick={handleSubmit}>Add Expense</Button>
    </div>
  );
};
