import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  priceRange: number;
  genre: string;
  publicationYear: string;
}

const initialState: IProduct = {
  status: false,
  priceRange: 150,
  genre: "",
  publicationYear: "",
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setPublicationYear: (state, action: PayloadAction<string>) => {
      state.publicationYear = action.payload;
    },
  },
});

export const { toggleState, setPriceRange, setGenre, setPublicationYear } = productSlice.actions;

export default productSlice.reducer;
