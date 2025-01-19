import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categorySlice';
import transactionReducer from './features/transactionSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    transaction: transactionReducer,
  },
});

export default store;
