import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";

import { ExpensesContext } from "../store/expenses-context.js";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
}

export default AllExpenses;

const styles = StyleSheet.create({});
