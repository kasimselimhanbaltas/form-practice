import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserStore"

const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
  },
});

export default store;