import { createSlice } from "@reduxjs/toolkit";
import type { msg } from "../../../utils/Type";

type ChatState = {
  members: string[];
  currChat: string | null;
  chat: msg[];
};

const initialState: ChatState = {
  members: [],
  currChat: null,
  chat: [],
};

const ChatSliece = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setCurrChat: (state, action) => {
      state.currChat = action.payload;
    },
    addMsg: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
  },
});

export const { setCurrChat, setMembers, addMsg } = ChatSliece.actions;
export default ChatSliece.reducer;
