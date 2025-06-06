import { memo, useEffect } from "react";
import type { Expense } from "../App";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export function CurrentExpense({ expenses }: { expenses: Expense[] }) {
  // Calculate total amount
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.Amount, 0);

  return (
    <div className="bg-gray-100 rounded-lg p-4 max-h-[400px] overflow-auto">
      <h1 className="text-xl font-medium mb-3">Your Expenses</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{expense.Date}</TableCell>
              <TableCell>{expense.Category}</TableCell>
              <TableCell>{expense.PaymentMethod}</TableCell>
              <TableCell className="text-right">
               ₹{expense.Amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">₹{totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
