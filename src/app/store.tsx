import { configureStore, createSlice } from "@reduxjs/toolkit";

const tableDataSlice = createSlice({
  name: "tableData",
  initialState: {
    data: [],
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    getData: (state) => {
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    tableData: tableDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { setData, getData } = tableDataSlice.actions;
