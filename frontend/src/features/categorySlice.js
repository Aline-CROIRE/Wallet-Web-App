import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    addCategory(state, action) {
      state.push(action.payload);
    },
    setCategories(state, action) {
      return action.payload;
    },
  },
});

// Selector to get categories
export const selectCategories = (state) => state.categories;

export const { addCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
