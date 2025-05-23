import { createSlice } from "@reduxjs/toolkit";
import { generateID } from "../../../utils/IDgenerator";

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: "User-" + generateID(2),
  email: generateID(3) + "@gmail.com",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
