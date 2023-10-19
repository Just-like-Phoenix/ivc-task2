import { createSlice } from "@reduxjs/toolkit";

const tableKeysSlice = createSlice({
  name: "tableKeys",
  initialState: [] as any,
  reducers: {
    setTableKeys: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    },
    addTableKeys: (state, action) => {
      state.push(action.payload as never);
    },
  },
});

export const { setTableKeys, addTableKeys } = tableKeysSlice.actions;
export default tableKeysSlice.reducer;
