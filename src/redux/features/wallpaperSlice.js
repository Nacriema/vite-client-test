import { createSlice } from '@reduxjs/toolkit';

export const wallpaperSlice = createSlice({
   name: 'Wallpaper',
   initialState: {
      wallpaper: [],
      wallpaperPicked: "",
      openWallpaperDetailModal: false
   },
   reducers: {
      setWallpaper: (state, action) => {
         state.wallpaper = action.payload
      },
      setWallpaperPicked: (state, action) => {
         state.wallpaperPicked = action.payload
      },
      setOpenWallpaperDetailModal: (state, action) => {
         state.openWallpaperDetailModal = action.payload
      }
   }
});

export const {
   setWallpaper,
   setWallpaperPicked,
   setOpenWallpaperDetailModal } = wallpaperSlice.actions;

export default wallpaperSlice.reducer;