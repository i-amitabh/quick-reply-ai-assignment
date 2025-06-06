import { z } from 'zod';

export type CategoryType =
  | "Rental"
  | "Groceries"
  | "Entertainment"
  | "Travel"
  | "Others";
export type PaymentMethodType = "UPI" | "Credit Card" | "Net Banking" | "Cash";
export type Expense = {
  key: number;
  Category: CategoryType;
  PaymentMethod: PaymentMethodType;
  Amount: number;
  Date: String;
  Note: String;
};
export type ParaExpense = {
  Category: CategoryType;
  PaymentMethod: PaymentMethodType;
  Amount: number;
  Note: String;
};

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
  key: z.number().int().positive(),
  Category: CategoryType,
  PaymentMethod: PaymentMethodType,
  Amount: z.number().positive(),
  // Date: z.string().datetime({ offset: true }).refine(str => !isNaN(new Date(str).getTime()), {
  //   message: "Invalid date format"
  // }),
  Date: z.string(),
  Note: z.string()
});

export const ExpenseArraySchema = z.array(ExpenseSchema);