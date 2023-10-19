import { configureStore } from "@reduxjs/toolkit";
import tableDataSlice from "../features/table/tableDataSlice";
import tableKeysSlice from "../features/table/tableKeysSlice";

export const store = configureStore({
  reducer: {
    tableData: tableDataSlice,
    tableKeys: tableKeysSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
