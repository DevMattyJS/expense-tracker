import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);

  //* We check if there is some params and extract the expenseId if yes
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; // a JS trick to convert a value in a boolean

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  //* Set the title according to what we want to do (Add a new expense or Edit existing one)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  //* We storing the data in this app in a backend database, but also in a device memory (we can check our stored expenses when we are offline)
  //* Therefore we need to update/delete the data from both stores
  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later. ");
      isSubmitting(false);
    }
  }

  //* Show Loading spinner when we adding/updating/deleting data
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing ? (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
