import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: object | null
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}


const initialState: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  error: null,
};


export const getUserInfo = createAsyncThunk(
  'user/loginUser',
  async (token: string | any) => {
    console.log("token d", token)
    fetch(`https://only-book.onrender.com/api/v1/auth/info`, {
      method: "POST",
      headers: {
        "Authorization": `${token}`
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("dfd", data)
        if (data?.success) {
          localStorage.setItem("only-book-token", data?.data?.accessToken)
        }
        return data.data;
      })
  }
);

const userSlice = createSlice({
  name: 'user ',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<object | any>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });


  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
