/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoColorPaletteOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const CoordinateColorTab = ({ color }) => {
   return (
      <Fragment>
         <AnimatePresence mode="wait">
            <motion.div
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               transition={{ duration: 0.2 }}
               whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.4 }
               }}
               className="tab-content w-full mt-1  py-2 px-4 flex flex-row flex-wrap justify-between items-center
          
       "
               style={{ background: '#FF0000', }}
            >
               <div>
                  <h2 className="text-xs text-secondary select-none">{color.hex}</h2>
                  <p className="text-secondary text-sm font-[600] select-none">{color.name}</p>
               </div>
               <div className="flex flex-row justify-around items-center w-20">
                  <IoAddCircleOutline fontSize={'1.4rem'} />
                  <IoColorPaletteOutline fontSize={'1.4rem'} />
               </div>
            </motion.div>
            <motion.div
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               transition={{ duration: 0.2 }}
               whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.4 }
               }}
               className="tab-content w-full mt-1  py-2 px-4 flex flex-row flex-wrap justify-between items-center
          
       "
               style={{ background: '#FF0000', }}
            >
               <div>
                  <h2 className="text-xs text-secondary select-none">{color.hex}</h2>
                  <p className="text-secondary text-sm font-[600] select-none">{color.name}</p>
               </div>
               <div className="flex flex-row justify-around items-center w-20">
                  <IoAddCircleOutline fontSize={'1.4rem'} />
                  <IoColorPaletteOutline fontSize={'1.4rem'} />
               </div>
            </motion.div>
            <motion.div
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -10, opacity: 0 }}
               transition={{ duration: 0.2 }}
               whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.4 }
               }}
               className="tab-content w-full mt-1  py-2 px-4 flex flex-row flex-wrap justify-between items-center
          
       "
               style={{ background: '#FF0000', }}
            >
               <div>
                  <h2 className="text-xs text-secondary select-none">{color.hex}</h2>
                  <p className="text-secondary text-sm font-[600] select-none">{color.name}</p>
               </div>
               <div className="flex flex-row justify-around items-center w-20">
                  <IoAddCircleOutline fontSize={'1.4rem'} />
                  <IoColorPaletteOutline fontSize={'1.4rem'} />
               </div>
            </motion.div>
         </AnimatePresence>
      </Fragment>
   );
};

export default CoordinateColorTab;
