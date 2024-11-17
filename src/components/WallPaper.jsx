// eslint-disable-next-line no-unused-vars
import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setAppState } from '../redux/features/appStateSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeAnimation } from '../configs/motion.config';
import { background, textLine } from '../configs/theme.config';
import { checkColorAlreadyAdded } from '../utils/ColorPalette.utils';
import { IoAddCircleOutline, IoColorPaletteOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";


const WallPaper = () => {
   return (
      <div className='floor-material-container custom-scrollbar fixed z-30 pl-1 top-16 right-10  h-3/4 overflow-auto'>



         <AnimatePresence mode='wait'>
            <motion.div {...fadeAnimation} className='z-50 top-44 w-full py-4 px-4' style={{ ...background }} >
               <div className='grid grid-cols-3 gap-1 relative'>

                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     className="h-28 w-28 border-x border-y  border-gray-100 border-solid overflow-visible "
                     style={{
                        backgroundImage: `url(https://t4.ftcdn.net/jpg/01/97/71/71/240_F_197717166_UowHyPmYH2g6b2bH3kgXD1Mcbh1UDtLY.jpg)`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                     }}
                  >
                     <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className='flex flex-col  h-full w-full justify-between text-secondary text-sm capitalize px-2 py-2 cursor-pointer'
                     >
                        <div className='flex flex-col justify-between items-center'>
                           <span style={{
                              textShadow: 'rgb(14, 165, 233) 0px 0px 0px'
                           }}>{'color.hex'}</span>
                           <span style={{ textLine }}>{'color.name'}</span>
                        </div>

                        <div className='button-color-group flex flex-row justify-between items-center'>
                           <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full'>
                              <FaCheck style={{ fontSize: '1rem' }} />
                           </button>


                           <button className='btn-primary px-1 py-1 bg-slate-100 rounded-full' >
                              <IoColorPaletteOutline style={{ fontSize: '1.2rem' }} />
                           </button>

                        </div>
                     </motion.div>

                  </motion.div>








               </div>


            </motion.div>
         </AnimatePresence>



      </div >
   )
}

export default WallPaper
