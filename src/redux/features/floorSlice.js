import { createSlice } from '@reduxjs/toolkit';

export const floorSlice = createSlice({
   name: "Floor",
   initialState: {
      floorCollection: [],
      floorPicked: "",
      openFloorDetailModal: false
   },
   reducers: {
      setFloorCollection: (state, action) => {
         state.floorCollection = action.payload
      },
      setFloorPicked: (state, action) => {
         state.floorPicked = action.payload
      },
      setOpenFloorDetailModal: (state, action) => {
         state.openFloorDetailModal = action.payload
      }
   }
});

export const {
   setFloorCollection, setFloorPicked, setOpenFloorDetailModal } = floorSlice.actions;

export default floorSlice.reducer;