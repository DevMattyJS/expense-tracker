import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

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

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
