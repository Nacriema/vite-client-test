import React from "react";
import ExploreColor from "../components/ExploreColor";
import Inspired from "../components/Inspired";
import RoomList from "../components/RoomPicker";
import IdeasList from "../components/IdeasList";
import WallPaper from "../components/WallPaper";
import FloorMaterial from "../components/FloorMaterial";


const routes = [
   {
      path: '/explore-colors',
      component: <ExploreColor />,
      exact: true,
      state: '/explore-colors'
   },
   {
      path: '/floor-materials',
      component: <FloorMaterial />,
      exact: true,
      state: '/floor-materials'
   },
   {
      path: '/wallpapers',
      component: <WallPaper />,
      exact: true,
      state: '/wallpapers'
   },
   {
      path: '/inspired-colors',
      component: <Inspired />,
      exact: true,
      state: '/inspired-colors',
   },
   {
      path: '/paint-in-3d-models',
      component: <RoomList />,
      state: '/paint-in-3d-models',

   },
   {
      path: '/your-ideas',
      component: <IdeasList />,
      exact: true,
      state: '/your-ideas'
   }
]

export default routes;