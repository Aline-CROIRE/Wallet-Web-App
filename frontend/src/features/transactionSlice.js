import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    addTransaction(state, action) {
      state.push(action.payload);
    },
    setTransactions(state, action) {
      return action.payload;
    },
  },
});

// Selector to get transactions
export const selectTransactions = (state) => state.transactions;

export const { addTransaction, setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
