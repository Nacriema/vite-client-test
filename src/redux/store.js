import {configureStore} from '@reduxjs/toolkit';
import globalLoadingSlice from './features/globalLoadingSlice';
import paletteColorSlice from './features/paletteColorSlice';
import userSlice from './features/userSlice';

import { proxy } from 'valtio'
import appStateSlice from './features/appStateSlice';
import wallpaperSlice from './features/wallpaperSlice';
import floorSlice from './features/floorSlice';

export const state = proxy({
     intro: true,
     colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8'],
     decals: ['react', 'threejs'],
     color: '',
     decal: 'threejs'
});


const store = configureStore({
     reducer: {
          userSlice: userSlice,
          globalLoading: globalLoadingSlice, 
          paletteColors: paletteColorSlice, 
          appState: appStateSlice, 
          wallpaperSlice: wallpaperSlice, 
          floorSlice: floorSlice, 
     }
});

export default store;
