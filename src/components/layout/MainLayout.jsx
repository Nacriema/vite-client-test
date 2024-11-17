import ColorPalette from '../ColorPalette';
import OptionBar from '../OptionBar';
import { Outlet } from "react-router-dom";
import { background } from '../../configs/theme.config';
import { Model } from "../../canvas/Canvas";
import GlobalLoading from '../GlobalLoading';
import ColorDetailModal from '../ColorDetailModal';
import SampleFloorPicked from '../SampleFloorPicked';
import Test from '../../Test';

const MainLayout = () => {

   return (

      <div className='main-layout w-screen h-screen'
         style={{ ...background }}>

         <ColorDetailModal />
         <GlobalLoading />
         <OptionBar />

         {/* <Model /> */}
         <main className='w-screen h-screen overflow-hidden'>
            <Test />
            
            <Outlet />
         </main>

         <ColorPalette />
         <SampleFloorPicked />

      </div>
   );
};

export default MainLayout;
