import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userList = action.payload;
    },
    logout: (state, action) => {
      state.userList = null;
    },
    get_user: (state, action) => {},
  },
});

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export const { get_user } = userSlice.actions;
export const selectUser = (state) => state.users.userList;
export default userSlice.reducer;
