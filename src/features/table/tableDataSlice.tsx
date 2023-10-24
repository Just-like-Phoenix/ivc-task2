import { createSlice } from "@reduxjs/toolkit";

const tableDataSlice = createSlice({
  name: "tableData",
  initialState: [] as any,
  reducers: {
    setTableData: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    },
    addTableData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setTableData, addTableData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
