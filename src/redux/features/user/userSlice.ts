import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface IUser {
  name: string;
  email: string;
  password?: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}

interface IUserState {
  user: IUser;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  openLoginModal: boolean;
}


const initialState: IUserState = {
  user: {
    name: "",
    email: "",
    password: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: ""
  },
  isLoading: false,
  isError: false,
  error: null,
  openLoginModal: false,
};


const userSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOpenLoginModal: (state, action: PayloadAction<boolean>) => {
      state.openLoginModal = action.payload;
    },
  },
});

export const { setUser, setLoading, setOpenLoginModal } = userSlice.actions;

export default userSlice.reducer;
