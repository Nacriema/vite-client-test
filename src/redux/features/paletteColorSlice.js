import { createSlice } from '@reduxjs/toolkit';

export const paletteColorSlice = createSlice({
   name: "PaletteColors",
   initialState: {
      paletteColors: ['#cccccc', '#EFBD4E', '#80C670', '#726DE8'],
      colorPicked: "#cccccc",
      openColorDetailModal: false
   },
   reducers: {
      setPaletteColors: (state, action) => {
         state.paletteColors = action.payload
      },
      setColorPicked: (state, action) => {
         state.colorPicked = action.payload
      },
      setOpenColorDetailModal: (state, action) => {
         state.openColorDetailModal = action.payload
      }
   }
});

export const {
   setPaletteColors,
   setColorPicked,
   setOpenColorDetailModal
} = paletteColorSlice.actions;

export default paletteColorSlice.reducer;