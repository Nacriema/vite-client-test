
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAppState } from '../redux/features/appStateSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeAnimation } from '../configs/motion.config';
import { background, textLine, boxShadows } from '../configs/theme.config';
import { FaCheck } from "react-icons/fa6";
import SubNav from './SubNav';
import { IoCloseOutline, IoAddCircleOutline } from "react-icons/io5";
import { ColorFamily } from '../configs/constants.config';
import { GiPlatform } from "react-icons/gi";
import { FloorCollections } from '../configs/constants.config';
import { checkValidArrayLength, checkSampleFloorAlreadyAdded } from '../utils/FloorMaterial.utils';
import { useSelector } from 'react-redux';
import { setFloorCollection, setFloorPicked } from '../redux/features/floorSlice';

const FloorMaterial = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { floorCollections } = useSelector((state) => state.floorSlice);

   const [isExpanded, setIsExpanded] = useState(false);
   const [filteredCollectionFloor, setFilteredCollectionFloor] = useState([]);
   const [floorTypeSelected, setFloorTypeSelected] = useState(ColorFamily.colorFamilies[0].value);


   useEffect(() => {
      const filterCollection = async () => {
         const filtered = await filterCollectionByFloorType(floorTypeSelected);
         setFilteredCollectionFloor(filtered);
      }
      filterCollection();
   }, [floorTypeSelected]);


   const handleCloseTab = () => {
      dispatch(setAppState(""));
      navigate('/');
   }

   const handleFloorDetail = () => {
      dispatch(setAppState("floor-detail"));
   }

   const handleFloorTypeSelected = async (floor) => {
      setFloorTypeSelected(floor);
      const filtered = await filterCollectionByFloorType(floor);
      setFilteredCollectionFloor(filtered);
   }

   const filterCollectionByFloorType = async (colorFamily) => {
      return FloorCollections.filter((collection) => collection.family === colorFamily);
   }

   const checkSampleAlreadyAdded = (paletteFloors, floor) => {
      // return paletteFloors.some((palette) => palette.floor === floor);
   }



   const handleAddSamplePalette = (sample) => {
      if (checkValidArrayLength(floorCollections))
         checkSampleFloorAlreadyAdded(floorCollections, sample) ? alert('Color already added!') :
            dispatch(setFloorCollection([...floorCollections, sample]));
      else alert('Palette is full');
   };


   return (
      <div className='floor-material-container fixed z-30 top-16 min-w-7xl left-1/2 -translate-x-1/2'>

         <SubNav navOptions={ColorFamily}
            isExpanded={isExpanded}
            picked={floorTypeSelected}
            setIsExpanded={setIsExpanded}
            handlePicker={handleFloorTypeSelected}
         />

         <AnimatePresence mode='wait'>
            <motion.div {...fadeAnimation} className='z-50 top-44 mt-10 w-full py-4 px-4' style={{ ...background }} >

               <button
                  onClick={handleCloseTab}
                  className='absolute -right-4 top-20 flex flex-row bg-primaryBg items-center px-1 py-1 justify-center'>
                  <IoCloseOutline style={{ fontSize: '1.2rem', color: "#fff" }} />
               </button>

               <div className="grid grid-cols-3 gap-6">
                  <motion.div className="grid grid-cols-6 gap-y-0.5">
                     <motion.div
                        whileHover={{
                           zIndex: 100,
                           width: '110px',
                           height: '110px',
                           transition: { duration: 0.3 },
                           boxShadow: boxShadows.boxShadow2
                        }}
                        className="h-10 w-10 border-x border-y border-gray-100 border-solid overflow-visible"
                        style={{
                           backgroundImage: 'url(https://images.unsplash.com/photo-1580398814575-816cf5faebad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29vZCUyMGZsb29yfGVufDB8fDB8fHww)',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           backgroundRepeat: 'no-repeat'
                        }}
                     >
                        <motion.div
                           initial={{ opacity: 0 }}
                           whileHover={{ opacity: 1 }}
                           transition={{ duration: 0.4 }}
                           className='flex flex-col  h-full w-full justify-between text-secondary text-sm capitalize px-2 py-2 cursor-pointer'
                        >
                           <div className='flex flex-col justify-between items-center'>

                              <span style={{ ...textLine, textShadow: 'rgb(14, 165, 233) 0px 0px 0px' }} >{"Oak Chevron "}</span>
                           </div>

                           <div className='button-color-group flex flex-row justify-between items-center'>

                              {checkSampleAlreadyAdded() ? (
                                 <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'>
                                    <FaCheck style={{ fontSize: '1rem' }} />
                                 </button>
                              ) : (
                                 <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'
                                 onClick={() => handleAddSamplePalette({ floor: "Oak Chevron", family: "wood" })}
                                   >
                                    <IoAddCircleOutline style={{ fontSize: '1.2rem' }} />
                                 </button>
                              )}

                              <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full' onClick={handleFloorDetail}>
                                 <GiPlatform style={{ fontSize: '1.2rem', }} />
                              </button>
                           </div>
                        </motion.div>
                     </motion.div>
                  </motion.div>
               </div>
            </motion.div>
         </AnimatePresence>
      </div>
   )
}

export default FloorMaterial
