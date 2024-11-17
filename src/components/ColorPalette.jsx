import { motion, AnimatePresence, easeIn, useAnimate, usePresence } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react';
import { GoDownload } from "react-icons/go";
import { BsCollection } from "react-icons/bs";
import ColorCard from './ColorCard';
import { HiOutlineColorSwatch } from "react-icons/hi";
import { PiEraserFill } from "react-icons/pi";
import { bottomUpAnimation, topDownAnimation } from '../configs/motion.config';
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setColorPicked, setPaletteColors } from '../redux/features/paletteColorSlice';
import { v4 as uuidv4 } from 'uuid';
import { FiChevronsDown } from "react-icons/fi";
import { FiChevronsUp } from "react-icons/fi";
import { boxShadows } from '../configs/theme.config';

const Customizer = () => {


     const [showColorPalette, setShowColorPalette] = useState(true);

     const { paletteColors } = useSelector((state) => state.paletteColors);

     const dispatch = useDispatch();

     const [filteredColors, setFilteredColors] = useState([]);
     const [selectedColor, setSelectedColor] = useState(paletteColors[0]);

     useEffect(() => {
          if (paletteColors.length > 0) {
               setFilteredColors(paletteColors);
               setSelectedColor(paletteColors[paletteColors.length - 1]);
          }
     }, [paletteColors, dispatch]);

     const handleColorSelection = (e, color) => {
          setSelectedColor(color);
          dispatch(setColorPicked(color));
     }

     const handleRemoveColorPalette = (color) => {
          const filtered = paletteColors.filter((paletteColor) => paletteColor !== color);
          setFilteredColors(filtered);
          setSelectedColor(filtered[0]);
          dispatch(setPaletteColors(filtered));
     }

     const emptyPaletteSlots = 8 - filteredColors.length;

     return (


          <Fragment>
               <motion.div
                    className='
               tool-action-btn m-auto mb-7
                 flex max-w-5xl m-x-auto flex-row justify-between w-full relative'>

                    <div className=''>
                         <motion.button whileHover={{
                              transform: 'translateY(-4px)',
                              transition: { duration: 0.2, ease: easeIn }
                         }}
                              className='btn-primary w-max flex justify-center items-center px-2 py-2 bg-primary text-secondary capitalize border-cyan-200 shadow-lg shadow-slate-400 '
                              onClick={() => alert('Cleaning areas ...')}
                         >
                              <PiEraserFill style={{ fontSize: '1.4rem' }} />
                              <p className='text-secondary text-center text-sm px-1 select-none'>Clean areas</p>
                         </motion.button>
                    </div>

                    <div className='flex justify-center'>
                         <motion.button
                              whileHover={{
                                   transform: 'scale(1.1)',
                              }}
                              className='btn-primary flex text-secondaryjustify-center items-center relative'
                              onClick={() => setShowColorPalette(!showColorPalette)}
                         >
                              {showColorPalette ? <FiChevronsDown style={{ fontSize: '1.4rem' }} /> : <FiChevronsUp style={{ fontSize: '1.5rem' }} />}
                         </motion.button>
                    </div>


                    <div className='flex flex-row justify-around'>
                         <button onClick={() => alert('Downloading ...')}
                              className="btn-primary w-max flex justify-center items-center px-2 py-2 bg-primary text-secondary capitalize border-cyan-200 shadow-lg shadow-slate-400 mr-2">
                              <GoDownload className="text-secondary" style={{ fontSize: '1.3rem' }} />
                              <p className='text-secondary text-center text-sm pt-1 px-1 select-none  ml-2'>Download</p>
                         </button>

                         <button onClick={() => alert('Downloading ...')} className="btn-primary w-max flex justify-center items-center px-2 py-2 bg-primary text-secondary capitalize border-cyan-200 shadow-lg shadow-slate-400">
                              <BsCollection className="text-secondary text-center " style={{ fontSize: '1.2rem' }} />
                              <p className='text-secondary text-center text-sm pt-1 px-1 select-none ml-2'>Save</p>
                         </button>
                    </div>
               </motion.div>


               <motion.div {...bottomUpAnimation} className="live-palette-wrapper relative flex justify-center z-10 ">
                    <AnimatePresence>
                         {showColorPalette && (
                              <motion.div {...bottomUpAnimation} className="live-palette-item flex flex-row gap-1" >

                                   <div className="live-palette-header flex flex-col w-30 items-center justify-around bg-primaryBg px-4 py-4"
                                        style={{
                                             boxShadow: boxShadows.boxShadow2
                                        }}
                                   >
                                        <HiOutlineColorSwatch style={{ fontSize: '1.6rem', color: '#fff' }} />
                                        <span className="size-4 flex-1 text-primary select-none w-fit text-center">
                                             Color Palette</span>
                                   </div>

                                   <div className='flex flex-row gap-1 flex-1'>
                                        {filteredColors.map((color) => (
                                             <ColorCard
                                                  color={color}
                                                  key={uuidv4()}
                                                  selectedColor={selectedColor}
                                                  handleColorSelection={handleColorSelection}
                                                  handleRemoveColorPalette={handleRemoveColorPalette} />
                                        ))}
                                        {[...Array(emptyPaletteSlots)].map((_, index) => (
                                             <motion.div {...bottomUpAnimation} key={index} className={`border-2 border-dashed rounded-md border-gray-700 p-4 cursor-pointer ${index === 7 && emptyPaletteSlots == 8 ? 'w-56' : 'w-28'}`}>
                                                  <Link to={'/explore-colors'}
                                                       className="empty-slot flex flex-col pt-1 items-center justify-between ">
                                                       <IoAddCircleOutline style={{ fontSize: '1.5rem' }} />
                                                       <p className='text-secondary text-center text-xs px-1 select-none'>Add Color</p>
                                                  </Link>
                                             </motion.div>
                                        ))}
                                   </div>



                              </motion.div>

                         )}
                    </AnimatePresence>
               </motion.div >

          </Fragment>

     );
};

const ColorPalette = () => {

     return (
          <AnimatePresence mode='sync'>
               {( 
                    <section style={{zIndex:11}} className='py-2 fixed bottom-2 w-full'  >
                         <Customizer />
                    </section>
               )}
          </AnimatePresence>
     )
}

export default ColorPalette;







