import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput.js";
import LoadingOverlay from "../components/UI/LoadingOverlay.js";
import ErrorOverlay from "../components/UI/ErrorOverlay.js";

import { ExpensesContext } from "../store/expenses-context.js";
import { getDateMinusDays } from "../util/date.js";
import { fetchExpenses } from "../util/http.js";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    //* Since we should not turn a useEffect to async function, we need to create a helper function (getExpenses),
    //* so we can await a result of fetchExpenses (whis is also a promise)
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  //* Render loading spinner when we fetching data
  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

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
