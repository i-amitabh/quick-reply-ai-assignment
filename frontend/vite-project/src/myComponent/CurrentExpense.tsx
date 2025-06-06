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
import type { Expense } from "../types/type";

export function CurrentExpense({ expenses }: { expenses: Expense[] }) {
  // Calculate total amount
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  /* HTML: <div class="loader"></div> */

  return (
    <div className="bg-gray-100 rounded-lg p-4 max-h-[400px] min-h-[400px] overflow-auto">
      <h1 className="text-xl font-medium mb-3">Your Expenses</h1>
      {expenses.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{expense.date}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.payment}</TableCell>
                <TableCell>{expense.note}</TableCell>
                <TableCell className="text-right">₹{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                ₹{totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}
