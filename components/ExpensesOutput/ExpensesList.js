import { FlatList, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  const item = itemData.item;

  return (
    <ExpenseItem
      description={item.description}
      amount={item.amount}
      date={item.date}
    />
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;

// const styles = StyleSheet.create({});
