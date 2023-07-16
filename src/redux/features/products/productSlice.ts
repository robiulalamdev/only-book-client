import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  search: string;
  books: any[];
  genre: string;
  publicationYear: string;
  allPublicationYears: any[];
}

const initialState: IProduct = {
  search: "",
  books: [],
  genre: "",
  publicationYear: "",
  allPublicationYears: [],
};


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setBooks: (state, action: PayloadAction<any[]>) => {
      state.books = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setPublicationYear: (state, action: PayloadAction<string>) => {
      state.publicationYear = action.payload;
    },
    setAllPublicationYears: (state, action: PayloadAction<any[]>) => {
      state.allPublicationYears = action.payload;
    },
  },

});

export const { setSearch, setBooks, setGenre, setPublicationYear, setAllPublicationYears } = productSlice.actions;

export default productSlice.reducer;
