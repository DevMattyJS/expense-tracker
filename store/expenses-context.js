import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 44.99,
    date: new Date("2023-01-28"),
  },
  {
    id: "e2",
    description: "Dell XPS 13",
    amount: 1400,
    date: new Date("2023-02-12"),
  },
  {
    id: "e3",
    description: "E-book reader",
    amount: 199.99,
    date: new Date("2023-02-20"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 13.99,
    date: new Date("2023-02-28"),
  },
  {
    id: "e5",
    description: "Ipad",
    amount: 399.99,
    date: new Date("2023-03-02"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString;
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      // *Find the index of an Expense we want to update
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      //* Use that index to access the Expense itself
      const updatableExpense = state[updatableExpenseIndex];
      //* We will merge the original data with updated (amount, date, description) to keep an original id
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      //* Creating a new array (by spreading the existing one) to keep everything immutable
      const updatedExpenses = [...state];
      //* Overwrite the item we want to update, with updatedItem
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      //* Keep all the items, which id are not equal to id of item we want to delete (delete the one which id is equal)
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
