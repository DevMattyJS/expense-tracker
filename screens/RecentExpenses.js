import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";

import { ExpensesContext } from "../store/expenses-context.js";
import { getDateMinusDays } from "../util/date.js";
import { fetchExpenses } from "../util/http.js";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    //* Since we should not turn a useEffect to async function, we need to create a helper function (getExpenses),
    //* so we can await a result of fetchExpenses (whis is also a promise)
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.date >= date7DaysAgo && expenses.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({});
