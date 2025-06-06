import { z } from 'zod';

export type CategoryType =
  | "Rental"
  | "Groceries"
  | "Entertainment"
  | "Travel"
  | "Others";
export type PaymentMethodType = "UPI" | "Credit Card" | "Net Banking" | "Cash";
export type Expense = {
  id: number;
  category: CategoryType;
  payment: PaymentMethodType;
  amount: number;
  date: String;
  note: String;
};
export type ParaExpense = {
  category: CategoryType;
  payment: PaymentMethodType;
  amount: number;
  note: String;
};

export type APIParam = {
  category?: string;
  time?: string;
  payment?: string;
}

export const CategoryType = z.enum([
  "Rental",
  "Groceries",
  "Entertainment",
  "Travel",
  "Others"
]);

// Define payment method enum
export const PaymentMethodType = z.enum([
  "UPI",
  "Credit Card",
  "Net Banking",
  "Cash"
]);

export const ExpenseSchema = z.object({
  id: z.number().int().positive(),
  category: CategoryType,
  payment: PaymentMethodType,
  amount: z.number().positive(),
  // Date: z.string().datetime({ offset: true }).refine(str => !isNaN(new Date(str).getTime()), {
  //   message: "Invalid date format"
  // }),
  date: z.string(),
  note: z.string()
});

export const ExpenseArraySchema = z.array(ExpenseSchema);